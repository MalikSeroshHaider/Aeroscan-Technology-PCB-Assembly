import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/#about', { replace: true });
  }, [navigate]);

  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <p>Redirecting to About section...</p>
    </div>
  );
}
