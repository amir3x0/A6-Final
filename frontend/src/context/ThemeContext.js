import React, { createContext, useContext, useEffect } from "react";
import { useUser } from "./UserContext"; // Ensure this path is correct

const ThemeContext = createContext({
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const { user, updateUser } = useUser(); // Assuming `updateUser` can update the user's theme

  useEffect(() => {
    const themeClass = user?.theme === "dark" ? "dark" : "light";
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(themeClass);
  }, [user?.theme]);

  const toggleTheme = () => {
    const newTheme = user?.theme === 'light' ? 'dark' : 'light';
    // Assuming updateUser function can update the user context including theme
    updateUser({ ...user, theme: newTheme });

    // Update the theme class on the document element
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);
  };

  // We don't pass theme in the context value since it's obtained from the user context
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
