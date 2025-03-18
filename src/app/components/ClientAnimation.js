'use client';

import { useEffect } from 'react';
import styles from '../page.module.css';

const ClientAnimation = () => {
  useEffect(() => {
    // Scroll animation effect for hidden elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.show);
        }
      });
    }, {
      threshold: 0.1
    });

    // Target all elements with hidden class
    const hiddenElements = document.querySelectorAll(`.${styles.hidden}`);
    
    // Add transition delays to cards for staggered effect
    const expertiseCards = document.querySelectorAll(`.${styles.expertiseCard}`);
    expertiseCards.forEach((card, index) => {
      card.style.setProperty('--index', index);
    });
    
    const postCards = document.querySelectorAll(`.${styles.postCard}`);
    postCards.forEach((card, index) => {
      card.style.setProperty('--index', index);
    });

    // Observe all hidden elements
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ClientAnimation;