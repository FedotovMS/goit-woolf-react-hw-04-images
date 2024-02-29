import { useState } from 'react';

import css from './ImageGalleryItem.module.css';
import Modal from '../../Modal/Modal';

export default function ImageGalleryItem({
  tags,
  largeImageURL,
  webformatURL,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      <li className={css.imageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={toggleModal}
        />
      </li>
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} alt={tags} />
      )}
    </>
  );
}
