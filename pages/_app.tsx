import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";

export default function Application({ Component, pageProps }) {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (dark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else localStorage.setItem("theme", "light");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else localStorage.setItem("theme", "light");
  }, []);

  return (
    <>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  );
}
