import { Background } from "@/components/scene/background";
import { DecorationLayer } from "@/components/scene/decoration-layer";
import { NoteBoard } from "@/components/notes/note-board";

interface SceneCanvasProps {
  children?: React.ReactNode;
}

export function SceneCanvas({ children }: SceneCanvasProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Background />
      <DecorationLayer />
      <NoteBoard />
      {children}
    </div>
  );
}
