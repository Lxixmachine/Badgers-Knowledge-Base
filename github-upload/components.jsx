// components.jsx — UI building blocks for the Badgers Knowledge Base
const { useState, useRef, useEffect } = React;

/* ---------------- Icons (inline line glyphs) ---------------- */
const ICON_PATHS = {
  search:  <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
  plus:    <><path d="M12 5v14M5 12h14"/></>,
  close:   <><path d="M6 6l12 12M18 6L6 18"/></>,
  star:    <><path d="M12 3.5l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 17l-5.3 2.8 1.1-5.9L3.4 9.8l6-.8z"/></>,
  check:   <><path d="M4 12l5 5L20 6"/></>,
  play:    <><path d="M7 5l11 7-11 7z"/></>,
  back:    <><path d="M15 6l-6 6 6 6"/></>,
  chevron: <><path d="M9 6l6 6-6 6"/></>,
  edit:    <><path d="M4 20h4l10-10-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></>,
  trash:   <><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></>,
  // category glyphs
  grapple: <><path d="M5 19c2-4 4-6 7-6s5 2 7 6"/><circle cx="9" cy="7" r="2.4"/><circle cx="15.5" cy="9" r="2.1"/></>,
  lungs:   <><path d="M12 3v8"/><path d="M12 8c0 4-3 4-4 8-.5 2-3 2-3-1 0-4 1-7 3-7 1.5 0 1.7 1 4 0"/><path d="M12 8c0 4 3 4 4 8 .5 2 3 2 3-1 0-4-1-7-3-7-1.5 0-1.7 1-4 0"/></>,
  brain:   <><path d="M9 4a3 3 0 00-3 3 3 3 0 00-1 5 3 3 0 001 5 3 3 0 003 2.5V4z"/><path d="M15 4a3 3 0 013 3 3 3 0 011 5 3 3 0 01-1 5 3 3 0 01-3 2.5V4z"/></>,
  scale:   <><path d="M12 4v16"/><path d="M6 8h12l3 6a4 4 0 01-6 0zM6 8L3 14a4 4 0 006 0z"/><path d="M7 20h10"/></>,
  target:  <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4"/></>,
  flag:    <><path d="M6 21V4"/><path d="M6 4h11l-2 4 2 4H6"/></>,
  grip:    <><circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/></>,
  file:    <><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/></>,
  download:<><path d="M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5"/><path d="M5 19h14"/></>,
  external:<><path d="M14 4h6v6"/><path d="M20 4l-8.5 8.5"/><path d="M18 13.5V19a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5.5"/></>,
  clapper: <><path d="M4 9h16v9a2 2 0 01-2 2H6a2 2 0 01-2-2z"/><path d="M4 9l1.2-3.2 15 .9L19 9"/><path d="M8.5 5.9l1.5 3M13 6.2l1.5 3"/></>,
};
function Icon({ name, size = 22, stroke = 1.9, fill = false, style, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={fill ? "currentColor" : (name === "grip" ? "currentColor" : "none")}
         stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {ICON_PATHS[name]}
    </svg>
  );
}

/* ---------------- Level badge ---------------- */
function LevelTag({ level }) {
  return <span className={"level level--" + level.toLowerCase()}>{level}</span>;
}

