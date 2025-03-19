'use client';

import { createContext, useState, useContext, useEffect } from 'react';

// English translations
const en = {
  tagline: "Thoughts on Code, AI & Systems",
  heroTitle: "Hello, I'm",
  heroText: "I'm passionate about building innovative solutions and sharing knowledge about technology.",
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
  aboutText1: "As a passionate technologist with expertise in both frontend and backend development, I bring ideas to life through code. My experience spans AI implementation, network architecture, system design, and process optimization.",
  aboutText2: "I love to share knowledge through this blog and explore the cutting edge of technology. When I'm not coding, I enjoy researching new techniques and contributing to open-source communities.",
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
  aboutText1: "作为一名热衷于前后端开发的技术专家，我通过代码将创意变为现实。我的经验涵盖人工智能实施、网络架构、系统设计和流程优化。",
  aboutText2: "我喜欢通过这个博客分享知识并探索技术前沿。当我不编码时，我喜欢研究新技术并为开源社区做贡献。",
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
  aboutText1: "作為一名熱衷於前後端開發的技術專家，我透過程式碼將創意變為現實。我的經驗涵蓋人工智慧實施、網路架構、系統設計和流程優化。",
  aboutText2: "我喜歡透過這個部落格分享知識並探索技術前沿。當我不寫程式時，我喜歡研究新技術並為開源社群做貢獻。",
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
};

// Create the language context
const LanguageContext = createContext();

// Language provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(en);

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
      setTranslations(getTranslationsByLanguage(savedLanguage));
    }
  }, []);

  // Helper function to get translations based on language code
  const getTranslationsByLanguage = (lang) => {
    switch(lang) {
      case 'zh':
        return zh;
      case 'zh-TW':
        return zhTW;
      default:
        return en;
    }
  };

  // Change language function
  const changeLanguage = (lang) => {
    setLanguage(lang);
    setTranslations(getTranslationsByLanguage(lang));
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}