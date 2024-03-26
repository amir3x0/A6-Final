import React, { useEffect } from "react";
import { useUser } from "./UserContext";

const ThemeProvider = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    const themeClass = user?.theme === "dark" ? "dark" : "light";
    document.documentElement.classList.remove('dark', 'light'); 
    document.documentElement.classList.add(themeClass); 
  }, [user?.theme]);

  return <>{children}</>;
};

export default ThemeProvider;
