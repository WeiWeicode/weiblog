"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import ClientAnimation from "../components/ClientAnimation";
import ToggleButtons from "../components/ToggleButtons";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useNotion } from "../contexts/NotionContext";
import { FaHome, FaSearch } from "react-icons/fa";
import { Tag, Pagination, Spin, Input, Select, Button } from "antd";

export default function TestPage() {
  const { translations } = useLanguage();
  const { theme } = useTheme();
  const { cards, isLoading, error, reloadData } = useNotion();
  const [currentPage, setCurrentPage] = useState(1);
  const [copyStatus, setCopyStatus] = useState("");
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);

  // Search states
  const [titleSearch, setTitleSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [tagsByCategory, setTagsByCategory] = useState({});
  const [availableTags, setAvailableTags] = useState([]);

  const pageSize = 10;

  // Tag colors with different options for light/dark themes
  const tagColors = useMemo(() => {
    return theme === "dark"
      ? [
          "green",
          "geekblue",
          "purple",
          "magenta",
          "cyan",
          "volcano",
          "orange",
          "gold",
          "lime",
        ]
      : [
          "green",
          "blue",
          "purple",
          "magenta",
          "cyan",
          "red",
          "orange",
          "gold",
          "lime",
        ];
  }, [theme]);

  // Use consistent colors for the same tags
  const getTagColor = useCallback(
    (tag) => {
      // Use the tag string to generate a consistent index
      const hashCode = tag.split("").reduce((acc, char) => {
        return acc + char.charCodeAt(0);
      }, 0);
      return tagColors[hashCode % tagColors.length];
    },
    [tagColors]
  );

  // Extract all unique categories and tags for filter options
  useEffect(() => {
    if (cards && Array.isArray(cards)) {
      // 提取所有唯一的標籤
      const uniqueTags = new Set();
      // 提取所有唯一的分類
      const uniqueCategories = new Set();
      // 按照分類整理標籤
      const categoryTagsMap = {};

      cards.forEach((card) => {
        // 處理分類
        if (card.category) {
          uniqueCategories.add(card.category);

          // 初始化分類的標籤集合
          if (!categoryTagsMap[card.category]) {
            categoryTagsMap[card.category] = new Set();
          }

          // 處理標籤
          if (card.tags && Array.isArray(card.tags)) {
            card.tags.forEach((tag) => {
              if (tag !== "No Tags") {
                uniqueTags.add(tag);
                // 將標籤添加到相應分類的集合中
                categoryTagsMap[card.category].add(tag);
              }
            });
          }
        }
      });

      // 將Set轉換為陣列並儲存
      setAllTags(Array.from(uniqueTags).filter((tag) => tag !== "No Tags"));
      setAllCategories(
        Array.from(uniqueCategories).filter(
          (category) => category !== "No Category"
        )
      );

      // 將每個分類的標籤集合轉換為陣列
      const processedTagsByCategory = {};
      Object.keys(categoryTagsMap).forEach((category) => {
        processedTagsByCategory[category] = Array.from(
          categoryTagsMap[category]
        );
      });

      setTagsByCategory(processedTagsByCategory);
      // 初始化可用標籤為所有標籤
      setAvailableTags(
        Array.from(uniqueTags).filter((tag) => tag !== "No Tags")
      );
    }
  }, [cards]);

  // Update available tags when category changes
  useEffect(() => {
    // If no category selected, show all tags
    if (!selectedCategory) {
      setAvailableTags(allTags);
      setSelectedTags([]); // Reset selected tags when category is cleared
    } else {
      // If category is selected, filter tags to only those in this category
      const tagsForCategory = tagsByCategory[selectedCategory] || [];
      setAvailableTags(tagsForCategory);
      // Remove any selected tags that aren't in the new category
      setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.filter((tag) => tagsForCategory.includes(tag))
      );
    }
  }, [selectedCategory, tagsByCategory, allTags]);

  const handleCopy = async (text) => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not available");
      }
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopyStatus("Copy failed");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  };

  // Filter cards based on search criteria
  const filteredCards = useMemo(() => {
    if (!cards || !Array.isArray(cards)) return [];

    return cards.filter((card) => {
      // Title filter (case insensitive)
      const matchesTitle =
        !titleSearch ||
        card.title.toLowerCase().includes(titleSearch.toLowerCase());

      // Category filter
      const matchesCategory =
        !selectedCategory || card.category === selectedCategory;

      // Tags filter (any of the selected tags matches)
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => card.tags.includes(tag));

      return matchesTitle && matchesCategory && matchesTags;
    });
  }, [cards, titleSearch, selectedCategory, selectedTags]);

  // Memoize the current page cards to prevent unnecessary re-calculation
  const currentPageCards = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredCards.slice(startIndex, endIndex);
  }, [filteredCards, currentPage, pageSize]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [titleSearch, selectedCategory, selectedTags]);

  // Optimize page change handler
  const handlePageChange = useCallback((page) => {
    // 立即设置加载状态
    setIsPaginationLoading(true);

    // 使用 requestAnimationFrame 确保在下一帧渲染之前设置新页码
    requestAnimationFrame(() => {
      setCurrentPage(page);
      // 平滑滚动到页面顶部
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      // 移除不必要的延迟，但保留最小延迟确保状态更新
      requestAnimationFrame(() => {
        setIsPaginationLoading(false);
      });
    });
  }, []);

  // Handle search reset
  const handleResetFilters = () => {
    setTitleSearch("");
    setSelectedCategory(null);
    setSelectedTags([]);
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
        {/* Search filters section */}
        <div className={styles.searchContainer}>
          <h3 className={styles.searchTitle}>搜尋文章</h3>

          <div className={styles.searchInputWrapper}>
            <Input
              prefix={
                <FaSearch
                  style={{ color: theme === "dark" ? "#61a5e0" : "#3498db" }}
                />
              }
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
              allowClear
              className={`${styles.searchInput} ${theme === "dark" ? styles.darkInput : styles.lightInput}`}
            />
          </div>

          <div className={styles.filterControls}>
            <Select
              placeholder="選擇分類"
              value={selectedCategory}
              onChange={setSelectedCategory}
              allowClear
              className={`${styles.categorySelect} ${theme === "dark" ? styles.darkSelect : styles.lightSelect}`}
              options={allCategories.map((category) => ({
                value: category,
                label: category,
              }))}
            />

            <Select
              mode="multiple"
              placeholder="選擇標籤"
              value={selectedTags}
              onChange={setSelectedTags}
              allowClear
              className={`${styles.tagsSelect} ${theme === "dark" ? styles.darkSelect : styles.lightSelect}`}
              options={availableTags.map((tag) => ({ value: tag, label: tag }))}
            />

            <Button
              onClick={handleResetFilters}
              className={`${styles.resetButton} ${theme === "dark" ? styles.darkButton : styles.lightButton}`}
              icon={<FaSearch style={{ marginRight: "5px" }} />}
            >
              重置篩選
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className={styles.resultsCount}>
          找到 {filteredCards.length} 筆結果
        </div>

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
          <>
            <div className={styles.cardGrid}>
              {filteredCards.length === 0 ? (
                <p>沒有符合條件的結果。請嘗試其他搜尋條件。</p>
              ) : isPaginationLoading ? (
                <div className={styles.loadingContainer}>
                  <Spin size="large" />
                </div>
              ) : (
                currentPageCards.map((card) => (
                  <div key={card.id} className={styles.card}>
                    <div className={styles.cardImageContainer}>
                      {/* 替换为Next.js优化的Image组件 */}
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        className={styles.cardImage}
                        width={500}
                        height={300}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjZWVlIj48cGF0aCBkPSJNNDAgMGMtMjIuMDkgMC00MCAxNy45MS00MCA0MHMxNy45MSA0MCA0MCA0MCA0MC0xNy45MSA0MC00MC0xNy45MS00MC00MC00MHptMCA3MGMtMTYuNTQgMC0zMC0xMy40Ni0zMC0zMCAwLTE2LjU0IDEzLjQ2LTMwIDMwLTMwczMwIDEzLjQ2IDMwIDMwYzAgMTYuNTQtMTMuNDYgMzAtMzAgMzB6Ii8+PC9zdmc+"
                        priority={
                          currentPage === 1 &&
                          card.id === currentPageCards[0]?.id
                        }
                        loading="eager"
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h2 className={styles.cardTitle}>{card.title}</h2>
                      <p className={styles.cardDescription}>{card.summary}</p>
                      {/* Enhanced category with better spacing */}
                      <div className={styles.cardCategoryWrapper}>
                        <p>
                          <Tag color="blue" className={styles.enhancedCategory}>
                            {card.category}
                          </Tag>
                        </p>
                      </div>
                      {/* Enhanced tags with different colors */}
                      <div className={styles.cardTags}>
                        {card.tags.map((tag, index) => {
                          // Rotate through different colors for tags
                          const colorIndex = index % tagColors.length;
                          return (
                            <Tag
                              key={tag}
                              color={getTagColor(tag)}
                              className={styles.cardTag}
                            >
                              {tag}
                            </Tag>
                          );
                        })}
                      </div>
                      {/* date */}
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
            {filteredCards.length > pageSize && (
              <div className={styles.paginationContainer}>
                <Pagination
                  current={currentPage}
                  total={filteredCards.length}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper={false}
                  disabled={isPaginationLoading}
                  itemRender={(page, type, originalElement) => {
                    if (type === "page") {
                      return (
                        <a
                          className={
                            theme === "dark" ? styles.darkPaginationItem : ""
                          }
                        >
                          {page}
                        </a>
                      );
                    }
                    return originalElement;
                  }}
                />
              </div>
            )}
          </>
        )}
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
                href="https://www.instagram.com/wei.code?igsh=OWc5bmlhcHp6aW84:"
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
