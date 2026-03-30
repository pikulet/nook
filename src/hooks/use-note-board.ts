import { useNotesStore } from "@/store/notes";

export function useNoteBoard() {
  const notes = useNotesStore((s) => s.notes);
  const addNote = useNotesStore((s) => s.addNote);

  return { notes, addNote };
}
