import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  decorationDescriptors,
  type DecorationDescriptor,
} from "@/lib/decorations";
import { useSceneStore } from "@/store/scene";

interface DecorationPickerProps {
  open: boolean;
  onClose: () => void;
}

export function DecorationPicker({ open, onClose }: DecorationPickerProps) {
  const addDecoration = useSceneStore((s) => s.addDecoration);

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
            "p-3 z-50"
          )}
        >
          <div className="grid grid-cols-3 gap-2">
            {decorationDescriptors.map((d) => (
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
                <span className="text-2xl">{d.emoji}</span>
                <span className="text-xs text-text-muted">{d.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