/* ---------------- Entry card ---------------- */
function EntryCard({ entry, cat, saved, learned, onOpen, onSave, list, show = {}, drag = null, dragging = false }) {
  const films = normalizeFilms(entry);
  const { summary = true, level = true, film = true } = show;
  return (
    <article className={"card" + (list ? " card--list" : "") + (dragging ? " card--dragging" : "") + (drag ? " card--draggable" : "")}
             onClick={() => onOpen(entry)} {...(drag || {})}>
      {drag && <span className="card__grip" title="Drag to reorder" onClick={(e) => e.stopPropagation()}><Icon name="grip" size={16} stroke={2} /></span>}
      {film && films.length > 0 && !list && <VideoThumb entry={entry} />}
      <div className="card__body">
        <div className="card__top">
          <span className="card__cat" style={{ color: "var(--accent)" }}>
            <Icon name={cat.icon} size={15} stroke={2} />{cat.label}
          </span>
          {learned && <span className="card__learned"><Icon name="check" size={13} stroke={2.6} />Learned</span>}
        </div>
        <h3 className="card__title">{entry.title}</h3>
        {summary && <p className="card__summary">{entry.summary}</p>}
        <div className="card__foot">
          <div className="card__tags">
            {level && <LevelTag level={entry.level} />}
            {film && films.length > 0 && list && <span className="card__hasvid"><Icon name="play" size={12} fill />{films.length > 1 ? films.length + " clips" : "Film"}</span>}
          </div>
          <button className={"savebtn" + (saved ? " savebtn--on" : "")}
                  onClick={(e) => { e.stopPropagation(); onSave(entry.id); }}
                  aria-label={saved ? "Unsave" : "Save"}>
            <Icon name="star" size={18} fill={saved} stroke={2} />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------------- Detail view ---------------- */
function DetailView({ entry, cat, saved, learned, onClose, onSave, onLearn, onEdit, onDelete, show = {}, canEdit = true }) {
  const ref = useRef(null);
  const [confirm, setConfirm] = useState(false);
  const { film = true, coachNotes = true, tags = true, steps = true } = show;
  useEffect(() => { if (ref.current) ref.current.scrollTop = 0; setConfirm(false); }, [entry.id]);
  const quoteCat = entry.category === "culture" && /quote/i.test(entry.tags.join(" "));
  return (
    <div className="detail" onClick={onClose}>
      <div className="detail__panel" ref={ref} onClick={(e) => e.stopPropagation()}>
        <div className="detail__tools">
          {canEdit && <button className="detail__tool" onClick={() => onEdit(entry)} aria-label="Edit" title="Edit"><Icon name="edit" size={19} stroke={2} /></button>}
          {canEdit && <button className="detail__tool detail__tool--danger" onClick={() => setConfirm(true)} aria-label="Delete" title="Delete"><Icon name="trash" size={18} stroke={2} /></button>}
          <button className="detail__tool" onClick={onClose} aria-label="Close"><Icon name="close" size={20} /></button>
        </div>
        <div className="detail__inner">
          <span className="detail__cat" style={{ color: "var(--accent)" }}>
            <Icon name={cat.icon} size={16} stroke={2} />{cat.label}
          </span>
          <h2 className="detail__title">{entry.title}</h2>
          <div className="detail__meta">
            <LevelTag level={entry.level} />
            <span className="detail__author">Added by {entry.author}</span>
          </div>
          <p className="detail__summary">{entry.summary}</p>

          {normalizeFilms(entry).length > 0 && film && (
            <div className="detail__section">
              <h4 className="detail__h">Film Library</h4>
              <FilmLibrary entry={entry} />
            </div>
          )}

          {normalizeDocs(entry).length > 0 && (
            <div className="detail__section">
              <h4 className="detail__h">Handouts &amp; Documents</h4>
              <DocLibrary entry={entry} />
            </div>
          )}

          {steps && entry.steps && entry.steps.length > 0 && (
          <div className="detail__section">
            <h4 className="detail__h">{quoteCat ? "The Lines" : entry.category === "mindset" || entry.category === "weight" || entry.category === "strategy" ? "Key Points" : "Steps"}</h4>
            <ol className={"steps" + (quoteCat ? " steps--quote" : "")}>
              {entry.steps.map((s, i) => (
                <li key={i} className="step">
                  {!quoteCat && <span className="step__n">{i + 1}</span>}
                  <span className="step__t">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          )}

          {entry.coachNotes && coachNotes && (
            <div className="coachnote">
              <div className="coachnote__tab">Coach's Notes</div>
              <p className="coachnote__body">{entry.coachNotes}</p>
            </div>
          )}

          <div className="detail__tags">
            {tags && entry.tags.map((t) => <span key={t} className="chip chip--static">#{t}</span>)}
          </div>
        </div>
        <div className="detail__actions">
          <button className={"action" + (learned ? " action--done" : "")} onClick={() => onLearn(entry.id)}>
            <Icon name="check" size={18} stroke={2.6} />{learned ? "Marked Learned" : "Mark as Learned"}
          </button>
          <button className={"action action--ghost" + (saved ? " action--saved" : "")} onClick={() => onSave(entry.id)}>
            <Icon name="star" size={18} fill={saved} stroke={2} />{saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
      {confirm && (
        <div className="confirm" onClick={(e) => { e.stopPropagation(); setConfirm(false); }}>
          <div className="confirm__box" onClick={(e) => e.stopPropagation()}>
            <h4 className="confirm__title">Delete this entry?</h4>
            <p className="confirm__text">“{entry.title}” will be removed from the database. This can’t be undone.</p>
            <div className="confirm__row">
              <button className="action action--danger" onClick={() => { onDelete(entry.id); }}>
                <Icon name="trash" size={17} stroke={2.2} />Delete
              </button>
              <button className="action action--ghost" onClick={() => setConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Add / edit entry form ---------------- */
function AddEntryForm({ onClose, onAdd, initial }) {
  const edit = !!initial;
  const [title, setTitle] = useState(initial ? initial.title : "");
  const [category, setCategory] = useState(initial ? initial.category : "technique");
  const [level, setLevel] = useState(initial ? initial.level : "Fundamental");
  const [author, setAuthor] = useState(initial ? initial.author : window.WKB.COACHES[0]);
  const [summary, setSummary] = useState(initial ? initial.summary : "");
  const [films, setFilms] = useState(initial ? normalizeFilms(initial).map((f) => ({ ...f })) : []);
  const [docs, setDocs] = useState(initial && Array.isArray(initial.docs) ? initial.docs.map((d) => ({ ...d })) : []);
  const [tags, setTags] = useState(initial ? initial.tags.join(", ") : "");
  const [stepsText, setStepsText] = useState(initial ? initial.steps.join("\n") : "");
  const [coachNotes, setCoachNotes] = useState(initial ? (initial.coachNotes || "") : "");
  const valid = title.trim() && summary.trim();

  function submit() {
    if (!valid) return;
    const steps = stepsText.split("\n").map((s) => s.trim()).filter(Boolean);
    const cleanFilms = films
      .filter((f) => (f.url && f.url.trim()) || f.fileKey || (f.label && f.label.trim()))
      .map((f) => ({
        id: f.id || ("f" + Math.random().toString(36).slice(2, 8)),
        label: (f.label || "").trim(),
        role: f.role || "Demo",
        url: f.url ? f.url.trim() : null,
        fileKey: f.fileKey || null,
        fileName: f.fileName || null,
        mime: f.mime || null,
      }));
    const cleanDocs = docs
      .filter((d) => (d.url && d.url.trim()) || d.fileKey)
      .map((d) => ({
        id: d.id || ("d" + Math.random().toString(36).slice(2, 8)),
        label: (d.label || "").trim(),
        url: d.url ? d.url.trim() : null,
        fileKey: d.fileKey || null,
        fileName: d.fileName || null,
        mime: d.mime || null,
      }));
    onAdd({
      id: edit ? initial.id : "u-" + Date.now(),
      title: title.trim(), category, level, author,
      tags: tags.split(",").map((t) => t.trim().replace(/^#/, "")).filter(Boolean),
      films: cleanFilms,
      docs: cleanDocs,
      hasVideo: cleanFilms.length > 0,
      summary: summary.trim(),
      steps,
      coachNotes: coachNotes.trim() || null,
      userAdded: edit ? initial.userAdded : true,
    });
  }

  return (
    <div className="detail" onClick={onClose}>
      <div className="detail__panel detail__panel--form" onClick={(e) => e.stopPropagation()}>
        <button className="detail__close" onClick={onClose} aria-label="Close"><Icon name="close" size={22} /></button>
        <div className="detail__inner">
          <span className="detail__cat" style={{ color: "var(--accent)" }}>{edit ? "Edit Entry" : "New Entry"}</span>
          <h2 className="detail__title">{edit ? "Edit This Entry" : "Add to the Database"}</h2>

          <label className="f">
            <span className="f__l">Title</span>
            <input className="f__in" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Ankle Pick from a Tie" />
          </label>

          <div className="f__row">
            <label className="f">
              <span className="f__l">Category</span>
              <select className="f__in" value={category} onChange={(e) => setCategory(e.target.value)}>
                {window.WKB.CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </label>
            <label className="f">
              <span className="f__l">Level</span>
              <select className="f__in" value={level} onChange={(e) => setLevel(e.target.value)}>
                {window.WKB.LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </label>
          </div>

          <label className="f">
            <span className="f__l">Added by</span>
            <select className="f__in" value={author} onChange={(e) => setAuthor(e.target.value)}>
              {window.WKB.COACHES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label className="f">
            <span className="f__l">Summary</span>
            <textarea className="f__in f__ta" rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="One or two sentences on what this is and why it matters." />
          </label>

          <label className="f">
            <span className="f__l">Steps / Key points <em className="f__hint">one per line</em></span>
            <textarea className="f__in f__ta" rows={4} value={stepsText} onChange={(e) => setStepsText(e.target.value)} placeholder={"Level change, head up\nPenetration step\nFinish the corner"} />
          </label>

          <label className="f">
            <span className="f__l">Coach's notes <em className="f__hint">optional</em></span>
            <textarea className="f__in f__ta" rows={2} value={coachNotes} onChange={(e) => setCoachNotes(e.target.value)} placeholder="The thing you say every practice about this." />
          </label>

          <label className="f">
            <span className="f__l">Tags <em className="f__hint">comma separated</em></span>
            <input className="f__in" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="takedown, neutral, leg attack" />
          </label>

          <FilmBuilder films={films} setFilms={setFilms} />

          <DocBuilder docs={docs} setDocs={setDocs} />
        </div>
        <div className="detail__actions">
          <button className={"action" + (valid ? "" : " action--disabled")} onClick={submit}>
            <Icon name={edit ? "check" : "plus"} size={18} stroke={2.4} />{edit ? "Save Changes" : "Add Entry"}
          </button>
          <button className="action action--ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, LevelTag, EntryCard, DetailView, AddEntryForm });
