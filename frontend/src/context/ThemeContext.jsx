import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );

    document.body.style.backgroundColor = darkMode
      ? "#020617"
      : "#f8fafc";

    document.body.style.transition = "0.3s";
  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{ darkMode, setDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);