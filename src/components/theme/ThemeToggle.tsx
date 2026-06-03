"use client";

import { MoonStars, Sun } from "@phosphor-icons/react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const toLight = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={toLight ? "Chuyển nền giấy (sáng)" : "Chuyển nền đêm (tối)"}
      title={toLight ? "Nền giấy cổ" : "Nền đêm sao"}
      className="grid h-9 w-9 place-items-center rounded-xl border border-line text-fg-muted transition hover:border-line-strong hover:text-brass"
    >
      {toLight ? (
        <Sun size={17} weight="duotone" />
      ) : (
        <MoonStars size={17} weight="duotone" />
      )}
    </button>
  );
}
