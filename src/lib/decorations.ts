export interface DecorationDescriptor {
  id: string;
  type: "plant" | "creature";
  label: string;
  emoji: string;
  idleAnimation: string;
  defaultScale: number;
}

export const decorationDescriptors: DecorationDescriptor[] = [
  // Plants
  {
    id: "potted-fern",
    type: "plant",
    label: "Potted Fern",
    emoji: "\uD83C\uDF3F",
    idleAnimation: "sway",
    defaultScale: 1,
  },
  {
    id: "succulent",
    type: "plant",
    label: "Succulent",
    emoji: "\uD83E\uDEB4",
    idleAnimation: "breathe",
    defaultScale: 1,
  },
  {
    id: "flower",
    type: "plant",
    label: "Flower",
    emoji: "\uD83C\uDF38",
    idleAnimation: "sway",
    defaultScale: 1,
  },
  // Creatures
  {
    id: "cat",
    type: "creature",
    label: "Cat",
    emoji: "\uD83D\uDC31",
    idleAnimation: "breathe",
    defaultScale: 1,
  },
  {
    id: "bird",
    type: "creature",
    label: "Bird",
    emoji: "\uD83D\uDC26",
    idleAnimation: "bob",
    defaultScale: 1,
  },
  {
    id: "butterfly",
    type: "creature",
    label: "Butterfly",
    emoji: "\uD83E\uDD8B",
    idleAnimation: "bob",
    defaultScale: 1,
  },
];

export function getDecorationDescriptor(
  id: string
): DecorationDescriptor | undefined {
  return decorationDescriptors.find((d) => d.id === id);
}
