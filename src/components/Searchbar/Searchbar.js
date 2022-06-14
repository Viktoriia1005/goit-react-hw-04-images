import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchInfo, setSearchInfo] = useState('');

  const handleNameChange = event => {
    setSearchInfo(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchInfo.trim() === '') {
      return toast.error('Enter your search term!');
    }
    onSubmit(searchInfo);
    setSearchInfo('');
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}></button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchInfo}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
