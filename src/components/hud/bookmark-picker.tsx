import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { bookmarkSprites } from "@/lib/bookmarks";
import { useBookmarkStore } from "@/store/bookmarks";

interface BookmarkPickerProps {
  open: boolean;
  onClose: () => void;
}

export function BookmarkPicker({ open, onClose }: BookmarkPickerProps) {
  const addBookmark = useBookmarkStore((s) => s.addBookmark);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!url.trim()) return;

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const offsetX = Math.round((Math.random() - 0.5) * 200);
      const offsetY = Math.round((Math.random() - 0.5) * 200);

      addBookmark({
        url: url.startsWith("http") ? url : `https://${url}`,
        title: title.trim() || url,
        spriteId: bookmarkSprites[0].id,
        x: cx + offsetX,
        y: cy + offsetY,
        scale: 1,
      });

      setUrl("");
      setTitle("");
      onClose();
    },
    [url, title, addBookmark, onClose]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={cn(
            "fixed bottom-[70px] left-1/2 -translate-x-1/2",
            "bg-surface-overlay backdrop-blur-md shadow-panel",
            "rounded-xl border border-border",
            "p-4 z-50 w-72"
          )}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={bookmarkSprites[0].frames[0]}
                alt="bookmark"
                className="w-8 h-8 object-contain"
                style={{ imageRendering: "pixelated" }}
              />
              <span className="text-sm font-medium text-text">
                Add Bookmark
              </span>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
              autoFocus
              className={cn(
                "w-full rounded-lg px-3 py-2 text-sm",
                "bg-white/10 border border-border",
                "text-text placeholder:text-text-muted",
                "outline-none focus:ring-2 focus:ring-accent"
              )}
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)"
              className={cn(
                "w-full rounded-lg px-3 py-2 text-sm",
                "bg-white/10 border border-border",
                "text-text placeholder:text-text-muted",
                "outline-none focus:ring-2 focus:ring-accent"
              )}
            />
            <button
              type="submit"
              className={cn(
                "w-full rounded-lg px-3 py-2 text-sm font-medium",
                "bg-accent text-white",
                "hover:opacity-90 transition-opacity",
                "outline-none focus:ring-2 focus:ring-accent"
              )}
            >
              Add
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
