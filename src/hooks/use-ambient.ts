import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { useSettingsStore } from "@/store/settings";
import { getAudioTrack } from "@/lib/audio-tracks";

export function useAmbient() {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const volume = useSettingsStore((s) => s.volume);
  const activeTrackId = useSettingsStore((s) => s.activeTrackId);
  const howlRef = useRef<Howl | null>(null);

  // Handle track changes
  useEffect(() => {
    const track = getAudioTrack(activeTrackId);
    if (!track) return;

    // Fade out old
    if (howlRef.current) {
      const old = howlRef.current;
      old.fade(old.volume(), 0, 300);
      setTimeout(() => {
        old.stop();
        old.unload();
      }, 350);
    }

    if (!soundEnabled) {
      howlRef.current = null;
      return;
    }

    try {
      const howl = new Howl({
        src: [track.src],
        loop: true,
        volume: 0,
        rate: 0.75,
        html5: true,
        onloaderror: () => {},
        onplayerror: () => {},
      });
      howl.play();
      howl.fade(0, volume * 0.3, 300);
      howlRef.current = howl;
    } catch {
      // Howl creation failed
    }
  }, [activeTrackId, soundEnabled]);

  // Handle volume changes
  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(soundEnabled ? volume * 0.3 : 0);
    }
  }, [volume, soundEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (howlRef.current) {
        howlRef.current.stop();
        howlRef.current.unload();
        howlRef.current = null;
      }
    };
  }, []);
}
