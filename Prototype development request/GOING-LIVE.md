# Going live: custom domain on Netlify

A one-time setup to move off manual Netlify Drop and onto `badgerswrestling.com`,
auto-deploying from GitHub. No command line needed — everything below is done in a
browser.

---

## Step 0 — Fix two oversized video clips (do this first)

GitHub rejects files over 100MB (and even under that, large video files don't belong in
a code repo). Two of your local video uploads are way over:

| Entry | Clip | File | Size |
|---|---|---|---|
| Inside Reach Single | Robideau v. Taylor NCAA Final 1 | `file_1782245949642_cer8uk.mp4` | 433MB |
| Inside Reach Single | Robideau v. Taylor NCAA Final 2 | `file_1782245970850_9lox2c.mp4` | 125MB |

Fix: upload these two clips to YouTube (unlisted is fine) or Vimeo, then in the app:

1. Enter your **coach** passcode → open **Inside Reach Single** → Edit.
2. In the Film Library, find each "Robideau v. Taylor" clip → clear the uploaded file →
   paste the new YouTube/Vimeo link instead.
3. Save.

(Your third local clip, on **High Crotch to Double**, is only 3.4MB — fine to ship as-is.)

After this, re-publish in the app (Tweaks → Publishing → Publish content) so the new
`content.js` reflects the fixed links, and replace the old `content.js` in your folder
with the new download.

---

## Step 1 — Put the code on GitHub

1. Go to **github.com** → sign up (free).
2. Click **New repository**. Name it something like `badgers-knowledge-base`. Public is
   fine for this. Don't add a README — leave it empty.
3. On the new repo's page, click **uploading an existing file**.
4. Drag in everything from your project folder **except**:
   - `file_1782245949642_cer8uk.mp4` and `file_1782245970850_9lox2c.mp4` (just fixed in Step 0)
   - `Badgers Knowledge Base.html` and the `Badgers Knowledge Base/` folder (exact duplicates of `index.html` / `tweaks-panel.jsx`)

   Make sure `index.html`, `content.js`, and `app.compiled.js` are included — those three are what the live site actually runs on.
5. Scroll down, click **Commit changes**.

Now your content is versioned and backed up — not just a folder on one laptop.

---

## Step 2 — Connect your Netlify site to that GitHub repo

If you already have a site live from Netlify Drop, keep it — you'll link it to Git rather
than starting over, so any domain work you've already done carries forward.

1. In Netlify, open your existing site → **Site configuration** → **Build & deploy** →
   **Link site to a Git repository** (sometimes labeled **Link repository**).
2. Authorize Netlify to access GitHub, pick `badgers-knowledge-base`.
3. Build settings:
   - Build command: *(leave blank)*
   - Publish directory: `/` (root)
4. Save. Netlify redeploys from GitHub immediately.

Don't have a site yet? **Add new site → Import an existing project → Deploy with GitHub**,
pick the repo, same settings as above.

From now on, every time you upload changed files to the GitHub repo, Netlify automatically
rebuilds and redeploys within about a minute — no more manual drag-and-drop.

---

## Step 3 — Register the domain through Netlify

You've already got this priced out: **$14 first year, $17/year renewal** — reasonable,
roughly a few dollars above at-cost.

1. Site → **Domain management** → **Add a domain** → **Buy a new domain**.
2. Search `badgerswrestling.com`, confirm it's available, complete checkout.
3. Because it's bought through Netlify, DNS connects to your site automatically — no
   separate DNS step needed (this is the main advantage over registering elsewhere).

SSL provisions automatically within a few minutes. Your team can then use the real domain
instead of the `.netlify.app` link.

---

## Updating content going forward

Same workflow as before, just one step changes:

| Old (Netlify Drop) | New (GitHub-connected) |
|---|---|
| Publish in app → download the publish zip (`content.js` + films/docs inside) | Same |
| Drag whole folder onto Netlify Drop | Upload just the changed file(s) to the GitHub repo (repo page → **Add file** → **Upload files**) |
| ~~Wait, it's already live~~ | Netlify redeploys automatically, ~60 seconds |

Everyone sees the update the next time they load the link — same as before.
