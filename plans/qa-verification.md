# QA Verification Plan — nook

This plan exists to prevent "blank page" and similar regressions. Every agent working on nook must follow these checks before declaring work done.

---

## Pre-merge Checklist (every PR)

### 1. Build passes
```bash
npm run build
```
A clean build is necessary but NOT sufficient. The build passing does not mean the app works.

### 2. TypeScript passes
```bash
npx tsc --noEmit
```

### 3. Visual smoke test
After building, start the dev server and **verify the rendered HTML**:
```bash
npx next dev --port 3900 &
sleep 5
curl -s http://localhost:3900 | grep -c 'opacity:0'  # must be 0
```
If any critical UI element has `opacity:0` in the SSR output, the feature is broken.

### 4. First-visit test
Clear localStorage and reload. Verify:
- [ ] Welcome overlay appears with "welcome to nook" heading
- [ ] "come on in" button dismisses the overlay
- [ ] Two sticky notes appear (welcome + tips)
- [ ] Background gradient is visible immediately (not fading in from invisible)
- [ ] Toolbar is visible at the bottom center

### 5. Returning-visit test
Reload without clearing localStorage. Verify:
- [ ] Welcome overlay does NOT appear
- [ ] Previously created notes are still present
- [ ] Background and toolbar render immediately

### 6. Interaction test
- [ ] Click + to add a new note
- [ ] Drag a note around
- [ ] Resize a note
- [ ] Switch a note to checklist mode
- [ ] Add and check off a checklist item
- [ ] Delete a note with X button
- [ ] Open settings panel
- [ ] Change background
- [ ] Change theme (light/dark)
- [ ] Add a decoration
- [ ] Press N for new note, M to toggle mute

---

## Anti-patterns to Watch For

### Framer Motion + SSR
**Never** use `initial={{ opacity: 0 }}` on elements that must be visible on first render. This makes them invisible during SSR and if JS fails to hydrate, the user sees nothing.

Instead:
- Use `initial={false}` to skip the initial animation entirely
- Use a `useRef(true)` flag to only animate on subsequent renders (see `background.tsx`)

### Zustand Persist + SSR
Zustand `persist` stores have default state on the server and real state on the client. This causes hydration mismatches.

Solution: Gate rendering on a hydration hook (`useHydration`) so components don't render until the client is ready.

### Welcome/Onboarding
Never rely solely on `useEffect` + `localStorage` for critical first-impression content. The onboarding overlay pattern (client-side only, checks localStorage) is more reliable than trying to inject data into stores during hydration.

---

## Agent Responsibilities

### Lead agent
- Run the full checklist above before approving any PR
- If delegating implementation, require the implementing agent to paste evidence of steps 1-3

### Implementing agent
After finishing code changes:
1. Run `npm run build` — paste the output
2. Run `npx tsc --noEmit` — confirm no errors
3. Start dev server and curl the page — confirm no `opacity:0` on critical elements
4. State which items from the interaction test you verified

### Review agent (if used)
- Read the SSR HTML output, not just the source code
- Check that new Framer Motion animations don't introduce `initial={{ opacity: 0 }}` on always-visible elements
- Check that new Zustand store usage is gated behind hydration
