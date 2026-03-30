import { useEffect } from "react";
import { useSettingsStore } from "@/store/settings";

export function useTheme() {
  const theme = useSettingsStore((s) => s.theme);
  const accentColor = useSettingsStore((s) => s.accentColor);
  const setTheme = useSettingsStore((s) => s.setTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent", accentColor);

    // Derive accent-soft from the chosen accent color
    // Parse hex to RGB, then apply as low-opacity for light or dark themes
    const r = parseInt(accentColor.slice(1, 3), 16);
    const g = parseInt(accentColor.slice(3, 5), 16);
    const b = parseInt(accentColor.slice(5, 7), 16);
    const soft =
      theme === "dark"
        ? `rgba(${r}, ${g}, ${b}, 0.15)`
        : `rgba(${r}, ${g}, ${b}, 0.2)`;
    document.documentElement.style.setProperty("--color-accent-soft", soft);
  }, [accentColor, theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return { theme, toggleTheme };
}
