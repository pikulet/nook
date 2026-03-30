import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { Decoration as DecorationType } from "@/types";
import { getDecorationDescriptor } from "@/lib/decorations";
import { getAnimationPreset } from "@/lib/animations";
import { useSceneStore } from "@/store/scene";

interface DecorationProps {
  decoration: DecorationType;
}

export function Decoration({ decoration }: DecorationProps) {
  const moveDecoration = useSceneStore((s) => s.moveDecoration);
  const removeDecoration = useSceneStore((s) => s.removeDecoration);
  const [dragging, setDragging] = useState(false);

  const descriptor = getDecorationDescriptor(decoration.spriteId);
  const preset = descriptor
    ? getAnimationPreset(descriptor.idleAnimation)
    : undefined;

  const handleDragEnd = useCallback(
    (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: { offset: { x: number; y: number } }
    ) => {
      setDragging(false);
      moveDecoration(
        decoration.id,
        decoration.x + info.offset.x,
        decoration.y + info.offset.y
      );
    },
    [decoration.id, decoration.x, decoration.y, moveDecoration]
  );

  const handleDoubleClick = useCallback(() => {
    removeDecoration(decoration.id);
  }, [decoration.id, removeDecoration]);

  if (!descriptor) return null;

  const fontSize = 2 * decoration.scale;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: decoration.x,
        top: decoration.y,
        zIndex: decoration.zIndex,
        fontSize: `${fontSize}rem`,
        lineHeight: 1,
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
        pointerEvents: "auto",
      }}
      drag
      dragMomentum={false}
      onDragStart={() => setDragging(true)}
      onDragEnd={handleDragEnd}
      onDoubleClick={handleDoubleClick}
      animate={preset?.animate}
      transition={preset?.transition}
      whileHover={{ scale: 1.1 }}
    >
      {descriptor.emoji}
    </motion.div>
  );
}
