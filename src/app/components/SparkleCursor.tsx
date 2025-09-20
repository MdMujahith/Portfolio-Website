"use client";

import React, { useEffect } from 'react';

const SparkleCursor: React.FC = () => {
  useEffect(() => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    document.body.appendChild(sparkle);

    const handleMouseMove = (e: MouseEvent) => {
      sparkle.style.opacity = '1';
      sparkle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const handleMouseLeave = () => {
      sparkle.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (document.body.contains(sparkle)) {
        document.body.removeChild(sparkle);
      }
    };
  }, []);

  return null;
};

export default SparkleCursor;