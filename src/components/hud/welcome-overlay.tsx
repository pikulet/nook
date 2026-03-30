import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotesStore } from "@/store/notes";

const STORAGE_KEY = "nook-onboarded";

export function WelcomeOverlay() {
  const [visible, setVisible] = useState(false);
  const noteCount = useNotesStore((s) => s.notes.length);

  useEffect(() => {
    // Show overlay if user hasn't been onboarded, OR if there
    // are no notes at all (they deleted everything / stale state).
    const onboarded = localStorage.getItem(STORAGE_KEY);
    if (!onboarded) {
      setVisible(true);
    }
  }, []);

  // Also show if notes are empty and overlay was dismissed —
  // gives the user a hint instead of a blank canvas.
  useEffect(() => {
    if (noteCount === 0 && !visible) {
      const onboarded = localStorage.getItem(STORAGE_KEY);
      if (onboarded) {
        // They were onboarded before but have zero notes.
        // Don't show overlay again, but the welcome notes
        // hook will add starter notes.
      }
    }
  }, [noteCount, visible]);

  function handleDismiss() {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          {/* Card */}
          <motion.div
            className="relative mx-4 max-w-sm rounded-2xl bg-surface-raised p-8 shadow-panel border border-border text-center"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <p className="text-3xl mb-3">🏡</p>
            <h1 className="text-2xl font-medium text-text mb-2 font-note">
              welcome to nook
            </h1>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              a calm corner for your thoughts and todos.
              <br />
              <br />
              create sticky notes, switch them to checklists,
              <br />
              customize your scene, and settle in.
            </p>

            <motion.button
              type="button"
              onClick={handleDismiss}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              come on in
            </motion.button>

            <p className="mt-4 text-xs text-text-muted">
              press <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-text">N</kbd> for a new note
              &nbsp;&middot;&nbsp;
              <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-text">M</kbd> to toggle sound
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
