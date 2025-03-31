"use client";

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

  // testButton
  const testButton = () => {
    console.log("testButton clicked!");
  };

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
        {/* Hero Section */}
        <section className={`${styles.heroSection}`}>
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle}>
              {translations.heroTitle}{" "}
              <span className={styles.highlight}>Wei</span>
            </h2>
            <p className={styles.heroText}>{translations.heroText}</p>
            <div className={styles.ctas}>
              <a href="#about" className={styles.primary}>
                {translations.learnMore}
              </a>
              <a href="#contact" className={styles.secondary}>
                {translations.getInTouch}
              </a>
              {/* blog */}
              <Link href="/blog" className={styles.secondary}>
                {translations.blog}
              </Link>
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
        <section
          id="expertise"
          className={`${styles.section} ${styles.hidden}`}
        >
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
              <div className={styles.techStack}>
                <span>React</span>
                <span>Vue</span>
                <span>Node.js</span>
                <span>Python</span>                
                <span>SQL</span>
                <span>Docker</span>
                <span>Git</span>
                <span>CI/CD</span>
                <span>REST API</span>                
              </div>
            </div>
            
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image src="/globe.svg" alt="AI" width={50} height={50} />
              <h3>{translations.ai}</h3>
              <p>{translations.aiDesc}</p>
              <div className={styles.techStack}>
                <span>TensorFlow</span>
                <span>PyTorch</span>
                <span>OpenAI API</span>
                <span>Machine Learning</span>
                <span>Data Analysis</span>
              </div>
            </div>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image src="/file.svg" alt="Network" width={50} height={50} />
              <h3>{translations.network}</h3>
              <p>{translations.networkDesc}</p>
              <div className={styles.techStack}>
                <span>Network Design</span>
                <span>Firewall</span>
                <span>VPN</span>
                <span>Load Balancing</span>
                <span>Network Security</span>
                <span>Routing</span>
              </div>
            </div>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image src="/window.svg" alt="System" width={50} height={50} />
              <h3>{translations.system}</h3>
              <p>{translations.systemDesc}</p>
              <div className={styles.techStack}>
                <span>Linux</span>
                <span>Windows</span>
                <span>Virtualization</span>
                <span>RDBMS</span>
                <span>NoSQL</span>
                <span>Cloud</span>
                <span>BackUp</span>
              </div>
            </div>
            
          </div>
        </section>


        {/* About Section */}
        <section id="about" className={`${styles.section} ${styles.hidden}`}>
          <h2 className={styles.sectionTitle}>{translations.about}</h2>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>{translations.aboutText1}</p>
            <p className={styles.aboutText}>{translations.aboutText2}</p>
            <p className={styles.aboutText}>{translations.aboutText3}</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>{translations.connect}</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://github.com/WeiWeicode"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Image src="/github.svg" alt="GitHub" width={24} height={24} />
              </a>
              
              <a
                href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Image
                  src="/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
          <div id="contact" className={styles.footerSection}>
            <h3>{translations.contact}</h3>
            <p>{translations.email}</p>
          </div>
        </div>
        <div className={styles.copyright}>
          {translations.copyright.replace("{year}", new Date().getFullYear())}
        </div>
      </footer>

      <ClientAnimation />
    </div>
  );
}
