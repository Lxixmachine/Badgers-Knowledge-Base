# Publishing your Badger Knowledge Base

A one-page guide to hosting it, gating it, and updating it weekly.

> **Moving to a real domain?** See `GOING-LIVE.md` for one-time setup connecting Netlify
> to GitHub with a custom domain (badgerswrestling.com) instead of a `.netlify.app` link.
> This file below still applies for the weekly content-update workflow either way.

---

## What you have
A small website made of these files (keep them together in one folder):

- `index.html` (and its copy `Badgers Knowledge Base.html`) ← the page itself
- `content.js` ← **the only file you replace to update content**
- `app.compiled.js` ← the app code, pre-built so the site loads fast
- `app.jsx`, `mindset.jsx`, `components.jsx`, `data.jsx`, `docs.jsx`, `film.jsx`, `tweaks-panel.jsx` ← the editable source
- `package.json`, `build.mjs`, `test.mjs` ← the repeatable build and test workflow

After changing source, run `npm install` once, then `npm test`. That command rebuilds `app.compiled.js`, refreshes both alternate HTML copies, and checks the workbook, local server, and rendered interactions.

Athlete progress and Mindset Workbook responses are stored in the current browser profile. They are not published, but another person using the same browser profile can view them. Published entries are shared by everyone.

---

## Step 1 — Put it online (once)

The easiest free option is **Netlify Drop**:

1. Go to **app.netlify.com/drop**
2. Run `npm test`, then drag the generated `dist` folder onto the page.
3. You get a live link like `your-team.netlify.app`. Share that with your athletes.

Before each deploy, run `npm test` so generated files cannot be stale. Deploy only `dist/`; it contains the live files without source code or `node_modules/`.

(Cloudflare Pages and GitHub Pages work the same way if you prefer.)

---

## Step 2 — Set your passcodes (once)

Open `content.js` in any text editor. Change:

```js
gate: {
  athlete: "badgers",     // what your team types to view
  coach:   "coachonly",   // what YOU type to unlock editing
},
```

- Pick a team passcode your athletes will remember.
- Pick a separate coach passcode only you know.
- Set `athlete: ""` to make athlete access open to anyone with the link. Visitors remain in read-only athlete mode; use **Coach sign in** in the sidebar to unlock editing with the coach passcode.
- Set `coach: ""` to disable browser-based editing. An empty coach passcode never makes public visitors editors.

> Note: this is a shared-passcode gate — a simple "members only" door, not bank-grade security. For a team resource it's plenty. If you ever need real per-athlete accounts, that's a bigger build.

You can also change these from inside the app (Coach mode → Tweaks → Publishing) and they'll be baked in next time you Publish.

---

## Step 3 — Update content (weekly)

1. Open your live link and enter your **coach** passcode.
2. Add, edit, delete, and drag-reorder entries right in the app. Everything saves to your browser as a draft.
3. Open **Tweaks** (Publish / Settings button, top-left) → **Publishing** → **Publish content (download)**.
4. One **zip file** downloads. Unzip it — inside is a fresh `content.js`, plus `films/` and `docs/` folders if you uploaded any video files or documents.
5. Copy everything from the zip into your site folder (replace the old `content.js`; keep `films/` and `docs/` next to it).
6. Re-deploy (on Netlify Drop, just drag the folder again).

> Tip: video files are too big to live inside `content.js`, so they ship as real files in `films/`. Alternatively, paste a YouTube/Vimeo/.mp4 link instead of uploading — links need no `films/` folder.

Every athlete sees the update the next time they open the link — no re-sending files.

Optional: after publishing, use **Clear my local drafts** so your device matches what athletes see.

---

## Quick reference

| I want to… | Do this |
|---|---|
| Change what athletes see | Edit in-app → Publish → replace `content.js` → redeploy |
| Change passcodes | Edit `content.js` (or in-app Tweaks → Publishing) |
| Make athlete access public | Set `athlete: ""`; coaches still use **Coach sign in** |
| Disable browser-based editing | Set `coach: ""` in `content.js` |
| Reset my own device | Tweaks → Publishing → Clear my local drafts |
