import React from 'react';
import { RefreshCw, Sparkles, X } from 'lucide-react';
import { updateServiceWorker } from '../pwa/registerSW';

export default function PwaUpdatePrompt({ registration, onDismiss }) {
  if (!registration || !registration.waiting) return null;

  const handleUpdate = () => {
    updateServiceWorker(registration);
  };

  return (
    <div className="pwa-update-toast" role="alert" aria-live="assertive">
      <div className="pwa-update-icon">
        <Sparkles className="w-5 h-5 text-cyan-400" />
      </div>
      <div className="pwa-update-content">
        <h4 className="pwa-update-title">New Update Available</h4>
        <p className="pwa-update-desc">A new version of Aeroscan PCB is ready to install.</p>
      </div>
      <div className="pwa-update-actions">
        <button onClick={handleUpdate} className="pwa-update-btn">
          <RefreshCw className="w-4 h-4 mr-1.5 inline-block" />
          Update Now
        </button>
        {onDismiss && (
          <button onClick={onDismiss} className="pwa-update-close">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
