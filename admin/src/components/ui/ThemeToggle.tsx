import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const goingDark = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={goingDark ? "Switch to dark mode" : "Switch to light mode"}
      title={goingDark ? "Switch to dark mode" : "Switch to light mode"}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-subtle transition-colors hover:bg-raised hover:text-fg ${className}`}
    >
      {goingDark ? (
        <Moon className="h-4 w-4 shrink-0" aria-hidden />
      ) : (
        <Sun className="h-4 w-4 shrink-0" aria-hidden />
      )}
      <span>{goingDark ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}
