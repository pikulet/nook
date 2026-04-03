import portalBook1 from "@/assets/sprites/portal-book-frame1.png";
import portalBook2 from "@/assets/sprites/portal-book-frame2.png";
import portalBook3 from "@/assets/sprites/portal-book-frame3.png";
import portalBook4 from "@/assets/sprites/portal-book-frame4.png";

export interface BookmarkSpriteDescriptor {
  id: string;
  label: string;
  frames: string[];
  frameDuration: number;
}

export const bookmarkSprites: BookmarkSpriteDescriptor[] = [
  {
    id: "portal-book",
    label: "Magic Portal Book",
    frames: [portalBook1, portalBook2, portalBook3, portalBook4],
    frameDuration: 800,
  },
];

export function getBookmarkSprite(
  id: string
): BookmarkSpriteDescriptor | undefined {
  return bookmarkSprites.find((s) => s.id === id);
}
