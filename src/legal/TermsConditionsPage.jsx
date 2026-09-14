import React, { useEffect } from 'react';
import { FileText, Clock, Mail, Phone, MapPin } from 'lucide-react';

export default function TermsConditionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
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
      <div className="page-banner" id="terms-banner">
        <div className="container page-banner__content">
          <div className="page-banner__label">Legal &amp; Compliance</div>
          <h1 className="page-banner__title">Terms &amp; <span>Conditions</span></h1>
          <p className="page-banner__desc">
            Please read these Terms &amp; Conditions carefully before accessing our website or engaging Aeroscan Technologies for technical assembly and service solutions.
          </p>
        </div>
      </div>

      {/* TERMS & CONDITIONS CONTENT SECTION */}
      <section className="section section--dark" id="terms-content" aria-label="Terms and Conditions Details">
        <div className="container legal-container">
          <div className="legal-card reveal-up">
            <div className="legal-card__header">
              <div className="legal-card__last-updated">
                <Clock size={16} />
                <span>Last Updated: July 2026</span>
              </div>
              <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem' }}>
                These Terms &amp; Conditions govern your use of the Aeroscan Technologies website and any technical services requested from or provided by Aeroscan Technologies ("we", "us", or "our").
              </p>
            </div>

            {/* SECTION 1 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">1</span>
                Acceptance of Terms
              </h2>
              <div className="legal-section__content">
                <p>
                  By accessing our website, communicating with our team, or placing a service order with <strong>Aeroscan Technologies</strong>, you agree to be bound by these Terms &amp; Conditions and all applicable local and international laws.
                </p>
                <p>
                  If you do not agree with any portion of these terms, you must discontinue the use of our website and refrain from placing service requests.
                </p>
              </div>
            </div>

            {/* SECTION 2 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">2</span>
                Scope of Services
              </h2>
              <div className="legal-section__content">
                <p>
                  Aeroscan Technologies provides specialized electronic technical services focused on printed circuit boards and related assemblies. Our core services comprise:
                </p>
                <ul className="legal-list">
                  <li className="legal-list__item">
                    <strong>PCB Assembly:</strong> Placement, mounting, and soldering of electronic components onto circuit boards based on client specifications.
                  </li>
                  <li className="legal-list__item">
                    <strong>Re-soldering:</strong> Solder joint reworking, trace repair, component replacement, and touch-up services for circuit assemblies.
                  </li>
                  <li className="legal-list__item">
                    <strong>Physical Inspection:</strong> Thorough visual and physical evaluations of circuit boards to detect physical defects, trace flaws, or alignment issues.
                  </li>
                  <li className="legal-list__item">
                    <strong>Quality Checking:</strong> Verification of assembly consistency, polarity checks, and structural integrity against defined technical requirements.
                  </li>
                  <li className="legal-list__item">
                    <strong>Functional Testing:</strong> Operating tests to assess circuit board electrical performance and signal functionality under designated parameter conditions.
                  </li>
                  <li className="legal-list__item">
                    <strong>Maintenance:</strong> Periodic servicing, diagnostic evaluations, and repair maintenance for electronic circuit boards and sub-assemblies.
                  </li>
                </ul>
                <p>
                  Specific project deliverables, timelines, and pricing are defined in individual work orders or service agreements mutually confirmed between Aeroscan Technologies and the client.
                </p>
              </div>
            </div>

            {/* SECTION 3 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">3</span>
                User Responsibilities &amp; Client Specifications
              </h2>
              <div className="legal-section__content">
                <p>
                  When engaging Aeroscan Technologies for assembly, testing, inspection, or maintenance services, clients agree to:
                </p>
                <ul className="legal-list">
                  <li className="legal-list__item">Provide clear, complete, and accurate schematic diagrams, Bill of Materials (BOM), and operational specifications.</li>
                  <li className="legal-list__item">Ensure that all client-supplied physical components, circuit boards, or hardware are free from defects and compatible with the requested service.</li>
                  <li className="legal-list__item">Refrain from using our website or services for fraudulent, unauthorized, or illegal activities.</li>
                  <li className="legal-list__item">Ensure that submitted designs and materials do not infringe upon any third-party intellectual property or trade secrets.</li>
                </ul>
              </div>
            </div>

            {/* SECTION 4 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">4</span>
                Intellectual Property Rights
              </h2>
              <div className="legal-section__content">
                <p>
                  All content published on this website—including text, graphics, logos, icons, interface designs, software code, and overall site layout—is the property of Aeroscan Technologies and is protected by intellectual property laws.
                </p>
                <p>
                  Clients retain full ownership of their proprietary circuit designs, schematics, and technical IP provided to Aeroscan Technologies solely for the purpose of receiving assembly, inspection, testing, re-soldering, or maintenance services.
                </p>
              </div>
            </div>

            {/* SECTION 5 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">5</span>
                Service Limitations &amp; Disclaimers
              </h2>
              <div className="legal-section__content">
                <p>
                  Aeroscan Technologies performs services strictly according to the scope agreed upon in writing. Functional testing and quality checking evaluations reflect performance under specific test conditions provided at the time of service execution.
                </p>
                <p>
                  We are not responsible for performance failures resulting from client-supplied defective components, incorrect design schematics provided by the client, or improper environmental handling following service delivery.
                </p>
              </div>
            </div>

            {/* SECTION 6 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">6</span>
                Limitation of Liability
              </h2>
              <div className="legal-section__content">
                <p>
                  To the maximum extent permitted by applicable law, Aeroscan Technologies, its officers, employees, or partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages—including loss of profits, loss of data, or business interruption—arising from your use of our website or technical services.
                </p>
                <p>
                  In all events, Aeroscan Technologies' total cumulative liability under any service agreement shall not exceed the amount actually paid by the client for the specific service giving rise to the claim.
                </p>
              </div>
            </div>

            {/* SECTION 7 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">7</span>
                Governing Law &amp; Jurisdiction
              </h2>
              <div className="legal-section__content">
                <p>
                  These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of Khyber Pakhtunkhwa, Pakistan, without regard to its conflict of law principles.
                </p>
                <p>
                  Any dispute, controversy, or claim arising out of or relating to these terms or our services shall be subject to the exclusive jurisdiction of the competent courts in Haripur, Pakistan.
                </p>
              </div>
            </div>

            {/* SECTION 8 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">8</span>
                Modifications to Terms
              </h2>
              <div className="legal-section__content">
                <p>
                  Aeroscan Technologies reserves the right to update or modify these Terms &amp; Conditions at any time without prior notice. Any modifications become effective immediately upon posting to this page.
                </p>
                <p>
                  Your continued use of our website or services following the posting of updated terms constitutes your binding acceptance of the revised Terms &amp; Conditions.
                </p>
              </div>
            </div>

            {/* SECTION 9 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">9</span>
                Contact Information
              </h2>
              <div className="legal-section__content">
                <p>
                  For any questions or clarifications regarding these Terms &amp; Conditions, please contact Aeroscan Technologies:
                </p>
                <div className="legal-contact-box">
                  <p><strong>Aeroscan Technologies PCB Assembly &amp; Services</strong></p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--clr-text-muted)' }}>
                    <MapPin size={16} style={{ color: 'var(--clr-accent)' }} />
                    <span>T&amp;T Complex, TIP Colony, Haripur, Khyber Pakhtunkhwa, Pakistan</span>
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--clr-text-muted)' }}>
                    <Mail size={16} style={{ color: 'var(--clr-accent)' }} />
                    <span>Email: info@aeroscantech.com</span>
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--clr-text-muted)' }}>
                    <Phone size={16} style={{ color: 'var(--clr-accent)' }} />
                    <span>Phone: +92 312 5900599</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
