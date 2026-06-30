// film.jsx — film model, IndexedDB blob store, library + upload UI
const { useState, useEffect } = React;

/* ---------- IndexedDB blob store (uploaded video files) ---------- */
const FilmDB = (() => {
  const DB = "wkb_films", STORE = "films";
  let dbp;
  function open() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains(STORE)) r.result.createObjectStore(STORE); };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  async function put(key, blob) {
    const db = await open();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(blob, key);
      tx.oncomplete = () => res(key); tx.onerror = () => rej(tx.error);
    });
  }
  async function get(key) {
    const db = await open();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, "readonly");
      const rq = tx.objectStore(STORE).get(key);
      rq.onsuccess = () => res(rq.result); rq.onerror = () => rej(rq.error);
    });
  }
  async function del(key) {
    try {
      const db = await open();
      return new Promise((res) => {
        const tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).delete(key);
        tx.oncomplete = () => res(); tx.onerror = () => res();
      });
    } catch { /* ignore */ }
  }
  return { put, get, del };
})();

const FILM_ROLES = ["Demo", "Match", "Drill", "Slow-mo", "Common mistake", "Other"];

/* ---------- Film helpers ---------- */
function parseFilm(url) {
  if (!url) return null;
  url = String(url).trim();
  let m;
  if ((m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)))
    return { type: "youtube", id: m[1], embed: `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0&modestbranding=1`, thumb: `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` };
  if ((m = url.match(/vimeo\.com\/(\d+)/)))
    return { type: "vimeo", id: m[1], embed: `https://player.vimeo.com/video/${m[1]}?autoplay=1`, thumb: null };
  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url))
    return { type: "file", src: url, thumb: null };
  return { type: "link", href: url, thumb: null };
}
function normalizeFilms(entry) {
  if (Array.isArray(entry.films)) return entry.films;
  if (entry.filmUrl) return [{ id: "f0", label: entry.videoLabel || "Film", role: "Demo", url: entry.filmUrl }];
  return [];
}
function filmKind(film) {
  if (film.fileKey) return "upload";
  const p = parseFilm(film.url);
  return p ? p.type : "placeholder";
}
function filmThumb(film) {
  if (film.fileKey) return null;
  const p = parseFilm(film.url);
  return p && p.thumb;
}

/* ---------- Uploaded-file video (reads blob from IndexedDB) ---------- */
function UploadVideo({ fileKey }) {
  const [url, setUrl] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    let u, live = true;
    FilmDB.get(fileKey).then((blob) => {
      if (!blob) { setErr(true); return; }
      u = URL.createObjectURL(blob);
      if (live) setUrl(u);
    }).catch(() => setErr(true));
    return () => { live = false; if (u) URL.revokeObjectURL(u); };
  }, [fileKey]);
  if (err) return <div className="vthumb vthumb--big lib__empty"><div className="lib__emptytxt"><span>Film file unavailable</span><em>It may have been cleared from this browser.</em></div></div>;
  if (!url) return <div className="vthumb vthumb--big lib__empty"><div className="lib__emptytxt"><span>Loading film…</span></div></div>;
  return <div className="player"><video src={url} controls playsInline></video></div>;
}

/* ---------- The active clip on the main stage ---------- */
function FilmStage({ film, playing, onPlay }) {
  const kind = filmKind(film);
  if (kind === "upload") return <UploadVideo fileKey={film.fileKey} />;
  if (playing && (kind === "youtube" || kind === "vimeo")) {
    const p = parseFilm(film.url);
    return <div className="player"><iframe src={p.embed} allow="autoplay; fullscreen; encrypted-media" allowFullScreen title="Film"></iframe></div>;
  }
  if (playing && kind === "file")
    return <div className="player"><video src={film.url} controls autoPlay playsInline></video></div>;
  if (kind === "placeholder")
    return (
      <div className="vthumb vthumb--big lib__empty">
        <div className="vthumb__grain" />
        <div className="lib__emptytxt">
          <Icon name="play" size={22} />
          <span>No film attached yet</span>
          <em>Use Edit to paste a YouTube/Vimeo link or upload a clip.</em>
        </div>
        {film.label && <div className="vthumb__label">{film.label}</div>}
      </div>
    );
  const thumb = filmThumb(film);
  const onClick = () => { if (kind === "link") window.open(parseFilm(film.url).href, "_blank", "noopener"); else onPlay(); };
  return (
    <div className="vthumb vthumb--big vthumb--live" onClick={onClick} role="button">
      {thumb ? <img className="vthumb__img" src={thumb} alt="" /> : <div className="vthumb__grain" />}
      <div className="vthumb__play"><Icon name="play" size={26} fill /></div>
      <div className="vthumb__meta"><span className="vthumb__film">FILM</span></div>
      {film.label && <div className="vthumb__label">{film.label}{kind === "link" ? " · opens in new tab" : ""}</div>}
    </div>
  );
}

/* ---------- Clip thumbnail in the strip ---------- */
function ClipThumb({ film }) {
  const kind = filmKind(film);
  const thumb = filmThumb(film);
  if (thumb) return <span className="clip__thumb"><img src={thumb} alt="" /></span>;
  return <span className={"clip__thumb clip__thumb--" + kind}><Icon name={kind === "placeholder" ? "plus" : "play"} size={15} fill={kind !== "placeholder"} /></span>;
}

