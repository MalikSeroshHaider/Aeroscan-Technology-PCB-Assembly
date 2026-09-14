/**
 * Registers the PWA Service Worker and provides hooks for app updates.
 */

export function registerServiceWorker(onUpdateAvailable) {
  if ('serviceWorker' in navigator && (import.meta.env.PROD || process.env.NODE_ENV === 'production' || true)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] ServiceWorker registered with scope:', registration.scope);

          // Check if update is waiting on load
          if (registration.waiting && onUpdateAvailable) {
            onUpdateAvailable(registration);
          }

          // Listen for new worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[PWA] New application version is available.');
                if (onUpdateAvailable) {
                  onUpdateAvailable(registration);
                }
              }
            });
          });
        })
        .catch((error) => {
          console.error('[PWA] ServiceWorker registration failed:', error);
        });

      // Handle controller change (reloads page when SW updates)
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  }
}

export function updateServiceWorker(registration) {
  if (registration && registration.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }
}
