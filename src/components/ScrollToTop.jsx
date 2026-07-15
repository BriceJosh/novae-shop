import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Détecter le défilement de la page
  useEffect(() => {
    const toggleVisibility = () => {
      // Le bouton s'affiche si on a scrollé de plus de 300 pixels vers le bas
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        isVisible && setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isVisible]);

  // Fonction pour remonter tout en haut de manière fluide
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Remontée fluide et non brusque
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 hover:scale-110 transition-all cursor-pointer group"
      title="Retourner en haut"
    >
      <ArrowUp size={22} className="group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}