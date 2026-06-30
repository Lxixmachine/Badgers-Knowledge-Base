// app.jsx — Badgers Wrestling Knowledge Base
const { useState, useMemo, useEffect } = React;

const LS = {
  saved: "wkb_saved", learned: "wkb_learned", user: "wkb_user",
  edits: "wkb_edits", deleted: "wkb_deleted",
  entryOrder: "wkb_entryOrder", catOrder: "wkb_catOrder",
};
function loadSet(key) { try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); } catch { return new Set(); } }
function saveSet(key, set) { localStorage.setItem(key, JSON.stringify([...set])); }
function loadArr(key) { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } }
function loadObj(key) { try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch { return {}; } }

// stable reorder: sort `items` (objects with .id) by a saved id-order, unknowns go last in original order
function applyOrder(items, order) {
  if (!order || !order.length) return items;
  const pos = new Map(order.map((id, i) => [id, i]));
  return items
    .map((it, i) => [it, i])
    .sort((a, b) => {
      const pa = pos.has(a[0].id) ? pos.get(a[0].id) : Infinity;
      const pb = pos.has(b[0].id) ? pos.get(b[0].id) : Infinity;
      return pa - pb || a[1] - b[1];
    })
    .map((x) => x[0]);
}
function moveId(order, fullIds, dragId, overId) {
  const base = order && order.length ? order.filter((id) => fullIds.includes(id)) : [...fullIds];
  for (const id of fullIds) if (!base.includes(id)) base.push(id);
  const from = base.indexOf(dragId), to = base.indexOf(overId);
  if (from < 0 || to < 0 || from === to) return base;
  base.splice(to, 0, base.splice(from, 1)[0]);
  return base;
}

