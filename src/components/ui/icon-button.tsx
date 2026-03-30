import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  size?: number;
  className?: string;
}

export function IconButton({
  icon: Icon,
  label,
  onClick,
  size = 18,
  className,
}: IconButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-lg p-2",
        "text-text-muted hover:text-text",
        "hover:bg-accent-soft/50",
        "transition-colors duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Icon size={size} />
    </motion.button>
  );
}
