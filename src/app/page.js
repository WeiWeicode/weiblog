'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import ClientAnimation from "./components/ClientAnimation";
import ToggleButtons from "./components/ToggleButtons";
import { useLanguage } from "./contexts/LanguageContext";
import { useTheme } from "./contexts/ThemeContext";

// We need to make this a Client Component since we're using hooks
export default function Home() {
  const { translations } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className={styles.page}>
      <div className={styles.navBar}>
        <div className={styles.navBarContent}>
          <div className={styles.rightElements}>
            <nav className={styles.navigation}>
              <Link href="/blog" className={styles.navLink}>
                {translations.blog}
              </Link>
            </nav>
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
        {/* Hero Section */}
        <section className={`${styles.heroSection}`}>
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle}>
              {translations.heroTitle} <span className={styles.highlight}>Wei</span>
            </h2>
            <p className={styles.heroText}>
              {translations.heroText}
            </p>
            <div className={styles.ctas}>
              <a href="#about" className={styles.primary}>
                {translations.learnMore}
              </a>
              <a href="#contact" className={styles.secondary}>
                {translations.getInTouch}
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/globe.svg"
              alt="Digital World"
              width={300}
              height={300}
              className={styles.floatingImage}
              priority
            />
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className={`${styles.section} ${styles.hidden}`}>
          <h2 className={styles.sectionTitle}>{translations.expertise}</h2>
          <div className={styles.expertiseGrid}>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image
                src="/window.svg"
                alt="Frontend & Backend Development"
                width={50}
                height={50}
              />
              <h3>{translations.fullStack}</h3>
              <p>{translations.fullStackDesc}</p>
            </div>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image
                src="/globe.svg"
                alt="AI"
                width={50}
                height={50}
              />
              <h3>{translations.ai}</h3>
              <p>{translations.aiDesc}</p>
            </div>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image
                src="/file.svg"
                alt="Network"
                width={50}
                height={50}
              />
              <h3>{translations.network}</h3>
              <p>{translations.networkDesc}</p>
            </div>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image
                src="/window.svg"
                alt="System"
                width={50}
                height={50}
              />
              <h3>{translations.system}</h3>
              <p>{translations.systemDesc}</p>
            </div>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image
                src="/vercel.svg"
                alt="Process Planning"
                width={50}
                height={50}
              />
              <h3>{translations.process}</h3>
              <p>{translations.processDesc}</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`${styles.section} ${styles.hidden}`}>
          <h2 className={styles.sectionTitle}>{translations.about}</h2>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              {translations.aboutText1}
            </p>
            <p className={styles.aboutText}>
              {translations.aboutText2}
            </p>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section id="recent-posts" className={`${styles.section} ${styles.hidden}`}>
          <h2 className={styles.sectionTitle}>{translations.recentPosts}</h2>
          <div className={styles.postsGrid}>
            <div className={`${styles.postCard} ${styles.hidden}`}>
              <div className={styles.postDate}>May 15, 2023</div>
              <h3>Building Scalable Web Applications</h3>
              <p>Techniques for creating web applications that can handle growth...</p>
              <Link href="/blog/building-scalable-web-applications" className={styles.readMore}>{translations.readMore}</Link>
            </div>
            <div className={`${styles.postCard} ${styles.hidden}`}>
              <div className={styles.postDate}>April 22, 2023</div>
              <h3>AI in Everyday Applications</h3>
              <p>How artificial intelligence is changing the way we interact with software...</p>
              <Link href="/blog/ai-in-everyday-applications" className={styles.readMore}>{translations.readMore}</Link>
            </div>
            <div className={`${styles.postCard} ${styles.hidden}`}>
              <div className={styles.postDate}>March 10, 2023</div>
              <h3>Modern Network Security Practices</h3>
              <p>Essential security practices for today's network environments...</p>
              <Link href="#" className={styles.readMore}>{translations.readMore}</Link>
            </div>
          </div>
        </section>
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