/* visual direction presets (theme + accent together) */
const DIRECTIONS = {
  "Black & Cardinal": { theme: "dark",  accent: "#E23B3F" },
  "White Court":      { theme: "light", accent: "#C5050C" },
  "Locker Room":      { theme: "ink",   accent: "#E23B3F" },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "Black & Cardinal",
  "accent": "#E23B3F",
  "theme": "dark",
  "layout": "Grid",
  "gridCols": "Auto",
  "density": "regular",
  "cardSummary": true,
  "cardLevel": true,
  "cardFilm": true,
  "cardRadius": 14,
  "cardShadow": false,
  "detailWidth": 560,
  "detailFilm": true,
  "detailSteps": true,
  "detailCoachNotes": true,
  "detailTags": true,
  "brandTeam": "Wisconsin Badgers",
  "brandSub": "Wrestling · Knowledge Base",
  "showProgressWidget": true,
  "showYouNav": true,
  "athletePass": "badgers",
  "coachPass": "coachonly",
  "allTitle": "All Knowledge",
  "allSub": "The full Badger playbook — technique, mind, and culture.",
  "catTechnique": "",
  "catDrills": "",
  "catMindset": "",
  "catWeight": "",
  "catStrategy": "",
  "catMatchstudy": "",
  "catCulture": ""
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const { CATEGORIES, ENTRIES, GATE, VERSION } = window.WKB;

  // ---- access gate ----
  const gateOn = !!(GATE && (GATE.athlete || GATE.coach));
  const [role, setRole] = useState(() => gateOn ? (sessionStorage.getItem("wkb_role") || null) : "athlete");
  const coachMode = role === "coach";
  const canEdit = coachMode || !gateOn;
  function unlock(code) {
    if (GATE.coach && code === GATE.coach) { setRole("coach"); sessionStorage.setItem("wkb_role", "coach"); return true; }
    if (GATE.athlete && code === GATE.athlete) { setRole("athlete"); sessionStorage.setItem("wkb_role", "athlete"); return true; }
    if (!GATE.athlete && GATE.coach && code === GATE.coach) { setRole("coach"); sessionStorage.setItem("wkb_role", "coach"); return true; }
    return false;
  }
  function signOut() { sessionStorage.removeItem("wkb_role"); setRole(null); }

  const [query, setQuery] = useState("");
  const [view, setView] = useState("all");           // all | <catId> | saved | progress
  const [openId, setOpenId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  const [saved, setSaved] = useState(() => loadSet(LS.saved));
  const [learned, setLearned] = useState(() => loadSet(LS.learned));
  const [userEntries, setUserEntries] = useState(() => loadArr(LS.user));
  const [edits, setEdits] = useState(() => loadObj(LS.edits));
  const [deleted, setDeleted] = useState(() => loadSet(LS.deleted));
  const [entryOrder, setEntryOrder] = useState(() => loadArr(LS.entryOrder));
  const [catOrder, setCatOrder] = useState(() => loadArr(LS.catOrder));
  const [dragId, setDragId] = useState(null);       // entry being dragged
  const [navDragId, setNavDragId] = useState(null);  // category being dragged

  useEffect(() => saveSet(LS.saved, saved), [saved]);
  useEffect(() => saveSet(LS.learned, learned), [learned]);
  useEffect(() => localStorage.setItem(LS.user, JSON.stringify(userEntries)), [userEntries]);
  useEffect(() => localStorage.setItem(LS.edits, JSON.stringify(edits)), [edits]);
  useEffect(() => saveSet(LS.deleted, deleted), [deleted]);
  useEffect(() => localStorage.setItem(LS.entryOrder, JSON.stringify(entryOrder)), [entryOrder]);
  useEffect(() => localStorage.setItem(LS.catOrder, JSON.stringify(catOrder)), [catOrder]);

  // apply theme + accent + structural vars to root
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", t.theme);
    r.setAttribute("data-density", t.density);
    r.style.setProperty("--accent", t.accent);
    r.style.setProperty("--card-radius", t.cardRadius + "px");
    r.style.setProperty("--card-rest-shadow", t.cardShadow ? "var(--shadow)" : "none");
    r.style.setProperty("--detail-width", `min(${t.detailWidth}px, 100%)`);
  }, [t.theme, t.density, t.accent, t.cardRadius, t.cardShadow, t.detailWidth]);

  const allEntries = useMemo(() => {
    const base = [...userEntries, ...ENTRIES];
    const seen = new Set();
    return base
      .filter((e) => {
        if (seen.has(e.id)) return false; // drop duplicates (e.g. a draft that's now also published)
        seen.add(e.id);
        return true;
      })
      .filter((e) => !deleted.has(e.id))
      .map((e) => (edits[e.id] ? { ...e, ...edits[e.id] } : e));
  }, [userEntries, edits, deleted]);
  const catNames = {
    technique: t.catTechnique, drills: t.catDrills, mindset: t.catMindset,
    weight: t.catWeight, strategy: t.catStrategy, matchstudy: t.catMatchstudy, culture: t.catCulture,
  };
  const cats = useMemo(() => {
    const named = CATEGORIES.map((c) => ({ ...c, label: catNames[c.id] || c.label }));
    return applyOrder(named, catOrder);
  }, [t.catTechnique, t.catDrills, t.catMindset, t.catWeight, t.catStrategy, t.catMatchstudy, t.catCulture, catOrder]);
  const catOf = (id) => cats.find((c) => c.id === id) || cats[0];

  // drag-reorder categories (nav + chips)
  function onCatDrop(overId) {
    if (!navDragId || navDragId === overId) return setNavDragId(null);
    setCatOrder(moveId(catOrder, CATEGORIES.map((c) => c.id), navDragId, overId));
    setNavDragId(null);
  }

  const toggle = (setFn) => (id) => setFn((prev) => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next;
  });
  const onSave = toggle(setSaved);
  const onLearn = toggle(setLearned);

  function addEntry(entry) {
    setUserEntries((prev) => [entry, ...prev]);
    setShowAdd(false);
    setView(entry.category);
    setTimeout(() => setOpenId(entry.id), 60);
  }

  function saveEdit(entry) {
    if (userEntries.some((e) => e.id === entry.id)) {
      setUserEntries((prev) => prev.map((e) => (e.id === entry.id ? entry : e)));
    } else {
      setEdits((prev) => ({ ...prev, [entry.id]: entry }));
    }
    setEditEntry(null);
    setTimeout(() => setOpenId(entry.id), 60);
  }

  function startEdit(entry) {
    setOpenId(null);
    setEditEntry(entry);
  }

  function deleteEntry(id) {
    const ent = allEntries.find((e) => e.id === id);
    if (ent && window.normalizeFilms) {
      window.normalizeFilms(ent).forEach((f) => { if (f.fileKey && window.FilmDB) window.FilmDB.del(f.fileKey); });
    }
    if (ent && Array.isArray(ent.docs)) {
      ent.docs.forEach((d) => { if (d && d.fileKey && window.FilmDB) window.FilmDB.del(d.fileKey); });
    }
    setDeleted((prev) => new Set(prev).add(id));
    setEdits((prev) => { const n = { ...prev }; delete n[id]; return n; });
    setSaved((prev) => { const n = new Set(prev); n.delete(id); return n; });
    setLearned((prev) => { const n = new Set(prev); n.delete(id); return n; });
    setOpenId(null);
  }

  // filtering
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = allEntries.filter((e) => {
      if (view === "saved" && !saved.has(e.id)) return false;
      if (view === "progress" && !learned.has(e.id)) return false;
      if (view !== "all" && view !== "saved" && view !== "progress" && e.category !== view) return false;
      if (q) {
        const hay = (e.title + " " + e.summary + " " + e.tags.join(" ") + " " + catOf(e.category).label).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return applyOrder(filtered, entryOrder);
  }, [allEntries, view, query, saved, learned, entryOrder]);

  const canDragEntries = !query.trim();
  function onEntryDrop(overId) {
    if (!dragId || dragId === overId) return setDragId(null);
    setEntryOrder(moveId(entryOrder, allEntries.map((e) => e.id), dragId, overId));
    setDragId(null);
  }

  const openEntry = openId ? allEntries.find((e) => e.id === openId) : null;
  const learnedCount = learned.size;
  const totalCount = allEntries.length;
  const pct = totalCount ? Math.round((learnedCount / totalCount) * 100) : 0;

  const navItems = [
    { id: "all", label: t.allTitle, icon: "search", count: allEntries.length },
    ...cats.map((c) => ({ id: c.id, label: c.label, icon: c.icon,
      count: allEntries.filter((e) => e.category === c.id).length })),
  ];

  function go(v) { setView(v); setQuery(""); setNavOpen(false); }

  // ---- publish: regenerate content.js for re-upload ----
  function extFor(film) {
    const fromName = (film.fileName || "").match(/\.([a-z0-9]+)$/i);
    if (fromName) return fromName[1].toLowerCase();
    const m = { "video/mp4": "mp4", "video/webm": "webm", "video/ogg": "ogg", "video/quicktime": "mov" };
    return m[film.mime] || "mp4";
  }

  function downloadBlob(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  async function publishContent() {
    const publishCats = cats.map((c) => ({ id: c.id, label: c.label, short: c.short, icon: c.icon }));

    // Collect uploaded video/document blobs and rewrite entries to point at films/ and docs/ folders.
    const videoFiles = []; // { name, blob }
    const docFiles = [];   // { name, blob }
    const missing = [];
    const ordered = applyOrder(allEntries, entryOrder);
    const publishEntries = [];
    for (const e of ordered) {
      const { _local, ...rest } = e;
      if (Array.isArray(rest.films)) {
        rest.films = await Promise.all(rest.films.map(async (f) => {
          if (!f.fileKey) return f;
          const ext = extFor(f);
          const name = f.fileKey + "." + ext;
          const blob = window.FilmDB ? await window.FilmDB.get(f.fileKey) : null;
          if (blob) videoFiles.push({ name, blob });
          else missing.push(f.fileName || name);
          const { fileKey, mime, ...keep } = f;
          return { ...keep, url: "films/" + name };
        }));
      }
      if (Array.isArray(rest.docs)) {
        rest.docs = await Promise.all(rest.docs.map(async (d) => {
          if (!d.fileKey) return d;
          const m = (d.fileName || "").match(/\.([a-z0-9]+)$/i);
          const ext = m ? m[1].toLowerCase() : "bin";
          const name = d.fileKey + "." + ext;
          const blob = window.FilmDB ? await window.FilmDB.get(d.fileKey) : null;
          if (blob) docFiles.push({ name, blob });
          else missing.push(d.fileName || name);
          const { fileKey, mime, ...keep } = d;
          return { ...keep, url: "docs/" + name };
        }));
      }
      publishEntries.push(rest);
    }

    const body = {
      version: new Date().toISOString().slice(0, 10),
      gate: { athlete: t.athletePass || "", coach: t.coachPass || "" },
      categories: publishCats,
      entries: publishEntries,
    };
    const text =
      "// ============================================================\n" +
      "//  content.js — PUBLISHED Badger Knowledge Base content\n" +
      "//  Generated " + new Date().toLocaleString() + "\n" +
      "//  Replace this file on your host and re-deploy to update every athlete.\n" +
      "// ============================================================\n\n" +
      "window.WKB_PUBLISHED = " + JSON.stringify(body, null, 2) + ";\n";
    downloadBlob(new Blob([text], { type: "text/javascript" }), "content.js");

    // Then download each uploaded video file (staggered so the browser doesn't block them).
    const allDl = [...videoFiles, ...docFiles];
    for (let i = 0; i < allDl.length; i++) {
      const f = allDl[i];
      setTimeout(() => downloadBlob(f.blob, f.name), 700 * (i + 1));
    }

    const lines = ["Published content.js downloaded."];
    if (videoFiles.length) {
      lines.push("");
      lines.push(videoFiles.length + " uploaded video file(s) are downloading too.");
      lines.push("Put ALL of them inside a folder named  films/  next to your other files, then re-deploy:");
      lines.push("");
      videoFiles.forEach((v) => lines.push("  films/" + v.name));
    }
    if (docFiles.length) {
      lines.push("");
      lines.push(docFiles.length + " uploaded document(s) are downloading too.");
      lines.push("Put ALL of them inside a folder named  docs/  next to your other files, then re-deploy:");
      lines.push("");
      docFiles.forEach((d) => lines.push("  docs/" + d.name));
    }
    if (missing.length) {
      lines.push("");
      lines.push("⚠ Could not find the file for: " + missing.join(", "));
      lines.push("(It was cleared from this browser. Re-upload it, then Publish again.)");
    }
    setTimeout(() => window.alert(lines.join("\n")), 200);
  }

  function clearLocalDrafts() {
    if (!window.confirm("Clear your local drafts on this device? This removes unpublished adds/edits/deletes and custom ordering. Already-published content is unaffected.")) return;
    [LS.user, LS.edits, LS.deleted, LS.entryOrder, LS.catOrder].forEach((k) => localStorage.removeItem(k));
    setUserEntries([]); setEdits({}); setDeleted(new Set()); setEntryOrder([]); setCatOrder([]);
  }

  // ---- gate screen ----
  if (gateOn && !role) {
    return <LoginGate team={t.brandTeam} onUnlock={unlock} />;
  }

  const viewTitle = view === "all" ? t.allTitle
    : view === "saved" ? "Saved"
    : view === "progress" ? "My Progress"
    : catOf(view).label;
  const viewSub = view === "all" ? t.allSub
    : view === "saved" ? "Everything you've starred to come back to."
    : view === "progress" ? "What you've locked in this season."
    : { technique: "Positions and finishes drilled in the room.",
        drills: "Conditioning and skill circuits.",
        mindset: "The mental side of the six minutes.",
        weight: "Making weight the smart way, fueling to compete.",
        strategy: "Scouting, the clock, and match tactics.",
        culture: "Who we are and what we stand for." }[view];

  const gridStyle = (t.layout !== "List" && t.gridCols !== "Auto")
    ? { gridTemplateColumns: `repeat(${t.gridCols}, minmax(0,1fr))` } : undefined;
  const cardShow = { summary: t.cardSummary, level: t.cardLevel, film: t.cardFilm };

  return (
    <div className="shell">
      {/* ---------- Sidebar ---------- */}
      <aside className={"side" + (navOpen ? " side--open" : "")}>
        <div className="brand">
          <div className="brand__mark">W</div>
          <div className="brand__text">
            <span className="brand__team">{t.brandTeam}</span>
            <span className="brand__sub">{t.brandSub}</span>
          </div>
        </div>
        {gateOn && (
          <div className="rolebar">
            <span className={"rolebar__tag" + (coachMode ? " rolebar__tag--coach" : "")}>
              {coachMode ? "Coach — editing" : "Athlete"}
            </span>
            <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {canEdit && (
                <button className="rolebar__out"
                  onClick={() => window.postMessage({ type: "__activate_edit_mode" }, "*")}>
                  Publish / Settings
                </button>
              )}
              <button className="rolebar__out" onClick={signOut}>Sign out</button>
            </span>
          </div>
        )}

        <nav className="nav">
          <span className="nav__head">Browse</span>
          {navItems.map((n) => {
            const draggable = n.id !== "all";
            return (
            <button key={n.id}
              className={"navitem" + (view === n.id ? " navitem--on" : "") + (navDragId === n.id ? " navitem--dragging" : "")}
              onClick={() => go(n.id)}
              draggable={draggable}
              onDragStart={draggable ? (e) => { setNavDragId(n.id); e.dataTransfer.effectAllowed = "move"; } : undefined}
              onDragOver={draggable ? (e) => { e.preventDefault(); } : undefined}
              onDrop={draggable ? (e) => { e.preventDefault(); onCatDrop(n.id); } : undefined}
              onDragEnd={() => setNavDragId(null)}>
              {draggable && <Icon name="grip" size={15} stroke={2} className="navitem__grip" />}
              <Icon name={n.icon} size={18} stroke={2} />
              <span className="navitem__l">{n.label}</span>
              <span className="navitem__c">{n.count}</span>
            </button>
            );
          })}
          <span className="nav__head">You</span>
          <button className={"navitem" + (view === "saved" ? " navitem--on" : "")} onClick={() => go("saved")}>
            <Icon name="star" size={18} stroke={2} /><span className="navitem__l">Saved</span>
            <span className="navitem__c">{saved.size}</span>
          </button>
          {t.showYouNav && (
            <button className={"navitem" + (view === "progress" ? " navitem--on" : "")} onClick={() => go("progress")}>
              <Icon name="check" size={18} stroke={2.2} /><span className="navitem__l">My Progress</span>
              <span className="navitem__c">{learned.size}</span>
            </button>
          )}
        </nav>

        {t.showProgressWidget && (
          <div className="progress">
            <div className="progress__top">
              <span className="progress__lab">Season Progress</span>
              <span className="progress__pct">{pct}%</span>
            </div>
            <div className="progress__bar"><div className="progress__fill" style={{ width: pct + "%" }} /></div>
            <span className="progress__sub">{learnedCount} of {totalCount} learned</span>
          </div>
        )}
      </aside>
      {navOpen && <div className="scrim" onClick={() => setNavOpen(false)} />}

      {/* ---------- Main ---------- */}
      <main className="main">
        <header className="top">
          <button className="hamb" onClick={() => setNavOpen(true)} aria-label="Menu">
            <span/><span/><span/>
          </button>
          <div className="searchbar">
            <Icon name="search" size={19} stroke={2} />
            <input className="searchbar__in" value={query} onChange={(e) => setQuery(e.target.value)}
                   placeholder="Search moves, drills, mindset…" />
            {query && <button className="searchbar__x" onClick={() => setQuery("")}><Icon name="close" size={16} /></button>}
          </div>
          <button className="addbtn" onClick={() => setShowAdd(true)} style={{ display: canEdit ? undefined : "none" }}>
            <Icon name="plus" size={18} stroke={2.4} /><span>Add Entry</span>
          </button>
        </header>

        <div className="content">
          <div className="phead">
            <div>
              <h1 className="phead__title">{viewTitle}</h1>
              <p className="phead__sub">{viewSub}</p>
            </div>
            <div className="phead__count">{results.length} {results.length === 1 ? "entry" : "entries"}</div>
          </div>

          {/* quick category chips (mobile-friendly + desktop) */}
          {view !== "saved" && view !== "progress" && (
            <div className="chips">
              <button className={"chip" + (view === "all" ? " chip--on" : "")} onClick={() => go("all")}>All</button>
              {cats.map((c) => (
                <button key={c.id}
                  className={"chip" + (view === c.id ? " chip--on" : "") + (navDragId === c.id ? " chip--dragging" : "")}
                  onClick={() => go(c.id)}
                  draggable
                  onDragStart={(e) => { setNavDragId(c.id); e.dataTransfer.effectAllowed = "move"; }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); onCatDrop(c.id); }}
                  onDragEnd={() => setNavDragId(null)}>
                  <Icon name={c.icon} size={14} stroke={2} />{c.short}
                </button>
              ))}
            </div>
          )}

          {results.length === 0 ? (
            <div className="empty">
              <div className="empty__mark"><Icon name={view === "saved" ? "star" : view === "progress" ? "check" : "search"} size={30} stroke={1.7} /></div>
              <h3>{query ? "No results" : view === "saved" ? "Nothing saved yet" : view === "progress" ? "Nothing learned yet" : "Empty"}</h3>
              <p>{query ? `Nothing matches “${query}”. Try another term.`
                : view === "saved" ? "Tap the star on any entry to keep it here."
                : view === "progress" ? "Open an entry and mark it learned to track your season."
                : "Add the first entry for this category."}</p>
            </div>
          ) : (
            <div className={"grid" + (t.layout === "List" ? " grid--list" : "")} style={gridStyle}>
              {results.map((e) => (
                <EntryCard key={e.id} entry={e} cat={catOf(e.category)}
                           saved={saved.has(e.id)} learned={learned.has(e.id)}
                           list={t.layout === "List"} show={cardShow}
                           dragging={dragId === e.id}
                           drag={canDragEntries ? {
                             draggable: true,
                             onDragStart: (ev) => { setDragId(e.id); ev.dataTransfer.effectAllowed = "move"; },
                             onDragOver: (ev) => ev.preventDefault(),
                             onDrop: (ev) => { ev.preventDefault(); onEntryDrop(e.id); },
                             onDragEnd: () => setDragId(null),
                           } : null}
                           onOpen={() => setOpenId(e.id)} onSave={onSave} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ---------- Overlays ---------- */}
      {openEntry && (
        <DetailView entry={openEntry} cat={catOf(openEntry.category)}
                    saved={saved.has(openEntry.id)} learned={learned.has(openEntry.id)}
                    onClose={() => setOpenId(null)} onSave={onSave} onLearn={onLearn}
                    onEdit={startEdit} onDelete={deleteEntry} canEdit={canEdit}
                    show={{ film: t.detailFilm, steps: t.detailSteps, coachNotes: t.detailCoachNotes, tags: t.detailTags }} />
      )}
      {showAdd && <AddEntryForm onClose={() => setShowAdd(false)} onAdd={addEntry} />}
      {editEntry && <AddEntryForm initial={editEntry} onClose={() => setEditEntry(null)} onAdd={saveEdit} />}

      {/* ---------- Tweaks ---------- */}
      <TweaksPanel>
        {canEdit && <TweakSection label="Publishing" />}
        {canEdit && <TweakButton label="Publish content (download)" onClick={publishContent} />}
        {canEdit && <TweakText label="Athlete passcode" value={t.athletePass} onChange={(v) => setTweak("athletePass", v)} />}
        {canEdit && <TweakText label="Coach passcode" value={t.coachPass} onChange={(v) => setTweak("coachPass", v)} />}
        {canEdit && <TweakButton label="Clear my local drafts" secondary onClick={clearLocalDrafts} />}

        <TweakSection label="Preset" />
        <TweakSelect label="Direction" value={t.direction}
          options={Object.keys(DIRECTIONS)}
          onChange={(v) => setTweak({ direction: v, theme: DIRECTIONS[v].theme, accent: DIRECTIONS[v].accent })} />

        <TweakSection label="Color" />
        <TweakColor label="Accent" value={t.accent} onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Theme" value={t.theme}
          options={["dark", "light", "ink"]}
          onChange={(v) => setTweak("theme", v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="Cards" value={t.layout} options={["Grid", "List"]}
          onChange={(v) => setTweak("layout", v)} />
        <TweakSelect label="Columns" value={t.gridCols} options={["Auto", "2", "3", "4"]}
          onChange={(v) => setTweak("gridCols", v)} />
        <TweakRadio label="Density" value={t.density} options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak("density", v)} />
        <TweakButton label="Reset all ordering" secondary
          onClick={() => { setEntryOrder([]); setCatOrder([]); }} />

        <TweakSection label="Cards" />
        <TweakToggle label="Summary text" value={t.cardSummary} onChange={(v) => setTweak("cardSummary", v)} />
        <TweakToggle label="Level badge" value={t.cardLevel} onChange={(v) => setTweak("cardLevel", v)} />
        <TweakToggle label="Film thumbnail" value={t.cardFilm} onChange={(v) => setTweak("cardFilm", v)} />
        <TweakSlider label="Corner radius" value={t.cardRadius} min={0} max={28} unit="px"
          onChange={(v) => setTweak("cardRadius", v)} />
        <TweakToggle label="Card shadow" value={t.cardShadow} onChange={(v) => setTweak("cardShadow", v)} />

        <TweakSection label="Detail Panel" />
        <TweakSlider label="Width" value={t.detailWidth} min={440} max={760} step={20} unit="px"
          onChange={(v) => setTweak("detailWidth", v)} />
        <TweakToggle label="Film library" value={t.detailFilm} onChange={(v) => setTweak("detailFilm", v)} />
        <TweakToggle label="Steps / key points" value={t.detailSteps} onChange={(v) => setTweak("detailSteps", v)} />
        <TweakToggle label="Coach's notes" value={t.detailCoachNotes} onChange={(v) => setTweak("detailCoachNotes", v)} />
        <TweakToggle label="Tags" value={t.detailTags} onChange={(v) => setTweak("detailTags", v)} />

        <TweakSection label="Sidebar" />
        <TweakText label="Team name" value={t.brandTeam} onChange={(v) => setTweak("brandTeam", v)} />
        <TweakText label="Subtitle" value={t.brandSub} onChange={(v) => setTweak("brandSub", v)} />
        <TweakToggle label="Progress widget" value={t.showProgressWidget} onChange={(v) => setTweak("showProgressWidget", v)} />
        <TweakToggle label="“My Progress” nav" value={t.showYouNav} onChange={(v) => setTweak("showYouNav", v)} />

        <TweakSection label="Page Header" />
        <TweakText label="Home title" value={t.allTitle} onChange={(v) => setTweak("allTitle", v)} />
        <TweakText label="Home subtitle" value={t.allSub} onChange={(v) => setTweak("allSub", v)} />

        <TweakSection label="Category Names" />
        <TweakText label="Technique" value={t.catTechnique} onChange={(v) => setTweak("catTechnique", v)} />
        <TweakText label="Drills" value={t.catDrills} onChange={(v) => setTweak("catDrills", v)} />
        <TweakText label="Mindset" value={t.catMindset} onChange={(v) => setTweak("catMindset", v)} />
        <TweakText label="Weight" value={t.catWeight} onChange={(v) => setTweak("catWeight", v)} />
        <TweakText label="Strategy" value={t.catStrategy} onChange={(v) => setTweak("catStrategy", v)} />
        <TweakText label="Match Study" value={t.catMatchstudy} onChange={(v) => setTweak("catMatchstudy", v)} />
        <TweakText label="Culture" value={t.catCulture} onChange={(v) => setTweak("catCulture", v)} />
      </TweaksPanel>
    </div>
  );
}

function LoginGate({ team, onUnlock }) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  function submit(e) {
    e.preventDefault();
    if (!onUnlock(code.trim())) { setErr(true); setCode(""); }
  }
  return (
    <div className="gate">
      <form className="gate__card" onSubmit={submit}>
        <div className="gate__mark">W</div>
        <h1 className="gate__team">{team}</h1>
        <p className="gate__sub">Team passcode required to enter the knowledge base.</p>
        <input className={"gate__in" + (err ? " gate__in--err" : "")} type="password"
               value={code} autoFocus placeholder="Passcode"
               onChange={(e) => { setCode(e.target.value); setErr(false); }} />
        {err && <span className="gate__err">That passcode didn't match. Try again.</span>}
        <button className="gate__btn" type="submit">Enter</button>
      </form>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
