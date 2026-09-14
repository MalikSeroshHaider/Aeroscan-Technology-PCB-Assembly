import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { saveToOfflineQueue } from '../pwa/offlineQueue';

// Utility helper for sanitizing input strings
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
};

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOfflineSubmitted, setIsOfflineSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    quantity: '',
    details: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const fieldKey = id.replace('quote-', '');
    setFormData((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSizeBytes = 25 * 1024 * 1024; // 25MB
      if (file.size > maxSizeBytes) {
        setErrorMessage('File size exceeds the maximum limit of 25MB.');
        e.target.value = '';
        return;
      }
      setErrorMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot check for automated bots
    if (honeypot.trim() !== '') {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
      return;
    }

    // Rate limiting check (cooldown: 10 seconds)
    const now = Date.now();
    const lastSubmit = localStorage.getItem('quote_last_submit_ts');
    if (lastSubmit && now - parseInt(lastSubmit, 10) < 10000) {
      setErrorMessage('Please wait a few seconds before submitting another request.');
      return;
    }

    // Validate email format
    const cleanEmail = sanitizeString(formData.email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    // Sanitize input fields
    const sanitizedData = {
      name: sanitizeString(formData.name),
      email: cleanEmail,
      phone: sanitizeString(formData.phone),
      company: sanitizeString(formData.company),
      service: sanitizeString(formData.service),
      quantity: sanitizeString(formData.quantity),
      details: sanitizeString(formData.details)
    };

    setIsSubmitting(true);
    localStorage.setItem('quote_last_submit_ts', now.toString());

    // Check if user is offline
    if (!navigator.onLine) {
      saveToOfflineQueue(sanitizedData);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsOfflineSubmitted(true);
      }, 800);
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsOfflineSubmitted(false);
    setErrorMessage('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      quantity: '',
      details: ''
    });
  };

  if (isOfflineSubmitted) {
    return (
      <div className="form-success" style={{ borderColor: 'rgba(234, 179, 8, 0.4)' }}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3>Saved Offline!</h3>
        <p>You are currently offline. Your quote request has been saved securely on your device and will submit automatically as soon as your internet connection is restored.</p>
        <button onClick={handleReset} className="btn btn--primary" style={{ marginTop: '.5rem' }}>
          Submit Another Request
        </button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="form-success">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3>Quote Request Received!</h3>
        <p>Thank you for reaching out to Aeroscan Technologies PCB. An engineer will review your project details and respond within 2 business hours.</p>
        <button onClick={handleReset} className="btn btn--primary" style={{ marginTop: '.5rem' }}>
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form className="form" id="quote-form" onSubmit={handleSubmit} autoComplete="on">
      {/* Honeypot field (hidden from real users, tricks automated spam bots) */}
      <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="website_hp">Do not fill this field</label>
        <input
          type="text"
          id="website_hp"
          name="website_hp"
          tabIndex="-1"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
        />
      </div>

      {errorMessage && (
        <div style={{
          padding: '0.75rem 1rem',
          marginBottom: '1.25rem',
          borderRadius: '6px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          color: '#f87171',
          fontSize: '0.875rem'
        }}>
          {errorMessage}
        </div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="quote-name">Full Name *</label>
          <input
            type="text"
            id="quote-name"
            required
            maxLength={100}
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quote-email">Email Address *</label>
          <input
            type="email"
            id="quote-email"
            required
            maxLength={120}
            placeholder="john@company.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quote-phone">Phone Number</label>
          <input
            type="tel"
            id="quote-phone"
            maxLength={30}
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quote-company">Company Name</label>
          <input
            type="text"
            id="quote-company"
            maxLength={120}
            placeholder="Acme Electronics Ltd."
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quote-service">Service Required *</label>
          <select
            id="quote-service"
            required
            value={formData.service}
            onChange={handleChange}
          >
            <option value="" disabled>Select a Service</option>
            <option value="pcb-assembly">PCB Assembly (SMT / THT)</option>
            <option value="led-manufacturing">LED Module Assembly &amp; Testing</option>
            <option value="street-light">Street Light Assembly</option>
            <option value="fan-circuit">Fan Circuit Assembly</option>
            <option value="dish-tv">Dish TV Receiver Assembly</option>
            <option value="mobile-charger">Mobile Charger Assembly &amp; Testing</option>
            <option value="airpods">AirPods &amp; Wireless Earbuds Assembly</option>
            <option value="dvb-receiver">DVB Receiver Assembly</option>
            <option value="oem-odm">Turnkey OEM / ODM Box Build &amp; Assembly</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quote-quantity">Estimated Quantity</label>
          <input
            type="text"
            id="quote-quantity"
            maxLength={50}
            placeholder="e.g. 500 units"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '1.25rem' }}>
        <label htmlFor="quote-details">Project Specifications & Notes</label>
        <textarea
          id="quote-details"
          rows="4"
          maxLength={2000}
          placeholder="Describe your project, specs (board thickness, copper weight, surface finish), special requirements, or timeline..."
          value={formData.details}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-group" style={{ marginTop: '1.25rem' }}>
        <label htmlFor="quote-file">Upload Gerber / BOM File (Optional)</label>
        <input
          type="file"
          id="quote-file"
          accept=".zip,.rar,.7z,.gerber,.pdf,.bom"
          onChange={handleFileChange}
        />
        <small style={{ display: 'block', marginTop: '0.25rem', color: 'var(--clr-text-muted)', fontSize: '0.825rem' }}>
          Accepted formats: .zip, .rar, .7z, .pdf, .bom (Max 25MB)
        </small>
      </div>

      <button
        type="submit"
        className="btn btn--primary btn--block"
        style={{ marginTop: '1.5rem', opacity: isSubmitting ? 0.65 : 1 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin .7s linear infinite', marginRight: '0.5rem', verticalAlign: 'middle' }}>
              <path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
            </svg>
            Sending…
          </>
        ) : (
          'Submit Quote Request'
        )}
      </button>
    </form>
  );
}

