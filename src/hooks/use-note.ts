import { useCallback } from "react";
import { useNotesStore } from "@/store/notes";
import type { Note } from "@/types";

export function useNote(id: string) {
  const note = useNotesStore((s) => s.notes.find((n) => n.id === id));
  const updateNote = useNotesStore((s) => s.updateNote);
  const removeNote = useNotesStore((s) => s.removeNote);
  const bringToFront = useNotesStore((s) => s.bringToFront);
  const addChecklistItem = useNotesStore((s) => s.addChecklistItem);
  const toggleChecklistItem = useNotesStore((s) => s.toggleChecklistItem);
  const removeChecklistItem = useNotesStore((s) => s.removeChecklistItem);

  const update = useCallback(
    (patch: Partial<Note>) => updateNote(id, patch),
    [id, updateNote]
  );

  const remove = useCallback(() => removeNote(id), [id, removeNote]);

  const toFront = useCallback(
    () => bringToFront(id),
    [id, bringToFront]
  );

  const addItem = useCallback(
    (text: string) => addChecklistItem(id, text),
    [id, addChecklistItem]
  );

  const toggleItem = useCallback(
    (itemId: string) => toggleChecklistItem(id, itemId),
    [id, toggleChecklistItem]
  );

  const removeItem = useCallback(
    (itemId: string) => removeChecklistItem(id, itemId),
    [id, removeChecklistItem]
  );

  return {
    note,
    update,
    remove,
    toFront,
    addItem,
    toggleItem,
    removeItem,
  };
}
