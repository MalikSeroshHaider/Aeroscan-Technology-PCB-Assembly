import React, { useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-up');
    if (els.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });

      els.forEach(el => observer.observe(el));
    }
  }, []);

  return (
    <main>
      {/* PAGE BANNER */}
      <div className="page-banner" id="contact-banner">
        <div className="container page-banner__content">
          <div className="page-banner__label">Contact Us</div>
          <h1 className="page-banner__title">Let's Connect &amp; <span>Build Together</span></h1>
          <p className="page-banner__desc">Reach out directly via phone or email, or visit our corporate office in Haripur, Pakistan.</p>
        </div>
      </div>

      {/* CONTACT INFO & LOCATION SECTION */}
      <section className="section section--dark" id="contact-info" aria-label="Contact information and location">
        <div className="container">
          <div className="contact-redesign-grid">

            {/* Card 1: Our Location */}
            <div className="contact-box reveal-up" id="contact-location-box">
              <div className="contact-box__header">
                <div className="contact-box__icon-wrap" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h2 className="contact-box__title">Our Location</h2>
                  <div className="contact-box__subtitle">Corporate Headquarters</div>
                </div>
              </div>

              <div className="location-details">
                <div className="location-address">
                  <div className="location-company">Aeroscan Technologies PCB Inc.</div>
                  <div className="location-street">T&amp;T Complex, TIP Colony</div>
                  <div className="location-region">Haripur, Khyber Pakhtunkhwa, Pakistan</div>
                </div>

                {/* Map View Container */}
                <div className="map-wrapper">
                  <iframe
                    className="map-iframe"
                    title="Aeroscan Technologies PCB Office Location"
                    src="https://maps.google.com/maps?q=T%26T+Complex,+TIP+Colony,+Haripur,+Khyber+Pakhtunkhwa,+Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>

                <a
                  href="https://maps.google.com/?q=T%26T+Complex,+TIP+Colony,+Haripur,+Khyber+Pakhtunkhwa,+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm"
                  style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(0, 216, 255, 0.3)', color: '#00d8ff' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Card 2: Get in Touch */}
            <div className="contact-box reveal-up" style={{ '--delay': '0.15s' }} id="contact-touch-box">
              <div className="contact-box__header">
                <div className="contact-box__icon-wrap" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="contact-box__title">Get in Touch</h2>
                  <div className="contact-box__subtitle">Direct Communications</div>
                </div>
              </div>

              <div className="touch-methods">
                {/* Phone */}
                <div className="touch-item">
                  <div className="touch-item__left">
                    <div className="touch-item__icon" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="touch-item__label">Phone</div>
                      <div className="touch-item__value">+92 331 8180744</div>
                      <div className="touch-item__note">Mon–Sun · 24/7 Available</div>
                    </div>
                  </div>
                  <div className="touch-item__btn">
                    <a href="tel:+923318180744" className="btn btn--primary btn--sm">
                      Call Now
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="touch-item">
                  <div className="touch-item__left">
                    <div className="touch-item__icon" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div>
                      <div className="touch-item__label">Email</div>
                      <div className="touch-item__value">sarmad.quershi@aeroscan.com.pk</div>
                      <div className="touch-item__note">2-Hour Guaranteed Response</div>
                    </div>
                  </div>
                  <div className="touch-item__btn">
                    <a href="mailto:sarmad.quershi@aeroscan.com.pk" className="btn btn--primary btn--sm">
                      Send Email
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
