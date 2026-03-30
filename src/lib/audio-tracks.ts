import type { AudioTrack } from "@/types";

export const audioTracks: AudioTrack[] = [
  { id: "rain", label: "gentle rain", src: "/audio/rain.mp3" },
  { id: "forest", label: "forest ambience", src: "/audio/forest.mp3" },
  { id: "cafe", label: "cafe chatter", src: "/audio/cafe.mp3" },
  { id: "night", label: "night crickets", src: "/audio/night.mp3" },
];

export function getAudioTrack(id: string): AudioTrack | undefined {
  return audioTracks.find((t) => t.id === id);
}

/** Maps background IDs to their corresponding audio track IDs */
export const backgroundToTrack: Record<string, string> = {
  "rainy-window": "rain",
  "forest-desk": "forest",
  "cafe-corner": "cafe",
  "night-sky": "night",
};
