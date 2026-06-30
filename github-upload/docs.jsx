// docs.jsx — document & handout attachments (PDF / Word / PowerPoint / links).
// Reuses the FilmDB IndexedDB blob store for uploaded files. Loaded after components.jsx.

function normalizeDocs(entry) {
  if (!entry || !Array.isArray(entry.docs)) return [];
  return entry.docs.filter(Boolean);
}

function docExt(doc) {
  const m = (doc.fileName || doc.url || "").match(/\.([a-z0-9]+)(?:[?#]|$)/i);
  return m ? m[1].toLowerCase() : "";
}

function docTypeLabel(doc) {
  const map = {
    pdf: "PDF", doc: "Word", docx: "Word", ppt: "PowerPoint", pptx: "PowerPoint",
    xls: "Excel", xlsx: "Excel", key: "Keynote", pages: "Pages", txt: "Text",
    csv: "Spreadsheet", rtf: "Document",
  };
  const e = docExt(doc);
  if (map[e]) return map[e];
  const u = (doc.url || "").toLowerCase();
  if (/docs\.google|drive\.google/.test(u)) return "Google Drive";
  if (/sharepoint|onedrive|1drv|office\.com/.test(u)) return "Office Online";
  if (u) return "Link";
  return "File";
}

/* ---------- One document row in the detail view ---------- */
function DocItem({ doc }) {
  const type = docTypeLabel(doc);
  const name = doc.label || doc.fileName || (type + " document");
  const isLink = !!doc.url && !doc.fileKey;
  async function open() {
    if (doc.url) { window.open(doc.url, "_blank", "noopener"); return; }
    if (doc.fileKey && window.FilmDB) {
      const blob = await window.FilmDB.get(doc.fileKey);
      if (!blob) { window.alert("This file isn't on this device. Re-upload it (it becomes available to everyone once you Publish)."); return; }
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener");
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    }
  }
  return (
    <button className="doc" onClick={open}>
      <span className="doc__ic"><Icon name="file" size={20} stroke={1.8} /></span>
      <span className="doc__meta">
        <span className="doc__name">{name}</span>
        <span className="doc__type">{type}{doc.fileName && doc.fileName !== name ? " · " + doc.fileName : ""}</span>
      </span>
      <span className="doc__act"><Icon name={isLink ? "external" : "download"} size={17} stroke={2} /></span>
    </button>
  );
}

/* ---------- Documents list (detail view) ---------- */
function DocLibrary({ entry }) {
  const docs = normalizeDocs(entry);
  if (!docs.length) return null;
  return <div className="docs">{docs.map((d, i) => <DocItem key={d.id || i} doc={d} />)}</div>;
}

/* ---------- Documents builder (add/edit form) ---------- */
function DocBuilder({ docs, setDocs }) {
  function update(i, patch) { setDocs(docs.map((d, j) => (j === i ? { ...d, ...patch } : d))); }
  function add() { setDocs([...docs, { id: "d" + Date.now() + Math.random().toString(36).slice(2, 6), label: "", url: "" }]); }
  function remove(i) { const d = docs[i]; if (d.fileKey && window.FilmDB) window.FilmDB.del(d.fileKey); setDocs(docs.filter((_, j) => j !== i)); }
  async function onFile(i, file) {
    if (!file) return;
    const key = "file_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    await window.FilmDB.put(key, file);
    update(i, { fileKey: key, fileName: file.name, mime: file.type, url: "" });
  }
  const ACCEPT = ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.key,.pages,.txt,.csv,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  return (
    <div className="fb">
      <span className="f__l">Handouts &amp; documents <em className="f__hint">PDFs, Word docs, PowerPoints — or paste a Google Drive / OneDrive link</em></span>
      {docs.length === 0 && <div className="fb__empty">No documents yet. Attach a scouting report, lifting program, or slide deck.</div>}
      {docs.map((d, i) => (
        <div className="fb__row" key={d.id || i}>
          <div className="fb__head">
            <input className="f__in fb__label" value={d.label || ""} onChange={(e) => update(i, { label: e.target.value })} placeholder={"Document " + (i + 1) + " name — e.g. Week 3 lifting plan"} />
            <button className="fb__rm" onClick={() => remove(i)} aria-label="Remove document"><Icon name="trash" size={16} stroke={2} /></button>
          </div>
          <div className="fb__src">
            {d.fileKey ? (
              <div className="fb__file">
                <Icon name="check" size={15} stroke={2.4} />
                <span className="fb__filename">{d.fileName || "Uploaded file"}</span>
                <button className="fb__clear" onClick={() => { window.FilmDB.del(d.fileKey); update(i, { fileKey: null, fileName: null, mime: null }); }}>Clear</button>
              </div>
            ) : (
              <>
                <input className="f__in fb__url" value={d.url || ""} onChange={(e) => update(i, { url: e.target.value })} placeholder="Paste a link (Google Drive, OneDrive, PDF URL)" />
                <span className="fb__or">or</span>
                <label className="fb__upload"><Icon name="plus" size={15} stroke={2.4} />Upload file
                  <input type="file" accept={ACCEPT} hidden onChange={(e) => onFile(i, e.target.files[0])} />
                </label>
              </>
            )}
          </div>
          {(d.url || d.fileKey) && (
            <div className="fb__prev fb__prev--ok">
              <Icon name="check" size={13} stroke={2.6} />
              {docTypeLabel(d)}{d.fileKey ? " · uploaded · publishes to a docs/ folder" : " · opens in a new tab"}
            </div>
          )}
        </div>
      ))}
      <button className="fb__add" onClick={add}><Icon name="plus" size={16} stroke={2.4} />Add a document</button>
    </div>
  );
}

Object.assign(window, { normalizeDocs, docTypeLabel, DocLibrary, DocBuilder });
