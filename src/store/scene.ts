import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { SceneConfig, Decoration, BackgroundId } from "@/types";

interface SceneStore extends SceneConfig {
  setBackground: (id: BackgroundId) => void;
  addDecoration: (partial: Omit<Decoration, "id" | "zIndex">) => void;
  moveDecoration: (id: string, x: number, y: number) => void;
  scaleDecoration: (id: string, scale: number) => void;
  removeDecoration: (id: string) => void;
}

export const useSceneStore = create<SceneStore>()(
  persist(
    (set, get) => ({
      backgroundId: "reading-library",
      decorations: [],

      setBackground: (backgroundId) => set({ backgroundId }),

      addDecoration: (partial) => {
        const decoration: Decoration = {
          id: uuidv4(),
          zIndex: get().decorations.length + 1,
          ...partial,
        };
        set((s) => ({ decorations: [...s.decorations, decoration] }));
      },

      moveDecoration: (id, x, y) => {
        set((s) => ({
          decorations: s.decorations.map((d) =>
            d.id === id ? { ...d, x, y } : d
          ),
        }));
      },

      scaleDecoration: (id, scale) => {
        set((s) => ({
          decorations: s.decorations.map((d) =>
            d.id === id ? { ...d, scale: Math.max(0.25, Math.min(3, scale)) } : d
          ),
        }));
      },

      removeDecoration: (id) => {
        set((s) => ({
          decorations: s.decorations.filter((d) => d.id !== id),
        }));
      },
    }),
    { name: "nook-scene" }
  )
);
