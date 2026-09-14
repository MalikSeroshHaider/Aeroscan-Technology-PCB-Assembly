import React from 'react';
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
  Sparkles
} from 'lucide-react';

export default function CustomerSuppliedPcbServices() {
  const servicesList = [
    {
      icon: Cpu,
      title: "PCB Assembly",
      desc: "Precision mounting of SMT and Through-Hole components onto your provided bare or partially assembled printed circuit boards."
    },
    {
      icon: Wrench,
      title: "Re-soldering & Rework",
      desc: "Expert joint touch-up, BGA rework, pin alignment, and micro-soldering to correct assembly defects or update existing circuits."
    },
    {
      icon: Eye,
      title: "Physical Inspection",
      desc: "High-magnification microscopic and optical inspection to check component orientation, solder bridges, and mechanical integrity."
    },
    {
      icon: ShieldCheck,
      title: "Quality Checking",
      desc: "Comprehensive multi-point QA verification adhering strictly to IPC standards to guarantee overall board manufacturing quality."
    },
    {
      icon: Activity,
      title: "Functional Testing",
      desc: "Dynamic electrical testing, signal analysis, and full system operational checks under real working power conditions."
    },
    {
      icon: Settings,
      title: "Maintenance & Support",
      desc: "Component replacement, hardware troubleshooting, and long-term maintenance services for custom client electronic devices."
    }
  ];

  const workflowSteps = [
    {
      stepNum: "01",
      title: "Submit Your PCB & Requirements",
      desc: "Send your customer-supplied bare or populated PCBs, bill of materials (BOM), or electronic products along with your specific instructions.",
      icon: UploadCloud
    },
    {
      stepNum: "02",
      title: "Assembly & Re-soldering",
      desc: "Our technicians perform high-precision SMT/PTH component mounting, rework, and re-soldering based on your engineering guidelines.",
      icon: Layers
    },
    {
      stepNum: "03",
      title: "Inspection & Functional Testing",
      desc: "Every unit undergoes detailed physical microscopic inspection followed by dynamic functional testing to verify electrical performance.",
      icon: CheckCircle2
    },
    {
      stepNum: "04",
      title: "Quality Check & Delivery",
      desc: "Final quality control verification, anti-static ESD protective packaging, and fast, secure delivery back to your facility.",
      icon: Truck
    }
  ];

  return (
    <section className="section customer-pcb-section reveal-up" id="customer-supplied-pcb" aria-label="Customer-Supplied PCB Services">
      <div className="container">
        {/* Section Header */}
        <div className="section-header divider--center">
          <span className="section-label">Flexible Client Services</span>
          <h2 className="section-title">Customer-Supplied PCB Services</h2>
          <div className="divider divider--center"></div>
          <p className="section-desc">
            Already have your own bare PCBs, components, or electronic products? <strong>Aeroscan Technologies</strong> provides specialized assembly, rework, testing, and maintenance for customer-supplied hardware. We turn your raw boards into fully operational, quality-assured electronic units.
          </p>
        </div>

        {/* Highlight Alert Banner */}
        <div className="customer-pcb-banner">
          <div className="customer-pcb-banner__glow"></div>
          <div className="customer-pcb-banner__content">
            <div className="customer-pcb-banner__badge">
              <Sparkles size={16} />
              <span>Bring Your Own Hardware</span>
            </div>
            <h3 className="customer-pcb-banner__title">
              Complete End-to-End Electronics Processing for Client Hardware
            </h3>
            <p className="customer-pcb-banner__text">
              Whether you are a startup with prototype boards or an enterprise with existing production units requiring maintenance, our high-precision assembly lines and certified engineers ensure maximum reliability, rapid turnaround, and strict quality compliance.
            </p>
          </div>
        </div>

        {/* 6 Capabilities Cards */}
        <div className="customer-pcb-services-grid">
          {servicesList.map((item, idx) => {
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

        {/* 4-Step Workflow Section */}
        <div className="customer-workflow-wrapper">
          <div className="customer-workflow-header">
            <h3 className="customer-workflow-title">
              Our 4-Step Customer Service Workflow
            </h3>
            <p className="customer-workflow-subtitle">
              A transparent, high-precision process tailored for customer-supplied PCBs and products.
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
                  <h4 className="workflow-step-card__title">{step.title}</h4>
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

        {/* Call to Action Bar */}
        <div className="customer-pcb-cta">
          <div className="customer-pcb-cta__text">
            <h4>Ready to Send Your PCB or Electronic Product?</h4>
            <p>Get a instant evaluation and quote for assembly, re-soldering, inspection, testing, or maintenance.</p>
          </div>
          <div className="customer-pcb-cta__actions">
            <Link to="/contact.html" className="btn btn--primary btn--md">
              Submit Your Requirements
            </Link>
            <Link to="/services.html" className="btn btn--outline btn--md" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--clr-white)' }}>
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
