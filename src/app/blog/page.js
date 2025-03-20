// 'use client';

import { Client } from "@notionhq/client";
import { NotionRenderer } from 'react-notion-x';
import BlogImage from "../components/BlogImage";
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import ToggleButtons from '../components/ToggleButtons';
import { FaHome } from 'react-icons/fa';
import ClientComponent from '../components/ClientComponent'

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

  return (

    <div className={styles.container}>
      <div className={styles.navBar}>   
        <div className={styles.navBarContent}>
          <div className={styles.rightElements}>
            <nav className={styles.navigation}>
            <ClientComponent />
            </nav>
          </div>
        </div>
      </div>

      <div className={styles.header}>
        <div className={styles.nameContainer}>
          <h1 className={styles.name}>Wei's Blog</h1>
          <p className={styles.tagline}>探索科技與創意的交匯點</p>
        </div>
      </div>
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
    </div >
  );
}
