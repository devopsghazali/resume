import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "resume_theme";
const THEME_ANIM_MS = 260;

const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("theme-light");
  } else {
    root.classList.remove("theme-light");
  }
};

const animateThemeChange = () => {
  const root = document.documentElement;
  root.classList.add("theme-anim");
  window.setTimeout(() => {
    root.classList.remove("theme-anim");
  }, THEME_ANIM_MS);
};

const useTheme = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      animateThemeChange();
      applyTheme(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = saved ? (saved === "light" ? "light" : "dark") : prefersLight ? "light" : "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isTypingContext =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      if (isTypingContext) return;
      if (event.shiftKey && event.key.toLowerCase() === "t") {
        event.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleTheme]);

  return { theme, toggleTheme };
};

export default useTheme;
