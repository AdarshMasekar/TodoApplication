import React, { createContext, useContext, useState,useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
          setTheme(storedTheme);
        } else {
          // Check system preference on first load
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          setTheme(prefersDark ? 'dark' : 'light');
        }

        // Listen for system theme changes
        const handleSystemThemeChange = (event) => {
          setTheme(event.matches ? 'dark' : 'light');
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
          mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
      }, []);

      useEffect(() => {
        localStorage.setItem('theme', theme);
      }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    };

    const contextValues = {
        theme,
        toggleTheme,
    };

    return <ThemeContext.Provider value={contextValues}>
        <div className={theme === 'dark'? 'dark':'light'}>
            {children}
        </div>
    </ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);


export { ThemeContext, ThemeProvider };
