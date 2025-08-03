// src/components/ForceLightMode.tsx
'use client';

import { useEffect } from 'react';

export default function ForceLightMode() {
  useEffect(() => {
    // Réinitialise les styles forcés par le navigateur
    document.documentElement.style.backgroundColor = 'white';
    document.documentElement.style.color = 'black';
    
    // Désactive les filtres de Dark Mode
    document.documentElement.style.filter = 'none';
    
    // Ajoute une classe de secours
    document.documentElement.classList.add('force-light-mode');
  }, []);

  return null;
}