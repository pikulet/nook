import { useSceneStore } from "@/store/scene";
import { Decoration } from "@/components/scene/decoration";
import { TrashCan } from "@/components/scene/trash-can";

interface DecorationLayerProps {
  trashRef: React.RefObject<HTMLDivElement | null>;
}

export function DecorationLayer({ trashRef }: DecorationLayerProps) {
  const decorations = useSceneStore((s) => s.decorations);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {decorations.map((d) => (
        <Decoration key={d.id} decoration={d} trashRef={trashRef} />
      ))}
      <TrashCan ref={trashRef as React.RefObject<HTMLDivElement>} />
    </div>
  );
}
