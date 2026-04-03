import sleepyCat1 from "@/assets/sprites/sleepy-cat-frame1.png";
import sleepyCat2 from "@/assets/sprites/sleepy-cat-frame2.png";
import sleepyCat3 from "@/assets/sprites/sleepy-cat-frame3.png";
import sleepyCat4 from "@/assets/sprites/sleepy-cat-frame4.png";
import birdcage1 from "@/assets/sprites/birdcage-frame1.png";
import birdcage2 from "@/assets/sprites/birdcage-frame2.png";
import birdcage3 from "@/assets/sprites/birdcage-frame3.png";
import birdcage4 from "@/assets/sprites/birdcage-frame4.png";

export interface DecorationDescriptor {
  id: string;
  type: "plant" | "creature" | "item";
  label: string;
  frames: string[];
  frameDuration: number;
  idleAnimation: string;
  defaultScale: number;
}

export const decorationDescriptors: DecorationDescriptor[] = [
  {
    id: "sleepy-cat",
    type: "creature",
    label: "Sleepy Cat",
    frames: [sleepyCat1, sleepyCat2, sleepyCat3, sleepyCat4],
    frameDuration: 800,
    idleAnimation: "breathe",
    defaultScale: 1,
  },
  {
    id: "birdcage",
    type: "creature",
    label: "Birdcage",
    frames: [birdcage1, birdcage2, birdcage3, birdcage4],
    frameDuration: 600,
    idleAnimation: "sway",
    defaultScale: 1,
  },
];

export function getDecorationDescriptor(
  id: string
): DecorationDescriptor | undefined {
  return decorationDescriptors.find((d) => d.id === id);
}
