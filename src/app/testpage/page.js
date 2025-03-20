"use client";

import { Client } from "@notionhq/client";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import ClientAnimation from "../components/ClientAnimation";
import ToggleButtons from "../components/ToggleButtons";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { FaHome } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function HomeClient({ cards }) {
  const { translations } = useLanguage();

  return (
    <div className={styles.page}>
      <div className={styles.navBar}>
        <div className={styles.navBarContent}>
          <div className={styles.rightElements}>
            <nav className={styles.navigation}>
              <Link href="/blog" className={styles.navLink}>
                {translations.blog}
              </Link>
              <Link href="/" className={styles.navLink}>
                <FaHome />
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
        <div className={styles.cardGrid}>
          {cards.map(card => (
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
          ))}
        </div>
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

export default async function Home() {
  // 初始化 Notion 客戶端
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "status",
      select: {
        equals: "Published"
      }
    },
    sorts: [
      {
        property: "date",
        direction: "descending"
      }
    ]
  });
  // 轉換 Notion 回傳資料成卡片格式
  const cards = response.results.map((page) => {
    const titleProperty = page.properties.title;
    const summaryProperty = page.properties.summary;
    const dateProperty = page.properties.date;

    // 解析標題、摘要及日期欄位
    const title = titleProperty?.title[0]?.plain_text || "無標題";
    const summary = summaryProperty?.rich_text[0]?.plain_text || "無摘要";
    const date = dateProperty?.date?.start || "無日期";

    // 若有封面圖片則使用，否則使用預設圖片
    const imageUrl = page.cover?.external?.url || page.cover?.file?.url || "https://picsum.photos/300/200";

    return {
      id: page.id,
      title,
      summary,
      date,
      imageUrl,
      notionPageUrl: page.url,
    };
  });

  return <HomeClient cards={cards} />;
}