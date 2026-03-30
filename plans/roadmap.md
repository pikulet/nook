# nook — Implementation Roadmap

> A calming web simulation game: sticky notes + todo lists wrapped in cozy, customizable aesthetics.

---

## Architecture Overview

### Guiding Principles

1. **Vertical slices** — every phase delivers something visible and usable
2. **Calm first** — every interaction should feel unhurried; favor spring animations, gentle fades, soft sounds
3. **Data-driven content** — backgrounds, decorations, and audio tracks are defined as registry objects, not hardcoded UI; this makes the system trivially extensible
4. **YAGNI with exit ramps** — build only what MVP requires, but choose patterns that do not block future features

### Key Architectural Patterns

#### Content Registries (build now)

Backgrounds, audio tracks, decoration sprites, and note colors should each be defined in a simple registry file (`src/lib/backgrounds.ts`, `src/lib/audio-tracks.ts`, `src/lib/decorations.ts`). Each registry is an array of descriptor objects with an `id`, display metadata, and asset paths. Components iterate over these registries; stores reference items by `id`. Adding a new background means adding one object to an array — zero component changes.

```ts
// Example shape
interface BackgroundDescriptor {
  id: BackgroundId;
  label: string;
  src: string;            // path to image
  audioTrackId: string;   // paired ambient track
  thumbnail: string;      // for picker UI
}
```

This pattern directly enables future custom uploads (push a user-created descriptor into the registry at runtime) and seasonal themes (swap the active registry set).

#### Component Composition

- **Compound component pattern** for StickyNote: `<StickyNote>` owns layout, `<StickyNote.Header>` owns drag handle + color dot + controls, `<StickyNote.Body>` switches between freeform and checklist renderers. Lets future modes (image note, drawing note) slot in without touching the shell.
- **Render-prop or children-based** panels for the HUD so the toolbar can host arbitrary tool widgets without knowing their internals.

#### Custom Hooks Layer

All store access from components goes through focused hooks, not direct store subscriptions:

| Hook | Purpose |
|---|---|
| `useNote(id)` | Selects a single note + its actions |
| `useNoteBoard()` | Selects all notes + addNote |
| `useTheme()` | Reads theme + accent, applies `data-theme` attribute |
| `useAmbient()` | Wraps Howler lifecycle: play/pause/fade/volume |
| `useKeyboardShortcuts()` | Central registration point for hotkeys |

This indirection keeps components thin, makes testing easier, and provides a seam for future middleware (analytics, undo/redo).

#### Theming Extensibility

The CSS variable system in `globals.css` is already well-structured. Extend by:

- Adding `--color-note-yellow`, `--color-note-green`, etc. so note colors participate in theming
- Making `--color-accent` dynamically overridable via a `style` attribute on `<html>`
- Future seasonal themes = additional `[data-theme="autumn"]` blocks in CSS; no JS changes

#### Where YAGNI Applies (do NOT build yet)

- **Plugin system / decoration SDK** — the registry pattern is sufficient
- **Undo/redo** — defer until user feedback demands it
- **Cloud sync** — localStorage is fine for MVP; store shapes are JSON-serializable for future migration
- **i18n** — single-language MVP; strings are in components, easy to extract later
- **Service worker / offline** — Next.js static export already works offline once loaded

---

## Phase 1: The Living Canvas

**Goal**: A full-screen scene with a background image, theme switching, and the shell layout.

### Deliverables

1. **`src/lib/backgrounds.ts`** — Background registry with 4 entries (rainy-window, forest-desk, cafe-corner, night-sky). Placeholder images initially.
2. **`src/components/scene/background.tsx`** — Full-viewport background that reads `useSceneStore().backgroundId`. Crossfade transition via Framer Motion `AnimatePresence`.
3. **`src/components/scene/scene-canvas.tsx`** — Top-level scene wrapper. Renders `<Background>`, later hosts decorations and note board. `position: relative; width: 100vw; height: 100vh`.
4. **`src/hooks/use-theme.ts`** — Reads theme from settings store, applies `data-theme` attribute to `<html>`. Exposes `toggleTheme`.
5. **`src/app/layout.tsx`** update — Wire `useTheme` via a `<ThemeProvider>` client component. Add Inter + JetBrains Mono via `next/font`.
6. **`src/app/page.tsx`** update — Render `<SceneCanvas>`.
7. **`src/components/hud/toolbar.tsx`** — Floating toolbar (bottom-center, pill-shaped, `surface-overlay` background). Theme toggle button only for now.
8. **`src/components/ui/icon-button.tsx`** — Reusable icon button primitive (Lucide icon + tooltip + scale animation).

### Definition of Done
App loads, shows a background image, has a floating toolbar with a working light/dark toggle, theme persists on refresh.

---

## Phase 2: Sticky Notes — Core Loop

**Goal**: Users can create, edit, drag, resize, color, and delete sticky notes.

### Deliverables

