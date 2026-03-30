import type { NoteColor } from "@/types";

interface NoteColorValues {
  bg: string;
  border: string;
  text: string;
}

const lightColors: Record<NoteColor, NoteColorValues> = {
  yellow: { bg: "#fef9e7", border: "#e8d98a", text: "#5c5332" },
  green: { bg: "#eef6ee", border: "#a3c9a3", text: "#3a5a3a" },
  blue: { bg: "#edf3f8", border: "#96b8d4", text: "#3a5068" },
  pink: { bg: "#faf0f1", border: "#d4a0a6", text: "#6b3a40" },
  lavender: { bg: "#f3f0f8", border: "#b3a4cc", text: "#4a3d66" },
  peach: { bg: "#faf2ed", border: "#d4ad8e", text: "#6b4a32" },
};

const darkColors: Record<NoteColor, NoteColorValues> = {
  yellow: { bg: "#3a3520", border: "#6b6030", text: "#e8ddb8" },
  green: { bg: "#243024", border: "#3a5a3a", text: "#b8d4b8" },
  blue: { bg: "#1e2e3e", border: "#3a5a78", text: "#b0ccde" },
  pink: { bg: "#3a2428", border: "#6b3a42", text: "#dab0b4" },
  lavender: { bg: "#2a2438", border: "#4a3d66", text: "#c4b8da" },
  peach: { bg: "#382e24", border: "#6b4a32", text: "#dac0a8" },
};

export function getNoteColors(color: NoteColor): NoteColorValues {
  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "dark" ? darkColors[color] : lightColors[color];
}

export function getNoteColorsForTheme(
  color: NoteColor,
  theme: "light" | "dark"
): NoteColorValues {
  return theme === "dark" ? darkColors[color] : lightColors[color];
}
