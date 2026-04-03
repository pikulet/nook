import { forwardRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Trash2 } from "lucide-react";

export const TrashCan = forwardRef<HTMLDivElement>(function TrashCan(_, ref) {
  const x = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth - 72 : 0
  );
  const y = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight - 120 : 0
  );

  return (
    <motion.div
      ref={ref}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        x,
        y,
        zIndex: 50,
        pointerEvents: "auto",
        cursor: "grab",
        userSelect: "none",
      }}
      drag
      dragMomentum={false}
      className="flex items-center justify-center w-12 h-12 rounded-xl
        bg-surface-overlay backdrop-blur-sm border border-border
        text-text-muted hover:text-text shadow-panel
        transition-colors duration-150"
      whileHover={{ scale: 1.1 }}
    >
      <Trash2 size={20} />
    </motion.div>
  );
});
