import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import {
  PackageCheck,
  Layers,
  Microscope,
  ShieldCheck,
  Clock,
  ShieldAlert,
  Award,
  TrendingUp,
  Thermometer,
  Cpu,
  Activity,
  Scissors,
  Flame,
  CheckCircle2,
  Zap,
  DollarSign,
  Wifi,
  Boxes,
  Radio,
  Sparkles,
  Maximize2,
  RadioTower,
  Lock,
  Factory,
  BatteryCharging,
  Server,
  FileCode,
  Settings,
  Truck,
  Eye,
  Wrench,
  Gauge,
  CheckSquare,
  Target
} from 'lucide-react';

// Create map of services by ID
const servicesMap = servicesData.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {});

// Fallback legacy mappings to ensure smooth backward compatibility
const legacyMap = {
  'pcb-assembly': 'smt-pcb-assembly',
  'smt-assembly': 'smt-pcb-assembly',
  'through-hole-assembly': 'through-hole-pcb-assembly',
  'led-manufacturing': 'mixed-technology-assembly',
  'street-light-assembly': 'through-hole-pcb-assembly',
  'fan-circuit-assembly': 'mixed-technology-assembly',
  'dish-tv-assembly': 'mixed-technology-assembly',
  'mobile-charger-assembly': 'smt-pcb-assembly',
  'airpods-assembly': 'pick-place-assembly',
  'dvb-receiver-assembly': 'mixed-technology-assembly',
  'oem-odm-manufacturing': 'final-inspection-packaging',
  'custom-pcb': 'smt-pcb-assembly',
  'pcb-repair': 'pcb-rework-repair',
  'pcb-testing': 'functional-inspection-quality-control'
};

export default function ServiceDetailPage({ serviceId }) {
  const params = useParams();
  const rawId = serviceId || params.serviceId || 'smt-pcb-assembly';
  const targetId = servicesMap[rawId] ? rawId : (legacyMap[rawId] || 'smt-pcb-assembly');
  const data = servicesMap[targetId] || servicesData[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  }, [targetId]);

  return (
    <main>
      {/* PAGE BANNER */}
      <section className="page-banner" id="service-detail-banner">
        <div className="container page-banner__content">
          <span className="page-banner__label">{data.num} — {data.category} Service</span>
          <h1 className="page-banner__title">{data.title} <span>{data.titleSpan || ''}</span></h1>
          {data.model && <p className="page-banner__model" style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--clr-accent)', margin: '0.25rem 0 0.75rem', letterSpacing: '0.02em' }}>Model: {data.model}</p>}
          <p className="page-banner__desc">{data.desc}</p>
        </div>
      </section>

      {/* SERVICE DETAIL STORY */}
      <section className="section reveal-up" id="service-story">
        <div className="container">
          <Link to="/services.html" className="btn btn--outline btn--sm" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '.5rem', color: 'var(--clr-text-main)' }}>
            &#8592; Back to All Services
          </Link>
          
          <div className="detail-story__grid">
            <div className="detail-story__img-wrap">
              <img src={data.img} alt="" className="detail-story__img-bg" aria-hidden="true" />
              <img src={data.img} alt={data.title} className="detail-story__img" />
            </div>
            
            <div className="detail-story__content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="section-label">{data.category} Assembly Capability</div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3 }}>Professional {data.title} Solutions</h2>
              {data.story.map((para, idx) => (
                <p key={idx} className="about-story__text" style={{ fontSize: '1.025rem', lineHeight: 1.75, color: 'var(--clr-text-muted)' }}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>      {/* KEY HIGHLIGHTS / SPECS */}
      <section className="section section--gray reveal-up" id="service-features">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Service Capabilities</span>
            <h2 className="section-title" style={{ color: '#ffffff' }}>Key Technical <span>Features</span></h2>
            <div className="divider divider--center"></div>
            <p className="section-desc" style={{ color: '#cbd5e1' }}>Advanced technical specs and processes engineered for absolute precision and zero-defect quality.</p>
          </div>

          <div className="svc-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {data.features.map((feat, idx) => {
              const IconComponent = feat.icon || Cpu;
              return (
                <div key={idx} className="svc-feature-card reveal-up" style={{ padding: '1.75rem', backgroundColor: 'var(--clr-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="svc-feature-card__top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div className="svc-feature-card__icon-box" style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: 'rgba(14, 165, 233, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-primary)' }}>
                      <IconComponent size={24} />
                    </div>
                    <span className="svc-feature-card__badge" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--clr-accent)', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '0.25rem 0.6rem', borderRadius: '12px' }}>
                      Feature 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="svc-feature-card__title" style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>{feat.title}</h3>
                  <p className="svc-feature-card__text" style={{ fontSize: '0.925rem', color: 'var(--clr-text-muted)', lineHeight: 1.6 }}>{feat.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section reveal-up" id="service-benefits">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Aeroscan</span>
            <h2 className="section-title" style={{ color: '#ffffff' }}>Key <span>Benefits</span></h2>
            <div className="divider divider--center"></div>
            <p className="section-desc" style={{ color: '#cbd5e1' }}>Why industry leaders rely on Aeroscan Technologies for high-performance SMT and DIP PCB assembly.</p>
          </div>

          <div className="svc-benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {data.benefits.map((ben, idx) => {
              const IconComp = ben.icon || CheckCircle2;
              return (
                <div key={idx} className="svc-benefit-card reveal-up" style={{ padding: '1.75rem', backgroundColor: 'var(--clr-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)', position: 'relative' }}>
                  <div className="svc-benefit-card__header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div className="svc-benefit-card__num" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--clr-primary)' }}>{ben.num}</div>
                    <IconComp size={22} style={{ color: 'var(--clr-accent)' }} />
                  </div>
                  <h3 className="svc-benefit-card__title" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>{ben.title}</h3>
                  <p className="svc-benefit-card__text" style={{ fontSize: '0.925rem', color: 'var(--clr-text-muted)', lineHeight: 1.6 }}>{ben.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner reveal-up" id="service-cta">
        <div className="container cta-banner__inner">
          <div className="cta-banner__content">
            <h2 className="cta-banner__title">Discuss Your {data.title} Requirements</h2>
            <p className="cta-banner__desc">Submit your Gerber files or assembly specifications for a free quote within 2 business hours.</p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/contact.html" className="btn btn--primary btn--lg">Get a Free Quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
