import { memo, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { Decoration as DecorationType } from "@/types";
import { getDecorationDescriptor } from "@/lib/decorations";
import { getAnimationPreset } from "@/lib/animations";
import { useSceneStore } from "@/store/scene";

interface DecorationProps {
  decoration: DecorationType;
  trashRef?: React.RefObject<HTMLDivElement | null>;
}

/** Isolated sprite frame so state changes don't re-render the motion parent */
const SpriteFrame = memo(function SpriteFrame({
  frames,
  frameDuration,
  alt,
  width,
}: {
  frames: string[];
  frameDuration: number;
  alt: string;
  width: number;
}) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) return;
    const id = setInterval(() => {
      setFrameIndex((i) => (i + 1) % frames.length);
    }, frameDuration);
    return () => clearInterval(id);
  }, [frames.length, frameDuration]);

  return (
    <img
      src={frames[frameIndex]}
      alt={alt}
      width={width}
      draggable={false}
      style={{ imageRendering: "pixelated" }}
    />
  );
});

export function Decoration({ decoration, trashRef }: DecorationProps) {
  const moveDecoration = useSceneStore((s) => s.moveDecoration);
  const removeDecoration = useSceneStore((s) => s.removeDecoration);

  const x = useMotionValue(decoration.x);
  const y = useMotionValue(decoration.y);

  useEffect(() => {
    x.set(decoration.x);
    y.set(decoration.y);
  }, [decoration.x, decoration.y, x, y]);

  const descriptor = getDecorationDescriptor(decoration.spriteId);
  const preset = descriptor
    ? getAnimationPreset(descriptor.idleAnimation)
    : undefined;

  const handleDragEnd = useCallback(() => {
    const newX = x.get();
    const newY = y.get();

    if (trashRef?.current) {
      const rect = trashRef.current.getBoundingClientRect();
      const cx = newX + 16;
      const cy = newY + 16;
      if (
        cx >= rect.left &&
        cx <= rect.right &&
        cy >= rect.top &&
        cy <= rect.bottom
      ) {
        removeDecoration(decoration.id);
        return;
      }
    }

    moveDecoration(decoration.id, newX, newY);
  }, [decoration.id, x, y, moveDecoration, removeDecoration, trashRef]);

  if (!descriptor) return null;

  const spriteWidth = 120 * decoration.scale;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        x,
        y,
        zIndex: decoration.zIndex,
        cursor: "grab",
        userSelect: "none",
        pointerEvents: "auto",
      }}
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      animate={preset?.animate}
      transition={preset?.transition}
    >
      <SpriteFrame
        frames={descriptor.frames}
        frameDuration={descriptor.frameDuration ?? 800}
        alt={descriptor.label}
        width={spriteWidth}
      />
    </motion.div>
  );
}
