import type { BackgroundId } from "@/types";

export interface BackgroundDescriptor {
  id: BackgroundId;
  label: string;
  gradient: string; // CSS gradient used until real images are added
  image?: string; // path to background image (overrides gradient)
  audioTrackId: string;
  emoji: string; // visual hint in picker until thumbnails exist
}

export const backgrounds: BackgroundDescriptor[] = [
  {
    id: "rainy-window",
    label: "rainy window",
    gradient: "linear-gradient(135deg, #4a6274 0%, #6b8ea3 40%, #8fadb8 100%)",
    audioTrackId: "rain",
    emoji: "🌧",
  },
  {
    id: "forest-desk",
    label: "forest desk",
    gradient: "linear-gradient(135deg, #3a5a3a 0%, #5a7d5a 40%, #8aad7a 100%)",
    audioTrackId: "forest",
    emoji: "🌿",
  },
  {
    id: "reading-library",
    label: "reading library",
    gradient: "linear-gradient(135deg, #3b2a1a 0%, #5a3d2a 40%, #7a5a3a 100%)",
    image: "/backgrounds/reading-library.png",
    audioTrackId: "cafe",
    emoji: "📚",
  },
  {
    id: "night-sky",
    label: "night sky",
    gradient: "linear-gradient(135deg, #0f1429 0%, #1a2344 40%, #2d3a6a 100%)",
    audioTrackId: "night",
    emoji: "🌙",
  },
];

export function getBackground(id: BackgroundId): BackgroundDescriptor {
  return backgrounds.find((b) => b.id === id) ?? backgrounds[0];
}
