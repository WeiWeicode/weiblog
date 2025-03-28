"use client";

import { createContext, useState, useContext, useEffect } from "react";

// English translations
const en = {
  tagline: "Thoughts on Code, AI & Systems",
  heroTitle: "Hello, I'm",
  heroText:
    "I'm passionate about building innovative solutions and sharing knowledge about technology.",
  learnMore: "Learn More",
  getInTouch: "Get In Touch",
  expertise: "My Expertise",
  fullStack: "Full Stack Development",
  fullStackDesc: "Creating seamless applications from front to back",
  ai: "Artificial Intelligence",
  aiDesc: "Implementing intelligent solutions for complex problems",
  network: "Network Engineering",
  networkDesc: "Designing robust network infrastructures",
  system: "System Architecture",
  systemDesc: "Building scalable and reliable system architectures",
  process: "Process Planning",
  processDesc: "Optimizing workflows and development processes",
  about: "About Me",
  aboutText1:
    "I am passionate about technology and currently learning AI, software architecture design, and cloud technologies. I am focused on exploring how to integrate AI into web applications, improving programming patterns, and gaining a deeper understanding of cloud architecture to make systems more flexible and scalable.",
  aboutText2:
    "Full-stack development (2020~present). Approval web system: Optimized internal approval processes for smoother and more efficient reviews. MES system web development: Enhanced the Manufacturing Execution System to ensure real-time and accurate production data.",
  aboutText3:
    "System and network architecture improvement (Feb 2017~May 2019). Information security system implementation (Jun 2019~Feb 2020). Led ERP and Oracle virtualization, improving performance by 40% and network speed by 50%.",
  recentPosts: "Recent Posts",
  readMore: "Read More →",
  connect: "Connect",
  contact: "Contact",
  email: "Email: asdf0359@gmail.com",
  copyright: "© {year} Wei's Blog. All rights reserved.",
  dark: "Dark",
  light: "Light",
  language: "Language",
  blog: "Blog",
  allPosts: "All Posts",
  blogHeading: "Latest Articles",
  blogSubheading: "Thoughts, ideas, and explorations in technology",
  readPost: "Read Post",
  back: "Back to Blog",
  publishedOn: "Published on",
  home: "Home",
  blog: "Blog",
  theme: "Theme",
  lightTheme: "Light Theme",
  darkTheme: "Dark Theme",
  projects: "Projects",
  projectBlog: "Personal Blog",
  projectBlogDesc:
    "A responsive blog built with Next.js featuring multilingual support and dark/light mode",
  projectApproval: "Approval Workflow System",
  projectApprovalDesc:
    "An enterprise approval system that streamlines internal review processes",
};

// Simplified Chinese translations
const zh = {
  tagline: "关于代码、人工智能和系统的思考",
  heroTitle: "你好，我是",
  heroText: "我热衷于构建创新解决方案并分享技术知识。",
  learnMore: "了解更多",
  getInTouch: "联系我",
  expertise: "我的专长",
  fullStack: "全栈开发",
  fullStackDesc: "从前端到后端创建无缝应用",
  ai: "人工智能",
  aiDesc: "为复杂问题实施智能解决方案",
  network: "网络工程",
  networkDesc: "设计强大的网络基础设施",
  system: "系统架构",
  systemDesc: "构建可扩展和可靠的系统架构",
  process: "流程规划",
  processDesc: "优化工作流程和开发流程",
  about: "关于我",
  aboutText1:
    "我对技术充满热情，正在学习 AI、程式架构设计 和 雲端技术。目前专注于探索如何将 AI 整合到网页应用，学习更好的程式设计模式，并深入了解雲端架构，让系统更具弹性和扩展性。",
  aboutText2:
    "全端开发(2020~至今)，签核网页系统：优化内部签核流程，让审核更顺畅、更有效率。MES系统网页开发：强化制造执行系统，确保生产数据即时且准确。",
  aboutText3:
    "系统与网络架构改善 (2017/2~2019/5)，资安系统导入 (2019/6~2020/2)，推动 ERP 与 Oracle 虚拟化，让效能提升 40%，网络速度提升 50%。",
  recentPosts: "最新文章",
  readMore: "阅读更多 →",
  connect: "社交媒体",
  contact: "联系方式",
  email: "电子邮件: asdf0359@gmail.com",
  copyright: "© {year} Wei的博客。保留所有权利。",
  dark: "暗色",
  light: "亮色",
  language: "语言",
  blog: "博客",
  allPosts: "所有文章",
  blogHeading: "最新文章",
  blogSubheading: "关于技术的思考、创意和探索",
  readPost: "阅读文章",
  back: "返回博客",
  publishedOn: "发布于",
  home: "首页",
  blog: "博客",
  theme: "主题",
  lightTheme: "亮色主题",
  darkTheme: "暗色主题",
  projects: "项目",
  projectBlog: "个人博客",
  projectBlogDesc: "使用 Next.js 构建的响应式博客，支持多语言和深色/浅色模式",
  projectApproval: "审批工作流系统",
  projectApprovalDesc: "一个简化内部审核流程的企业审批系统",
};

