"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import ClientAnimation from "../components/ClientAnimation";
import ToggleButtons from "../components/ToggleButtons";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useNotion } from "../contexts/NotionContext";
import { FaHome } from 'react-icons/fa';

export default function TestPage() {
  const { translations } = useLanguage();
  const { theme } = useTheme();
  const { cards, isLoading, error, reloadData } = useNotion();
  
  // No need for useEffect here since the NotionProvider already fetches on mount

  return (
    <div className={styles.page}>
      <div className={styles.navBar}>
        <div className={styles.navBarContent}>
          <div className={styles.rightElements}>            
            <ToggleButtons />
          </div>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.nameContainer}>
          <h1 className={styles.name}>Wei's Blog</h1>
          <p className={styles.tagline}>{translations.tagline}</p>
        </div>
      </header>

      <main className={styles.main}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <p>Loading Notion data...</p>
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <p>Error: {error}</p>
            <button onClick={reloadData} className={styles.reloadButton}>
              Try Again
            </button>
          </div>
        ) : (
          <div className={styles.cardGrid}>
            {cards.length === 0 ? (
              <p>No Notion data available. Make sure your Notion integration is properly set up.</p>
            ) : (
              cards.map(card => (
                <div key={card.id} className={styles.card}>
                  <div className={styles.cardImageContainer}>
                    <img src={card.imageUrl} alt={card.title} className={styles.cardImage} />
                  </div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{card.title}</h2>
                    <p className={styles.cardDescription}>{card.summary}</p>
                    <p className={styles.cardDate}>{card.date}</p>
                    <a
                      href={card.notionPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardButton}
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>{translations.connect}</h3>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="GitHub">
                <Image src="/file.svg" alt="GitHub" width={24} height={24} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Image src="/globe.svg" alt="LinkedIn" width={24} height={24} />
              </a>
              <a href="#" aria-label="Twitter">
                <Image src="/window.svg" alt="Twitter" width={24} height={24} />
              </a>
            </div>
          </div>
          <div id="contact" className={styles.footerSection}>
            <h3>{translations.contact}</h3>
            <p>{translations.email}</p>
          </div>
        </div>
        <div className={styles.copyright}>
          {translations.copyright.replace('{year}', new Date().getFullYear())}
        </div>
      </footer>

      <ClientAnimation />
    </div>
  );
}