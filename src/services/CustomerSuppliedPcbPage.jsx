import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Wrench, 
  Eye, 
  ShieldCheck, 
  Activity, 
  Settings, 
  UploadCloud, 
  Layers, 
  CheckCircle2, 
  Truck,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';

export default function CustomerSuppliedPcbPage() {
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

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

  const serviceCapabilities = [
    {
      icon: Cpu,
      title: "PCB Assembly",
      desc: "High-precision Surface Mount Technology (SMT) and Through-Hole (PTH) assembly using customer-furnished bare boards and component kits."
    },
    {
      icon: Wrench,
      title: "Re-Soldering & Rework",
      desc: "Expert micro-soldering, joint reflow correction, BGA re-balling, SMD component replacement, and trace repair for client boards."
    },
    {
      icon: Eye,
      title: "Physical Inspection",
      desc: "Multi-magnification optical and microscopic physical inspection to verify solder fillet geometry, component orientation, and zero-defect alignment."
    },
    {
      icon: ShieldCheck,
      title: "Quality Checking & QA",
      desc: "Stringent IPC-A-610 Class 2 & 3 quality assurance protocols ensuring electrical continuity, proper polarity, and zero solder bridging."
    },
    {
      icon: Activity,
      title: "Functional Testing",
      desc: "Comprehensive bench testing, dynamic electrical signal validation, and full operational performance checks under actual working loads."
    },
    {
      icon: Settings,
      title: "Maintenance & Rework Support",
      desc: "Board-level troubleshooting, component swapping, circuit modifications, and long-term preventative maintenance for custom client devices."
    }
  ];

  const workflowSteps = [
    {
      stepNum: "01",
      title: "Submit Your PCB & Requirements",
      desc: "Provide your bare or partially assembled PCBs, component BOM, or electronic units along with your engineering test and assembly guidelines.",
      icon: UploadCloud
    },
    {
      stepNum: "02",
      title: "Assembly & Re-soldering",
      desc: "Our skilled technicians perform SMT/PTH component mounting, precision joint re-soldering, and necessary rework using ESD-safe stations.",
      icon: Layers
    },
    {
      stepNum: "03",
      title: "Inspection & Functional Testing",
      desc: "Each unit undergoes microscopic physical inspection followed by dynamic functional electrical testing to ensure full circuit performance.",
      icon: CheckCircle2
    },
    {
      stepNum: "04",
      title: "Quality Check & Delivery",
      desc: "Final multi-point quality assurance verification, anti-static ESD protective packaging, and fast, trackable dispatch back to your facility.",
      icon: Truck
    }
  ];

  const keyBenefits = [
    "Support for Customer-Furnished Bare Boards & Components",
    "IPC-A-610 Certified Workmanship & Micro-Soldering Standards",
    "Rapid Turnaround for Prototypes, Batches & Rework Services",
    "Comprehensive Dynamic Electrical & Functional Testing Labs",
    "ESD-Safe Anti-Static Processing Environment",
    "Strict NDA Confidentiality & Technical IP Protection"
  ];

  return (
    <main className="customer-pcb-page">
      {/* PAGE BANNER */}
      <div className="page-banner" id="customer-pcb-banner">
        <div className="container page-banner__content">
          <div className="page-banner__label">Exclusive Client Hardware Solutions</div>
          <h1 className="page-banner__title">
            Customer-Supplied <span>PCB Services</span>
          </h1>
          <p className="page-banner__desc">
            Provide your own PCB or electronic product, and Aeroscan Technologies will perform professional PCB Assembly, Re-soldering, Physical Inspection, Quality Checking, Functional Testing, and Maintenance.
          </p>
        </div>
      </div>

      {/* OVERVIEW SECTION */}
      <section className="section customer-pcb-overview reveal-up">
        <div className="container">
          <div className="customer-pcb-banner">
            <div className="customer-pcb-banner__glow"></div>
            <div className="customer-pcb-banner__content">
              <div className="customer-pcb-banner__badge">
                <Sparkles size={16} />
                <span>Bring Your Own PCB / Product</span>
              </div>
              <h2 className="customer-pcb-banner__title">
                Precision Electronic Processing &amp; Rework for Customer Hardware
              </h2>
              <p className="customer-pcb-banner__text">
                At Aeroscan Technologies, we understand that many clients already possess their own custom bare PCBs, electronic components, or legacy hardware. Our dedicated customer-supplied service department takes your physical circuit boards and electronic devices through complete assembly, micro re-soldering, physical microscopic inspection, strict quality checking, and dynamic functional testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 CORE SERVICES GRID */}
      <section className="section customer-pcb-capabilities reveal-up" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header divider--center">
            <span className="section-label">Service Scope</span>
            <h2 className="section-title">End-to-End Client Services</h2>
            <div className="divider divider--center"></div>
            <p className="section-desc">
              Whether you need initial board assembly, fine-pitch re-soldering, or comprehensive functional testing, our facility offers complete technical capabilities for customer-supplied electronics.
            </p>
          </div>

          <div className="customer-pcb-services-grid">
            {serviceCapabilities.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="customer-service-card">
                  <div className="customer-service-card__icon-wrap">
                    <IconComp size={24} className="customer-service-card__icon" />
                  </div>
                  <h3 className="customer-service-card__title">{item.title}</h3>
                  <p className="customer-service-card__desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-STEP WORKFLOW SECTION */}
      <section className="section section--gray customer-pcb-workflow-section reveal-up">
        <div className="container">
          <div className="customer-workflow-wrapper">
            <div className="customer-workflow-header">
              <span className="section-label">Streamlined Process</span>
              <h2 className="customer-workflow-title">
                Clean 4-Step Customer Workflow
              </h2>
              <p className="customer-workflow-subtitle">
                A transparent, step-by-step workflow designed specifically for client-provided printed circuit boards and electronic products.
              </p>
            </div>

            <div className="customer-workflow-grid">
              {workflowSteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="workflow-step-card">
                    <div className="workflow-step-card__top">
                      <span className="workflow-step-card__number">{step.stepNum}</span>
                      <div className="workflow-step-card__icon">
                        <StepIcon size={22} />
                      </div>
                    </div>
                    <h3 className="workflow-step-card__title">{step.title}</h3>
                    <p className="workflow-step-card__desc">{step.desc}</p>
                    {idx < workflowSteps.length - 1 && (
                      <div className="workflow-step-connector" aria-hidden="true">
                        <ArrowRight size={18} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* KEY ADVANTAGES & QUALITY GUARANTEE */}
      <section className="section customer-pcb-benefits reveal-up">
        <div className="container">
          <div className="section-header divider--center">
            <span className="section-label">Quality &amp; Standards</span>
            <h2 className="section-title">Why Trust Aeroscan Technologies?</h2>
            <div className="divider divider--center"></div>
            <p className="section-desc">
              We maintain strict quality control standards for customer-supplied hardware, ensuring reliable performance and zero defects.
            </p>
          </div>

          <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', maxWidth: '1000px', margin: '0 auto' }}>
            {keyBenefits.map((benefit, idx) => (
              <div key={idx} className="benefit-card" style={{
                background: 'var(--clr-surface-card)',
                border: '1px solid var(--clr-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'border-color var(--tr-fast), transform var(--tr-fast)'
              }}>
                <CheckCircle size={22} style={{ color: 'var(--clr-accent)', flexShrink: 0 }} />
                <span style={{ color: 'var(--clr-white)', fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.4 }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner" id="customer-pcb-cta">
        <div className="container">
          <h2 className="cta-banner__title">Have a PCB or Electronic Product Ready?</h2>
          <p className="cta-banner__desc">
            Submit your hardware specifications and requirements to get a fast, itemized quote for assembly, re-soldering, inspection, testing, or maintenance.
          </p>
          <div className="cta-banner__actions">
            <Link to="/customer-pcb-requirements.html" className="btn btn--primary btn--lg">
              Submit Your Requirements
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
