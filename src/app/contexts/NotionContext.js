'use client';

import { createContext, useState, useContext, useEffect } from 'react';

// Create the Notion context
const NotionContext = createContext();

// Notion provider component
export function NotionProvider({ children }) {
  const [notionData, setNotionData] = useState({
    cards: [],
    isLoading: true,
    error: null
  });

  // Fetch data from API route that will handle Notion requests
  const fetchNotionData = async () => {
    try {
      setNotionData(prev => ({ ...prev, isLoading: true }));
      
      // This will call our API route that handles Notion data fetching
      const response = await fetch('/api/notion');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      
      setNotionData({
        cards: data.results || [],
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching Notion data:', error);
      setNotionData({
        cards: [],
        isLoading: false,
        error: error.message
      });
    }
  };

  // Reload data function for manual refreshes
  const reloadData = () => {
    fetchNotionData();
  };

  // Auto-fetch data when the provider mounts
  useEffect(() => {
    fetchNotionData();
  }, []);

  return (
    <NotionContext.Provider value={{ 
      ...notionData, 
      reloadData 
    }}>
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