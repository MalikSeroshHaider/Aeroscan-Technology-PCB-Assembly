import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share2, PlusSquare, CheckCircle2 } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) {
      setInstalled(true);
      return;
    }

    // Check if user dismissed prompt recently (in last 7 days)
    const lastDismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (lastDismissed) {
      const days = (Date.now() - parseInt(lastDismissed, 10)) / (1000 * 60 * 60 * 24);
      if (days < 7) {
        return;
      }
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
    if (iosDevice && !isStandalone) {
      setIsIos(true);
      // Wait 3 seconds before showing iOS prompt for better UX
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // Handle standard beforeinstallprompt event (Chrome, Edge, Opera, Android)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Track appinstalled event
    const handleAppInstalled = () => {
      setInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      console.log('[PWA] Aeroscan PCB App successfully installed!');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('[PWA] User accepted the install prompt');
      setInstalled(true);
    } else {
      console.log('[PWA] User dismissed the install prompt');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIosGuide(false);
    localStorage.setItem('pwa_prompt_dismissed', Date.now().toString());
  };

  if (!showPrompt || installed) return null;

  return (
    <>
      {/* Main Install Banner */}
      <div className="pwa-install-banner" role="dialog" aria-label="Install App">
        <div className="pwa-banner-content">
          <div className="pwa-brand-icon">
            <img src="/favicon.png" alt="Aeroscan Logo" width="44" height="44" style={{ objectFit: 'contain' }} />
          </div>
          
          <div className="pwa-banner-text">
            <div className="pwa-badge">Official Web App</div>
            <h4 className="pwa-title">Install Aeroscan PCB</h4>
            <p className="pwa-desc">
              Fast, offline access to PCB assembly specs, quotes, & services.
            </p>
          </div>
        </div>

        <div className="pwa-banner-actions">
          <button 
            onClick={handleInstallClick}
            className="pwa-install-btn"
          >
            <Download className="w-4 h-4 mr-2 inline-block" />
            Install App
          </button>
          
          <button 
            onClick={handleDismiss}
            className="pwa-dismiss-btn"
            aria-label="Dismiss app prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* iOS Modal Guide */}
      {showIosGuide && (
        <div className="pwa-ios-modal-overlay" onClick={() => setShowIosGuide(false)}>
          <div className="pwa-ios-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pwa-modal-close" onClick={() => setShowIosGuide(false)}>
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 mb-3">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Install on iPhone / iPad</h3>
              <p className="text-slate-400 text-sm">Add Aeroscan PCB to your home screen for quick access.</p>
            </div>

            <div className="pwa-ios-steps">
              <div className="pwa-step-item">
                <span className="pwa-step-num">1</span>
                <p>Tap the <strong>Share</strong> button <Share2 className="w-4 h-4 inline text-cyan-400 mx-1" /> in Safari menu bar.</p>
              </div>

              <div className="pwa-step-item">
                <span className="pwa-step-num">2</span>
                <p>Scroll down and select <strong>Add to Home Screen</strong> <PlusSquare className="w-4 h-4 inline text-cyan-400 mx-1" />.</p>
              </div>

              <div className="pwa-step-item">
                <span className="pwa-step-num">3</span>
                <p>Tap <strong>Add</strong> in top-right corner to launch app!</p>
              </div>
            </div>

            <button 
              onClick={() => setShowIosGuide(false)} 
              className="pwa-ios-done-btn"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}
