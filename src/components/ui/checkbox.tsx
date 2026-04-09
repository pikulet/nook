import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({ checked, onChange, className }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center justify-center w-[18px] h-[18px] rounded border-2 shrink-0",
        "transition-colors duration-150",
        checked
          ? "bg-accent border-accent"
          : "bg-transparent border-current/30 hover:border-current/50",
        className
      )}
    >
      <motion.svg
        width="12"
        height="12"
        viewBox="0 0 10 10"
        initial={false}
        animate={checked ? "checked" : "unchecked"}
      >
        <motion.path
          d="M2 5L4.5 7.5L8 3"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            unchecked: { pathLength: 0, opacity: 0 },
            checked: { pathLength: 1, opacity: 1 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.svg>
    </button>
  );
}
