'use client';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import styles from './ToggleButtons.module.css';
import Image from 'next/image';

const ToggleButtons = () => {
  const { language, translations, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      {/* Language Toggle */}
      <div className={styles.toggleGroup}>
        <span className={styles.label}>{translations.language}</span>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.toggleButton} ${language === 'en' ? styles.active : ''}`}
            onClick={() => changeLanguage('en')}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            className={`${styles.toggleButton} ${language === 'zh' ? styles.active : ''}`}
            onClick={() => changeLanguage('zh')}
            aria-label="Switch to Simplified Chinese"
          >
            简体
          </button>
          <button
            className={`${styles.toggleButton} ${language === 'zh-TW' ? styles.active : ''}`}
            onClick={() => changeLanguage('zh-TW')}
            aria-label="Switch to Traditional Chinese"
          >
            繁體
          </button>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className={styles.themeToggle}>
        <button
          className={styles.themeButton}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'dark' ? (
            <span className={styles.themeIcon}>☀️</span>
          ) : (
            <span className={styles.themeIcon}>🌙</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ToggleButtons;