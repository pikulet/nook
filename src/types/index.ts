// ── Note ────────────────────────────────────────────────────────────────────

export type NoteMode = "freeform" | "checklist";

export type NoteShape =
  | "straight"
  | "soft"
  | "curled"
  | "tilted-left"
  | "tilted-right";

export const NOTE_SHAPES: NoteShape[] = [
  "straight",
  "soft",
  "curled",
  "tilted-left",
  "tilted-right",
];

export type NoteColor =
  | "yellow"
  | "green"
  | "blue"
  | "pink"
  | "lavender"
  | "peach";

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface Note {
  id: string;
  mode: NoteMode;
  color: NoteColor;
  shape: NoteShape;
  content: string;
  items: ChecklistItem[];
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  createdAt: number;
  updatedAt: number;
}

// ── Scene ────────────────────────────────────────────────────────────────────

export type BackgroundId =
  | "rainy-window"
  | "forest-desk"
  | "cafe-corner"
  | "night-sky";

export interface Decoration {
  id: string;
  type: "plant" | "creature";
  spriteId: string;
  x: number;
  y: number;
  scale: number;
  zIndex: number;
}

export interface SceneConfig {
  backgroundId: BackgroundId;
  decorations: Decoration[];
}

// ── Audio ────────────────────────────────────────────────────────────────────

export interface AudioTrack {
  id: string;
  label: string;
  src: string;
}

export interface AudioState {
  muted: boolean;
  volume: number; // 0–1
  activeTrackId: string | null;
}

// ── Settings ─────────────────────────────────────────────────────────────────

export type Theme = "light" | "dark";

export interface UserSettings {
  theme: Theme;
  accentColor: string; // hex
  soundEnabled: boolean;
  volume: number;
}
