import s from './ImageGallery.module.css';

export default function ImageGallery({ images, onOpenModal }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => (
        <li
          className={s.GalleryItem}
          key={image.id}
          onClick={() => {
            onOpenModal(image);
          }}
        >
          <img
            className={s.ImageGalleryItemImage}
            src={image.webformatURL}
            alt={image.tags}
          />
        </li>
      ))}
    </ul>
  );
}
