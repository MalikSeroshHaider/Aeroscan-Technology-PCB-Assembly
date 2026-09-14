import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, MoreVertical, X, Cpu, ChevronRight } from 'lucide-react';
import SearchBar from './SearchBar';
import { usePwaInstall } from '../pwa/usePwaInstall';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDotsMenuOpen, setIsDotsMenuOpen] = useState(false);
  const location = useLocation();
  const { isInstallable, installApp } = usePwaInstall();
  const dotsDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menus on route change
    setIsMobileMenuOpen(false);
    setIsDotsMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname, location.hash]);

  // Click outside to close 3 dots dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dotsDropdownRef.current && !dotsDropdownRef.current.contains(event.target)) {
        setIsDotsMenuOpen(false);
      }
    };

    if (isDotsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDotsMenuOpen]);

  const toggleMobileMenu = () => {
    const nextState = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleDotsMenu = () => {
    setIsDotsMenuOpen(!isDotsMenuOpen);
  };

  // Helper to test active state based on route & hash
  const getActivePage = () => {
    const path = location.pathname.toLowerCase().replace(/^\//, '');
    const hash = location.hash;

    if (path.includes('customer-supplied-pcb')) return 'customer-supplied-pcb';
    if (path === '' || path === 'index.html') {
      if (hash === '#about') return 'about';
      if (hash === '#product-manufacturing') return 'product-manufacturing';
      return 'home';
    }
    if (path.includes('services') || path.includes('assembly') || path.includes('manufacturing')) {
      if (path.includes('product-manufacturing')) return 'product-manufacturing';
      return 'services';
    }
    if (path.includes('contact')) return 'contact';

    return 'home';
  };

  const activePage = getActivePage();

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
      <div className="header__main-bar">
        <div className="container header__inner">
          <Link to="/" className="logo" aria-label="Aeroscan Technologies PCB Assembly & Services – Home" onClick={closeMobileMenu}>
            <div className="logo__icon">
              <img src="/favicon.png" alt="Aeroscan Technologies Logo" className="logo__img" />
            </div>
            <div className="logo__text">
              <span className="logo__name">Aeroscan Technologies</span>
              <span className="logo__tag">PCB Assembly &amp; Services</span>
            </div>
          </Link>

          <nav className="nav" id="main-nav" aria-label="Main navigation">
            <ul className="nav__list">
              <li>
                <Link to="/" className={`nav__link ${activePage === 'home' ? 'active' : ''}`}>Home</Link>
              </li>
              <li>
                <Link to="/#about" className={`nav__link ${activePage === 'about' ? 'active' : ''}`}>About</Link>
              </li>
              <li>
                <Link to="/services.html" className={`nav__link ${activePage === 'services' ? 'active' : ''}`}>Services</Link>
              </li>
              <li>
                <Link to="/product-manufacturing.html" className={`nav__link ${activePage === 'product-manufacturing' ? 'active' : ''}`}>Manufacturing</Link>
              </li>
              <li>
                <Link to="/contact.html" className={`nav__link ${activePage === 'contact' ? 'active' : ''}`}>Contact Us</Link>
              </li>
            </ul>
          </nav>

          <div className="header__actions">
            <SearchBar />

            {/* Desktop 3 Dots Menu Button */}
            <div className="dots-menu-container" ref={dotsDropdownRef} style={{ position: 'relative' }}>
              <button
                className={`btn-dots-trigger ${isDotsMenuOpen ? 'active' : ''}`}
                onClick={toggleDotsMenu}
                aria-label="More options and services"
                aria-expanded={isDotsMenuOpen}
                title="More Options"
              >
                <MoreVertical style={{ width: '20px', height: '20px' }} />
              </button>

              {isDotsMenuOpen && (
                <div className="dots-dropdown-menu">
                  <div className="dots-dropdown-header">
                    <span>Specialized Client Services</span>
                  </div>
                  <ul className="dots-dropdown-list">
                    <li>
                      <Link 
                        to="/customer-supplied-pcb.html" 
                        className={`dots-dropdown-item ${activePage === 'customer-supplied-pcb' ? 'active' : ''}`}
                        onClick={() => setIsDotsMenuOpen(false)}
                      >
                        <div className="dots-dropdown-item__icon">
                          <Cpu size={18} />
                        </div>
                        <div className="dots-dropdown-item__text">
                          <span className="dots-dropdown-item__title">Customer-Supplied PCB Services</span>
                          <span className="dots-dropdown-item__sub">Assembly, Rework &amp; Testing for Client Hardware</span>
                        </div>
                        <ChevronRight size={16} className="dots-dropdown-item__arrow" />
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {isInstallable && (
              <button
                onClick={installApp}
                className="btn btn--primary btn--sm header-install-btn"
                style={{
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.825rem',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(14, 165, 233, 0.15)',
                  border: '1px solid rgba(14, 165, 233, 0.4)',
                  color: '#38bdf8'
                }}
                aria-label="Install App"
              >
                <Download style={{ width: '14px', height: '14px' }} />
                <span>Install App</span>
              </button>
            )}
          </div>

          <button
            className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
            id="hamburger-btn"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X style={{ width: '24px', height: '24px' }} />
            ) : (
              <MoreVertical style={{ width: '24px', height: '24px' }} />
            )}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} id="mobile-menu" aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-menu__top-controls">
          <SearchBar isMobile onCloseMobile={closeMobileMenu} />
        </div>
        <ul>
          <li><Link to="/" className={`mobile-menu__link ${activePage === 'home' ? 'active' : ''}`} onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/#about" className={`mobile-menu__link ${activePage === 'about' ? 'active' : ''}`} onClick={closeMobileMenu}>About</Link></li>
          <li><Link to="/services.html" className={`mobile-menu__link ${activePage === 'services' ? 'active' : ''}`} onClick={closeMobileMenu}>Services</Link></li>
          <li><Link to="/product-manufacturing.html" className={`mobile-menu__link ${activePage === 'product-manufacturing' ? 'active' : ''}`} onClick={closeMobileMenu}>Manufacturing</Link></li>
          
          {/* Highlighted 3-Dots Section in Mobile Menu */}
          <li style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
            <Link 
              to="/customer-supplied-pcb.html" 
              className={`mobile-menu__link ${activePage === 'customer-supplied-pcb' ? 'active' : ''}`} 
              onClick={closeMobileMenu}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--clr-accent)' }}
            >
              <Cpu size={18} />
              <span>Customer-Supplied PCB Services</span>
            </Link>
          </li>

          <li><Link to="/contact.html" className={`mobile-menu__link ${activePage === 'contact' ? 'active' : ''}`} onClick={closeMobileMenu}>Contact Us</Link></li>

          {isInstallable && (
            <li style={{ marginTop: '0.75rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
              <button
                onClick={() => {
                  closeMobileMenu();
                  installApp();
                }}
                className="btn btn--primary btn--block"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  fontSize: '0.9rem'
                }}
              >
                <Download style={{ width: '16px', height: '16px' }} />
                Install Aeroscan PCB App
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
