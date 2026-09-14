import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { Cpu, Layers, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

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

  const smtServices = servicesData.filter(s => s.category === 'SMT');
  const dipServices = servicesData.filter(s => s.category === 'DIP');

  const filteredServices = activeCategory === 'ALL'
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory);

  return (
    <main>
      {/* PAGE BANNER */}
      <div className="page-banner" id="services-banner">
        <div className="container page-banner__content">
          <div className="page-banner__label">Our Specialized Services</div>
          <h1 className="page-banner__title">SMT &amp; DIP <span>PCB Assembly Services</span></h1>
          <p className="page-banner__desc">
            Complete Surface Mount Technology (SMT) and Dual In-line Package (DIP) Through-Hole assembly services — from high-speed pick and place to wave soldering, precision rework, 3D inspection, and packaging.
          </p>
        </div>
      </div>

      {/* INTRO & STATS */}
      <div className="services-intro" id="services-intro">
        <div className="container">
          <div className="services-intro__inner">
            <div className="services-intro__text reveal-left">
              <div className="section-label">Automated &amp; Manual Electronics Assembly</div>
              <h2>High-Precision SMT &amp; DIP PCB Assembly Solutions</h2>
              <p>
                At Aeroscan Technologies, we provide comprehensive SMT (Surface Mount Technology) and DIP (Through-Hole) PCB assembly services. Equipped with high-speed automated pick &amp; place machines, multi-zone convection reflow ovens, automated wave soldering tunnels, 3D AOI &amp; X-ray inspection systems, and IPC-certified rework technicians — we ensure every circuit board meets the highest standards of reliability and performance.
              </p>
            </div>
            <div className="services-intro__stats reveal-right">
              <div className="intro-stat">
                <div className="intro-stat__val"><span data-target="12">0</span><span className="intro-stat__suf"></span></div>
                <div className="intro-stat__label">Core Assembly Services</div>
              </div>
              <div className="intro-stat">
                <div className="intro-stat__val"><span data-target="60">0</span><span className="intro-stat__suf">k+</span></div>
                <div className="intro-stat__label">Components / Hour (CPH)</div>
              </div>
              <div className="intro-stat">
                <div className="intro-stat__val"><span data-target="24">0</span><span className="intro-stat__suf">hr</span></div>
                <div className="intro-stat__label">Prototype Turnaround</div>
              </div>
              <div className="intro-stat">
                <div className="intro-stat__val"><span data-target="99">0</span><span className="intro-stat__suf">.8%</span></div>
                <div className="intro-stat__label">First-Pass Yield</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER TABS & SERVICE CATALOG */}
      <section className="section" id="all-services" aria-label="SMT and DIP PCB Assembly Services">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Assembly Services Catalog</div>
            <h2 className="section-title">SMT &amp; DIP Assembly Capabilities</h2>
            <div className="divider divider--center"></div>
            <p className="section-desc">
              Explore our complete range of SMT (Surface Mount Technology) and DIP (Through-Hole) assembly services, backed by advanced manufacturing automation and rigorous IPC quality standards.
            </p>

            {/* CATEGORY FILTER BUTTONS */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveCategory('ALL')}
                className={`btn ${activeCategory === 'ALL' ? 'btn--primary' : 'btn--outline'}`}
                style={{ padding: '0.6rem 1.4rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 600 }}
              >
                All Services (12)
              </button>
              <button
                onClick={() => setActiveCategory('SMT')}
                className={`btn ${activeCategory === 'SMT' ? 'btn--primary' : 'btn--outline'}`}
                style={{ padding: '0.6rem 1.4rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Cpu size={16} />
                SMT Services (6)
              </button>
              <button
                onClick={() => setActiveCategory('DIP')}
                className={`btn ${activeCategory === 'DIP' ? 'btn--primary' : 'btn--outline'}`}
                style={{ padding: '0.6rem 1.4rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Layers size={16} />
                DIP Services (6)
              </button>
            </div>
          </div>

          {/* SMT SERVICES SECTION (when ALL or SMT selected) */}
          {(activeCategory === 'ALL' || activeCategory === 'SMT') && (
            <div style={{ marginBottom: activeCategory === 'ALL' ? '4rem' : '1rem' }}>
              {activeCategory === 'ALL' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', borderBottom: '2px solid rgba(14, 165, 233, 0.2)', paddingBottom: '0.75rem' }}>
                  <Cpu size={24} style={{ color: 'var(--clr-primary)' }} />
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                    SMT — Surface Mount Technology Services
                  </h3>
                </div>
              )}

              <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {smtServices.map((svc, idx) => (
                  <article key={svc.id} className="svc-item reveal-up" style={{ '--delay': `${idx * 0.06}s`, backgroundColor: 'var(--clr-surface)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--clr-border)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                    <div className="svc-card__img-wrap" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem', height: '190px' }}>
                      <img src={svc.img} alt={svc.title} className="svc-card__img" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--clr-accent)', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px', textTransform: 'uppercase' }}>
                        {svc.category} Assembly
                      </span>
                      <span className="svc-item__num" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>{svc.num}</span>
                    </div>
                    <h3 className="svc-item__title" style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.25rem 0 0.5rem', color: '#ffffff' }}>{svc.title}</h3>
                    <p className="svc-item__desc" style={{ fontSize: '0.925rem', color: '#cbd5e1', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.25rem' }}>{svc.desc}</p>

                    <Link to={svc.link} className="btn btn--primary btn--sm" style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', borderRadius: '8px' }}>
                      Learn Service Details
                      <ArrowRight size={16} />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* DIP SERVICES SECTION (when ALL or DIP selected) */}
          {(activeCategory === 'ALL' || activeCategory === 'DIP') && (
            <div>
              {activeCategory === 'ALL' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', borderBottom: '2px solid rgba(14, 165, 233, 0.2)', paddingBottom: '0.75rem' }}>
                  <Layers size={24} style={{ color: 'var(--clr-primary)' }} />
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                    DIP — Through-Hole Assembly Services
                  </h3>
                </div>
              )}

              <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {dipServices.map((svc, idx) => (
                  <article key={svc.id} className="svc-item reveal-up" style={{ '--delay': `${idx * 0.06}s`, backgroundColor: 'var(--clr-surface)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--clr-border)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                    <div className="svc-card__img-wrap" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem', height: '190px' }}>
                      <img src={svc.img} alt={svc.title} className="svc-card__img" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--clr-primary)', backgroundColor: 'rgba(14, 165, 233, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px', textTransform: 'uppercase' }}>
                        {svc.category} Assembly
                      </span>
                      <span className="svc-item__num" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>{svc.num}</span>
                    </div>
                    <h3 className="svc-item__title" style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.25rem 0 0.5rem', color: '#ffffff' }}>{svc.title}</h3>
                    <p className="svc-item__desc" style={{ fontSize: '0.925rem', color: '#cbd5e1', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.25rem' }}>{svc.desc}</p>

                    <Link to={svc.link} className="btn btn--primary btn--sm" style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', borderRadius: '8px' }}>
                      Learn Service Details
                      <ArrowRight size={16} />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE OUR SMT & DIP SERVICES */}
      <section className="section section--dark" id="why-services" aria-label="Why Choose Our SMT and DIP Services">
        <div className="container">
          <div className="section-header">
            <div className="section-label section-label--light">Manufacturing Advantage</div>
            <h2 className="section-title section-title--light">Why Choose Our SMT &amp; DIP Services</h2>
            <div className="divider divider--light divider--center"></div>
            <p className="section-desc section-desc--light">
              Key engineering strengths that make Aeroscan Technologies your trusted manufacturing partner for Surface Mount (SMT) and Through-Hole (DIP) assembly.
            </p>
          </div>

          <div className="features-grid" role="list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div className="feature-item reveal-up" role="listitem" style={{ '--delay': '0s', padding: '1.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="feature-item__title" style={{ color: 'var(--clr-white)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Automated Precision SMT</h3>
              <p className="feature-item__desc" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.925rem', lineHeight: 1.6 }}>High-speed pick and place machines handling 01005 passives and fine-pitch BGAs with optical vision alignment.</p>
            </div>
            <div className="feature-item reveal-up" role="listitem" style={{ '--delay': '.08s', padding: '1.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="feature-item__title" style={{ color: 'var(--clr-white)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Heavy-Duty Through-Hole DIP</h3>
              <p className="feature-item__desc" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.925rem', lineHeight: 1.6 }}>Dual-wave nitrogen soldering and skilled manual insertion for high-power connectors, relays, and transformers.</p>
            </div>
            <div className="feature-item reveal-up" role="listitem" style={{ '--delay': '.16s', padding: '1.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="feature-item__title" style={{ color: 'var(--clr-white)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Multi-Stage 3D Inspection</h3>
              <p className="feature-item__desc" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.925rem', lineHeight: 1.6 }}>3D Solder Paste Inspection (SPI), 3D AOI optical scanning, and 3D X-Ray Inspection (AXI) guaranteeing 100% joint integrity.</p>
            </div>
            <div className="feature-item reveal-up" role="listitem" style={{ '--delay': '.24s', padding: '1.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="feature-item__title" style={{ color: 'var(--clr-white)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Expert Rework &amp; Hand Soldering</h3>
              <p className="feature-item__desc" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.925rem', lineHeight: 1.6 }}>IPC-certified technicians executing precision hot-air BGA reballing, trace repair, and delicate terminal wiring.</p>
            </div>
            <div className="feature-item reveal-up" role="listitem" style={{ '--delay': '.32s', padding: '1.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="feature-item__title" style={{ color: 'var(--clr-white)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>ESD Shield Packaging &amp; Shipping</h3>
              <p className="feature-item__desc" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.925rem', lineHeight: 1.6 }}>Vacuum static-shield bagging, custom foam packaging, and barcode lot tracking for 100% transit safety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section--gray" id="process" aria-label="Our PCB Assembly Process">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Assembly Workflow</div>
            <h2 className="section-title" style={{ color: '#ffffff' }}>Your PCB Assembly in 6 Simple Steps</h2>
            <div className="divider divider--center"></div>
            <p className="section-desc" style={{ color: '#cbd5e1' }}>A transparent, streamlined manufacturing workflow from Gerber review to delivery of tested SMT &amp; DIP assemblies.</p>
          </div>

          <div className="process__grid" role="list">
            <div className="process-step reveal-up" role="listitem" style={{ '--delay': '0s' }}>
              <div className="process-step__num">01</div>
              <div className="process-step__content">
                <h3 className="process-step__title" style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700 }}>Upload Gerber &amp; BOM</h3>
                <p className="process-step__desc" style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Submit design files, bill of materials, and assembly instructions for instant review.</p>
              </div>
            </div>
            <div className="process-step reveal-up" role="listitem" style={{ '--delay': '.07s' }}>
              <div className="process-step__num">02</div>
              <div className="process-step__content">
                <h3 className="process-step__title" style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700 }}>DFA &amp; DFM Review</h3>
                <p className="process-step__desc" style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Our engineering team checks stencil footprints, clearance, and part availability.</p>
              </div>
            </div>
            <div className="process-step reveal-up" role="listitem" style={{ '--delay': '.14s' }}>
              <div className="process-step__num">03</div>
              <div className="process-step__content">
                <h3 className="process-step__title" style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700 }}>Stencil &amp; Solder Prep</h3>
                <p className="process-step__desc" style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Laser-cut stencil fabrication, paste conditioning, and smart feeder loading.</p>
              </div>
            </div>
            <div className="process-step reveal-up" role="listitem" style={{ '--delay': '.21s' }}>
              <div className="process-step__num">04</div>
              <div className="process-step__content">
                <h3 className="process-step__title" style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700 }}>SMT &amp; DIP Line Assembly</h3>
                <p className="process-step__desc" style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Automated SMT pick-and-place, reflow soldering, manual DIP insertion, and wave soldering.</p>
              </div>
            </div>
            <div className="process-step reveal-up" role="listitem" style={{ '--delay': '.28s' }}>
              <div className="process-step__num">05</div>
              <div className="process-step__content">
                <h3 className="process-step__title" style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700 }}>AOI, AXI &amp; Functional QC</h3>
                <p className="process-step__desc" style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>3D optical scanning, X-ray solder verification, and functional test bench validation.</p>
              </div>
            </div>
            <div className="process-step reveal-up" role="listitem" style={{ '--delay': '.35s' }}>
              <div className="process-step__num">06</div>
              <div className="process-step__content">
                <h3 className="process-step__title" style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700 }}>ESD Packing &amp; Dispatch</h3>
                <p className="process-step__desc" style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Anti-static vacuum sealing, custom foam cushioning, and tracked express shipping.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner" id="services-cta">
        <div className="container">
          <h2 className="cta-banner__title">Ready to Start Your SMT or DIP PCB Project?</h2>
          <p className="cta-banner__desc">Submit your Gerber files or component list today for a detailed quotation within 2 business hours.</p>
          <div className="cta-banner__actions">
            <Link to="/contact.html" className="btn btn--primary btn--lg">Get a Free Quote</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
