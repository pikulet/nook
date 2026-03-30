import type { TargetAndTransition, Transition } from "framer-motion";

export interface AnimationPreset {
  animate: TargetAndTransition;
  transition: Transition;
}

export const animationPresets: Record<string, AnimationPreset> = {
  sway: {
    animate: { rotate: [-3, 3] },
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut",
      repeatType: "reverse",
    },
  },
  breathe: {
    animate: { scale: [0.97, 1.03] },
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: "easeInOut",
      repeatType: "reverse",
    },
  },
  bob: {
    animate: { y: [-3, 3] },
    transition: {
      repeat: Infinity,
      duration: 2.5,
      ease: "easeInOut",
      repeatType: "reverse",
    },
  },
};

export function getAnimationPreset(name: string): AnimationPreset | undefined {
  return animationPresets[name];
}
