import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MfgGalleryFilter from './components/MfgGalleryFilter';
import MfgMediaLightbox from './components/MfgMediaLightbox';

export default function ProductManufacturingPage() {
  const [selectedMediaSrc, setSelectedMediaSrc] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    if (els.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

      els.forEach(el => observer.observe(el));
    }
  }, []);

  const openLightbox = (src) => {
    setSelectedMediaSrc(src);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedMediaSrc(null);
  };

  return (
    <main>
      {/* PAGE BANNER */}
      <div className="page-banner" id="mfg-banner">
        <div className="container page-banner__content">
          <div className="page-banner__label">REAL MANUFACTURING FACILITY</div>
          <h1 className="page-banner__title">Product <span>Manufacturing</span></h1>
          <p className="page-banner__desc">Take an exclusive inside look at our state-of-the-art electronics assembly lines, high-speed SMT pick-and-place robotics, re-soldering stations, physical inspection, quality checking, and functional testing in real action.</p>
        </div>
      </div>

      {/* FILTERABLE GALLERY */}
      <MfgGalleryFilter onOpenLightbox={openLightbox} />

      {/* MEDIA LIGHTBOX MODAL */}
      <MfgMediaLightbox
        selectedSrc={selectedMediaSrc}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
      />

      {/* PROCESS STEPS SECTION */}
      <section className="section section--dark" id="mfg-process">
        <div className="container">
          <div className="section-header divider--center">
            <span className="section-label section-label--light">Manufacturing &amp; Quality Journey</span>
            <h2 className="section-title section-title--light">End-to-End Manufacturing Workflow</h2>
            <div className="divider divider--light divider--center"></div>
            <p className="section-desc section-desc--light">From solder paste stenciling to re-soldering, physical inspection, and automated functional testing — every assembly phase is rigorously controlled.</p>
          </div>

          <div className="mfg-steps-grid">
            <div className="mfg-step-card reveal-up" style={{ '--delay': '0s' }}>
              <div className="mfg-step-card__num">01</div>
              <h3 className="mfg-step-card__title">Solder Paste Printing</h3>
              <p className="mfg-step-card__desc">High-precision 2D/3D automatic solder paste printing ensuring exact solder volume for 01005 passives and BGAs.</p>
            </div>

            <div className="mfg-step-card reveal-up" style={{ '--delay': '0.1s' }}>
              <div className="mfg-step-card__num">02</div>
              <h3 className="mfg-step-card__title">High-Speed SMT Pick &amp; Place</h3>
              <p className="mfg-step-card__desc">Multi-nozzle placement modules placing micro-chips and high-pin count ICs at up to 60,000 components per hour.</p>
            </div>

            <div className="mfg-step-card reveal-up" style={{ '--delay': '0.2s' }}>
              <div className="mfg-step-card__num">03</div>
              <h3 className="mfg-step-card__title">Multi-Zone Reflow Soldering</h3>
              <p className="mfg-step-card__desc">10-zone nitrogen reflow oven with precise thermal profiling preventing thermal shock and tombstoning.</p>
            </div>

            <div className="mfg-step-card reveal-up" style={{ '--delay': '0.3s' }}>
              <div className="mfg-step-card__num">04</div>
              <h3 className="mfg-step-card__title">3D AOI &amp; Physical Inspection</h3>
              <p className="mfg-step-card__desc">100% Automated Optical Inspection, manual physical inspection, and 3D X-Ray scanning verifying solder joint integrity.</p>
            </div>

            <div className="mfg-step-card reveal-up" style={{ '--delay': '0.4s' }}>
              <div className="mfg-step-card__num">05</div>
              <h3 className="mfg-step-card__title">Through-Hole Wave &amp; Re-soldering</h3>
              <p className="mfg-step-card__desc">Selective wave soldering lines and precision re-soldering rework for heavy power components and connectors.</p>
            </div>

            <div className="mfg-step-card reveal-up" style={{ '--delay': '0.5s' }}>
              <div className="mfg-step-card__num">06</div>
              <h3 className="mfg-step-card__title">Functional Testing &amp; Maintenance</h3>
              <p className="mfg-step-card__desc">In-circuit testing, functional bench verification, firmware programming, maintenance check, and final ESD anti-static packaging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner" id="mfg-cta">
        <div className="container">
          <h2 className="cta-banner__title">Partner with Our Manufacturing Facility</h2>
          <p className="cta-banner__desc">Experience industrial precision, fast assembly turnarounds, thorough quality checking, and scalable box-build integration for your electronics program.</p>
          <div className="cta-banner__actions">
            <Link to="/contact.html" className="btn btn--primary btn--lg">Request a Manufacturing Quote</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
