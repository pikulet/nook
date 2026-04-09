import { useEffect, useRef, useState } from "react";
import { useNoteBoard } from "@/hooks/use-note-board";
import { useNotesStore } from "@/store/notes";
import { StickyNote } from "@/components/notes/sticky-note";

function useWelcomeNotes() {
  const hasRun = useRef(false);
  const [hydrated, setHydrated] = useState(false);

  // Wait for Zustand persist to finish rehydrating from localStorage
  // before checking store state. Without this, we race against rehydration.
  useEffect(() => {
    const unsub = useNotesStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    // If already hydrated (e.g. sync storage), set immediately
    if (useNotesStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    return unsub;
  }, []);

  useEffect(() => {
    if (!hydrated || hasRun.current) return;
    hasRun.current = true;

    const notes = useNotesStore.getState().notes;
    if (notes.length > 0) return;

    const addNote = useNotesStore.getState().addNote;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    addNote({
      color: "lavender",
      content:
        "welcome to nook\n\nyour calm corner for thoughts and todos.\n\ndrag me around, resize me, or click + below to add more notes.",
      x: Math.max(40, vw / 2 - 130),
      y: Math.max(40, vh / 2 - 160),
      width: 260,
      height: 240,
    });

    addNote({
      color: "green",
      content:
        "tips\n\npress N — new note\npress M — toggle sound\n\nuse the toolbar below to add decorations and change your scene.",
      x: Math.max(40, vw / 2 + 160),
      y: Math.max(40, vh / 2 - 80),
      width: 240,
      height: 200,
    });
  }, [hydrated]);
}

interface NoteBoardProps {
  trashRef: React.RefObject<HTMLDivElement | null>;
}

export function NoteBoard({ trashRef }: NoteBoardProps) {
  const { notes } = useNoteBoard();
  useWelcomeNotes();

  return (
    <div className="absolute inset-0 z-20 pointer-events-none [&>*]:pointer-events-auto">
      {notes.map((note) => (
        <StickyNote key={note.id} id={note.id} trashRef={trashRef} />
      ))}
    </div>
  );
}
