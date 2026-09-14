import React, { useEffect } from 'react';
import { Shield, Clock, Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
      <div className="page-banner" id="privacy-banner">
        <div className="container page-banner__content">
          <div className="page-banner__label">Legal &amp; Privacy</div>
          <h1 className="page-banner__title">Privacy <span>Policy</span></h1>
          <p className="page-banner__desc">
            At Aeroscan Technologies, we respect your privacy and are committed to safeguarding data collected through our PCB assembly and technical services.
          </p>
        </div>
      </div>

      {/* PRIVACY POLICY CONTENT SECTION */}
      <section className="section section--dark" id="privacy-content" aria-label="Privacy Policy Details">
        <div className="container legal-container">
          <div className="legal-card reveal-up">
            <div className="legal-card__header">
              <div className="legal-card__last-updated">
                <Clock size={16} />
                <span>Last Updated: July 2026</span>
              </div>
              <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem' }}>
                This Privacy Policy describes how Aeroscan Technologies ("we", "us", or "our") collects, uses, protects, and discloses information obtained from visitors, clients, and users of our website and services.
              </p>
            </div>

            {/* SECTION 1 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">1</span>
                Overview &amp; Commitment
              </h2>
              <div className="legal-section__content">
                <p>
                  Aeroscan Technologies provides technical services including <strong>PCB Assembly, Re-soldering, Physical Inspection, Quality Checking, Functional Testing, and Maintenance</strong>. We are committed to maintaining the confidentiality, integrity, and security of all personal data and technical documentation entrusted to us by our clients and website visitors.
                </p>
                <p>
                  By accessing our website or utilizing our services, you acknowledge the data practices described in this Privacy Policy.
                </p>
              </div>
            </div>

            {/* SECTION 2 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">2</span>
                Information We Collect
              </h2>
              <div className="legal-section__content">
                <p>
                  We collect information to provide better services to our clients and to facilitate efficient communication. The information we collect falls into the following categories:
                </p>
                <ul className="legal-list">
                  <li className="legal-list__item">
                    <strong>Directly Provided Information:</strong> When you submit inquiry forms, request quotes, or contact our support team, we may collect personal details such as your full name, business email address, phone number, company name, and specific project requirements.
                  </li>
                  <li className="legal-list__item">
                    <strong>Technical &amp; Project Documentation:</strong> Circuit schematics, component lists, assembly notes, or physical unit details provided voluntarily for service evaluation, inspection, testing, or maintenance purposes.
                  </li>
                  <li className="legal-list__item">
                    <strong>Automated Usage Data:</strong> When you visit our website, standard web server logs automatically capture technical data including your IP address, browser type, device information, operating system, referring URLs, and page visit duration.
                  </li>
                </ul>
              </div>
            </div>

            {/* SECTION 3 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">3</span>
                Use of Information
              </h2>
              <div className="legal-section__content">
                <p>
                  Aeroscan Technologies processes collected information strictly for legitimate business operations, including:
                </p>
                <ul className="legal-list">
                  <li className="legal-list__item">Executing requests for PCB Assembly, Re-soldering, Physical Inspection, Quality Checking, Functional Testing, and Maintenance services.</li>
                  <li className="legal-list__item">Responding to customer inquiries, technical questions, and price quotation submissions.</li>
                  <li className="legal-list__item">Providing project updates, technical reports, and service status notifications.</li>
                  <li className="legal-list__item">Monitoring, maintaining, and enhancing the security, performance, and accessibility of our website.</li>
                  <li className="legal-list__item">Complying with applicable legal obligations and enforcing our terms of service.</li>
                </ul>
              </div>
            </div>

            {/* SECTION 4 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">4</span>
                Cookies &amp; Tracking Technologies
              </h2>
              <div className="legal-section__content">
                <p>
                  Our website utilizes cookies and similar tracking technologies to enhance user experience, remember site navigation preferences, and evaluate website performance. 
                </p>
                <p>
                  Cookies are small data files stored on your device. You can configure your internet browser to refuse cookies or alert you when cookies are being sent. Please note that disabling cookies may affect the operational functionality of certain site features.
                </p>
              </div>
            </div>

            {/* SECTION 5 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">5</span>
                Third-Party Services &amp; Disclosures
              </h2>
              <div className="legal-section__content">
                <p>
                  We do not sell, trade, or rent client information or technical data to third parties. We may disclose information only under the following limited circumstances:
                </p>
                <ul className="legal-list">
                  <li className="legal-list__item">
                    <strong>Service Infrastructure:</strong> Trusted third-party hosting partners, cloud infrastructure providers, or communications tools operating under strict confidentiality obligations to support our website infrastructure.
                  </li>
                  <li className="legal-list__item">
                    <strong>Legal Compliance:</strong> When required by applicable laws, regulatory authorities, court orders, or legal proceedings to protect our rights, safety, or property.
                  </li>
                </ul>
              </div>
            </div>

            {/* SECTION 6 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">6</span>
                Data Protection &amp; Security
              </h2>
              <div className="legal-section__content">
                <p>
                  Aeroscan Technologies employs appropriate administrative, technical, and physical safeguards designed to protect personal and project data against unauthorized access, loss, alteration, or disclosure.
                </p>
                <p>
                  While we strive to implement robust security measures, no digital transmission or online storage method can be guaranteed to be 100% secure. Clients are encouraged to exercise care when transmitting sensitive proprietary files online.
                </p>
              </div>
            </div>

            {/* SECTION 7 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">7</span>
                User Rights &amp; Data Control
              </h2>
              <div className="legal-section__content">
                <p>
                  Depending on your jurisdiction, you may have the right to request access to the personal data we hold about you, request corrections to inaccurate information, or request the deletion of your personal records, subject to legal record-keeping requirements.
                </p>
                <p>
                  To exercise any of these rights or inquire about your data, please contact us using the contact details provided below.
                </p>
              </div>
            </div>

            {/* SECTION 8 */}
            <div className="legal-section">
              <h2 className="legal-section__title">
                <span className="legal-section__title-num">8</span>
                Policy Revisions
              </h2>
              <div className="legal-section__content">
                <p>
                  Aeroscan Technologies reserves the right to modify or update this Privacy Policy at any time. Any changes will be posted directly to this page with a revised "Last Updated" date. Continued use of our website or services following any updates signifies your acceptance of the revised Privacy Policy.
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
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact Aeroscan Technologies:
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
