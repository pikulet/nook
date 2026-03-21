import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { Note, NoteColor, NoteMode, ChecklistItem } from "@/types";

interface NotesStore {
  notes: Note[];
  maxZIndex: number;

  addNote: (partial?: Partial<Note>) => void;
  updateNote: (id: string, patch: Partial<Note>) => void;
  removeNote: (id: string) => void;
  bringToFront: (id: string) => void;

  addChecklistItem: (noteId: string, text: string) => void;
  toggleChecklistItem: (noteId: string, itemId: string) => void;
  removeChecklistItem: (noteId: string, itemId: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [],
      maxZIndex: 1,

      addNote: (partial = {}) => {
        const maxZ = get().maxZIndex + 1;
        const note: Note = {
          id: uuidv4(),
          mode: "freeform",
          color: "yellow",
          content: "",
          items: [],
          x: 100 + Math.random() * 200,
          y: 100 + Math.random() * 200,
          width: 220,
          height: 200,
          zIndex: maxZ,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          ...partial,
        };
        set((s) => ({ notes: [...s.notes, note], maxZIndex: maxZ }));
      },

      updateNote: (id, patch) => {
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n
          ),
        }));
      },

      removeNote: (id) => {
        set((s) => ({ notes: s.notes.filter((n) => n.id !== id) }));
      },

      bringToFront: (id) => {
        const maxZ = get().maxZIndex + 1;
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id ? { ...n, zIndex: maxZ } : n
          ),
          maxZIndex: maxZ,
        }));
      },

      addChecklistItem: (noteId, text) => {
        const item: ChecklistItem = {
          id: uuidv4(),
          text,
          checked: false,
        };
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === noteId
              ? { ...n, items: [...n.items, item], updatedAt: Date.now() }
              : n
          ),
        }));
      },

      toggleChecklistItem: (noteId, itemId) => {
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === noteId
              ? {
                  ...n,
                  items: n.items.map((i) =>
                    i.id === itemId ? { ...i, checked: !i.checked } : i
                  ),
                  updatedAt: Date.now(),
                }
              : n
          ),
        }));
      },

      removeChecklistItem: (noteId, itemId) => {
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === noteId
              ? {
                  ...n,
                  items: n.items.filter((i) => i.id !== itemId),
                  updatedAt: Date.now(),
                }
              : n
          ),
        }));
      },
    }),
    { name: "nook-notes" }
  )
);
