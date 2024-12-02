import React, { createContext, useContext, useState } from "react";

// Create Theme Context
const ThemeContext = createContext();

// ThemeProvider
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using Theme Context
export const useTheme = () => useContext(ThemeContext);