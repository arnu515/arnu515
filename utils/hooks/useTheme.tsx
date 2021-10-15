import React from "react";

export interface IThemeContext {
  theme: "light" | "dark";
  toggle: () => void;
  setTheme: (theme: IThemeContext["theme"]) => void;
}

export const ThemeContext = React.createContext<IThemeContext>({
  theme: "light",
  toggle: () => {},
  setTheme: (_: string) => {}
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState<IThemeContext["theme"]>("light");

  React.useEffect(() => {
    const themeFromLS = localStorage.getItem("theme");
    if (!themeFromLS) {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(dark ? "dark" : "light");
    } else if (themeFromLS === "dark") {
      setTheme("dark");
    } else setTheme("light");
  }, []);

  React.useEffect(() => {
    console.log({ theme });
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", theme);
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle: () => setTheme(theme => (theme === "dark" ? "light" : "dark")),
        setTheme: theme => setTheme(theme)
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  return React.useContext(ThemeContext);
}
