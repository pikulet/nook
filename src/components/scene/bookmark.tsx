import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { Bookmark as BookmarkType } from "@/types";
import { getBookmarkSprite } from "@/lib/bookmarks";
import { getAnimationPreset } from "@/lib/animations";
import { useBookmarkStore } from "@/store/bookmarks";

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

interface BookmarkProps {
  bookmark: BookmarkType;
  trashRef?: React.RefObject<HTMLDivElement | null>;
}

export function Bookmark({ bookmark, trashRef }: BookmarkProps) {
  const moveBookmark = useBookmarkStore((s) => s.moveBookmark);
  const removeBookmark = useBookmarkStore((s) => s.removeBookmark);

  const x = useMotionValue(bookmark.x);
  const y = useMotionValue(bookmark.y);
  const isDragging = useRef(false);

  useEffect(() => {
    x.set(bookmark.x);
    y.set(bookmark.y);
  }, [bookmark.x, bookmark.y, x, y]);

  const sprite = getBookmarkSprite(bookmark.spriteId);
  const preset = getAnimationPreset("bob");

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleDragEnd = useCallback(() => {
    const newX = x.get();
    const newY = y.get();

    // Check trash
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
        removeBookmark(bookmark.id);
        return;
      }
    }

    moveBookmark(bookmark.id, newX, newY);
    // Small delay so click handler can check isDragging
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  }, [bookmark.id, x, y, moveBookmark, removeBookmark, trashRef]);

  const handleClick = useCallback(() => {
    if (isDragging.current) return;
    window.open(bookmark.url, "_blank");
  }, [bookmark.url]);

  if (!sprite) return null;

  const spriteWidth = 90 * bookmark.scale;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        x,
        y,
        zIndex: bookmark.zIndex,
        cursor: "pointer",
        userSelect: "none",
        pointerEvents: "auto",
      }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      animate={preset?.animate}
      transition={preset?.transition}
    >
      <SpriteFrame
        frames={sprite.frames}
        frameDuration={sprite.frameDuration}
        alt={bookmark.title}
        width={spriteWidth}
      />
      <div className="text-center text-[10px] text-white/80 mt-1 max-w-[90px] truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {bookmark.title}
      </div>
    </motion.div>
  );
}
