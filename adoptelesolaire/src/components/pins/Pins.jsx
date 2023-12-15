// pins.js
import React, { useEffect, useState } from 'react';
import './pins.css';

function Pins({ openModal }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setIsVisible(scrollY > 50); // Choisissez la valeur appropriée pour déterminer quand afficher les pins
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <aside className={isVisible ? 'visible' : ''}>
      <div className="roundButton" onClick={scrollToTop}>
        <i className="fa-solid fa-calculator fa-2xl"></i>
      </div>
      <a href="#" className="roundButton" onClick={openModal}>
        <i className="fa-solid fa-phone-volume fa-2xl"></i>
      </a>
    </aside>
  );
}

export default Pins;
