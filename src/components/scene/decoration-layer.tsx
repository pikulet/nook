import { useSceneStore } from "@/store/scene";
import { Decoration } from "@/components/scene/decoration";

export function DecorationLayer() {
  const decorations = useSceneStore((s) => s.decorations);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {decorations.map((d) => (
        <Decoration key={d.id} decoration={d} />
      ))}
    </div>
  );
}
