import { useState, useEffect } from 'react';

let globalDeferredPrompt = null;
const listeners = new Set();

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    globalDeferredPrompt = e;
    listeners.forEach((listener) => listener(e));
  });

  window.addEventListener('appinstalled', () => {
    globalDeferredPrompt = null;
    listeners.forEach((listener) => listener(null));
  });
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(globalDeferredPrompt);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
      setIsStandalone(standalone);
    };

    checkStandalone();

    const handlePromptChange = (prompt) => {
      setDeferredPrompt(prompt);
    };

    listeners.add(handlePromptChange);
    return () => {
      listeners.delete(handlePromptChange);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    globalDeferredPrompt = null;
    setDeferredPrompt(null);
    return outcome === 'accepted';
  };

  return {
    isInstallable: !!deferredPrompt && !isStandalone,
    isStandalone,
    installApp
  };
}
