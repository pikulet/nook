import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Leaf, Settings } from "lucide-react";
import { useAmbient } from "@/hooks/use-ambient";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useNotesStore } from "@/store/notes";
import { IconButton } from "@/components/ui/icon-button";
import { VolumeControl } from "@/components/hud/volume-control";
import { DecorationPicker } from "@/components/hud/decoration-picker";
// import { BookmarkPicker } from "@/components/hud/bookmark-picker";
import { SettingsPanel } from "@/components/hud/settings-panel";

export function Toolbar() {
  const addNote = useNotesStore((s) => s.addNote);
  const [decorationPickerOpen, setDecorationPickerOpen] = useState(false);
  // const [bookmarkPickerOpen, setBookmarkPickerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useAmbient();
  useKeyboardShortcuts();

  function handleAddNote() {
    const cx = window.innerWidth / 2 - 110 + (Math.random() - 0.5) * 120;
    const cy = window.innerHeight / 2 - 100 + (Math.random() - 0.5) * 120;
    addNote({ x: cx, y: cy });
  }

  return (
    <>
      <DecorationPicker
        open={decorationPickerOpen}
        onClose={() => setDecorationPickerOpen(false)}
      />
      {/* <BookmarkPicker
        open={bookmarkPickerOpen}
        onClose={() => setBookmarkPickerOpen(false)}
      /> */}
      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <motion.div
        className="fixed bottom-6 left-1/2 z-50 flex items-center gap-1 rounded-full bg-surface-overlay px-3 py-2 shadow-panel backdrop-blur-md border border-border"
        style={{ x: "-50%" }}
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <IconButton
          icon={Plus}
          label="New note"
          onClick={handleAddNote}
        />
        <IconButton
          icon={Leaf}
          label="Add decoration"
          onClick={() => setDecorationPickerOpen(!decorationPickerOpen)}
        />
        {/* <IconButton
          icon={Link}
          label="Add bookmark"
          onClick={() => setBookmarkPickerOpen(!bookmarkPickerOpen)}
        /> */}
        <div className="w-px h-5 bg-border mx-1" />
        <VolumeControl />
        <div className="w-px h-5 bg-border mx-1" />
        <IconButton
          icon={Settings}
          label="Settings"
          onClick={() => setSettingsOpen(true)}
        />
      </motion.div>
    </>
  );
}