1. **`src/lib/note-colors.ts`** — Map of `NoteColor` to CSS values (bg, border, text tint) for light and dark themes. Add CSS variables to `globals.css`.
2. **`src/components/notes/sticky-note.tsx`** — Main note component using `react-rnd`. Compound structure:
   - Header: drag handle, color dot, delete button (appears on hover)
   - Body: `<textarea>` for freeform content
   - Framer Motion: `scale` spring on pickup, subtle `rotate` on drag, shadow elevation change
3. **`src/components/notes/note-board.tsx`** — Renders all notes from store. Handles `bringToFront` on mousedown.
4. **`src/hooks/use-note.ts`** — Selector for single note by ID + bound actions.
5. **`src/hooks/use-note-board.ts`** — Selector for notes array + `addNote`.
6. **Toolbar update**: Add "new note" button (Plus icon).
7. **Note color picker**: Small popover on note header — 6 color dots, click to change.

### Key decisions
- `react-rnd` handles drag+resize; Framer Motion adds visual feedback (scale, shadow)
- Notes use `position: absolute` with pixel coordinates
- Content saves on keystroke, debounced 300ms

### Definition of Done
Can create, type in, drag, resize, color, and delete notes. State persists on refresh. Drag feels buttery.

---

## Phase 3: Checklists — Todo Power

**Goal**: Notes can switch to checklist mode with satisfying completion animations.

### Deliverables

1. **`src/components/notes/checklist-body.tsx`** — Replaces textarea when `note.mode === "checklist"`:
   - Custom-styled checkbox with accent color + Framer Motion check animation
   - Editable text per item, delete on hover
   - "Add item" input at bottom
   - Checked items: strikethrough wipe, opacity fade, slide to bottom after 1s
2. **`src/components/notes/note-mode-toggle.tsx`** — Toggle in note header. Parses content lines ↔ checklist items on switch.
3. **`src/components/ui/checkbox.tsx`** — Reusable animated checkbox.

### Animation details
- Check: accent color fill (spring, 200ms), checkmark SVG path draw
- Checked item: `line-through` left-to-right wipe, opacity to 0.5, slide to bottom after 1s
- Uncheck: reverse

### Definition of Done
Can toggle checklist mode, add/check/remove items with animations. Mode switch preserves content. State persists.

---

## Phase 4: Ambient Soundscapes

**Goal**: Each background has a paired ambient audio loop. Volume control and mute.

### Deliverables

1. **`src/lib/audio-tracks.ts`** — Audio track registry mapping `BackgroundId` to tracks.
2. **`src/hooks/use-ambient.ts`** — Manages Howler.js lifecycle:
   - Fades in/out (300ms) on play/switch
   - Crossfades between tracks on background change
   - Respects `soundEnabled` and `volume` from settings
   - Only plays after first user interaction (autoplay policy)
3. **`src/components/hud/volume-control.tsx`** — Volume slider + mute toggle in toolbar.
4. **`src/hooks/use-keyboard-shortcuts.ts`** — `M` for mute toggle. Extensible map-based design.
5. **Toolbar update**: Add volume control widget.

### Definition of Done
Background changes crossfade audio. Volume slider works. M key mutes. No autoplay. State persists.

---

## Phase 5: Scene Decorations

**Goal**: Users can place decorative plants and creatures with idle animations.

### Deliverables

1. **`src/lib/decorations.ts`** — Decoration registry with type, sprite path, idle animation preset, default scale.
2. **`src/lib/animations.ts`** — Named animation presets (`sway`, `breathe`, `bob`, `blink`) as Framer Motion `variants` objects.
3. **`src/components/scene/decoration.tsx`** — Single decoration, draggable via `react-rnd`, plays idle animation.
4. **`src/components/scene/decoration-layer.tsx`** — Renders all decorations from scene store. Sits between Background and NoteBoard in z-order.
5. **`src/components/hud/decoration-picker.tsx`** — Panel showing available decorations as a grid. Click to add.
6. **Toolbar update**: Add decoration button.

### Definition of Done
Can add/drag/remove decorations. They play idle animations. State persists.

---

## Phase 6: Settings Panel

**Goal**: Unified settings experience — backgrounds, theme, accent color, volume.

### Deliverables

1. **`src/components/hud/settings-panel.tsx`** — Slide-out panel (right edge). Sections: Scene, Theme, Accent, Sound.
2. **`src/components/hud/background-picker.tsx`** — Background thumbnail grid with active indicator.
3. **`src/components/hud/accent-picker.tsx`** — Curated swatches (sage, sky, coral, lavender, honey, slate) + custom hex input.
4. **`src/components/ui/panel.tsx`** — Reusable slide-out panel primitive.
5. **Toolbar update**: Settings gear icon opens the panel.

### Definition of Done
Settings panel opens/closes smoothly, all settings work and persist, background changes trigger visual + audio transitions.

---

## Phase 7: Polish & Edge Cases

**Goal**: Harden everything. Handle edge cases, improve animations, cross-browser compat.

### Deliverables

