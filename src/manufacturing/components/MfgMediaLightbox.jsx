import React, { useEffect, useState, useRef } from 'react';
import { mfgGalleryData } from '../../data/siteData';

export default function MfgMediaLightbox({ selectedSrc = null, isOpen = false, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const videoRef = useRef(null);

  const allItems = mfgGalleryData;

  useEffect(() => {
    if (selectedSrc) {
      const idx = allItems.findIndex(item => 
        item.src === selectedSrc || 
        item.src.replace(/\.(MOV|mp4)$/i, '') === selectedSrc.replace(/\.(MOV|mp4)$/i, '')
      );
      if (idx !== -1) setCurrentIdx(idx);
    }
  }, [selectedSrc]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentIdx(prev => (prev - 1 + allItems.length) % allItems.length);
      if (e.key === 'ArrowRight') setCurrentIdx(prev => (prev + 1) % allItems.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, allItems.length, onClose]);

  const currentItem = isOpen && allItems.length ? allItems[currentIdx] : null;

  useEffect(() => {
    if (isOpen && currentItem && currentItem.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Video autoplay deferred by browser policy:', err);
        });
      }
    }
  }, [isOpen, currentIdx, currentItem]);

  if (!isOpen || !allItems.length || !currentItem) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIdx((currentIdx - 1 + allItems.length) % allItems.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIdx((currentIdx + 1) % allItems.length);
  };

  return (
    <div className={`mfg-lightbox ${isOpen ? 'open' : ''}`} id="mfg-lightbox" aria-hidden={!isOpen} role="dialog">
      <div className="mfg-lightbox__backdrop" id="mfg-lightbox-backdrop" onClick={onClose}></div>
      <div className="mfg-lightbox__content" onClick={(e) => e.stopPropagation()}>
        <button className="mfg-lightbox__close" id="mfg-lightbox-close" aria-label="Close media preview" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <button className="mfg-lightbox__nav mfg-lightbox__nav--prev" id="mfg-lightbox-prev" aria-label="Previous media" onClick={handlePrev}>
          &#10094;
        </button>
        <button className="mfg-lightbox__nav mfg-lightbox__nav--next" id="mfg-lightbox-next" aria-label="Next media" onClick={handleNext}>
          &#10095;
        </button>

        <div className="mfg-lightbox__media-wrap" id="mfg-lightbox-media-wrap">
          {currentItem.type === 'video' ? (
            <video
              ref={videoRef}
              key={currentItem.src}
              controls
              autoPlay
              playsInline
              preload="auto"
              style={{ width: '100%', maxHeight: '74vh' }}
            >
              <source src={currentItem.src} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          ) : (
            <img
              key={currentItem.src}
              src={currentItem.src}
              alt={currentItem.title}
              style={{ maxWidth: '100%', maxHeight: '74vh' }}
            />
          )}
        </div>

        <div className="mfg-lightbox__caption">
          <div className="mfg-lightbox__meta">
            <span className="mfg-lightbox__tag" id="mfg-lightbox-tag">{currentItem.tag}</span>
            <span className="mfg-lightbox__counter" id="mfg-lightbox-counter">{currentIdx + 1} / {allItems.length}</span>
          </div>
          <h4 className="mfg-lightbox__title" id="mfg-lightbox-title">{currentItem.title}</h4>
        </div>
      </div>
    </div>
  );
}