// Traditional Chinese translations
const zhTW = {
  tagline: "關於程式碼、人工智慧和系統的思考",
  heroTitle: "你好，我是",
  heroText: "我熱衷於構建創新解決方案並分享技術知識。",
  learnMore: "瞭解更多",
  getInTouch: "聯絡我",
  expertise: "我的專長",
  fullStack: "全棧開發",
  fullStackDesc: "從前端到後端創建無縫應用",
  ai: "人工智慧",
  aiDesc: "為複雜問題實施智能解決方案",
  network: "網路工程",
  networkDesc: "設計強大的網路基礎設施",
  system: "系統架構",
  systemDesc: "構建可擴展和可靠的系統架構",
  process: "流程規劃",
  processDesc: "優化工作流程和開發流程",
  about: "關於我",
  aboutText1:
    "我對技術充滿熱情，正在學習 AI、程式架構設計 和 雲端技術。目前專注於探索如何將 AI 整合到網頁應用，學習更好的程式設計模式，並深入了解雲端架構，讓系統更具彈性和擴展性。",
  aboutText2:
    "全端開發(2020~至今)，簽核網頁系統：優化內部簽核流程，讓審核更順暢、更有效率。MES系統網頁開發：強化製造執行系統，確保生產數據即時且準確。",
  aboutText3:
    "系統與網路架構改善 (2017/2~2019/5)，資安系統導入 (2019/6~2020/2)，推動 ERP 與 Oracle 虛擬化，讓效能提升 40%，網路速度提升 50%。",
  recentPosts: "最新文章",
  readMore: "閱讀更多 →",
  connect: "社交媒體",
  contact: "聯絡方式",
  email: "電子郵件: asdf0359@gmail.com",
  copyright: "© {year} Wei的部落格。保留所有權利。",
  dark: "暗色",
  light: "亮色",
  language: "語言",
  blog: "部落格",
  allPosts: "所有文章",
  blogHeading: "最新文章",
  blogSubheading: "關於技術的思考、創意和探索",
  readPost: "閱讀文章",
  back: "返回部落格",
  publishedOn: "發佈於",
  home: "首頁",
  blog: "部落格",
  theme: "主題",
  lightTheme: "亮色主題",
  darkTheme: "暗色主題",
  projects: "專案",
  projectBlog: "個人部落格",
  projectBlogDesc: "使用 Next.js 構建的響應式部落格，支援多語言和深色/淺色模式",
  projectApproval: "審批工作流系統",
  projectApprovalDesc: "一個簡化內部審核流程的企業審批系統",
};

// Create the language context
const LanguageContext = createContext();

// Language provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState(en);

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
      setTranslations(getTranslationsByLanguage(savedLanguage));
    }
  }, []);

  // Helper function to get translations based on language code
  const getTranslationsByLanguage = (lang) => {
    switch (lang) {
      case "zh":
        return zh;
      case "zh-TW":
        return zhTW;
      default:
        return en;
    }
  };

  // Change language function
  const changeLanguage = (lang) => {
    setLanguage(lang);
    setTranslations(getTranslationsByLanguage(lang));
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, translations, changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
