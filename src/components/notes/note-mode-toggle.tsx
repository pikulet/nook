import { motion } from "framer-motion";
import { AlignLeft, CheckSquare } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useNote } from "@/hooks/use-note";
import type { ChecklistItem } from "@/types";

interface NoteModeToggleProps {
  noteId: string;
}

export function NoteModeToggle({ noteId }: NoteModeToggleProps) {
  const { note, update } = useNote(noteId);

  if (!note) return null;

  function handleToggle() {
    if (!note) return;

    if (note.mode === "freeform") {
      // Convert content lines to checklist items
      const lines = note.content
        .split("\n")
        .filter((l) => l.trim().length > 0);
      const items: ChecklistItem[] = lines.map((text) => ({
        id: uuidv4(),
        text: text.trim(),
        checked: false,
      }));
      update({ mode: "checklist", items, content: "" });
    } else {
      // Convert checklist items back to content string
      const content = note.items.map((i) => i.text).join("\n");
      update({ mode: "freeform", content, items: [] });
    }
  }

  const Icon = note.mode === "freeform" ? CheckSquare : AlignLeft;
  const label =
    note.mode === "freeform" ? "Switch to checklist" : "Switch to freeform";

  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        handleToggle();
      }}
      className="flex items-center justify-center rounded p-0.5 hover:bg-black/10"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={13} />
    </motion.button>
  );
}
