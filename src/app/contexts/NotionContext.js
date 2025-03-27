'use client';

import { createContext, useState, useContext, useEffect, useMemo } from 'react';

// Create the Notion context
const NotionContext = createContext();

// 缓存键常量
const NOTION_CACHE_KEY = 'notion_data_cache';
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5分钟缓存过期时间

// Notion provider component
export function NotionProvider({ children }) {
  const [notionData, setNotionData] = useState({
    cards: [],
    isLoading: true,
    error: null,
    lastFetched: 0
  });

  // 检查缓存是否过期
  const isCacheExpired = (timestamp) => {
    return Date.now() - timestamp > CACHE_EXPIRY_TIME;
  };

  // 从缓存中获取数据
  const getDataFromCache = () => {
    if (typeof window === 'undefined') return null;
    
    try {
      const cachedData = localStorage.getItem(NOTION_CACHE_KEY);
      if (!cachedData) return null;
      
      const parsedData = JSON.parse(cachedData);
      if (isCacheExpired(parsedData.lastFetched)) return null;
      
      return parsedData;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  };

  // 将数据保存到缓存
  const saveDataToCache = (data) => {
    if (typeof window === 'undefined') return;
    
    try {
      const dataToCache = {
        ...data,
        lastFetched: Date.now()
      };
      localStorage.setItem(NOTION_CACHE_KEY, JSON.stringify(dataToCache));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  };

  // 优化的fetch函数，使用AbortController来取消过时请求
  const fetchNotionData = async () => {
    // 创建一个AbortController实例用于取消请求
    const controller = new AbortController();
    const signal = controller.signal;
    
    try {
      setNotionData(prev => ({ ...prev, isLoading: true }));
      
      // 首先尝试从缓存中获取数据
      const cachedData = getDataFromCache();
      if (cachedData) {
        setNotionData({
          cards: cachedData.cards || [],
          isLoading: false,
          error: null,
          lastFetched: cachedData.lastFetched
        });
        
        // 在后台刷新数据
        setTimeout(() => fetchFreshData(signal, controller), 100);
        return;
      }
      
      // 没有可用缓存时直接获取新数据
      await fetchFreshData(signal, controller);
      
    } catch (error) {
      // 忽略因组件卸载导致的错误
      if (error.name === 'AbortError') return;
      
      console.error('Error fetching Notion data:', error);
      setNotionData(prev => ({
        ...prev,
        isLoading: false,
        error: error.message
      }));
    }
    
    // 返回一个清理函数，而不是返回abortFetch函数
    return () => {
      controller.abort();
    };
  };
  
  // 获取新鲜数据的函数
  const fetchFreshData = async (signal, controller) => {
    try {
      // 添加请求超时处理
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 10000); // 10秒超时
      
      // 使用带信号的fetch
      const response = await fetch('/api/notion', { signal });
      
      clearTimeout(timeoutId); // 清除超时计时器
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      
      const newData = {
        cards: data.results || [],
        isLoading: false,
        error: null,
        lastFetched: Date.now()
      };
      
      setNotionData(newData);
      saveDataToCache(newData); // 保存到缓存
      
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
        return;
      }
      
      throw error; // 重新抛出其他错误
    }
  };

  // Reload data function for manual refreshes
  const reloadData = () => {
    // 强制刷新时清除缓存
    if (typeof window !== 'undefined') {
      localStorage.removeItem(NOTION_CACHE_KEY);
    }
    fetchNotionData();
  };

  // 记忆化的卡片数据，避免不必要的重渲染
  const cards = useMemo(() => notionData.cards, [notionData.cards]);

  // Auto-fetch data when the provider mounts
  useEffect(() => {
    const cleanup = fetchNotionData();
    
    // 使用返回的清理函数
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  // 导出优化后的context值
  const contextValue = useMemo(() => ({
    cards,
    isLoading: notionData.isLoading,
    error: notionData.error,
    reloadData,
    lastFetched: notionData.lastFetched
  }), [cards, notionData.isLoading, notionData.error, notionData.lastFetched]);

  return (
    <NotionContext.Provider value={contextValue}>
      {children}
    </NotionContext.Provider>
  );
}

// Custom hook to use the Notion context
export function useNotion() {
  const context = useContext(NotionContext);
  if (context === undefined) {
    throw new Error('useNotion must be used within a NotionProvider');
  }
  return context;
}