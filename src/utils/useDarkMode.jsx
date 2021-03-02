import { useState, useEffect } from "react";

export function useDarkMode() {
  const preferDarkQuery = "(prefers-color-scheme: dark)";

  const [mode, setMode] = useState(() => {
    const lsVal = window.localStorage.getItem("colorMode");

    if (lsVal) {
      return lsVal === "dark" ? "dark" : "light";
    } else {
      return window.matchMedia(preferDarkQuery).matches ? "dark" : "light";
    }
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);

    const handleChange = () => {
      setMode(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  return [mode, setMode];
}
