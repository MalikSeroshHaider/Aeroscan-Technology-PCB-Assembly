import React, { useState, useEffect, useRef } from 'react';
import { mfgGalleryData } from '../../data/siteData';

export default function MfgHeroSlider({ onOpenLightbox }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const videoRefs = useRef([]);
  const autoplayTimerRef = useRef(null);

  const slides = mfgGalleryData;
  const totalSlides = slides.length;

  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (vid) {
        if (i === currentIdx) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      }
    });
  }, [currentIdx]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [currentIdx]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % totalSlides);
    }, 6000);
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
  };

  const goToSlide = (idx) => {
    setCurrentIdx((idx + totalSlides) % totalSlides);
  };

  return (
    <div
      className="mfg-hero-slider"
      id="mfg-hero-slider"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="mfg-slides-wrapper">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIdx;
          return (
            <div
              key={idx}
              className={`mfg-slide ${isActive ? 'active' : ''}`}
              data-type={slide.type}
              data-src={slide.src}
              data-title={slide.title}
              data-tag="Factory Floor"
              onClick={() => onOpenLightbox && onOpenLightbox(slide.src)}
            >
              {slide.type === 'video' ? (
                <video
                  ref={el => videoRefs.current[idx] = el}
                  muted
                  loop
                  playsInline
                  poster="/assets/pcb_hero_bg.jpg"
                  src={slide.src}
                  className="mfg-slide__media"
                />
              ) : (
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="mfg-slide__media"
                />
              )}
              <div className="mfg-slide__overlay"></div>
              <div className="mfg-slide__content container">
                <span className="mfg-slide__badge">
                  <span className="mfg-pulse-dot"></span> Advanced Manufacturing Line
                </span>
                <h1 className="mfg-slide__title">{slide.title}</h1>
                <p className="mfg-slide__desc">{slide.desc}</p>
                <div className="mfg-slide__actions">
                  <button
                    className="btn btn--primary"
                    onClick={(e) => { e.stopPropagation(); onOpenLightbox && onOpenLightbox(slide.src); }}
                  >
                    Watch Full Video <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </button>
                  <a href="#mfg-process" className="btn btn--outline" onClick={(e) => e.stopPropagation()}>
                    Explore Process
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mfg-slider-controls container">
        <div className="mfg-slider-counter">
          <span id="mfg-current-slide">{String(currentIdx + 1).padStart(2, '0')}</span>
          <span className="mfg-counter-sep">/</span>
          <span id="mfg-total-slides">{String(totalSlides).padStart(2, '0')}</span>
        </div>

        <div className="mfg-thumbs-container" id="mfg-thumbs-container">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              className={`mfg-thumb ${idx === currentIdx ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            >
              {slide.type === 'video' ? (
                <span className="mfg-thumb__icon">&#9654;</span>
              ) : (
                <img src={slide.src} alt="" className="mfg-thumb__img" />
              )}
            </button>
          ))}
        </div>

        <div className="mfg-nav-btns">
          <button
            className="mfg-nav-btn"
            id="mfg-prev-btn"
            onClick={() => goToSlide(currentIdx - 1)}
            aria-label="Previous slide"
          >
            &#10094;
          </button>
          <button
            className="mfg-nav-btn"
            id="mfg-next-btn"
            onClick={() => goToSlide(currentIdx + 1)}
            aria-label="Next slide"
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
}
