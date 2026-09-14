import React, { useEffect } from 'react';

export default function ShowcaseLightbox({ items = [], currentIndex = 0, isOpen = false, onClose, onSelectIndex }) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length, onClose, onSelectIndex]);

  if (!isOpen || !items.length) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % items.length);
  };

  return (
    <div className={`showcase-lightbox ${isOpen ? 'open' : ''}`} id="showcase-lightbox" aria-hidden={!isOpen} role="dialog" aria-label="Facility Image Preview">
      <div className="showcase-lightbox__backdrop" id="showcase-lightbox-backdrop" onClick={onClose}></div>
      <div className="showcase-lightbox__content" onClick={(e) => e.stopPropagation()}>
        <button className="showcase-lightbox__close" id="showcase-lightbox-close" aria-label="Close image preview" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button className="showcase-lightbox__nav showcase-lightbox__nav--prev" id="showcase-lightbox-prev" aria-label="Previous image" onClick={handlePrev}>
          &#10094;
        </button>
        <button className="showcase-lightbox__nav showcase-lightbox__nav--next" id="showcase-lightbox-next" aria-label="Next image" onClick={handleNext}>
          &#10095;
        </button>
        <div className="showcase-lightbox__image-container">
          <img src={currentItem.img} alt={currentItem.title} id="showcase-lightbox-img" className="showcase-lightbox__img" />
        </div>
        <div className="showcase-lightbox__caption">
          <div className="showcase-lightbox__meta">
            <span className="showcase-lightbox__tag" id="showcase-lightbox-tag">{currentItem.category}</span>
            <span className="showcase-lightbox__counter" id="showcase-lightbox-counter">{currentIndex + 1} / {items.length}</span>
          </div>
          <h4 className="showcase-lightbox__title" id="showcase-lightbox-title">{currentItem.title}</h4>
        </div>
      </div>
    </div>
  );
}
