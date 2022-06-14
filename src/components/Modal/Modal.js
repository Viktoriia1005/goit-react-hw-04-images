import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = ({ code }) => {
    code === 'Escape' && onClose();
  };

  const handleOverlayClick = ({ currentTarget, target }) => {
    currentTarget === target && onClose();
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleOverlayClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
}
