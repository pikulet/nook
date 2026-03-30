import { useEffect } from "react";
import { useSettingsStore } from "@/store/settings";
import { useNotesStore } from "@/store/notes";

export function useKeyboardShortcuts() {
  const setSoundEnabled = useSettingsStore((s) => s.setSoundEnabled);
  const addNote = useNotesStore((s) => s.addNote);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore when typing in inputs
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      switch (e.key.toLowerCase()) {
        case "m": {
          const current = useSettingsStore.getState().soundEnabled;
          setSoundEnabled(!current);
          break;
        }
        case "n": {
          const cx =
            window.innerWidth / 2 - 110 + (Math.random() - 0.5) * 120;
          const cy =
            window.innerHeight / 2 - 100 + (Math.random() - 0.5) * 120;
          addNote({ x: cx, y: cy });
          break;
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSoundEnabled, addNote]);
}
