import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useNote } from "@/hooks/use-note";
import { cn } from "@/lib/cn";

interface ChecklistBodyProps {
  noteId: string;
}

export function ChecklistBody({ noteId }: ChecklistBodyProps) {
  const { note, toggleItem, removeItem, addItem, editItem } = useNote(noteId);
  const [newItemText, setNewItemText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  if (!note) return null;

  function handleAddItem() {
    const text = newItemText.trim();
    if (!text) return;
    addItem(text);
    setNewItemText("");
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col gap-1 overflow-y-auto flex-1" onMouseDown={(e) => e.stopPropagation()}>
      <AnimatePresence initial={false}>
        {note.items.map((item) => (
          <motion.div
            key={item.id}
            className="group flex items-center gap-2 py-0.5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Checkbox
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
            />
            <textarea
              defaultValue={item.text}
              onChange={(e) => {
                editItem(item.id, e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onFocus={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              rows={1}
              className={cn(
                "flex-1 text-base leading-snug font-note tracking-wide bg-transparent outline-none resize-none overflow-hidden",
                item.checked && "line-through opacity-40"
              )}
            />
            <button
              type="button"
              aria-label="Remove item"
              onClick={() => removeItem(item.id)}
              className="opacity-0 group-hover:opacity-50 hover:!opacity-100 p-0.5 transition-opacity"
            >
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <input
        ref={inputRef}
        type="text"
        className="text-base font-note tracking-wide bg-transparent outline-none placeholder:text-current/30 mt-1 py-0.5"
        placeholder="add item..."
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddItem();
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
      />
    </div>
  );
}
