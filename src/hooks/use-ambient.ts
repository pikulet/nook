import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { useSceneStore } from "@/store/scene";
import { useSettingsStore } from "@/store/settings";
import { getAudioTrack, backgroundToTrack } from "@/lib/audio-tracks";

export function useAmbient() {
  const backgroundId = useSceneStore((s) => s.backgroundId);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const volume = useSettingsStore((s) => s.volume);
  const howlRef = useRef<Howl | null>(null);
  const hasInteracted = useRef(false);

  // Track user interaction
  useEffect(() => {
    function onInteraction() {
      hasInteracted.current = true;
      window.removeEventListener("click", onInteraction);
      window.removeEventListener("keydown", onInteraction);
    }
    window.addEventListener("click", onInteraction);
    window.addEventListener("keydown", onInteraction);
    return () => {
      window.removeEventListener("click", onInteraction);
      window.removeEventListener("keydown", onInteraction);
    };
  }, []);

  // Handle track changes
  useEffect(() => {
    const trackId = backgroundToTrack[backgroundId];
    if (!trackId) return;
    const track = getAudioTrack(trackId);
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

    if (!soundEnabled || !hasInteracted.current) {
      howlRef.current = null;
      return;
    }

    try {
      const howl = new Howl({
        src: [track.src],
        loop: true,
        volume: 0,
        html5: true,
        onloaderror: () => {
          // Audio file not found — fail silently
        },
        onplayerror: () => {
          // Playback error — fail silently
        },
      });
      howl.play();
      howl.fade(0, volume, 300);
      howlRef.current = howl;
    } catch {
      // Howl creation failed — no audio files yet, that's fine
    }

    return () => {
      // Cleanup handled in next effect run
    };
  }, [backgroundId, soundEnabled]);

  // Handle volume changes
  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(soundEnabled ? volume : 0);
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
