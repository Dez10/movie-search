import { createContext, useContext, useState, useEffect } from 'react';

const SearchHistoryContext = createContext();

export const SearchHistoryProvider = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (searchQuery, filters = {}) => {
    const searchEntry = {
      id: Date.now(),
      query: searchQuery,
      filters,
      timestamp: new Date().toISOString(),
    };

    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.query !== searchQuery);
      return [searchEntry, ...filtered].slice(0, 10); // Keep last 10 searches
    });
  };

  const removeFromHistory = (searchId) => {
    setSearchHistory(prev => prev.filter(item => item.id !== searchId));
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <SearchHistoryContext.Provider 
      value={{ 
        searchHistory, 
        addToHistory, 
        removeFromHistory, 
        clearHistory 
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
};
