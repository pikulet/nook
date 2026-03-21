# nook

A calming web simulation game that is fundamentally a sticky note / todo list app dressed in cozy aesthetics. Users manage tasks on a living desktop scene with customizable backgrounds, ambient soundscapes, and small decorative plants and animals.

---

## Project Vision

nook is calm productivity. The app should feel like settling into a favorite corner — quiet, personal, and softly alive. Every interaction should be smooth, unhurried, and satisfying. Nothing should feel urgent or clinical.

The game loop is: customize your space → add sticky notes / todos → watch your space feel lived-in as you complete tasks.

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG-friendly, good DX, easy deployment |
| Language | TypeScript | Required for all source files |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| Animation | Framer Motion | Smooth, spring-based UI transitions |
| State | Zustand | Lightweight, no boilerplate, persistent slices |
| Audio | Howler.js | Web audio with loop/fade support |
| Drag & resize | react-rnd | Sticky note drag + resize behavior |
| Icons | Lucide React | Clean, consistent icon set |

---

## Project Structure

```
/nook
  /src
    /app               — Next.js App Router pages and layouts
    /components
      /ui              — Primitive UI components (Button, Input, etc.)
      /notes           — StickyNote, NoteBoard, NoteEditor
      /scene           — Background, AmbientLayer, Creature, Plant
      /hud             — Toolbar, SettingsPanel, ThemePicker
    /hooks             — Custom React hooks
    /store             — Zustand stores (notes, scene, settings)
    /lib               — Pure utility functions
    /assets
      /audio           — Ambient loops (.mp3/.ogg)
      /sprites         — Plant and creature sprite sheets or SVGs
      /backgrounds     — Scene background images
    /types             — Shared TypeScript interfaces and enums
  /public              — Static assets served at root
  CLAUDE.md            — This file
  package.json
  tsconfig.json
  tailwind.config.ts
  next.config.ts
```

---

## Conventions

### Code Style
- TypeScript strict mode is on. No `any` except in explicitly annotated escape hatches.
- React components: named function declarations, not arrow-function variables at module scope.
- File names: `kebab-case` for files, `PascalCase` for component exports.
- One component per file.
- Co-locate component-specific types in the component file unless shared.

### State
- All persistent user data (notes, scene config, theme) lives in Zustand stores under `/store`.
- Stores use `persist` middleware with `localStorage`.
- Do not store derived state — compute it in selectors.

### Styling
- Tailwind for layout and spacing.
- CSS variables (defined in `globals.css`) for theme colors so themes can be swapped at runtime.
- Framer Motion for any animation with duration > 50ms.
- No inline `style` props except for dynamic numeric values (position, size).

### Audio
- All audio is opt-in. Never autoplay without user interaction.
- Fade in/out on all ambient tracks (300ms default).
- Provide mute-all shortcut (M key).

### Assets
- Backgrounds: 1920x1080 minimum, `.webp` preferred.
- Sprites: SVG preferred for plants and creatures; fallback to sprite sheet PNG.
- Audio loops: 30–120 seconds, seamless loop point, `.mp3` + `.ogg` pair.

### Git
- Branch naming: `feat/`, `fix/`, `chore/`, `design/`
- Commit messages: imperative mood, lowercase, no period. e.g. `add sticky note drag behavior`
- Never commit to `main` directly.

---

## Core Features (MVP)

1. **Sticky Notes** — Create, edit, move, resize, color, and delete notes on a freeform board.
2. **Todo Lists** — Notes can switch to checklist mode; checked items animate out gently.
3. **Backgrounds** — A small set of hand-picked scenes (rainy window, forest desk, café corner, night sky).
4. **Ambient Audio** — Per-background ambient loop with volume control.
5. **Decorations** — Drag-and-drop plants and small creatures onto the scene. They have idle animations.
6. **Theme / Palette** — Light and dark base themes with accent color pickers.
7. **Persistence** — All state saved to localStorage automatically.

---

## Stretch Goals (post-MVP)

- Weather overlay effects (rain, snow) on backgrounds
- Creature interactions (click to get a small animation / sound)
- Export notes as PNG or plain text
- Cloud sync (Supabase)
- Custom background upload

---

## Team Structure

| Role | Agent | Scope |
|---|---|---|
| Chief | Claude (global) | Portfolio direction, agent appointment |
| Lead | `.claude/agents/lead.md` | Day-to-day execution, agent orchestration |
| Project Manager | `.claude/agents/project-manager.md` | PRDs, planning, issue breakdown |

---

## Definition of Done

A feature is done when:
- It works in the latest Chrome/Firefox/Safari
- It has no TypeScript errors
- It looks correct at 1280px and 1920px viewports
- Animations run at 60fps (no layout thrash)
- State persists across page refresh
