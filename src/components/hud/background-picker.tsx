import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { backgrounds } from "@/lib/backgrounds";
import { useSceneStore } from "@/store/scene";

export function BackgroundPicker() {
  const backgroundId = useSceneStore((s) => s.backgroundId);
  const setBackground = useSceneStore((s) => s.setBackground);

  return (
    <div className="grid grid-cols-2 gap-3">
      {backgrounds.map((bg) => {
        const isActive = bg.id === backgroundId;
        return (
          <motion.button
            key={bg.id}
            type="button"
            onClick={() => setBackground(bg.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg p-2",
              "outline-none focus-visible:ring-2 focus-visible:ring-accent",
              "transition-colors duration-150"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div
              className={cn(
                "relative flex h-[60px] w-full items-center justify-center rounded-md",
                "aspect-video overflow-hidden",
                isActive && "ring-2 ring-accent"
              )}
              style={{ background: `url(${bg.image}) center/cover no-repeat` }}
            >
              <span className="text-xl drop-shadow-md">{bg.emoji}</span>
            </div>
            <span
              className={cn(
                "text-xs",
                isActive ? "text-text font-medium" : "text-text-muted"
              )}
            >
              {bg.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
