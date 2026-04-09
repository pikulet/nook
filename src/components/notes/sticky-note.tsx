import { useRef, useState, useCallback, useEffect } from "react";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNote } from "@/hooks/use-note";
import { getNoteColorsForTheme } from "@/lib/note-colors";
import { NoteModeToggle } from "@/components/notes/note-mode-toggle";
import { ChecklistBody } from "@/components/notes/checklist-body";
import { useSettingsStore } from "@/store/settings";
import { cn } from "@/lib/cn";
import type { NoteColor, NoteShape } from "@/types";
import { NOTE_SHAPES } from "@/types";

const NOTE_COLORS: NoteColor[] = ["yellow", "green", "blue", "pink", "lavender", "peach"];

const shapeStyles: Record<NoteShape, { borderRadius: string; rotate?: string }> = {
  straight: { borderRadius: "0px" },
  soft: { borderRadius: "0px" },
  curled: { borderRadius: "0px" },
  "tilted-left": { borderRadius: "0px", rotate: "-1.5deg" },
  "tilted-right": { borderRadius: "0px", rotate: "1.5deg" },
};

interface StickyNoteProps {
  id: string;
  trashRef: React.RefObject<HTMLDivElement | null>;
}

export function StickyNote({ id, trashRef }: StickyNoteProps) {
  const { note, update, remove, toFront } = useNote(id);
  const theme = useSettingsStore((s) => s.theme);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleContentChange = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        update({ content: value });
      }, 300);
    },
    [update]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  if (!note) return null;

  const colors = getNoteColorsForTheme(note.color, theme);
  const shape = shapeStyles[note.shape] ?? shapeStyles[NOTE_SHAPES[Math.abs(note.id.charCodeAt(0)) % NOTE_SHAPES.length]];

  return (
    <Rnd
      position={{ x: note.x, y: note.y }}
      size={{ width: note.width, height: note.height }}
      minWidth={160}
      minHeight={120}
      style={{ zIndex: note.zIndex }}
      dragHandleClassName="note-drag-handle"
      onDragStart={() => {
        setIsDragging(true);
        toFront();
      }}
      onDragStop={(_e, d) => {
        setIsDragging(false);

        // Check if note center overlaps trash can
        if (trashRef?.current) {
          const rect = trashRef.current.getBoundingClientRect();
          const cx = d.x + note.width / 2;
          const cy = d.y + note.height / 2;
          if (cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom) {
            remove();
            return;
          }
        }

        const padding = 20;
        const clampedX = Math.max(
          padding - note.width + 40,
          Math.min(d.x, window.innerWidth - 40 - padding)
        );
        const clampedY = Math.max(
          padding,
          Math.min(d.y, window.innerHeight - 40 - padding)
        );
        update({ x: clampedX, y: clampedY });
      }}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        update({
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          x: position.x,
          y: position.y,
        });
      }}
      onMouseDown={() => toFront()}
    >
      <motion.div
        className="flex flex-col w-full h-full overflow-hidden select-none"
        style={{
          backgroundColor: colors.bg,
          border: "2px solid #1a1a1a",
          color: colors.text,
          borderRadius: shape.borderRadius,
          rotate: shape.rotate,
          boxShadow: isDragging
            ? "4px 4px 0px #1a1a1a"
            : "3px 3px 0px #1a1a1a",
          imageRendering: "pixelated",
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.1 }}
      >
        {/* Header */}
        <div className="note-drag-handle flex items-center justify-between px-3 py-2 cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Change color"
              className="w-3 h-3 hover:scale-125 transition-transform"
              style={{ backgroundColor: colors.border, border: "1px solid #1a1a1a" }}
              onClick={(e) => {
                e.stopPropagation();
                const idx = NOTE_COLORS.indexOf(note.color);
                const next = NOTE_COLORS[(idx + 1) % NOTE_COLORS.length];
                update({ color: next });
              }}
            />
            <NoteModeToggle noteId={id} />
          </div>
          <motion.button
            type="button"
            aria-label="Delete note"
            onClick={(e) => {
              e.stopPropagation();
              remove();
            }}
            className="flex items-center justify-center rounded p-0.5 hover:bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.6 : 0 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 0.15 }}
          >
            <X size={14} />
          </motion.button>
        </div>

        {/* Body */}
        <div className="flex-1 px-3 pb-3 overflow-hidden">
          {note.mode === "checklist" ? (
            <ChecklistBody noteId={id} />
          ) : (
            <textarea
              className="w-full h-full resize-none bg-transparent outline-none text-base leading-relaxed font-note tracking-wide placeholder:text-current/40"
              style={{ color: colors.text }}
              placeholder="write something..."
              defaultValue={note.content}
              onChange={(e) => handleContentChange(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </motion.div>
    </Rnd>
  );
}
