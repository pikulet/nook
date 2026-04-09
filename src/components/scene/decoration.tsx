import { memo, useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
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

const SCALE_STEP = 0.25;

export function Decoration({ decoration, trashRef }: DecorationProps) {
  const moveDecoration = useSceneStore((s) => s.moveDecoration);
  const scaleDecoration = useSceneStore((s) => s.scaleDecoration);
  const removeDecoration = useSceneStore((s) => s.removeDecoration);
  const [selected, setSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(decoration.x);
  const y = useMotionValue(decoration.y);

  useEffect(() => {
    x.set(decoration.x);
    y.set(decoration.y);
  }, [decoration.x, decoration.y, x, y]);

  // Dismiss on click outside
  useEffect(() => {
    if (!selected) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelected(false);
      }
    }
    window.addEventListener("pointerdown", handleClick);
    return () => window.removeEventListener("pointerdown", handleClick);
  }, [selected]);

  const descriptor = getDecorationDescriptor(decoration.spriteId);
  const preset = descriptor
    ? getAnimationPreset(descriptor.idleAnimation)
    : undefined;

  const wasDragged = useRef(false);

  const handleDragStart = useCallback(() => {
    wasDragged.current = false;
  }, []);

  const handleDrag = useCallback(() => {
    wasDragged.current = true;
  }, []);

  const handleDragEnd = useCallback(() => {
    const newX = x.get();
    const newY = y.get();

    if (trashRef?.current) {
      const rect = trashRef.current.getBoundingClientRect();
      const halfW = (120 * decoration.scale) / 2;
      const halfH = (120 * decoration.scale) / 2;
      const cx = newX + halfW;
      const cy = newY + halfH;
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
  }, [decoration.id, decoration.scale, x, y, moveDecoration, removeDecoration, trashRef]);

  const handleClick = useCallback(() => {
    if (!wasDragged.current) {
      setSelected((s) => !s);
    }
  }, []);

  const handleScaleUp = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    scaleDecoration(decoration.id, decoration.scale + SCALE_STEP);
  }, [decoration.id, decoration.scale, scaleDecoration]);

  const handleScaleDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    scaleDecoration(decoration.id, decoration.scale - SCALE_STEP);
  }, [decoration.id, decoration.scale, scaleDecoration]);

  // Corner-drag resize
  const resizeOrigin = useRef<{ pointerX: number; startScale: number } | null>(null);

  const handleResizePointerDown = useCallback((e: ReactPointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    resizeOrigin.current = { pointerX: e.clientX, startScale: decoration.scale };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [decoration.scale]);

  const handleResizePointerMove = useCallback((e: ReactPointerEvent) => {
    if (!resizeOrigin.current) return;
    const dx = e.clientX - resizeOrigin.current.pointerX;
    const newScale = resizeOrigin.current.startScale + dx / 120;
    scaleDecoration(decoration.id, newScale);
  }, [decoration.id, scaleDecoration]);

  const handleResizePointerUp = useCallback(() => {
    resizeOrigin.current = null;
    // Reset so the next click on the decoration correctly toggles selection
    wasDragged.current = false;
  }, []);

  if (!descriptor) return null;

  const spriteWidth = 120 * decoration.scale;

  return (
    <motion.div
      ref={containerRef}
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
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      animate={preset?.animate}
      transition={preset?.transition}
    >
      <div className="relative inline-block">
        {/* Selection ring */}
        {selected && (
          <div
            className="absolute -inset-1 rounded border-2 border-accent/50 pointer-events-none"
            style={{ imageRendering: "auto" }}
          />
        )}

        <SpriteFrame
          frames={descriptor.frames}
          frameDuration={descriptor.frameDuration ?? 800}
          alt={descriptor.label}
          width={spriteWidth}
        />

        {/* Resize handle (top-right corner drag) */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onPointerDown={handleResizePointerDown}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              className="absolute w-5 h-5 cursor-se-resize flex items-center justify-center"
              style={{
                right: -4,
                top: -4,
                touchAction: "none",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-text-muted drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                <path d="M2 10L10 2M6 10L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
