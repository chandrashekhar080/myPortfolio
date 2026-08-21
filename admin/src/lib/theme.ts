export type Theme = "light" | "dark";

/** Shared with the boot script in index.html — keep the two in step. */
export const THEME_KEY = "portfolio-admin-theme";

/** What the boot script already decided, so React starts from the same value. */
export function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* storage unavailable — the choice just will not survive a reload */
  }
}
