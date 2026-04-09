import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserSettings, Theme } from "@/types";

interface SettingsStore extends UserSettings {
  setTheme: (theme: Theme) => void;
  setAccentColor: (hex: string) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  activeTrackId: string;
  setActiveTrackId: (id: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: "light",
      accentColor: "#7c9e87",
      soundEnabled: true,
      volume: 0.5,
      activeTrackId: "sunlight-nook",

      setTheme: (theme) => set({ theme }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setVolume: (volume) => set({ volume }),
      setActiveTrackId: (activeTrackId) => set({ activeTrackId }),
    }),
    { name: "nook-settings" }
  )
);
