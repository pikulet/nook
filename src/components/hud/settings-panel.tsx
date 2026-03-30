import { cn } from "@/lib/cn";
import { useSettingsStore } from "@/store/settings";
import { Panel } from "@/components/ui/panel";
import { BackgroundPicker } from "@/components/hud/background-picker";
import { AccentPicker } from "@/components/hud/accent-picker";
import type { Theme } from "@/types";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

const THEMES: Theme[] = ["light", "dark"];

export function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const setSoundEnabled = useSettingsStore((s) => s.setSoundEnabled);
  const volume = useSettingsStore((s) => s.volume);
  const setVolume = useSettingsStore((s) => s.setVolume);

  return (
    <Panel open={open} onClose={onClose} title="settings">
      {/* Scene */}
      <section className="border-b border-border py-4">
        <h3 className="mb-2 text-xs uppercase tracking-wider text-text-muted">
          scene
        </h3>
        <BackgroundPicker />
      </section>

      {/* Theme */}
      <section className="border-b border-border py-4">
        <h3 className="mb-2 text-xs uppercase tracking-wider text-text-muted">
          theme
        </h3>
        <div className="flex gap-1 rounded-full bg-surface p-1">
          {THEMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={cn(
                "flex-1 rounded-full px-4 py-1.5 text-xs font-medium",
                "transition-colors duration-150",
                t === theme
                  ? "bg-accent-soft text-text"
                  : "text-text-muted hover:text-text"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Accent */}
      <section className="border-b border-border py-4">
        <h3 className="mb-2 text-xs uppercase tracking-wider text-text-muted">
          accent
        </h3>
        <AccentPicker />
      </section>

      {/* Sound */}
      <section className="py-4">
        <h3 className="mb-2 text-xs uppercase tracking-wider text-text-muted">
          sound
        </h3>
        <div className="space-y-3">
          {/* Volume slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted">vol</span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(volume * 100)}
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              className={cn(
                "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border",
                "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5",
                "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
                "[&::-webkit-slider-thumb]:bg-accent",
                "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5",
                "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0",
                "[&::-moz-range-thumb]:bg-accent"
              )}
            />
            <span className="w-8 text-right text-xs text-text-muted">
              {Math.round(volume * 100)}
            </span>
          </div>

          {/* Mute toggle */}
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className={cn(
                "h-4 w-4 rounded border-border",
                "accent-accent"
              )}
            />
            <span className="text-xs text-text">sound enabled</span>
          </label>
        </div>
      </section>
    </Panel>
  );
}
