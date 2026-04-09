---
name: preview
description: Start the Vite dev server for the Chrome extension. Use when user says "preview", "run locally", "start dev server", "open the app", or "launch locally".
---

# Local Preview (Chrome Extension)

## Steps

1. Run `npm run dev` in the background using the Bash tool with `run_in_background: true`.
2. Tell the user:
   - The dev server is running.
   - To load the extension: go to `chrome://extensions`, enable Developer mode, click "Load unpacked", and select the `dist/` folder.
   - Open a new tab to see nook (it overrides the new tab page).
   - Changes will hot-reload via CRXJS while the dev server runs.
