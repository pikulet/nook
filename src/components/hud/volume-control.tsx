import { Volume2, VolumeX } from "lucide-react";
import { useSettingsStore } from "@/store/settings";
import { IconButton } from "@/components/ui/icon-button";

export function VolumeControl() {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const volume = useSettingsStore((s) => s.volume);
  const setSoundEnabled = useSettingsStore((s) => s.setSoundEnabled);
  const setVolume = useSettingsStore((s) => s.setVolume);

  return (
    <div className="flex items-center gap-1">
      <IconButton
        icon={soundEnabled ? Volume2 : VolumeX}
        label={soundEnabled ? "Mute" : "Unmute"}
        onClick={() => setSoundEnabled(!soundEnabled)}
      />
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-16 h-1 appearance-none bg-border rounded-full cursor-pointer accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
        aria-label="Volume"
      />
    </div>
  );
}