/* ---------- Film library (detail view) ---------- */
function FilmLibrary({ entry }) {
  const films = normalizeFilms(entry);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { setIdx(0); setPlaying(false); }, [entry.id]);
  if (!films.length) return null;
  const film = films[Math.min(idx, films.length - 1)];
  return (
    <div className="lib">
      <div className="lib__stage">
        <FilmStage key={(film.id || idx) + ":" + playing} film={film} playing={playing} onPlay={() => setPlaying(true)} />
      </div>
      {films.length > 1 && (
        <>
          <div className="lib__count">{films.length} clips in this library</div>
          <div className="lib__strip">
            {films.map((f, i) => (
              <button key={f.id || i} className={"clip" + (i === idx ? " clip--on" : "")}
                      onClick={() => { setIdx(i); setPlaying(false); }}>
                <ClipThumb film={f} />
                <div className="clip__meta">
                  {f.role && <span className="clip__role">{f.role}</span>}
                  <span className="clip__label">{f.label || ("Clip " + (i + 1))}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Card thumbnail ---------- */
function VideoThumb({ entry }) {
  const films = normalizeFilms(entry);
  if (!films.length) return null;
  const thumb = filmThumb(films[0]);
  return (
    <div className="vthumb">
      {thumb ? <img className="vthumb__img" src={thumb} alt="" loading="lazy" /> : <div className="vthumb__grain" />}
      <div className="vthumb__play"><Icon name="play" size={18} fill /></div>
      <div className="vthumb__meta">
        <span className="vthumb__film">FILM</span>
        {films.length > 1 && <span className="vthumb__dur">{films.length} clips</span>}
      </div>
    </div>
  );
}

/* ---------- Per-row preview in the form builder ---------- */
function FilmRowPreview({ film }) {
  if (film.fileKey) return <div className="fb__prev fb__prev--ok"><Icon name="check" size={13} stroke={2.6} />Local file ready · plays inline</div>;
  const p = parseFilm(film.url);
  if (!p) return null;
  const m = { youtube: "YouTube clip", vimeo: "Vimeo clip", file: "Direct video file", link: "External link — opens in new tab" };
  return (
    <div className={"fb__prev" + (p.type === "link" ? " fb__prev--warn" : " fb__prev--ok")}>
      {p.thumb && <img className="fb__prevthumb" src={p.thumb} alt="" />}
      <Icon name={p.type === "link" ? "play" : "check"} size={13} stroke={2.6} />{m[p.type]}
    </div>
  );
}

/* ---------- Film library builder (form) ---------- */
function FilmBuilder({ films, setFilms }) {
  function update(i, patch) { setFilms(films.map((f, j) => (j === i ? { ...f, ...patch } : f))); }
  function add() { setFilms([...films, { id: "f" + Date.now() + Math.random().toString(36).slice(2, 6), label: "", role: "Demo", url: "" }]); }
  function remove(i) { const f = films[i]; if (f.fileKey) FilmDB.del(f.fileKey); setFilms(films.filter((_, j) => j !== i)); }
  async function onFile(i, file) {
    if (!file) return;
    const key = "file_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    await FilmDB.put(key, file);
    update(i, { fileKey: key, fileName: file.name, mime: file.type, url: "" });
  }
  return (
    <div className="fb">
      <span className="f__l">Film library <em className="f__hint">add as many examples as you want — demo, match film, drills, mistakes</em></span>
      {films.length === 0 && <div className="fb__empty">No clips yet. Add a demonstration, then stack on match examples and drill reps.</div>}
      {films.map((f, i) => (
        <div className="fb__row" key={f.id || i}>
          <div className="fb__head">
            <input className="f__in fb__label" value={f.label || ""} onChange={(e) => update(i, { label: e.target.value })} placeholder={"Clip " + (i + 1) + " caption — e.g. Coach demo"} />
            <select className="f__in fb__role" value={f.role || "Demo"} onChange={(e) => update(i, { role: e.target.value })}>
              {FILM_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button className="fb__rm" onClick={() => remove(i)} aria-label="Remove clip"><Icon name="trash" size={16} stroke={2} /></button>
          </div>
          <div className="fb__src">
            {f.fileKey ? (
              <div className="fb__file">
                <Icon name="check" size={15} stroke={2.4} />
                <span className="fb__filename">{f.fileName || "Uploaded file"}</span>
                <button className="fb__clear" onClick={() => { FilmDB.del(f.fileKey); update(i, { fileKey: null, fileName: null, mime: null }); }}>Clear</button>
              </div>
            ) : (
              <>
                <input className="f__in fb__url" value={f.url || ""} onChange={(e) => update(i, { url: e.target.value })} placeholder="Paste YouTube / Vimeo / .mp4 URL" />
                <span className="fb__or">or</span>
                <label className="fb__upload"><Icon name="plus" size={15} stroke={2.4} />Upload file
                  <input type="file" accept="video/*" hidden onChange={(e) => onFile(i, e.target.files[0])} />
                </label>
              </>
            )}
          </div>
          {(f.url || f.fileKey) && <FilmRowPreview film={f} />}
        </div>
      ))}
      <button className="fb__add" onClick={add}><Icon name="plus" size={16} stroke={2.4} />Add a clip</button>
    </div>
  );
}

Object.assign(window, {
  FilmDB, FILM_ROLES, parseFilm, normalizeFilms, filmKind, filmThumb,
  VideoThumb, FilmLibrary, FilmBuilder,
});
