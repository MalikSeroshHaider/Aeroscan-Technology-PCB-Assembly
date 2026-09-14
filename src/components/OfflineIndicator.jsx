import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, X, CheckCircle2 } from 'lucide-react';
import { flushOfflineQueue } from '../pwa/offlineQueue';

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showRestored, setShowRestored] = useState(false);
  const [syncedCount, setSyncedCount] = useState(0);
  const [dismissedOffline, setDismissedOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      setShowRestored(false);
      setDismissedOffline(false);
      setSyncedCount(0);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowRestored(true);

      // Attempt to flush offline queue
      flushOfflineQueue((count) => {
        setSyncedCount(count);
      });
      
      // Auto hide restored notification after 5 seconds
      const timer = setTimeout(() => {
        setShowRestored(false);
      }, 5000);

      return () => clearTimeout(timer);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline && !showRestored) return null;

  return (
    <div className="offline-toast-container">
      {isOffline && !dismissedOffline && (
        <div className="offline-toast offline-warning" role="status" aria-live="polite">
          <div className="offline-toast-body">
            <WifiOff className="w-5 h-5 text-amber-400 shrink-0 mr-3 animate-pulse" />
            <div>
              <p className="offline-toast-title">You are currently offline</p>
              <p className="offline-toast-desc">Working in offline mode. Cached content is active.</p>
            </div>
          </div>
          <button 
            onClick={() => setDismissedOffline(true)}
            className="offline-dismiss-btn"
            aria-label="Dismiss offline banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {showRestored && (
        <div className="offline-toast online-success" role="status" aria-live="polite">
          <div className="offline-toast-body">
            <Wifi className="w-5 h-5 text-emerald-400 shrink-0 mr-3" />
            <div>
              <p className="offline-toast-title">Internet connection restored</p>
              <p className="offline-toast-desc">
                {syncedCount > 0 
                  ? `Back online! Successfully submitted ${syncedCount} queued quote request${syncedCount > 1 ? 's' : ''}.` 
                  : 'Back online and synchronized.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
