import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useSettingsStore } from "@/store/settings";

const SWATCHES = [
  { name: "sage", hex: "#7c9e87" },
  { name: "sky", hex: "#6b9dbd" },
  { name: "coral", hex: "#c4756e" },
  { name: "lavender", hex: "#8b7db8" },
  { name: "honey", hex: "#b8a44c" },
  { name: "slate", hex: "#6b7b8d" },
  { name: "rose", hex: "#c47b9b" },
  { name: "forest", hex: "#5a8a6a" },
] as const;

export function AccentPicker() {
  const accentColor = useSettingsStore((s) => s.accentColor);
  const setAccentColor = useSettingsStore((s) => s.setAccentColor);
  const [customHex, setCustomHex] = useState(accentColor);

  function handleCustomApply() {
    const trimmed = customHex.trim();
    if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
      setAccentColor(trimmed);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleCustomApply();
    }
  }

  return (
    <div className="space-y-3">
      {/* Swatches */}
      <div className="flex flex-wrap gap-2">
        {SWATCHES.map((swatch) => {
          const isActive =
            accentColor.toLowerCase() === swatch.hex.toLowerCase();
          return (
            <motion.button
              key={swatch.name}
              type="button"
              aria-label={swatch.name}
              title={swatch.name}
              onClick={() => {
                setAccentColor(swatch.hex);
                setCustomHex(swatch.hex);
              }}
              className={cn(
                "h-7 w-7 rounded-full outline-none",
                "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                isActive && "ring-2 ring-accent ring-offset-2"
              )}
              style={{ backgroundColor: swatch.hex }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            />
          );
        })}
      </div>

      {/* Custom hex input */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-muted">#</span>
        <input
          type="text"
          value={customHex.replace(/^#/, "")}
          onChange={(e) => setCustomHex(`#${e.target.value}`)}
          onBlur={handleCustomApply}
          onKeyDown={handleKeyDown}
          maxLength={6}
          className={cn(
            "w-full rounded-md border border-border bg-surface px-2 py-1",
            "text-xs text-text",
            "outline-none focus:ring-1 focus:ring-accent",
            "transition-colors duration-150"
          )}
          placeholder="7c9e87"
        />
        <div
          className="h-5 w-5 shrink-0 rounded-full border border-border"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </div>
  );
}
