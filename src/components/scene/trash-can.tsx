import { forwardRef } from "react";
import { motion, useMotionValue } from "framer-motion";

function PixelTrashIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Lid handle */}
      <rect x="6" y="1" width="4" height="1" fill="currentColor" />
      {/* Lid */}
      <rect x="3" y="2" width="10" height="2" fill="currentColor" />
      {/* Body left wall */}
      <rect x="4" y="4" width="1" height="9" fill="currentColor" />
      {/* Body right wall */}
      <rect x="11" y="4" width="1" height="9" fill="currentColor" />
      {/* Body bottom */}
      <rect x="4" y="13" width="8" height="1" fill="currentColor" />
      {/* Inner lines */}
      <rect x="6" y="5" width="1" height="7" fill="currentColor" opacity="0.5" />
      <rect x="9" y="5" width="1" height="7" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

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
      <PixelTrashIcon size={22} />
    </motion.div>
  );
});
