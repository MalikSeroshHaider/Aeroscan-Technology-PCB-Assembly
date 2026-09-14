import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
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

    const nums = document.querySelectorAll('[data-target]');
    if (nums.length) {
      const easeOut = t => 1 - Math.pow(1 - t, 3);
      const animate = el => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const start = performance.now();

        const tick = now => {
          const p = Math.min((now - start) / duration, 1);
          el.textContent = Math.floor(easeOut(p) * target).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString();
        };
        requestAnimationFrame(tick);
      };

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animate(e.target);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });

      nums.forEach(el => obs.observe(el));
    }
  }, []);

  const capabilities = [
    { title: "Single-Sided & Double-Sided PCB Assembly" },
    { title: "SMT & DIP Assembly Services" },
    { title: "Low, Medium & High Volume Production" },
    { title: "RoHS-Compliant Manufacturing" },
    { title: "Customer-Supplied or Turnkey Components" },
    { title: "High-Precision Automated SMT Production Line" },
    { title: "Experienced Assembly & Quality Inspection Team" },
    { title: "Fast Turnaround Time" },
  ];

  const whyChooseUs = [
    { title: "Modern Automated SMT & Dedicated DIP Assembly Lines" },
    { title: "High Placement Accuracy and Repeatability" },
    { title: "Experienced Engineering & Technical Team" },
    { title: "Strict Quality Control & Inspection Process" },
    { title: "Reliable, Cost-Effective EMS Solutions" },
    { title: "Flexible Production Volumes" },
    { title: "Fast Turnaround & On-Time Project Delivery" },
    { title: "Technical Support & Customer-Focused Service" },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="hero" id="home" aria-label="Hero section">
        <img
          src="/assets/pcb_hero_bg.jpg"
          alt="Aeroscan Technologies PCB Manufacturing Facility"
          className="hero__bg-img"
        />
        <div className="hero__overlay"></div>

        <div className="container hero__content">
          <h1 className="hero__heading">
            Welcome to Aeroscan Technologies
          </h1>

          <p className="hero__desc">
            At Aeroscan Technologies, we specialize in PCB assembly, re-soldering, physical inspection, quality checking, functional testing, and maintenance services. Our focus is on precision assembly, reliable quality assurance, and complete customer satisfaction.
          </p>

          <div className="hero__actions">
            <Link to="/contact.html" className="btn btn--primary btn--lg">Get a Free Quote</Link>
            <Link to="/services.html" className="btn btn--outline btn--lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'var(--clr-white)' }}>Explore Services</Link>
          </div>
        </div>

        <a href="#about" className="hero__scroll" id="hero-scroll-btn" aria-label="Scroll to about section">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </a>
      </section>

      {/* ABOUT SECTION */}
      <section className="section about-hero-banner reveal-up" id="about">
        <img
          src="/assets/pcb_about_bg.jpg"
          alt="Aeroscan Technologies High Quality PCB Solutions"
          className="about-hero-banner__bg-img"
        />
        <div className="about-hero-banner__overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="about-hero-banner__content">
            <h2 className="about-hero-banner__title">
              Aeroscan Technologies provides specialized PCB assembly, re-soldering, physical inspection, quality checking, functional testing, and maintenance services.
            </h2>
            <p className="about-hero-banner__desc">
              We deliver reliable, high-quality solutions with precision, strict quality control, and on-time delivery. Our experienced team ensures every PCB assembly is carefully processed, inspected, and tested to meet industry standards. We are committed to providing dependable service and complete customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* 1. OUR CAPABILITIES SECTION */}
      <section className="section section--dark2 reveal-up" id="capabilities">
        <div className="container">
          <div className="section-header divider--center">
            <span className="section-label">Manufacturing Excellence</span>
            <h2 className="section-title">Our Capabilities</h2>
            <div className="divider divider--center"></div>
          </div>

          <div className="capabilities-grid">
            {capabilities.map((item, idx) => (
              <div key={idx} className="capability-card">
                <span className="capability-card__num">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="capability-card__title">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE AEROSCAN? SECTION */}
      <section className="section section--dark reveal-up" id="why-choose-us">
        <div className="container">
          <div className="section-header divider--center">
            <span className="section-label">The Aeroscan Advantage</span>
            <h2 className="section-title">Why Choose Aeroscan?</h2>
            <div className="divider divider--center"></div>
          </div>

          <div className="why-feature-list">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="why-feature-item">
                <span className="why-feature-item__num">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="why-feature-item__title">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUALITY COMMITMENT SECTION */}
      <section className="section section--dark2 reveal-up" id="quality-commitment">
        <div className="container">
          <div className="section-header divider--center">
            <span className="section-label">Our Standards</span>
            <h2 className="section-title">Quality Commitment</h2>
            <div className="divider divider--center"></div>
          </div>

          <div className="quality-commitment-box">
            <p className="quality-commitment__text">
              At Aeroscan Technologies, every PCB assembly undergoes a comprehensive quality inspection and verification process to ensure excellent solder joint quality, electrical reliability, consistent workmanship, and full compliance with customer specifications. We are committed to delivering high-quality electronic manufacturing services with precision, efficiency, reliability, and on-time delivery, ensuring every product meets the highest standards of performance and customer satisfaction.
            </p>

            <div className="quality-pillars-grid">
              <div className="quality-pillar-item">
                <span className="quality-pillar__tag">01</span>
                <span>Solder Joint Quality</span>
              </div>
              <div className="quality-pillar-item">
                <span className="quality-pillar__tag">02</span>
                <span>Electrical Reliability</span>
              </div>
              <div className="quality-pillar-item">
                <span className="quality-pillar__tag">03</span>
                <span>Consistent Workmanship</span>
              </div>
              <div className="quality-pillar-item">
                <span className="quality-pillar__tag">04</span>
                <span>Customer Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="section section--dark reveal-up" id="mission-vision" style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,.05)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <div className="hero__overlay" style={{ opacity: 0.85, pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header divider--center">
            <span className="section-label section-label--light">What Drives Us</span>
            <h2 className="section-title section-title--light">Our Mission &amp; Vision</h2>
            <div className="divider divider--light divider--center"></div>
          </div>

          <div className="values__grid" style={{ maxWidth: '800px', marginInline: 'auto' }}>
            <div className="value-card value-card--dark reveal-up" style={{ '--delay': '0.1s' }}>
              <div className="value-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
              </div>
              <h3 className="value-card__title">Mission</h3>
              <p className="value-card__desc">Deliver precision-assembled PCBs and electronic services that empower our clients to build reliable electronics.</p>
            </div>

            <div className="value-card value-card--dark reveal-up" style={{ '--delay': '0.2s' }}>
              <div className="value-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </div>
              <h3 className="value-card__title">Vision</h3>
              <p className="value-card__desc">To be the world's most trusted PCB assembly and electronic services partner, recognized for uncompromising quality and rapid turnaround.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