1. **Persistence audit** — Add `version` + `migrate` to all Zustand stores.
2. **Empty states** — Welcome note on first visit.
3. **Viewport boundaries** — Clamp notes/decorations on drag and window resize.
4. **Keyboard shortcuts** — `N` new note, `M` mute, `Escape` close panel, `Delete` remove focused note.
5. **Animation polish** — 60fps audit, `will-change` hints, lower-end hardware test.
6. **Accessibility** — Focus management, `aria-label` on buttons, keyboard nav for toolbar/settings, color contrast check.
7. **Responsive** — 1280px and 1920px viewport verification.

### Definition of Done
All MVP features work reliably, persist correctly, meet CLAUDE.md Definition of Done standards.

---

## Dependency Graph

```
Phase 1 (Canvas + Theme)
  ├── Phase 2 (Sticky Notes)
  │     └── Phase 3 (Checklists)
  ├── Phase 4 (Audio)
  └── Phase 5 (Decorations)
        └── Phase 6 (Settings Panel) ← also depends on Phase 4
              └── Phase 7 (Polish)
```

Phases 2, 4, and 5 can run in parallel after Phase 1.

---

## Future Extensions

### Tier 1: Registry additions (zero new patterns)

| Feature | Extensibility point |
|---|---|
| More backgrounds | `src/lib/backgrounds.ts` + assets |
| More decorations | `src/lib/decorations.ts` + sprites |
| More note colors | `src/lib/note-colors.ts` + CSS vars |
| Seasonal themes | New `[data-theme="..."]` blocks, seasonal background set |

### Tier 2: New hooks / small components (1-2 sessions each)

| Feature | Architecture notes |
|---|---|
| **Pomodoro timer** | New `useTimerStore`, `<PomodoroWidget>` in toolbar. Could trigger decoration reactions on completion. |
| **Note sharing/export** | `src/lib/export.ts` — serialize to text/markdown/PNG via `html-to-image`. Web Share API. No store changes. |
| **Sound mixing** | Extend `AudioState` to multiple `activeTrackIds`. `useAmbient` manages a Howl pool. Mixer UI in settings. |
| **Keyboard shortcuts panel** | `<ShortcutsOverlay>` on `?` key, reads from shortcuts registry. |
| **Mobile/touch** | `react-rnd` supports touch. Responsive toolbar (bottom sheet), larger hit targets, swipe gestures. `useMediaQuery` hook. |

### Tier 3: Significant features (multi-session, new subsystems)

| Feature | Architecture notes |
|---|---|
| **Custom background uploads** | File input in picker → data URL in `useCustomAssetsStore` or IndexedDB → dynamic registry entry. |
| **Weather effects** | `<WeatherOverlay>` with canvas particle effects. Driven by `weatherEffect` field on background descriptors. |
| **Time-of-day changes** | Background descriptors gain `variants: { morning, afternoon, evening, night }`. `useTimeOfDay` hook selects by system clock. |
| **Achievements/progression** | `useProgressionStore` tracks events. `src/lib/achievements.ts` registry of unlock conditions. "Your garden grew!" = decoration unlock on todo count. |
| **Cloud sync** | Replace localStorage adapter with Supabase middleware. Store shapes already JSON-serializable. Magic link auth fits calm aesthetic. |
| **Undo/redo** | Zustand `temporal` middleware on notes store. Wire `Ctrl+Z` / `Ctrl+Shift+Z`. |

---

## File Creation Checklist

### Phase 1
- [ ] `src/lib/backgrounds.ts`
- [ ] `src/components/scene/background.tsx`
- [ ] `src/components/scene/scene-canvas.tsx`
- [ ] `src/hooks/use-theme.ts`
- [ ] `src/components/hud/toolbar.tsx`
- [ ] `src/components/ui/icon-button.tsx`
- [ ] Update `src/app/layout.tsx`
- [ ] Update `src/app/page.tsx`

### Phase 2
- [ ] `src/lib/note-colors.ts`
- [ ] `src/components/notes/sticky-note.tsx`
- [ ] `src/components/notes/note-board.tsx`
- [ ] `src/hooks/use-note.ts`
- [ ] `src/hooks/use-note-board.ts`
- [ ] Update `globals.css` with note color variables

### Phase 3
- [ ] `src/components/notes/checklist-body.tsx`
- [ ] `src/components/notes/note-mode-toggle.tsx`
- [ ] `src/components/ui/checkbox.tsx`

### Phase 4
- [ ] `src/lib/audio-tracks.ts`
- [ ] `src/hooks/use-ambient.ts`
- [ ] `src/hooks/use-keyboard-shortcuts.ts`
- [ ] `src/components/hud/volume-control.tsx`

### Phase 5
- [ ] `src/lib/decorations.ts`
- [ ] `src/lib/animations.ts`
- [ ] `src/components/scene/decoration.tsx`
- [ ] `src/components/scene/decoration-layer.tsx`
- [ ] `src/components/hud/decoration-picker.tsx`

### Phase 6
- [ ] `src/components/hud/settings-panel.tsx`
- [ ] `src/components/hud/background-picker.tsx`
- [ ] `src/components/hud/accent-picker.tsx`
- [ ] `src/components/ui/panel.tsx`

### Phase 7
- [ ] Store migration versions
- [ ] Welcome note logic
- [ ] Viewport clamping
- [ ] Accessibility pass
- [ ] Cross-browser test
