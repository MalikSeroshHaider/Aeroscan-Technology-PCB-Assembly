import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; 2026 Aeroscan Technologies PCB Assembly &amp; Services. All rights reserved.</p>
          <div className="footer__bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
