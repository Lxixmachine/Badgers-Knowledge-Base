# Publishing your Badger Knowledge Base

A one-page guide to hosting it, gating it, and updating it weekly.

> **Moving to a real domain?** See `GOING-LIVE.md` for one-time setup connecting Netlify
> to GitHub with a custom domain (badgerswrestling.com) instead of a `.netlify.app` link.
> This file below still applies for the weekly content-update workflow either way.

---

## What you have
A small website made of these files (keep them together in one folder):

- `Badgers Knowledge Base.html` ← the page itself
- `content.js` ← **the only file you replace to update content**
- `app.jsx`, `components.jsx`, `data.jsx`, `film.jsx`, `tweaks-panel.jsx` ← the app code

Athlete progress ("Saved" / "Learned") is stored in each athlete's own browser. Your published entries are shared by everyone.

---

## Step 1 — Put it online (once)

The easiest free option is **Netlify Drop**:

1. Go to **app.netlify.com/drop**
2. Drag the whole folder onto the page.
3. You get a live link like `your-team.netlify.app`. Share that with your athletes.

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
- Set `athlete: ""` to turn the gate off entirely (open to anyone with the link).

> Note: this is a shared-passcode gate — a simple "members only" door, not bank-grade security. For a team resource it's plenty. If you ever need real per-athlete accounts, that's a bigger build.

You can also change these from inside the app (Coach mode → Tweaks → Publishing) and they'll be baked in next time you Publish.

---

## Step 3 — Update content (weekly)

1. Open your live link and enter your **coach** passcode.
2. Add, edit, delete, and drag-reorder entries right in the app. Everything saves to your browser as a draft.
3. Open **Tweaks** (Publish / Settings button, top-left) → **Publishing** → **Publish content (download)**.
4. A fresh `content.js` downloads. **If you uploaded any video files or documents**, they download too (one per file) — a popup lists their names.
5. Replace the old `content.js` in your folder with the new one.
6. If you got video files, make a folder named `films/` next to your other files and put every downloaded video inside it (keep the exact filenames). Same for uploaded documents → put them in a `docs/` folder.
7. Re-deploy (on Netlify Drop, just drag the folder again).

> Tip: video files are too big to live inside `content.js`, so they ride along as real files in `films/`. Alternatively, paste a YouTube/Vimeo/.mp4 link instead of uploading — links need no `films/` folder.

Every athlete sees the update the next time they open the link — no re-sending files.

Optional: after publishing, use **Clear my local drafts** so your device matches what athletes see.

---

## Quick reference

| I want to… | Do this |
|---|---|
| Change what athletes see | Edit in-app → Publish → replace `content.js` → redeploy |
| Change passcodes | Edit `content.js` (or in-app Tweaks → Publishing) |
| Turn off the login | Set `athlete: ""` in `content.js` |
| Reset my own device | Tweaks → Publishing → Clear my local drafts |
