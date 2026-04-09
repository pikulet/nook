import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  decorationDescriptors,
  categoryLabels,
  categoryOrder,
  type DecorationDescriptor,
  type DecorationCategory,
} from "@/lib/decorations";
import { useSceneStore } from "@/store/scene";

interface DecorationPickerProps {
  open: boolean;
  onClose: () => void;
}

export function DecorationPicker({ open, onClose }: DecorationPickerProps) {
  const addDecoration = useSceneStore((s) => s.addDecoration);
  const [activeCategory, setActiveCategory] =
    useState<DecorationCategory>("creature");

  const handleSelect = useCallback(
    (descriptor: DecorationDescriptor) => {
      const cx = typeof window !== "undefined" ? window.innerWidth / 2 : 400;
      const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 300;
      const offsetX = Math.round((Math.random() - 0.5) * 200);
      const offsetY = Math.round((Math.random() - 0.5) * 200);

      addDecoration({
        type: descriptor.type,
        spriteId: descriptor.id,
        x: cx + offsetX,
        y: cy + offsetY,
        scale: descriptor.defaultScale,
      });

      onClose();
    },
    [addDecoration, onClose]
  );

  const filtered = decorationDescriptors.filter(
    (d) => d.type === activeCategory
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={cn(
            "fixed bottom-[70px] left-1/2 -translate-x-1/2",
            "bg-surface-overlay backdrop-blur-md shadow-panel",
            "rounded-xl border border-border",
            "p-3 z-50 w-[320px]"
          )}
        >
          {/* Category tabs */}
          <div className="flex gap-1 mb-3">
            {categoryOrder.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-lg transition-colors duration-150 border",
                  activeCategory === cat
                    ? "bg-accent text-white border-accent shadow-sm"
                    : "bg-surface-overlay text-text-muted border-border hover:border-accent/50"
                )}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Sprite grid */}
          <div className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto">
            {filtered.map((d) => (
              <motion.button
                key={d.id}
                type="button"
                onClick={() => handleSelect(d)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg p-2",
                  "hover:bg-accent-soft/50 transition-colors duration-150",
                  "outline-none focus-visible:ring-2 focus-visible:ring-accent"
                )}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={d.frames[0]}
                  alt={d.label}
                  className="w-12 h-12 object-contain"
                  style={{ imageRendering: "pixelated" }}
                  draggable={false}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
