import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';

const SEARCH_ITEMS = [
  { id: 1, title: 'Home Page', category: 'Page', desc: 'Aeroscan Technologies main overview & services', link: '/' },
  { id: 2, title: 'About Us', category: 'Page', desc: 'Learn about our engineering, capabilities & quality standards', link: '/#about' },
  { id: 3, title: 'Services Catalog', category: 'Page', desc: 'Complete range of SMT & DIP PCB assembly services', link: '/services.html' },
  { id: 5, title: 'Turnkey Product Manufacturing', category: 'Page', desc: 'End-to-end electronic product design, SMT & box-build assembly', link: '/product-manufacturing.html' },
  { id: 6, title: 'Contact Us', category: 'Page', desc: 'Get in touch for quotes, inquiries, and technical support', link: '/contact.html' },

  // SMT Services
  { id: 7, title: 'SMT PCB Assembly', category: 'SMT Service', desc: 'High-speed Surface Mount Technology assembly for complex, high-density PCBs', link: '/smt-pcb-assembly.html' },
  { id: 8, title: 'Pick & Place Assembly', category: 'SMT Service', desc: 'Robotic pick and place placement for SMDs, micro-BGAs, and ICs', link: '/pick-place-assembly.html' },
  { id: 9, title: 'Solder Paste Printing', category: 'SMT Service', desc: 'Precision laser-cut stencil solder paste printing with 3D SPI inspection', link: '/solder-paste-printing.html' },
  { id: 10, title: 'Reflow Soldering', category: 'SMT Service', desc: 'Multi-zone convection thermal reflow soldering under nitrogen (N2) gas', link: '/reflow-soldering.html' },
  { id: 11, title: 'PCB Rework & Repair', category: 'SMT Service', desc: 'Expert hot-air BGA reballing, de-soldering, and trace repair services', link: '/pcb-rework-repair.html' },
  { id: 12, title: 'Functional Inspection & Quality Control', category: 'SMT Service', desc: '3D AOI optical inspection, 3D X-ray solder verification, and functional testing', link: '/functional-inspection-quality-control.html' },

  // DIP Services
  { id: 13, title: 'Through-Hole PCB Assembly', category: 'DIP Service', desc: 'Heavy-duty Through-Hole (DIP) component assembly for power electronics', link: '/through-hole-pcb-assembly.html' },
  { id: 14, title: 'Manual Component Insertion', category: 'DIP Service', desc: 'Skilled manual insertion of odd-form connectors, transformers, and relays', link: '/manual-component-insertion.html' },
  { id: 15, title: 'Wave / Selective Soldering', category: 'DIP Service', desc: 'Automated dual-wave and robotic selective soldering under nitrogen', link: '/wave-selective-soldering.html' },
  { id: 16, title: 'Hand Soldering & Rework', category: 'DIP Service', desc: 'Precision hand soldering, joint touch-ups, and wire terminal soldering', link: '/hand-soldering-rework.html' },
  { id: 17, title: 'Mixed Technology Assembly (SMT + DIP)', category: 'DIP Service', desc: 'Combined SMT surface mount and DIP through-hole hybrid assembly', link: '/mixed-technology-assembly.html' },
  { id: 18, title: 'Final Inspection & Packaging', category: 'DIP Service', desc: 'Visual QC inspection, ESD shield packaging, and custom shipping boxes', link: '/final-inspection-packaging.html' },
];

const sanitizeSearchQuery = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').slice(0, 100);
};

export default function SearchBar({ isMobile = false, onCloseMobile }) {
  const [query, setQuery] = useState(() => {
    try {
      return sanitizeSearchQuery(localStorage.getItem('last_search_query') || '');
    } catch (e) {
      return '';
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('recent_searches');
      return saved ? JSON.parse(saved) : ['PCB Assembly', 'Turnkey Manufacturing', 'LED Light Assembly'];
    } catch (e) {
      return ['PCB Assembly', 'Turnkey Manufacturing', 'LED Light Assembly'];
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Remember search query preference
  useEffect(() => {
    if (query) {
      try {
        localStorage.setItem('last_search_query', query);
      } catch (e) {
        // Safe fallback for restricted storage environments
      }
    }
  }, [query]);

  // Filter items
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = SEARCH_ITEMS.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
    );
    setResults(filtered);
    setSelectedIndex(-1);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Keyboard listener (Escape & Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const saveRecentSearch = (term) => {
    if (!term || typeof term !== 'string') return;
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches(prev => {
      const updated = [trimmed, ...prev.filter(item => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
      try {
        localStorage.setItem('recent_searches', JSON.stringify(updated));
      } catch (e) {
        /* ignore */
      }
      return updated;
    });
  };

  const handleSelect = (link, itemTitle) => {
    if (itemTitle) {
      saveRecentSearch(itemTitle);
    } else if (query.trim()) {
      saveRecentSearch(query.trim());
    }

    setIsOpen(false);
    if (onCloseMobile) onCloseMobile();
    
    if (link.startsWith('/#')) {
      const hash = link.substring(2);
      navigate('/');
      setTimeout(() => {
        const elem = document.getElementById(hash);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(link);
    }
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
      }
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        e.preventDefault();
        const selected = results[selectedIndex];
        handleSelect(selected.link, selected.title);
      }
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    localStorage.removeItem('last_search_query');
    inputRef.current?.focus();
  };

  return (
    <div className={`search-bar-wrapper ${isMobile ? 'search-bar-wrapper--mobile' : ''}`} ref={containerRef}>
      <div className={`search-bar ${isOpen ? 'search-bar--active' : ''}`}>
        <Search className="search-bar__icon" size={17} />
        <input
          ref={inputRef}
          type="text"
          className="search-bar__input"
          placeholder="Search products, services..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDownInput}
          aria-label="Search products and services"
        />
        {query ? (
          <button
            type="button"
            className="search-bar__clear"
            onClick={clearSearch}
            aria-label="Clear search input"
          >
            <X size={15} />
          </button>
        ) : (
          !isMobile && <kbd className="search-bar__kbd" title="Press Ctrl+K to search">⌘K</kbd>
        )}
      </div>

      {/* Floating Suggestions Dropdown */}
      {isOpen && (
        <div className="search-results-dropdown">
          {query.trim().length > 0 ? (
            results.length > 0 ? (
              <div className="search-results-list">
                <div className="search-results-header">
                  <span>Found {results.length} result{results.length > 1 ? 's' : ''}</span>
                  <span className="search-results-hint">Use ↑ ↓ & Enter to select</span>
                </div>
                {results.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`search-result-item ${idx === selectedIndex ? 'search-result-item--selected' : ''}`}
                    onClick={() => handleSelect(item.link, item.title)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="search-result-item__main">
                      <span className="search-result-item__title">{item.title}</span>
                      <span className="search-result-item__desc">{item.desc}</span>
                    </div>
                    <span className={`search-result-item__tag tag--${item.category.toLowerCase()}`}>
                      {item.category}
                    </span>
                    <ChevronRight className="search-result-item__arrow" size={16} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="search-no-results">
                No matching products or services found for "{query}".
              </div>
            )
          ) : (
            <div className="search-quick-links">
              <div className="search-results-header">Recent & Popular Searches</div>
              <div className="search-recent-tags">
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    type="button"
                    className="search-recent-chip"
                    onClick={() => {
                      setQuery(term);
                      setIsOpen(true);
                    }}
                  >
                    <Search size={12} />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
