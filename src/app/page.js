import Image from "next/image";
import styles from "./page.module.css";
import ClientAnimation from "./components/ClientAnimation";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.nameContainer}>
          <h1 className={styles.name}>Wei's Blog</h1>
          <p className={styles.tagline}>Thoughts on Code, AI & Systems</p>
        </div>
      </header>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={`${styles.heroSection}`}>
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle}>
              Hello, I'm <span className={styles.highlight}>Wei</span>
            </h2>
            <p className={styles.heroText}>
              I'm passionate about building innovative solutions and sharing knowledge about
              technology.
            </p>
            <div className={styles.ctas}>
              <a href="#about" className={styles.primary}>
                Learn More
              </a>
              <a href="#contact" className={styles.secondary}>
                Get In Touch
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
          <h2 className={styles.sectionTitle}>My Expertise</h2>
          <div className={styles.expertiseGrid}>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image
                src="/window.svg"
                alt="Frontend & Backend Development"
                width={50}
                height={50}
              />
              <h3>Full Stack Development</h3>
              <p>Creating seamless applications from front to back</p>
            </div>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image
                src="/globe.svg"
                alt="AI"
                width={50}
                height={50}
              />
              <h3>Artificial Intelligence</h3>
              <p>Implementing intelligent solutions for complex problems</p>
            </div>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image
                src="/file.svg"
                alt="Network"
                width={50}
                height={50}
              />
              <h3>Network Engineering</h3>
              <p>Designing robust network infrastructures</p>
            </div>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image
                src="/window.svg"
                alt="System"
                width={50}
                height={50}
              />
              <h3>System Architecture</h3>
              <p>Building scalable and reliable system architectures</p>
            </div>
            <div className={`${styles.expertiseCard} ${styles.hidden}`}>
              <Image
                src="/vercel.svg"
                alt="Process Planning"
                width={50}
                height={50}
              />
              <h3>Process Planning</h3>
              <p>Optimizing workflows and development processes</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`${styles.section} ${styles.hidden}`}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              As a passionate technologist with expertise in both frontend and backend development,
              I bring ideas to life through code. My experience spans AI implementation, network
              architecture, system design, and process optimization.
            </p>
            <p className={styles.aboutText}>
              I love to share knowledge through this blog and explore the cutting edge of
              technology. When I'm not coding, I enjoy researching new techniques and contributing
              to open-source communities.
            </p>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section id="recent-posts" className={`${styles.section} ${styles.hidden}`}>
          <h2 className={styles.sectionTitle}>Recent Posts</h2>
          <div className={styles.postsGrid}>
            <div className={`${styles.postCard} ${styles.hidden}`}>
              <div className={styles.postDate}>May 15, 2023</div>
              <h3>Building Scalable Web Applications</h3>
              <p>Techniques for creating web applications that can handle growth...</p>
              <a href="#" className={styles.readMore}>Read More →</a>
            </div>
            <div className={`${styles.postCard} ${styles.hidden}`}>
              <div className={styles.postDate}>April 22, 2023</div>
              <h3>AI in Everyday Applications</h3>
              <p>How artificial intelligence is changing the way we interact with software...</p>
              <a href="#" className={styles.readMore}>Read More →</a>
            </div>
            <div className={`${styles.postCard} ${styles.hidden}`}>
              <div className={styles.postDate}>March 10, 2023</div>
              <h3>Modern Network Security Practices</h3>
              <p>Essential security practices for today's network environments...</p>
              <a href="#" className={styles.readMore}>Read More →</a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Connect</h3>
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
            <h3>Contact</h3>
            <p>Email: wei@example.com</p>
          </div>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Wei's Blog. All rights reserved.
        </div>
      </footer>
      
      <ClientAnimation />
    </div>
  );
}
