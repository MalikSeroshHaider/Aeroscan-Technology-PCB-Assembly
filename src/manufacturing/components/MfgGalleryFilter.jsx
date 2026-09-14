import React, { useState, useRef, useEffect } from 'react';
import { mfgGalleryData } from '../../data/siteData';
import { Film, Camera, Play, Maximize2 } from 'lucide-react';

export default function MfgGalleryFilter({ onOpenLightbox }) {
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const videoRefs = useRef({});

  const videoItems = mfgGalleryData.filter(item => item.type === 'video');
  const imageItems = mfgGalleryData.filter(item => item.type === 'image');

  // Hover-to-play effect: play ONLY the currently hovered video and pause all others
  useEffect(() => {
    Object.keys(videoRefs.current).forEach(idKey => {
      const id = Number(idKey);
      const videoEl = videoRefs.current[idKey];
      if (!videoEl) return;

      if (id === hoveredVideoId) {
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Ignore abort errors caused by rapid hover transitions
          });
        }
      } else {
        videoEl.pause();
      }
    });
  }, [hoveredVideoId]);

  const handleMouseEnter = (id) => {
    setHoveredVideoId(id);
  };

  const handleMouseLeave = (id) => {
    setHoveredVideoId(prev => (prev === id ? null : prev));
  };

  return (
    <section className="section section--dark" id="mfg-gallery">
      <div className="container">
        {/* MAIN SECTION HEADER */}
        <div className="section-header divider--center">
          <span className="section-label section-label--light">Real Production Media</span>
          <h2 className="section-title section-title--light">Explore Our Manufacturing Operations</h2>
          <div className="divider divider--light divider--center"></div>
          <p className="section-desc section-desc--light">
            Browse our state-of-the-art manufacturing &amp; quality testing facility across dedicated video clips and high-resolution photography. Click any item for full-screen inspection.
          </p>
        </div>

        {/* VIDEOS SECTION */}
        <div className="mfg-media-block mfg-media-block--videos">
          {videoItems.length > 0 ? (
            <div className="mfg-grid mfg-grid--videos" id="mfg-video-grid">
              {videoItems.map(item => {
                return (
                  <div
                    key={item.id}
                    className="mfg-card mfg-card--video"
                    data-category={item.category}
                    data-type={item.type}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={() => handleMouseLeave(item.id)}
                    onClick={() => onOpenLightbox && onOpenLightbox(item.src)}
                  >
                    <div className="mfg-card__thumb">
                      <video
                        ref={el => { videoRefs.current[item.id] = el; }}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={item.poster}
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                      <div className="mfg-card__play">
                        <Play size={20} fill="currentColor" style={{ marginLeft: '2px' }} />
                      </div>
                      <div className="mfg-card__hover-overlay">
                        <span>Click to Watch Video</span>
                      </div>
                    </div>
                    <div className="mfg-card__info">
                      <span className="mfg-card__tag">{item.tag}</span>
                      <h4 className="mfg-card__title">{item.title}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mfg-empty-state">
              <Film size={32} className="mfg-empty-state__icon" />
              <p>No video clips available.</p>
            </div>
          )}
        </div>

        {/* SECTION DIVIDER */}
        <div className="mfg-sections-divider">
          <div className="mfg-sections-divider__line"></div>
        </div>

        {/* IMAGES SECTION */}
        <div className="mfg-media-block mfg-media-block--images">
          {imageItems.length > 0 ? (
            <div className="mfg-grid mfg-grid--images" id="mfg-image-grid">
              {imageItems.map(item => (
                <div
                  key={item.id}
                  className="mfg-card mfg-card--image"
                  data-category={item.category}
                  data-type={item.type}
                  onClick={() => onOpenLightbox && onOpenLightbox(item.src)}
                >
                  <div className="mfg-card__thumb">
                    <img src={item.src} alt={item.title} loading="lazy" />
                    <div className="mfg-card__zoom">
                      <Maximize2 size={18} />
                    </div>
                    <div className="mfg-card__hover-overlay">
                      <span>View High-Res Photo</span>
                    </div>
                  </div>
                  <div className="mfg-card__info">
                    <span className="mfg-card__tag">{item.tag}</span>
                    <h4 className="mfg-card__title">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mfg-empty-state">
              <Camera size={32} className="mfg-empty-state__icon" />
              <p>No high-res photos available.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

