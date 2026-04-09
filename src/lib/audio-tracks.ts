import type { AudioTrack } from "@/types";
import sunlightNook from "@/assets/audio/Sunlight_Nook_Waltz.mp3";
import midnightShelf from "@/assets/audio/Beneath_the_Midnight_Shelf.mp3";

export const audioTracks: AudioTrack[] = [
  { id: "sunlight-nook", label: "sunlight nook waltz", src: sunlightNook },
  { id: "midnight-shelf", label: "beneath the midnight shelf", src: midnightShelf },
];

export function getAudioTrack(id: string): AudioTrack | undefined {
  return audioTracks.find((t) => t.id === id);
}

/** Maps background IDs to their corresponding audio track IDs */
export const backgroundToTrack: Record<string, string> = {
  "reading-library": "sunlight-nook",
  "forest-desk": "sunlight-nook",
  "night-sky": "midnight-shelf",
  "greenhouse": "sunlight-nook",
};
