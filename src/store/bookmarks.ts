import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { Bookmark } from "@/types";

interface BookmarkStore {
  bookmarks: Bookmark[];
  addBookmark: (partial: Omit<Bookmark, "id" | "zIndex">) => void;
  moveBookmark: (id: string, x: number, y: number) => void;
  updateBookmark: (id: string, updates: Partial<Pick<Bookmark, "url" | "title">>) => void;
  removeBookmark: (id: string) => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (partial) => {
        const bookmark: Bookmark = {
          id: uuidv4(),
          zIndex: get().bookmarks.length + 1,
          ...partial,
        };
        set((s) => ({ bookmarks: [...s.bookmarks, bookmark] }));
      },

      moveBookmark: (id, x, y) => {
        set((s) => ({
          bookmarks: s.bookmarks.map((b) =>
            b.id === id ? { ...b, x, y } : b
          ),
        }));
      },

      updateBookmark: (id, updates) => {
        set((s) => ({
          bookmarks: s.bookmarks.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        }));
      },

      removeBookmark: (id) => {
        set((s) => ({
          bookmarks: s.bookmarks.filter((b) => b.id !== id),
        }));
      },
    }),
    { name: "nook-bookmarks" }
  )
);
