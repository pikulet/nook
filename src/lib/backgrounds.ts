import type { BackgroundId } from "@/types";
import bgLibrary from "@/assets/backgrounds/nook_bg_library.png";
import bgForest from "@/assets/backgrounds/nook_bg_forest.png";
import bgNightSky from "@/assets/backgrounds/nook_bg_nightsky.png";
import bgGreenhouse from "@/assets/backgrounds/nook_bg_greenhouse.png";

export interface BackgroundDescriptor {
  id: BackgroundId;
  label: string;
  image: string;
  emoji: string;
}

export const backgrounds: BackgroundDescriptor[] = [
  {
    id: "reading-library",
    label: "reading library",
    image: bgLibrary,
    emoji: "\u{1F4DA}",
  },
  {
    id: "forest-desk",
    label: "forest desk",
    image: bgForest,
    emoji: "\u{1F33F}",
  },
  {
    id: "night-sky",
    label: "night sky",
    image: bgNightSky,
    emoji: "\u{1F319}",
  },
  {
    id: "greenhouse",
    label: "greenhouse",
    image: bgGreenhouse,
    emoji: "\u{1F331}",
  },
];

export function getBackground(id: BackgroundId): BackgroundDescriptor {
  return backgrounds.find((b) => b.id === id) ?? backgrounds[0];
}
