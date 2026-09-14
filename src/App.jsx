import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// PWA Support & Components
import { registerServiceWorker } from './pwa/registerSW';
import PwaInstallPrompt from './components/PwaInstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';
import PwaUpdatePrompt from './components/PwaUpdatePrompt';

// Home Domain
import HomePage from './home/HomePage';
import AboutPage from './home/AboutPage';

// Services Domain
import ServicesPage from './services/ServicesPage';
import ServiceDetailPage from './services/ServiceDetailPage';
import CustomerSuppliedPcbPage from './services/CustomerSuppliedPcbPage';
import CustomerPcbRequirementsPage from './services/CustomerPcbRequirementsPage';

// Manufacturing Domain
import ProductManufacturingPage from './manufacturing/ProductManufacturingPage';

// Contact Domain
import ContactPage from './contact/ContactPage';

// Legal Domain
import PrivacyPolicyPage from './legal/PrivacyPolicyPage';
import TermsConditionsPage from './legal/TermsConditionsPage';

export default function App() {
  const [swRegistration, setSwRegistration] = useState(null);

  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');

    // Register Service Worker
    registerServiceWorker((registration) => {
      setSwRegistration(registration);
    });
  }, []);

  return (
    <div className="app-container">
      <Header />
      <ScrollToTop />
      <OfflineIndicator />
      <PwaInstallPrompt />
      <PwaUpdatePrompt 
        registration={swRegistration} 
        onDismiss={() => setSwRegistration(null)} 
      />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/index.html" element={<HomePage />} />
        <Route path="/about.html" element={<AboutPage />} />

        {/* Services Main Page */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services.html" element={<ServicesPage />} />

        {/* SMT Services Routes */}
        <Route path="/smt-pcb-assembly" element={<ServiceDetailPage serviceId="smt-pcb-assembly" />} />
        <Route path="/smt-pcb-assembly.html" element={<ServiceDetailPage serviceId="smt-pcb-assembly" />} />
        <Route path="/pick-place-assembly" element={<ServiceDetailPage serviceId="pick-place-assembly" />} />
        <Route path="/pick-place-assembly.html" element={<ServiceDetailPage serviceId="pick-place-assembly" />} />
        <Route path="/solder-paste-printing" element={<ServiceDetailPage serviceId="solder-paste-printing" />} />
        <Route path="/solder-paste-printing.html" element={<ServiceDetailPage serviceId="solder-paste-printing" />} />
        <Route path="/reflow-soldering" element={<ServiceDetailPage serviceId="reflow-soldering" />} />
        <Route path="/reflow-soldering.html" element={<ServiceDetailPage serviceId="reflow-soldering" />} />
        <Route path="/pcb-rework-repair" element={<ServiceDetailPage serviceId="pcb-rework-repair" />} />
        <Route path="/pcb-rework-repair.html" element={<ServiceDetailPage serviceId="pcb-rework-repair" />} />
        <Route path="/functional-inspection-quality-control" element={<ServiceDetailPage serviceId="functional-inspection-quality-control" />} />
        <Route path="/functional-inspection-quality-control.html" element={<ServiceDetailPage serviceId="functional-inspection-quality-control" />} />

        {/* DIP Services Routes */}
        <Route path="/through-hole-pcb-assembly" element={<ServiceDetailPage serviceId="through-hole-pcb-assembly" />} />
        <Route path="/through-hole-pcb-assembly.html" element={<ServiceDetailPage serviceId="through-hole-pcb-assembly" />} />
        <Route path="/manual-component-insertion" element={<ServiceDetailPage serviceId="manual-component-insertion" />} />
        <Route path="/manual-component-insertion.html" element={<ServiceDetailPage serviceId="manual-component-insertion" />} />
        <Route path="/wave-selective-soldering" element={<ServiceDetailPage serviceId="wave-selective-soldering" />} />
        <Route path="/wave-selective-soldering.html" element={<ServiceDetailPage serviceId="wave-selective-soldering" />} />
        <Route path="/hand-soldering-rework" element={<ServiceDetailPage serviceId="hand-soldering-rework" />} />
        <Route path="/hand-soldering-rework.html" element={<ServiceDetailPage serviceId="hand-soldering-rework" />} />
        <Route path="/mixed-technology-assembly" element={<ServiceDetailPage serviceId="mixed-technology-assembly" />} />
        <Route path="/mixed-technology-assembly.html" element={<ServiceDetailPage serviceId="mixed-technology-assembly" />} />
        <Route path="/final-inspection-packaging" element={<ServiceDetailPage serviceId="final-inspection-packaging" />} />
        <Route path="/final-inspection-packaging.html" element={<ServiceDetailPage serviceId="final-inspection-packaging" />} />

        {/* Legacy & Additional Service Routes */}
        <Route path="/pcb-assembly" element={<ServiceDetailPage serviceId="smt-pcb-assembly" />} />
        <Route path="/pcb-assembly.html" element={<ServiceDetailPage serviceId="smt-pcb-assembly" />} />
        <Route path="/smt-assembly.html" element={<ServiceDetailPage serviceId="smt-pcb-assembly" />} />
        <Route path="/through-hole-assembly.html" element={<ServiceDetailPage serviceId="through-hole-pcb-assembly" />} />
        <Route path="/pcb-repair.html" element={<ServiceDetailPage serviceId="pcb-rework-repair" />} />
        <Route path="/pcb-testing.html" element={<ServiceDetailPage serviceId="functional-inspection-quality-control" />} />
        <Route path="/custom-pcb" element={<ServiceDetailPage serviceId="smt-pcb-assembly" />} />
        <Route path="/custom-pcb.html" element={<ServiceDetailPage serviceId="smt-pcb-assembly" />} />
        <Route path="/customer-supplied-pcb" element={<CustomerSuppliedPcbPage />} />
        <Route path="/customer-supplied-pcb.html" element={<CustomerSuppliedPcbPage />} />
        <Route path="/customer-supplied-pcb-services.html" element={<CustomerSuppliedPcbPage />} />
        <Route path="/customer-pcb-requirements" element={<CustomerPcbRequirementsPage />} />
        <Route path="/customer-pcb-requirements.html" element={<CustomerPcbRequirementsPage />} />
        <Route path="/customer-requirements.html" element={<CustomerPcbRequirementsPage />} />

        {/* Dynamic Route Handler */}
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />

        {/* Product Manufacturing Routes */}
        <Route path="/product-manufacturing" element={<ProductManufacturingPage />} />
        <Route path="/product-manufacturing.html" element={<ProductManufacturingPage />} />
        <Route path="/products" element={<ProductManufacturingPage />} />
        <Route path="/products.html" element={<ProductManufacturingPage />} />

        {/* Contact Routes */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact.html" element={<ContactPage />} />

        {/* Legal Routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy-policy.html" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
        <Route path="/terms-and-conditions.html" element={<TermsConditionsPage />} />
        <Route path="/terms" element={<TermsConditionsPage />} />
        <Route path="/terms.html" element={<TermsConditionsPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
