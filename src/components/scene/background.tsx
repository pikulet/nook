import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSceneStore } from "@/store/scene";
import { getBackground } from "@/lib/backgrounds";

export function Background() {
  const backgroundId = useSceneStore((s) => s.backgroundId);
  const bg = getBackground(backgroundId);
  const prevBgId = useRef(backgroundId);
  const isTransition = prevBgId.current !== backgroundId;
  prevBgId.current = backgroundId;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={bg.id}
        className="absolute inset-0"
        style={{ background: bg.gradient }}
        initial={isTransition ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </AnimatePresence>
  );
}
