import { useRef } from "react";
import { Background } from "@/components/scene/background";
import { DecorationLayer } from "@/components/scene/decoration-layer";
// import { BookmarkLayer } from "@/components/scene/bookmark-layer";
import { NoteBoard } from "@/components/notes/note-board";

interface SceneCanvasProps {
  children?: React.ReactNode;
}

export function SceneCanvas({ children }: SceneCanvasProps) {
  const trashRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Background />
      <DecorationLayer trashRef={trashRef} />
      {/* <BookmarkLayer trashRef={trashRef} /> */}
      <NoteBoard trashRef={trashRef} />
      {children}
    </div>
  );
}
