import { useBookmarkStore } from "@/store/bookmarks";
import { Bookmark } from "@/components/scene/bookmark";

interface BookmarkLayerProps {
  trashRef: React.RefObject<HTMLDivElement | null>;
}

export function BookmarkLayer({ trashRef }: BookmarkLayerProps) {
  const bookmarks = useBookmarkStore((s) => s.bookmarks);

  return (
    <div className="absolute inset-0 z-25 pointer-events-none">
      {bookmarks.map((b) => (
        <Bookmark key={b.id} bookmark={b} trashRef={trashRef} />
      ))}
    </div>
  );
}
