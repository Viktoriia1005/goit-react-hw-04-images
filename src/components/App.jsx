import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from "react-scroll";
import './App.css'

import api from '../services/api'
import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from "./ImageGallery";
import Modal from '../components/Modal/Modal';
import Button from './Button'
import Loader from './Loader';


export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [currentImage, setCurrntImage] = useState({});
  const [status, setStatus] = useState('idle');


  useEffect(() => { 

   if (!searchQuery) {
     return
    }

    const findImageByName = async () => {
           try {
              const response = await api(searchQuery, page);
              if (response.ok) {
                 const articles = await response.json();
                 setImages(prevState => [...prevState, ...articles.hits]);
                 setStatus('resolved');
              } else {
                 return Promise.reject(new Error(`${searchQuery} - matches not detected!`));
              }
           } catch (error) {
              setError(error);
              setStatus('rejected');
              toast.error('The entry field must be filled in!');
           }
        };
    
   setStatus('pending');
   findImageByName();
    
 }, [searchQuery, page]);

 const handleFormSubmit = newSearchQuery => {
   if (searchQuery !== newSearchQuery) {
   setSearchQuery(newSearchQuery);
   setImages([])
   setPage(1)
   }
 };

  const toggleModal = image => {
     setShowModal(!showModal);
     setCurrntImage(image);
  };

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  const handleButtonClick = () => {
   setPage(prevState => prevState + 1)
   scrollToBottom();
 }

  return (
     <div className='App'>
        <Searchbar onSubmit={handleFormSubmit} />
        {status === 'idle' && (
           <h1 className='title'>
              Please enter your search term</h1>
        )}

        {status === 'rejected' && <h2>{error.message}</h2>}

        {status === 'resolved' && (
           <>
              <ImageGallery images={images} onOpenModal={toggleModal} />
              {images.length !== 0 && (
                 <Button onLoadMore={handleButtonClick} />
              )}
              {images.length === 0 && (
                 <h2 >'{searchQuery}' - not detected!</h2>
              )}
           </>
        )}

        {status === 'pending' && (
           <>
              <ImageGallery images={images} onOpenModal={toggleModal} />
              <Loader/>
           </>
        )}

        {showModal && (
           <Modal onClose={toggleModal}>
              <img src={currentImage.largeImageURL} alt={currentImage.tags} />
           </Modal>
        )}
        <ToastContainer
           position="top-left"
           autoClose={3000}
           newestOnTop={true}
           closeOnClick
           pauseOnFocusLoss
           pauseOnHover
        />
     </div>
  );
}