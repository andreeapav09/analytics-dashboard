import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context object
const ThemeContext = createContext();

/**
 * ThemeProvider Component
 * Wraps children in ThemeContext.Provider to broadcast theme state globally.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom Hook: useTheme
 * Allows any component in the app to access { theme, toggleTheme } instantly!
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
