// app.compiled.js — generated from the editable .jsx sources; do not hand-edit
// Rebuild with: npm run build
'use strict';
/* ====== tweaks-panel.jsx ====== */
(() => {
  const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;
  function useTweaks(defaults) {
    const [values, setValues] = React.useState(defaults);
    const setTweak = React.useCallback((keyOrEdits, val) => {
      const edits = typeof keyOrEdits === "object" && keyOrEdits !== null ? keyOrEdits : { [keyOrEdits]: val };
      setValues((prev) => ({ ...prev, ...edits }));
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits }, "*");
      window.dispatchEvent(new CustomEvent("tweakchange", { detail: edits }));
    }, []);
    return [values, setTweak];
  }
  function TweaksPanel({ title = "Tweaks", children }) {
    const [open, setOpen] = React.useState(false);
    const dragRef = React.useRef(null);
    const offsetRef = React.useRef({ x: 16, y: 16 });
    const PAD = 16;
    const clampToViewport = React.useCallback(() => {
      const panel = dragRef.current;
      if (!panel) return;
      const w = panel.offsetWidth, h = panel.offsetHeight;
      const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
      const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
      offsetRef.current = {
        x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
        y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
      };
      panel.style.right = offsetRef.current.x + "px";
      panel.style.bottom = offsetRef.current.y + "px";
    }, []);
    React.useEffect(() => {
      if (!open) return;
      clampToViewport();
      if (typeof ResizeObserver === "undefined") {
        window.addEventListener("resize", clampToViewport);
        return () => window.removeEventListener("resize", clampToViewport);
      }
      const ro = new ResizeObserver(clampToViewport);
      ro.observe(document.documentElement);
      return () => ro.disconnect();
    }, [open, clampToViewport]);
    React.useEffect(() => {
      const onMsg = (e) => {
        var _a;
        const t = (_a = e == null ? void 0 : e.data) == null ? void 0 : _a.type;
        if (t === "__activate_edit_mode") setOpen(true);
        else if (t === "__deactivate_edit_mode") setOpen(false);
      };
      window.addEventListener("message", onMsg);
      window.parent.postMessage({ type: "__edit_mode_available" }, "*");
      return () => window.removeEventListener("message", onMsg);
    }, []);
    const dismiss = () => {
      setOpen(false);
      window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
    };
    const onDragStart = (e) => {
      const panel = dragRef.current;
      if (!panel) return;
      const r = panel.getBoundingClientRect();
      const sx = e.clientX, sy = e.clientY;
      const startRight = window.innerWidth - r.right;
      const startBottom = window.innerHeight - r.bottom;
      const move = (ev) => {
        offsetRef.current = {
          x: startRight - (ev.clientX - sx),
          y: startBottom - (ev.clientY - sy)
        };
        clampToViewport();
      };
      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    };
    if (!open) return null;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("style", null, __TWEAKS_STYLE), /* @__PURE__ */ React.createElement(
      "div",
      {
        ref: dragRef,
        className: "twk-panel",
        "data-omelette-chrome": "",
        style: { right: offsetRef.current.x, bottom: offsetRef.current.y }
      },
      /* @__PURE__ */ React.createElement("div", { className: "twk-hd", onMouseDown: onDragStart }, /* @__PURE__ */ React.createElement("b", null, title), /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "twk-x",
          "aria-label": "Close tweaks",
          onMouseDown: (e) => e.stopPropagation(),
          onClick: dismiss
        },
        "✕"
      )),
      /* @__PURE__ */ React.createElement("div", { className: "twk-body" }, children)
    ));
  }
  function TweakSection({ label, children }) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "twk-sect" }, label), children);
  }
  function TweakRow({ label, value, children, inline = false }) {
    return /* @__PURE__ */ React.createElement("div", { className: inline ? "twk-row twk-row-h" : "twk-row" }, /* @__PURE__ */ React.createElement("div", { className: "twk-lbl" }, /* @__PURE__ */ React.createElement("span", null, label), value != null && /* @__PURE__ */ React.createElement("span", { className: "twk-val" }, value)), children);
  }
  function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = "", onChange }) {
    return /* @__PURE__ */ React.createElement(TweakRow, { label, value: `${value}${unit}` }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "range",
        className: "twk-slider",
        min,
        max,
        step,
        value,
        onChange: (e) => onChange(Number(e.target.value))
      }
    ));
  }
  function TweakToggle({ label, value, onChange }) {
    return /* @__PURE__ */ React.createElement("div", { className: "twk-row twk-row-h" }, /* @__PURE__ */ React.createElement("div", { className: "twk-lbl" }, /* @__PURE__ */ React.createElement("span", null, label)), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "twk-toggle",
        "data-on": value ? "1" : "0",
        role: "switch",
        "aria-checked": !!value,
        onClick: () => onChange(!value)
      },
      /* @__PURE__ */ React.createElement("i", null)
    ));
  }
  function TweakRadio({ label, value, options, onChange }) {
    var _a;
    const trackRef = React.useRef(null);
    const [dragging, setDragging] = React.useState(false);
    const valueRef = React.useRef(value);
    valueRef.current = value;
    const labelLen = (o) => String(typeof o === "object" ? o.label : o).length;
    const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
    const fitsAsSegments = maxLen <= ((_a = { 2: 16, 3: 10 }[options.length]) != null ? _a : 0);
    if (!fitsAsSegments) {
      const resolve = (s) => {
        const m = options.find((o) => String(typeof o === "object" ? o.value : o) === s);
        return m === void 0 ? s : typeof m === "object" ? m.value : m;
      };
      return /* @__PURE__ */ React.createElement(
        TweakSelect,
        {
          label,
          value,
          options,
          onChange: (s) => onChange(resolve(s))
        }
      );
    }
    const opts = options.map((o) => typeof o === "object" ? o : { value: o, label: o });
    const idx = Math.max(0, opts.findIndex((o) => o.value === value));
    const n = opts.length;
    const segAt = (clientX) => {
      const r = trackRef.current.getBoundingClientRect();
      const inner = r.width - 4;
      const i = Math.floor((clientX - r.left - 2) / inner * n);
      return opts[Math.max(0, Math.min(n - 1, i))].value;
    };
    const onPointerDown = (e) => {
      setDragging(true);
      const v0 = segAt(e.clientX);
      if (v0 !== valueRef.current) onChange(v0);
      const move = (ev) => {
        if (!trackRef.current) return;
        const v = segAt(ev.clientX);
        if (v !== valueRef.current) onChange(v);
      };
      const up = () => {
        setDragging(false);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };
    return /* @__PURE__ */ React.createElement(TweakRow, { label }, /* @__PURE__ */ React.createElement(
      "div",
      {
        ref: trackRef,
        role: "radiogroup",
        onPointerDown,
        className: dragging ? "twk-seg dragging" : "twk-seg"
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "twk-seg-thumb",
          style: {
            left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
            width: `calc((100% - 4px) / ${n})`
          }
        }
      ),
      opts.map((o) => /* @__PURE__ */ React.createElement("button", { key: o.value, type: "button", role: "radio", "aria-checked": o.value === value }, o.label))
    ));
  }
  function TweakSelect({ label, value, options, onChange }) {
    return /* @__PURE__ */ React.createElement(TweakRow, { label }, /* @__PURE__ */ React.createElement("select", { className: "twk-field", value, onChange: (e) => onChange(e.target.value) }, options.map((o) => {
      const v = typeof o === "object" ? o.value : o;
      const l = typeof o === "object" ? o.label : o;
      return /* @__PURE__ */ React.createElement("option", { key: v, value: v }, l);
    })));
  }
  function TweakText({ label, value, placeholder, onChange }) {
    return /* @__PURE__ */ React.createElement(TweakRow, { label }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "twk-field",
        type: "text",
        value,
        placeholder,
        onChange: (e) => onChange(e.target.value)
      }
    ));
  }
  function TweakNumber({ label, value, min, max, step = 1, unit = "", onChange }) {
    const clamp = (n) => {
      if (min != null && n < min) return min;
      if (max != null && n > max) return max;
      return n;
    };
    const startRef = React.useRef({ x: 0, val: 0 });
    const onScrubStart = (e) => {
      e.preventDefault();
      startRef.current = { x: e.clientX, val: value };
      const decimals = (String(step).split(".")[1] || "").length;
      const move = (ev) => {
        const dx = ev.clientX - startRef.current.x;
        const raw = startRef.current.val + dx * step;
        const snapped = Math.round(raw / step) * step;
        onChange(clamp(Number(snapped.toFixed(decimals))));
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "twk-num" }, /* @__PURE__ */ React.createElement("span", { className: "twk-num-lbl", onPointerDown: onScrubStart }, label), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value,
        min,
        max,
        step,
        onChange: (e) => onChange(clamp(Number(e.target.value)))
      }
    ), unit && /* @__PURE__ */ React.createElement("span", { className: "twk-num-unit" }, unit));
  }
  function __twkIsLight(hex) {
    const h = String(hex).replace("#", "");
    const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, "0");
    const n = parseInt(x.slice(0, 6), 16);
    if (Number.isNaN(n)) return true;
    const r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255;
    return r * 299 + g * 587 + b * 114 > 148e3;
  }
  const __TwkCheck = ({ light }) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 14 14", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M3 7.2 5.8 10 11 4.2",
      fill: "none",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      stroke: light ? "rgba(0,0,0,.78)" : "#fff"
    }
  ));
  function TweakColor({ label, value, options, onChange }) {
    if (!options || !options.length) {
      return /* @__PURE__ */ React.createElement("div", { className: "twk-row twk-row-h" }, /* @__PURE__ */ React.createElement("div", { className: "twk-lbl" }, /* @__PURE__ */ React.createElement("span", null, label)), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "color",
          className: "twk-swatch",
          value,
          onChange: (e) => onChange(e.target.value)
        }
      ));
    }
    const key = (o) => String(JSON.stringify(o)).toLowerCase();
    const cur = key(value);
    return /* @__PURE__ */ React.createElement(TweakRow, { label }, /* @__PURE__ */ React.createElement("div", { className: "twk-chips", role: "radiogroup" }, options.map((o, i) => {
      const colors = Array.isArray(o) ? o : [o];
      const [hero, ...rest] = colors;
      const sup = rest.slice(0, 4);
      const on = key(o) === cur;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: i,
          type: "button",
          className: "twk-chip",
          role: "radio",
          "aria-checked": on,
          "data-on": on ? "1" : "0",
          "aria-label": colors.join(", "),
          title: colors.join(" · "),
          style: { background: hero },
          onClick: () => onChange(o)
        },
        sup.length > 0 && /* @__PURE__ */ React.createElement("span", null, sup.map((c, j) => /* @__PURE__ */ React.createElement("i", { key: j, style: { background: c } }))),
        on && /* @__PURE__ */ React.createElement(__TwkCheck, { light: __twkIsLight(hero) })
      );
    })));
  }
  function TweakButton({ label, onClick, secondary = false }) {
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: secondary ? "twk-btn secondary" : "twk-btn",
        onClick
      },
      label
    );
  }
  Object.assign(window, {
    useTweaks,
    TweaksPanel,
    TweakSection,
    TweakRow,
    TweakSlider,
    TweakToggle,
    TweakRadio,
    TweakSelect,
    TweakText,
    TweakNumber,
    TweakColor,
    TweakButton
  });
})();

/* ====== data.jsx ====== */
(() => {
  const CATEGORIES = [
    { id: "technique", label: "Technique", short: "Moves", icon: "grapple" },
    { id: "drills", label: "Drills & Conditioning", short: "Drills", icon: "lungs" },
    { id: "mindset", label: "Mindset", short: "Mindset", icon: "brain" },
    { id: "weight", label: "Weight & Nutrition", short: "Weight", icon: "scale" },
    { id: "strategy", label: "Strategy & Scouting", short: "Strategy", icon: "target" },
    { id: "matchstudy", label: "Match Study", short: "Match Study", icon: "clapper" },
    { id: "culture", label: "Culture & Quotes", short: "Culture", icon: "flag" }
  ];
  const LEVELS = ["Fundamental", "Varsity", "Advanced"];
  const COACHES = ["Coach Bono", "Coach Cassioppi", "Coach Model", "Coach Zargo"];
  const ENTRIES = [
    // ---- TECHNIQUE ----
    {
      id: "t-high-c",
      title: "High Crotch to Double",
      category: "technique",
      level: "Fundamental",
      tags: ["takedown", "neutral", "leg attack"],
      author: "Coach Bono",
      hasVideo: true,
      films: [
        { id: "hc1", role: "Demo", label: "Coach Bono — full breakdown" },
        { id: "hc2", role: "Match", label: "State final — high c to double" },
        { id: "hc3", role: "Slow-mo", label: "Corner finish, frame by frame" },
        { id: "hc4", role: "Common mistake", label: "Dropping the head — what not to do" },
        { id: "hc5", role: "Drill", label: "Live go from the room" }
      ],
      summary: "The bread-and-butter Badger leg attack. Penetrate on the high crotch, then convert to a double when they sprawl.",
      steps: [
        "Level change — head up, hips drop. Don't bend at the waist.",
        "Penetration step to the knee, ear tight to the hip, hand cupping behind the knee.",
        "Drive the corner: turn the body, don't lift straight up.",
        "If they sprawl, switch the near hand to the far knee and run the pipe to a double.",
        "Finish facing the same direction you started — head inside, follow the hips down."
      ],
      coachNotes: "Number one error is dropping the head. You penetrate with your eyes up so you can see the finish. Live this every Monday until it's reflex."
    },
    {
      id: "t-sprawl",
      title: "Sprawl & Spin Behind",
      category: "technique",
      level: "Fundamental",
      tags: ["defense", "neutral", "scramble"],
      author: "Coach Cassioppi",
      hasVideo: true,
      films: [
        { id: "sp1", role: "Demo", label: "Coach Cassioppi — sprawl mechanics" },
        { id: "sp2", role: "Match", label: "Sprawl to spin-behind, dual meet" },
        { id: "sp3", role: "Drill", label: "50-rep sprawl conditioning" }
      ],
      summary: "First line of defense against any leg attack. Hips down, legs back, then circle to the back.",
      steps: [
        "React to the level change — snap the hips down and legs back in one motion.",
        "Crossface and underhook to flatten their attack and kill the head.",
        "Walk the legs away from their grip; don't let them reattach.",
        "Once their head pops out, circle hard to the same side as your underhook.",
        "Get to the back, hands locked, and run a tight far ankle to finish."
      ],
      coachNotes: "A good sprawl wins matches. We chart sprawl reps in conditioning — 50 a day, every day. Heavy hips beat fast legs."
    },
    {
      id: "t-half",
      title: "Tight Waist to Half Nelson",
      category: "technique",
      level: "Fundamental",
      tags: ["top", "turn", "pin"],
      author: "Coach Zargo",
      hasVideo: false,
      duration: null,
      summary: "The most reliable turn in folkstyle. Break them down, lock the half, and walk them to their back.",
      steps: [
        "From the top ref position, chop the near arm and drive the tight waist to break them flat.",
        "Slide the half nelson deep — your forearm through the armpit, hand on the back of the neck.",
        "Hip into them, lift the elbow, and crank toward their far shoulder.",
        "Drive off your toes and follow them over; flatten the half to lock the pin."
      ],
      coachNotes: "A shallow half gets reversed. Get it deep or don't get it at all. Always pair it with a tight waist so they can't post."
    },
    {
      id: "t-stand",
      title: "Stand-Up Escape",
      category: "technique",
      level: "Fundamental",
      tags: ["bottom", "escape", "neutral"],
      author: "Coach Cassioppi",
      hasVideo: true,
      films: [
        { id: "su1", role: "Demo", label: "Stand-up to escape — step by step" },
        { id: "su2", role: "Match", label: "Escape in the final period" },
        { id: "su3", role: "Common mistake", label: "Bending forward — getting ridden" }
      ],
      summary: "Your go-to escape from the bottom. Hand control, stand, and cut the corner.",
      steps: [
        "Win the whistle — explode up off the near foot before they can ride.",
        "Control the hands: peel their lock and clamp wrist control.",
        "Stand tall, hips back into them, never bend forward.",
        "Cut a sharp corner, clear the hips, and face them to score the escape."
      ],
      coachNotes: "Hand control first, always. You can't escape what's still locked around your waist. Drill the wrist peel until it's automatic."
    },
    // ---- DRILLS & CONDITIONING ----
    {
      id: "d-grind",
      title: "The Badger Grind Circuit",
      category: "drills",
      level: "Varsity",
      tags: ["conditioning", "circuit", "in-season"],
      author: "Coach Model",
      hasVideo: false,
      duration: null,
      summary: "Six-station match-pace circuit built to make the third period feel like the first.",
      steps: [
        "Station 1 — Sprawl & recover, 45 sec.",
        "Station 2 — Stand-up reps with a partner riding, 45 sec.",
        "Station 3 — Spin drill on a downed partner, 45 sec.",
        "Station 4 — Penetration steps across the mat, 45 sec.",
        "Station 5 — Buddy carries, 45 sec.",
        "Station 6 — Hand-fighting, live, 45 sec. Rest 60 sec. Repeat x4."
      ],
      coachNotes: "Matches are won in the third period. This circuit is non-negotiable Tuesday and Thursday. Track your rounds and beat last week."
    },
    {
      id: "d-handfight",
      title: "Hand-Fighting Ladder",
      category: "drills",
      level: "Fundamental",
      tags: ["neutral", "ties", "warmup"],
      author: "Coach Bono",
      hasVideo: true,
      films: [
        { id: "hf1", role: "Demo", label: "Tie progression walkthrough" },
        { id: "hf2", role: "Drill", label: "Two-on-one, 30-second rounds" },
        { id: "hf3", role: "Match", label: "Winning the ties at the whistle" }
      ],
      summary: "Progressive tie-up drill that builds the grip strength and head position to dictate every neutral exchange.",
      steps: [
        "Collar tie snaps — pull the head down, snap to the side, reset.",
        "Two-on-one wrist control — strip and re-pummel for 30 sec.",
        "Underhook pummeling — fight for the inside, hips tight.",
        "Live hand-fight to a single touch behind the elbow scores."
      ],
      coachNotes: "The wrestler who controls the ties controls the match. We hand-fight every single practice. Win the hands, win the shot."
    },
    // ---- MINDSET ----
    {
      id: "m-sixmin",
      title: "The Six-Minute Mindset",
      category: "mindset",
      level: "Fundamental",
      tags: ["focus", "match prep", "mental"],
      author: "Coach Bono",
      hasVideo: false,
      duration: null,
      summary: "How to compete one position at a time instead of being overwhelmed by the scoreboard.",
      steps: [
        "Before the whistle, narrow your world to the next exchange — not the score, not the crowd.",
        "Win the first contact. A strong first tie sets the tone for six minutes.",
        "If you get scored on, reset to neutral in your head before the ref restarts.",
        "Bank small wins — a good stance, a stuffed shot, a re-shot — they compound."
      ],
      coachNotes: "You can't wrestle six minutes at once. You wrestle the next ten seconds, then the next. Stay in the position you're in."
    },
    {
      id: "m-pressure",
      title: "Embracing the Grind",
      category: "mindset",
      level: "Varsity",
      tags: ["toughness", "adversity", "mental"],
      author: "Coach Model",
      hasVideo: false,
      duration: null,
      summary: "Reframing hard practices and tough losses as the exact thing that builds a champion.",
      steps: [
        "Name the discomfort — fatigue, doubt, soreness — then keep moving anyway.",
        "Treat every tough partner as a free scouting report on your weaknesses.",
        "After a loss, separate emotion from information. Watch the film, fix one thing.",
        "Show up the next day. Consistency under fatigue is the whole skill."
      ],
      coachNotes: "Nobody remembers the easy days. The grind is the point. When it's hardest is exactly when you're becoming who you want to be."
    },
    {
      id: "m-routine",
      title: "Pre-Match Routine",
      category: "mindset",
      level: "Fundamental",
      tags: ["focus", "match prep", "nerves"],
      author: "Coach Cassioppi",
      hasVideo: false,
      duration: null,
      summary: "A repeatable warm-up-to-whistle routine that turns nervous energy into controlled aggression.",
      steps: [
        "90 minutes out: hydrate, light snack if you've weighed in, headphones on.",
        "40 minutes out: break a sweat — jog, jumping jacks, a few sprawls.",
        "15 minutes out: hand-fight a teammate, hit your two best shots.",
        "On deck: three slow breaths, picture your first attack, then attack."
      ],
      coachNotes: "Nerves mean you care. The routine gives the nerves a job. Same warm-up every time so your body knows it's go-time."
    },
    // ---- WEIGHT & NUTRITION ----
    {
      id: "w-cut",
      title: "Smart Weight Management",
      category: "weight",
      level: "Varsity",
      tags: ["weight cut", "hydration", "safety"],
      author: "Coach Zargo",
      hasVideo: false,
      duration: null,
      summary: "The Badger approach to making weight without wrecking your performance or health.",
      steps: [
        "Wrestle the weight you walk around at, plus a few pounds — not a class below your body.",
        "Manage water and sodium across the week; never crash-dehydrate the night before.",
        "Eat to fuel practice. An empty tank in the room means a slow tank on match day.",
        "Refuel immediately after weigh-ins: water, carbs, a little protein."
      ],
      coachNotes: "We do not cut to the point it costs us in the third period. If the cut makes you weaker, you're in the wrong class. Talk to a coach before you change weight."
    },
    {
      id: "w-fuel",
      title: "Tournament Day Fueling",
      category: "weight",
      level: "Fundamental",
      tags: ["nutrition", "competition", "energy"],
      author: "Coach Zargo",
      hasVideo: false,
      duration: null,
      summary: "What to eat between matches at an all-day tournament so you've got gas in the final.",
      steps: [
        "Pack it yourself — don't rely on the concession stand.",
        "Between matches: easy carbs (banana, rice, bagel), small protein, sip water steadily.",
        "Avoid heavy, greasy food that sits in your stomach.",
        "Keep moving between matches — light walk, stay warm, don't cool all the way down."
      ],
      coachNotes: "Bracket day is a marathon of sprints. The kid who fuels right is the kid still scoring in the finals."
    },
    // ---- STRATEGY & SCOUTING ----
    {
      id: "s-scout",
      title: "How to Scout an Opponent",
      category: "strategy",
      level: "Varsity",
      tags: ["scouting", "film", "match prep"],
      author: "Coach Bono",
      hasVideo: true,
      films: [
        { id: "sc1", role: "Demo", label: "How to break down film — the checklist" },
        { id: "sc2", role: "Other", label: "Example scout: reading lead leg & ties" }
      ],
      summary: "A checklist for breaking down film so you walk to the line already knowing what they do.",
      steps: [
        "Stance & lead leg — which side do they shoot from, which leg is exposed?",
        "First-move tendency — do they shoot early, tie up, or wait and counter?",
        "Top game — what's their go-to turn? Bottom game — stand-up or roll?",
        "Score situations — what do they do up two? Down two with a minute left?"
      ],
      coachNotes: "Wrestle the man, not the name. Every opponent has a pattern. Find it on film and take it away on the mat."
    },
    {
      id: "s-late",
      title: "Riding Time & Late Leads",
      category: "strategy",
      level: "Advanced",
      tags: ["folkstyle", "clock", "tactics"],
      author: "Coach Cassioppi",
      hasVideo: false,
      duration: null,
      summary: "Managing the clock and riding time when you're protecting a one-point lead in the third.",
      steps: [
        "Up late on top — ride legs in, stay chest-to-back, kill their hips.",
        "Bank riding time; that point is real and it wins overtime seeds.",
        "Down late — pick your escape and commit fully; half effort gets ridden out.",
        "Neutral and up — stay in good stance, hand-fight, force the action to the edge."
      ],
      coachNotes: "The last minute is its own skill. We drill 'protect the lead' and 'must-score' situations live every week so the clock never surprises you."
    },
    // ---- CULTURE & QUOTES ----
    {
      id: "c-standard",
      title: "The Badger Standard",
      category: "culture",
      level: "Fundamental",
      tags: ["team", "values", "culture"],
      author: "Coach Bono",
      hasVideo: false,
      duration: null,
      summary: "The five things every wrestler in this room is held to — on the mat and off it.",
      steps: [
        "Be on time. Early is on time; on time is late.",
        "Out-work the room. Effort is the one thing fully in your control.",
        "Represent the W — in class, in the hallways, in the community.",
        "Pick your teammates up. A hard room makes hard wrestlers.",
        "Finish everything you start — drills, sprints, matches, seasons."
      ],
      coachNotes: "Talent is common. The standard is what separates us. You don't rise to the occasion — you fall to your training. Hold the standard daily."
    },
    {
      id: "c-quotes",
      title: "Words to Wrestle By",
      category: "culture",
      level: "Fundamental",
      tags: ["quotes", "motivation", "mental"],
      author: "Coach Model",
      hasVideo: false,
      duration: null,
      summary: "A short collection of lines we come back to when it's hard. Read one before you step on the mat.",
      steps: [
        `"Once you've wrestled, everything else in life is easy." — Dan Gable`,
        '"The harder I work, the harder it is to surrender."',
        '"Champions are made when no one is watching."',
        `"Win the position you're in."`
      ],
      coachNotes: "Pick one that hits you and make it yours this season. These aren't posters — they're reminders of how we've decided to compete."
    }
  ];
  const P = window.WKB_PUBLISHED || {};
  function mergeCategories() {
    const published = P.categories && P.categories.length ? P.categories.slice() : null;
    if (!published) return CATEGORIES;
    const have = new Set(published.map((c) => c.id));
    CATEGORIES.forEach((c) => {
      if (!have.has(c.id)) published.push(c);
    });
    return published;
  }
  window.WKB = {
    CATEGORIES: mergeCategories(),
    LEVELS,
    COACHES,
    ENTRIES: P.entries && P.entries.length ? P.entries : ENTRIES,
    GATE: P.gate || { athlete: "", coach: "" },
    VERSION: P.version || null
  };
})();

/* ====== film.jsx ====== */
(() => {
  const { useState, useEffect } = React;
  const FilmDB = /* @__PURE__ */ (() => {
    const DB = "wkb_films", STORE = "films";
    let dbp;
    function open() {
      if (dbp) return dbp;
      dbp = new Promise((res, rej) => {
        const r = indexedDB.open(DB, 1);
        r.onupgradeneeded = () => {
          if (!r.result.objectStoreNames.contains(STORE)) r.result.createObjectStore(STORE);
        };
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
        tx.oncomplete = () => res(key);
        tx.onerror = () => rej(tx.error);
      });
    }
    async function get(key) {
      const db = await open();
      return new Promise((res, rej) => {
        const tx = db.transaction(STORE, "readonly");
        const rq = tx.objectStore(STORE).get(key);
        rq.onsuccess = () => res(rq.result);
        rq.onerror = () => rej(rq.error);
      });
    }
    async function del(key) {
      try {
        const db = await open();
        return new Promise((res) => {
          const tx = db.transaction(STORE, "readwrite");
          tx.objectStore(STORE).delete(key);
          tx.oncomplete = () => res();
          tx.onerror = () => res();
        });
      } catch (e) {
      }
    }
    return { put, get, del };
  })();
  const FILM_ROLES = ["Demo", "Match", "Drill", "Slow-mo", "Common mistake", "Other"];
  function parseFilm(url) {
    if (!url) return null;
    url = String(url).trim();
    let m;
    if (m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/))
      return { type: "youtube", id: m[1], embed: `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0&modestbranding=1`, thumb: `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` };
    if (m = url.match(/vimeo\.com\/(\d+)/))
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
  function UploadVideo({ fileKey }) {
    const [url, setUrl] = useState(null);
    const [err, setErr] = useState(false);
    useEffect(() => {
      let u, live = true;
      FilmDB.get(fileKey).then((blob) => {
        if (!blob) {
          setErr(true);
          return;
        }
        u = URL.createObjectURL(blob);
        if (live) setUrl(u);
      }).catch(() => setErr(true));
      return () => {
        live = false;
        if (u) URL.revokeObjectURL(u);
      };
    }, [fileKey]);
    if (err) return /* @__PURE__ */ React.createElement("div", { className: "vthumb vthumb--big lib__empty" }, /* @__PURE__ */ React.createElement("div", { className: "lib__emptytxt" }, /* @__PURE__ */ React.createElement("span", null, "Film file unavailable"), /* @__PURE__ */ React.createElement("em", null, "It may have been cleared from this browser.")));
    if (!url) return /* @__PURE__ */ React.createElement("div", { className: "vthumb vthumb--big lib__empty" }, /* @__PURE__ */ React.createElement("div", { className: "lib__emptytxt" }, /* @__PURE__ */ React.createElement("span", null, "Loading film…")));
    return /* @__PURE__ */ React.createElement("div", { className: "player" }, /* @__PURE__ */ React.createElement("video", { src: url, controls: true, playsInline: true }));
  }
  function FileVideo({ src }) {
    const [err, setErr] = useState(false);
    if (err) return /* @__PURE__ */ React.createElement("div", { className: "vthumb vthumb--big lib__empty" }, /* @__PURE__ */ React.createElement("div", { className: "lib__emptytxt" }, /* @__PURE__ */ React.createElement("span", null, "Film unavailable"), /* @__PURE__ */ React.createElement("em", null, "The video file couldn't load. It may not have been uploaded to the site yet — a coach can re-publish or link it from YouTube instead.")));
    return /* @__PURE__ */ React.createElement("div", { className: "player" }, /* @__PURE__ */ React.createElement("video", { src, controls: true, autoPlay: true, playsInline: true, onError: () => setErr(true) }));
  }
  function FilmStage({ film, playing, onPlay }) {
    const kind = filmKind(film);
    if (kind === "upload") return /* @__PURE__ */ React.createElement(UploadVideo, { fileKey: film.fileKey });
    if (playing && (kind === "youtube" || kind === "vimeo")) {
      const p = parseFilm(film.url);
      return /* @__PURE__ */ React.createElement("div", { className: "player" }, /* @__PURE__ */ React.createElement("iframe", { src: p.embed, allow: "autoplay; fullscreen; encrypted-media", allowFullScreen: true, title: "Film" }));
    }
    if (playing && kind === "file")
      return /* @__PURE__ */ React.createElement(FileVideo, { src: film.url });
    if (kind === "placeholder")
      return /* @__PURE__ */ React.createElement("div", { className: "vthumb vthumb--big lib__empty" }, /* @__PURE__ */ React.createElement("div", { className: "vthumb__grain" }), /* @__PURE__ */ React.createElement("div", { className: "lib__emptytxt" }, /* @__PURE__ */ React.createElement(Icon, { name: "play", size: 22 }), /* @__PURE__ */ React.createElement("span", null, "No film attached yet"), /* @__PURE__ */ React.createElement("em", null, "Use Edit to paste a YouTube/Vimeo link or upload a clip.")), film.label && /* @__PURE__ */ React.createElement("div", { className: "vthumb__label" }, film.label));
    const thumb = filmThumb(film);
    const onClick = () => {
      if (kind === "link") window.open(parseFilm(film.url).href, "_blank", "noopener");
      else onPlay();
    };
    return /* @__PURE__ */ React.createElement("div", { className: "vthumb vthumb--big vthumb--live", onClick, role: "button" }, thumb ? /* @__PURE__ */ React.createElement("img", { className: "vthumb__img", src: thumb, alt: "" }) : /* @__PURE__ */ React.createElement("div", { className: "vthumb__grain" }), /* @__PURE__ */ React.createElement("div", { className: "vthumb__play" }, /* @__PURE__ */ React.createElement(Icon, { name: "play", size: 26, fill: true })), /* @__PURE__ */ React.createElement("div", { className: "vthumb__meta" }, /* @__PURE__ */ React.createElement("span", { className: "vthumb__film" }, "FILM")), film.label && /* @__PURE__ */ React.createElement("div", { className: "vthumb__label" }, film.label, kind === "link" ? " · opens in new tab" : ""));
  }
  function ClipThumb({ film }) {
    const kind = filmKind(film);
    const thumb = filmThumb(film);
    if (thumb) return /* @__PURE__ */ React.createElement("span", { className: "clip__thumb" }, /* @__PURE__ */ React.createElement("img", { src: thumb, alt: "" }));
    return /* @__PURE__ */ React.createElement("span", { className: "clip__thumb clip__thumb--" + kind }, /* @__PURE__ */ React.createElement(Icon, { name: kind === "placeholder" ? "plus" : "play", size: 15, fill: kind !== "placeholder" }));
  }
  function FilmLibrary({ entry }) {
    const films = normalizeFilms(entry);
    const [idx, setIdx] = useState(0);
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
      setIdx(0);
      setPlaying(false);
    }, [entry.id]);
    if (!films.length) return null;
    const film = films[Math.min(idx, films.length - 1)];
    return /* @__PURE__ */ React.createElement("div", { className: "lib" }, /* @__PURE__ */ React.createElement("div", { className: "lib__stage" }, /* @__PURE__ */ React.createElement(FilmStage, { key: (film.id || idx) + ":" + playing, film, playing, onPlay: () => setPlaying(true) })), films.length > 1 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "lib__count" }, films.length, " clips in this library"), /* @__PURE__ */ React.createElement("div", { className: "lib__strip" }, films.map((f, i) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: f.id || i,
        className: "clip" + (i === idx ? " clip--on" : ""),
        onClick: () => {
          setIdx(i);
          setPlaying(false);
        }
      },
      /* @__PURE__ */ React.createElement(ClipThumb, { film: f }),
      /* @__PURE__ */ React.createElement("div", { className: "clip__meta" }, f.role && /* @__PURE__ */ React.createElement("span", { className: "clip__role" }, f.role), /* @__PURE__ */ React.createElement("span", { className: "clip__label" }, f.label || "Clip " + (i + 1)))
    )))));
  }
  function VideoThumb({ entry }) {
    const films = normalizeFilms(entry);
    if (!films.length) return null;
    const thumb = filmThumb(films[0]);
    return /* @__PURE__ */ React.createElement("div", { className: "vthumb" }, thumb ? /* @__PURE__ */ React.createElement("img", { className: "vthumb__img", src: thumb, alt: "", loading: "lazy" }) : /* @__PURE__ */ React.createElement("div", { className: "vthumb__grain" }), /* @__PURE__ */ React.createElement("div", { className: "vthumb__play" }, /* @__PURE__ */ React.createElement(Icon, { name: "play", size: 18, fill: true })), /* @__PURE__ */ React.createElement("div", { className: "vthumb__meta" }, /* @__PURE__ */ React.createElement("span", { className: "vthumb__film" }, "FILM"), films.length > 1 && /* @__PURE__ */ React.createElement("span", { className: "vthumb__dur" }, films.length, " clips")));
  }
  function FilmRowPreview({ film }) {
    if (film.fileKey) return /* @__PURE__ */ React.createElement("div", { className: "fb__prev fb__prev--ok" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 13, stroke: 2.6 }), "Local file ready · plays inline");
    const p = parseFilm(film.url);
    if (!p) return null;
    const m = { youtube: "YouTube clip", vimeo: "Vimeo clip", file: "Direct video file", link: "External link — opens in new tab" };
    return /* @__PURE__ */ React.createElement("div", { className: "fb__prev" + (p.type === "link" ? " fb__prev--warn" : " fb__prev--ok") }, p.thumb && /* @__PURE__ */ React.createElement("img", { className: "fb__prevthumb", src: p.thumb, alt: "" }), /* @__PURE__ */ React.createElement(Icon, { name: p.type === "link" ? "play" : "check", size: 13, stroke: 2.6 }), m[p.type]);
  }
  function FilmBuilder({ films, setFilms }) {
    function update(i, patch) {
      setFilms(films.map((f, j) => j === i ? { ...f, ...patch } : f));
    }
    function add() {
      setFilms([...films, { id: "f" + Date.now() + Math.random().toString(36).slice(2, 6), label: "", role: "Demo", url: "" }]);
    }
    function remove(i) {
      const f = films[i];
      if (f.fileKey) FilmDB.del(f.fileKey);
      setFilms(films.filter((_, j) => j !== i));
    }
    async function onFile(i, file) {
      if (!file) return;
      const key = "file_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
      await FilmDB.put(key, file);
      update(i, { fileKey: key, fileName: file.name, mime: file.type, url: "" });
    }
    return /* @__PURE__ */ React.createElement("div", { className: "fb" }, /* @__PURE__ */ React.createElement("span", { className: "f__l" }, "Film library ", /* @__PURE__ */ React.createElement("em", { className: "f__hint" }, "add as many examples as you want — demo, match film, drills, mistakes")), films.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "fb__empty" }, "No clips yet. Add a demonstration, then stack on match examples and drill reps."), films.map((f, i) => /* @__PURE__ */ React.createElement("div", { className: "fb__row", key: f.id || i }, /* @__PURE__ */ React.createElement("div", { className: "fb__head" }, /* @__PURE__ */ React.createElement("input", { className: "f__in fb__label", value: f.label || "", onChange: (e) => update(i, { label: e.target.value }), placeholder: "Clip " + (i + 1) + " caption — e.g. Coach demo" }), /* @__PURE__ */ React.createElement("select", { className: "f__in fb__role", value: f.role || "Demo", onChange: (e) => update(i, { role: e.target.value }) }, FILM_ROLES.map((r) => /* @__PURE__ */ React.createElement("option", { key: r, value: r }, r))), /* @__PURE__ */ React.createElement("button", { className: "fb__rm", onClick: () => remove(i), "aria-label": "Remove clip" }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 16, stroke: 2 }))), /* @__PURE__ */ React.createElement("div", { className: "fb__src" }, f.fileKey ? /* @__PURE__ */ React.createElement("div", { className: "fb__file" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 15, stroke: 2.4 }), /* @__PURE__ */ React.createElement("span", { className: "fb__filename" }, f.fileName || "Uploaded file"), /* @__PURE__ */ React.createElement("button", { className: "fb__clear", onClick: () => {
      FilmDB.del(f.fileKey);
      update(i, { fileKey: null, fileName: null, mime: null });
    } }, "Clear")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("input", { className: "f__in fb__url", value: f.url || "", onChange: (e) => update(i, { url: e.target.value }), placeholder: "Paste YouTube / Vimeo / .mp4 URL" }), /* @__PURE__ */ React.createElement("span", { className: "fb__or" }, "or"), /* @__PURE__ */ React.createElement("label", { className: "fb__upload" }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 15, stroke: 2.4 }), "Upload file", /* @__PURE__ */ React.createElement("input", { type: "file", accept: "video/*", hidden: true, onChange: (e) => onFile(i, e.target.files[0]) })))), (f.url || f.fileKey) && /* @__PURE__ */ React.createElement(FilmRowPreview, { film: f }))), /* @__PURE__ */ React.createElement("button", { className: "fb__add", onClick: add }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 16, stroke: 2.4 }), "Add a clip"));
  }
  Object.assign(window, {
    FilmDB,
    FILM_ROLES,
    parseFilm,
    normalizeFilms,
    filmKind,
    filmThumb,
    VideoThumb,
    FilmLibrary,
    FilmBuilder,
    FileVideo
  });
})();

/* ====== components.jsx ====== */
(() => {
  const { useState, useRef, useEffect } = React;
  const ICON_PATHS = {
    search: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4.3-4.3" })),
    plus: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })),
    close: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M6 6l12 12M18 6L6 18" })),
    star: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 3.5l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 17l-5.3 2.8 1.1-5.9L3.4 9.8l6-.8z" })),
    check: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 12l5 5L20 6" })),
    play: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M7 5l11 7-11 7z" })),
    back: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M15 6l-6 6 6 6" })),
    chevron: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M9 6l6 6-6 6" })),
    edit: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 20h4l10-10-4-4L4 16z" }), /* @__PURE__ */ React.createElement("path", { d: "M13.5 6.5l4 4" })),
    trash: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" })),
    // category glyphs
    grapple: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M5 19c2-4 4-6 7-6s5 2 7 6" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "7", r: "2.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "15.5", cy: "9", r: "2.1" })),
    lungs: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 3v8" }), /* @__PURE__ */ React.createElement("path", { d: "M12 8c0 4-3 4-4 8-.5 2-3 2-3-1 0-4 1-7 3-7 1.5 0 1.7 1 4 0" }), /* @__PURE__ */ React.createElement("path", { d: "M12 8c0 4 3 4 4 8 .5 2 3 2 3-1 0-4-1-7-3-7-1.5 0-1.7 1-4 0" })),
    brain: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M9 4a3 3 0 00-3 3 3 3 0 00-1 5 3 3 0 001 5 3 3 0 003 2.5V4z" }), /* @__PURE__ */ React.createElement("path", { d: "M15 4a3 3 0 013 3 3 3 0 011 5 3 3 0 01-1 5 3 3 0 01-3 2.5V4z" })),
    scale: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 4v16" }), /* @__PURE__ */ React.createElement("path", { d: "M6 8h12l3 6a4 4 0 01-6 0zM6 8L3 14a4 4 0 006 0z" }), /* @__PURE__ */ React.createElement("path", { d: "M7 20h10" })),
    target: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "8" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3.4" })),
    flag: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M6 21V4" }), /* @__PURE__ */ React.createElement("path", { d: "M6 4h11l-2 4 2 4H6" })),
    grip: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "6", r: "1.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "6", r: "1.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "12", r: "1.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "12", r: "1.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "18", r: "1.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "18", r: "1.4" })),
    file: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" }), /* @__PURE__ */ React.createElement("path", { d: "M14 3v5h5" })),
    download: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5" }), /* @__PURE__ */ React.createElement("path", { d: "M5 19h14" })),
    external: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M14 4h6v6" }), /* @__PURE__ */ React.createElement("path", { d: "M20 4l-8.5 8.5" }), /* @__PURE__ */ React.createElement("path", { d: "M18 13.5V19a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5.5" })),
    clapper: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 9h16v9a2 2 0 01-2 2H6a2 2 0 01-2-2z" }), /* @__PURE__ */ React.createElement("path", { d: "M4 9l1.2-3.2 15 .9L19 9" }), /* @__PURE__ */ React.createElement("path", { d: "M8.5 5.9l1.5 3M13 6.2l1.5 3" })),
    link: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M10 14a5 5 0 007.1 0l2.4-2.4a5 5 0 00-7.1-7.1l-1.2 1.2" }), /* @__PURE__ */ React.createElement("path", { d: "M14 10a5 5 0 00-7.1 0l-2.4 2.4a5 5 0 007.1 7.1l1.2-1.2" }))
  };
  function Icon({ name, size = 22, stroke = 1.9, fill = false, style, className }) {
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        className,
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        focusable: "false",
        fill: fill ? "currentColor" : name === "grip" ? "currentColor" : "none",
        stroke: "currentColor",
        strokeWidth: stroke,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style
      },
      ICON_PATHS[name]
    );
  }
  function LevelTag({ level }) {
    if (!level) return null;
    return /* @__PURE__ */ React.createElement("span", { className: "level level--" + level.toLowerCase() }, level);
  }
  const DIALOG_FOCUSABLE = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled]):not([type='hidden']):not([hidden])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");
  function deferFocus(callback) {
    if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(callback);
    else window.setTimeout(callback, 0);
  }
  function dialogFocusableElements(panel) {
    return panel ? Array.from(panel.querySelectorAll(DIALOG_FOCUSABLE)) : [];
  }
  function useDialogFocus(panelRef, initialFocusRef, onClose, suspendedRef, returnFocusOverrideRef) {
    const closeRef = useRef(onClose);
    closeRef.current = onClose;
    useEffect(() => {
      const returnTarget = returnFocusOverrideRef && returnFocusOverrideRef.current ? returnFocusOverrideRef.current : document.activeElement;
      const panel = panelRef.current;
      if (!panel) return void 0;
      deferFocus(() => {
        const initialTarget = initialFocusRef && initialFocusRef.current;
        const target = initialTarget || dialogFocusableElements(panel)[0] || panel;
        if (target && typeof target.focus === "function") target.focus();
      });
      function handleDialogKey(event) {
        if (suspendedRef && suspendedRef.current) return;
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          closeRef.current();
          return;
        }
        if (event.key !== "Tab") return;
        const focusable = dialogFocusableElements(panel);
        if (!focusable.length) {
          event.preventDefault();
          panel.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || !panel.contains(active))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
          event.preventDefault();
          first.focus();
        }
      }
      document.addEventListener("keydown", handleDialogKey);
      return () => {
        document.removeEventListener("keydown", handleDialogKey);
        deferFocus(() => {
          if (returnTarget && document.contains(returnTarget) && typeof returnTarget.focus === "function") returnTarget.focus();
        });
      };
    }, []);
  }
  function EntryCard({ entry, cat, saved, learned, onOpen, onSave, list, show = {}, drag = null, dragging = false }) {
    const films = normalizeFilms(entry);
    const { summary = true, level = true, film = true } = show;
    return /* @__PURE__ */ React.createElement(
      "article",
      {
        "data-entry-card-id": entry.id,
        className: "card" + (list ? " card--list" : "") + (dragging ? " card--dragging" : "") + (drag ? " card--draggable" : ""),
        onClick: () => onOpen(entry),
        ...drag || {}
      },
      drag && /* @__PURE__ */ React.createElement("span", { className: "card__grip", title: "Drag to reorder", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement(Icon, { name: "grip", size: 16, stroke: 2 })),
      film && films.length > 0 && !list && /* @__PURE__ */ React.createElement(VideoThumb, { entry }),
      /* @__PURE__ */ React.createElement("div", { className: "card__body" }, /* @__PURE__ */ React.createElement("div", { className: "card__top" }, /* @__PURE__ */ React.createElement("span", { className: "card__cat", style: { color: "var(--accent-tx)" } }, /* @__PURE__ */ React.createElement(Icon, { name: cat.icon, size: 15, stroke: 2 }), cat.label), learned && /* @__PURE__ */ React.createElement("span", { className: "card__learned" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 13, stroke: 2.6 }), "Learned")), /* @__PURE__ */ React.createElement("h3", { className: "card__title" }, /* @__PURE__ */ React.createElement("button", { className: "card__open", type: "button", onClick: (event) => {
        event.stopPropagation();
        onOpen(entry);
      } }, entry.title)), summary && /* @__PURE__ */ React.createElement("p", { className: "card__summary" }, entry.summary), /* @__PURE__ */ React.createElement("div", { className: "card__foot" }, /* @__PURE__ */ React.createElement("div", { className: "card__tags" }, level && /* @__PURE__ */ React.createElement(LevelTag, { level: entry.level }), film && films.length > 0 && list && /* @__PURE__ */ React.createElement("span", { className: "card__hasvid" }, /* @__PURE__ */ React.createElement(Icon, { name: "play", size: 12, fill: true }), films.length > 1 ? films.length + " clips" : "Film")), /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "savebtn" + (saved ? " savebtn--on" : ""),
          onClick: (e) => {
            e.stopPropagation();
            onSave(entry.id);
          },
          "aria-label": saved ? "Unsave" : "Save"
        },
        /* @__PURE__ */ React.createElement(Icon, { name: "star", size: 18, fill: saved, stroke: 2 })
      )))
    );
  }
  function EntryDeleteConfirm({ entryTitle, onDelete, onCancel }) {
    const panelRef = useRef(null);
    const cancelRef = useRef(null);
    useDialogFocus(panelRef, cancelRef, onCancel);
    return /* @__PURE__ */ React.createElement("div", { className: "confirm", onClick: (event) => {
      event.stopPropagation();
      onCancel();
    } }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "confirm__box",
        ref: panelRef,
        role: "alertdialog",
        "aria-modal": "true",
        "aria-labelledby": "entry-delete-title",
        "aria-describedby": "entry-delete-description",
        tabIndex: "-1",
        onClick: (event) => event.stopPropagation()
      },
      /* @__PURE__ */ React.createElement("h4", { className: "confirm__title", id: "entry-delete-title" }, "Delete this entry?"),
      /* @__PURE__ */ React.createElement("p", { className: "confirm__text", id: "entry-delete-description" }, "“", entryTitle, "” will be removed from the database. This can’t be undone."),
      /* @__PURE__ */ React.createElement("div", { className: "confirm__row" }, /* @__PURE__ */ React.createElement("button", { className: "action action--danger", onClick: onDelete }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 17, stroke: 2.2 }), "Delete"), /* @__PURE__ */ React.createElement("button", { ref: cancelRef, className: "action action--ghost", onClick: onCancel }, "Cancel"))
    ));
  }
  function DetailView({ entry, cat, saved, learned, onClose, onSave, onLearn, onEdit, onDelete, show = {}, canEdit = true }) {
    const ref = useRef(null);
    const closeButtonRef = useRef(null);
    const [confirm, setConfirm] = useState(false);
    const [copied, setCopied] = useState(false);
    const confirmOpenRef = useRef(false);
    confirmOpenRef.current = confirm;
    const { film = true, coachNotes = true, tags = true, steps = true } = show;
    useDialogFocus(ref, closeButtonRef, onClose, confirmOpenRef);
    useEffect(() => {
      if (ref.current) ref.current.scrollTop = 0;
      setConfirm(false);
    }, [entry.id]);
    const entryTags = Array.isArray(entry.tags) ? entry.tags : [];
    const quoteCat = entry.category === "culture" && /quote/i.test(entryTags.join(" "));
    function copyLink() {
      const url = window.location.origin + window.location.pathname + window.location.search + "#e=" + encodeURIComponent(entry.id);
      const done = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(() => window.prompt("Copy this link:", url));
      } else {
        window.prompt("Copy this link:", url);
      }
    }
    return /* @__PURE__ */ React.createElement("div", { className: "detail", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "detail__panel", ref, role: "dialog", "aria-modal": "true", "aria-labelledby": "entry-detail-title", tabIndex: "-1", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "detail__tools" }, /* @__PURE__ */ React.createElement("button", { className: "detail__tool", onClick: copyLink, "aria-label": "Copy link", title: copied ? "Link copied!" : "Copy link to this entry" }, /* @__PURE__ */ React.createElement(Icon, { name: copied ? "check" : "link", size: 18, stroke: 2, style: copied ? { color: "var(--success-tx)" } : void 0 })), canEdit && /* @__PURE__ */ React.createElement("button", { className: "detail__tool", onClick: () => onEdit(entry), "aria-label": "Edit", title: "Edit" }, /* @__PURE__ */ React.createElement(Icon, { name: "edit", size: 19, stroke: 2 })), canEdit && /* @__PURE__ */ React.createElement("button", { className: "detail__tool detail__tool--danger", onClick: () => setConfirm(true), "aria-label": "Delete", title: "Delete" }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 18, stroke: 2 })), /* @__PURE__ */ React.createElement("button", { ref: closeButtonRef, className: "detail__tool", onClick: onClose, "aria-label": "Close" }, /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 20 }))), /* @__PURE__ */ React.createElement("div", { className: "detail__inner" }, /* @__PURE__ */ React.createElement("span", { className: "detail__cat", style: { color: "var(--accent-tx)" } }, /* @__PURE__ */ React.createElement(Icon, { name: cat.icon, size: 16, stroke: 2 }), cat.label), /* @__PURE__ */ React.createElement("h2", { className: "detail__title", id: "entry-detail-title" }, entry.title), /* @__PURE__ */ React.createElement("div", { className: "detail__meta" }, /* @__PURE__ */ React.createElement(LevelTag, { level: entry.level }), /* @__PURE__ */ React.createElement("span", { className: "detail__author" }, "Added by ", entry.author)), /* @__PURE__ */ React.createElement("p", { className: "detail__summary" }, entry.summary), normalizeFilms(entry).length > 0 && film && /* @__PURE__ */ React.createElement("div", { className: "detail__section" }, /* @__PURE__ */ React.createElement("h4", { className: "detail__h" }, "Film Library"), /* @__PURE__ */ React.createElement(FilmLibrary, { entry })), normalizeDocs(entry).length > 0 && /* @__PURE__ */ React.createElement("div", { className: "detail__section" }, /* @__PURE__ */ React.createElement("h4", { className: "detail__h" }, "Handouts & Documents"), /* @__PURE__ */ React.createElement(DocLibrary, { entry })), steps && entry.steps && entry.steps.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "detail__section" }, /* @__PURE__ */ React.createElement("h4", { className: "detail__h" }, quoteCat ? "The Lines" : entry.category === "mindset" || entry.category === "weight" || entry.category === "strategy" ? "Key Points" : "Steps"), /* @__PURE__ */ React.createElement("ol", { className: "steps" + (quoteCat ? " steps--quote" : "") }, entry.steps.map((s, i) => /* @__PURE__ */ React.createElement("li", { key: i, className: "step" }, !quoteCat && /* @__PURE__ */ React.createElement("span", { className: "step__n" }, i + 1), /* @__PURE__ */ React.createElement("span", { className: "step__t" }, s))))), entry.coachNotes && coachNotes && /* @__PURE__ */ React.createElement("div", { className: "coachnote" }, /* @__PURE__ */ React.createElement("div", { className: "coachnote__tab" }, "Coach's Notes"), /* @__PURE__ */ React.createElement("p", { className: "coachnote__body" }, entry.coachNotes)), /* @__PURE__ */ React.createElement("div", { className: "detail__tags" }, tags && entryTags.map((t) => /* @__PURE__ */ React.createElement("span", { key: t, className: "chip chip--static" }, "#", t)))), /* @__PURE__ */ React.createElement("div", { className: "detail__actions" }, /* @__PURE__ */ React.createElement("button", { className: "action" + (learned ? " action--done" : ""), onClick: () => onLearn(entry.id) }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 18, stroke: 2.6 }), learned ? "Marked Learned" : "Mark as Learned"), /* @__PURE__ */ React.createElement("button", { className: "action action--ghost" + (saved ? " action--saved" : ""), onClick: () => onSave(entry.id) }, /* @__PURE__ */ React.createElement(Icon, { name: "star", size: 18, fill: saved, stroke: 2 }), saved ? "Saved" : "Save"))), confirm && /* @__PURE__ */ React.createElement(EntryDeleteConfirm, { entryTitle: entry.title, onDelete: () => onDelete(entry.id), onCancel: () => setConfirm(false) }));
  }
  function AddEntryForm({ onClose, onAdd, initial }) {
    const edit = !!initial;
    const panelRef = useRef(null);
    const titleInputRef = useRef(null);
    const returnFocusOverrideRef = useRef(null);
    if (edit && !returnFocusOverrideRef.current && typeof document !== "undefined") {
      const matchingCard = Array.from(document.querySelectorAll("[data-entry-card-id]")).find((card) => card.getAttribute("data-entry-card-id") === initial.id);
      returnFocusOverrideRef.current = matchingCard && matchingCard.querySelector(".card__open");
    }
    const [title, setTitle] = useState(initial ? initial.title : "");
    const [category, setCategory] = useState(initial ? initial.category : "technique");
    const [level, setLevel] = useState(initial ? initial.level : "Fundamental");
    const [author, setAuthor] = useState(initial ? initial.author : window.WKB.COACHES[0]);
    const [summary, setSummary] = useState(initial ? initial.summary : "");
    const [films, setFilms] = useState(initial ? normalizeFilms(initial).map((f) => ({ ...f })) : []);
    const [docs, setDocs] = useState(initial && Array.isArray(initial.docs) ? initial.docs.map((d) => ({ ...d })) : []);
    const [tags, setTags] = useState(initial && Array.isArray(initial.tags) ? initial.tags.join(", ") : "");
    const [stepsText, setStepsText] = useState(initial && Array.isArray(initial.steps) ? initial.steps.join("\n") : "");
    const [coachNotes, setCoachNotes] = useState(initial ? initial.coachNotes || "" : "");
    const valid = title.trim() && summary.trim();
    useDialogFocus(panelRef, titleInputRef, onClose, null, returnFocusOverrideRef);
    function submit() {
      if (!valid) return;
      const steps = stepsText.split("\n").map((s) => s.trim()).filter(Boolean);
      const cleanFilms = films.filter((f) => f.url && f.url.trim() || f.fileKey || f.label && f.label.trim()).map((f) => ({
        id: f.id || "f" + Math.random().toString(36).slice(2, 8),
        label: (f.label || "").trim(),
        role: f.role || "Demo",
        url: f.url ? f.url.trim() : null,
        fileKey: f.fileKey || null,
        fileName: f.fileName || null,
        mime: f.mime || null
      }));
      const cleanDocs = docs.filter((d) => d.url && d.url.trim() || d.fileKey).map((d) => ({
        id: d.id || "d" + Math.random().toString(36).slice(2, 8),
        label: (d.label || "").trim(),
        url: d.url ? d.url.trim() : null,
        fileKey: d.fileKey || null,
        fileName: d.fileName || null,
        mime: d.mime || null
      }));
      onAdd({
        id: edit ? initial.id : "u-" + Date.now(),
        title: title.trim(),
        category,
        level,
        author,
        tags: tags.split(",").map((t) => t.trim().replace(/^#/, "")).filter(Boolean),
        films: cleanFilms,
        docs: cleanDocs,
        hasVideo: cleanFilms.length > 0,
        summary: summary.trim(),
        steps,
        coachNotes: coachNotes.trim() || null,
        userAdded: edit ? initial.userAdded : true
      });
    }
    return /* @__PURE__ */ React.createElement("div", { className: "detail", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "detail__panel detail__panel--form", ref: panelRef, role: "dialog", "aria-modal": "true", "aria-labelledby": "entry-form-title", tabIndex: "-1", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("button", { className: "detail__close", onClick: onClose, "aria-label": "Close" }, /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 22 })), /* @__PURE__ */ React.createElement("div", { className: "detail__inner" }, /* @__PURE__ */ React.createElement("span", { className: "detail__cat", style: { color: "var(--accent-tx)" } }, edit ? "Edit Entry" : "New Entry"), /* @__PURE__ */ React.createElement("h2", { className: "detail__title", id: "entry-form-title" }, edit ? "Edit This Entry" : "Add to the Database"), /* @__PURE__ */ React.createElement("label", { className: "f" }, /* @__PURE__ */ React.createElement("span", { className: "f__l" }, "Title"), /* @__PURE__ */ React.createElement("input", { ref: titleInputRef, className: "f__in", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "e.g. Ankle Pick from a Tie" })), /* @__PURE__ */ React.createElement("div", { className: "f__row" }, /* @__PURE__ */ React.createElement("label", { className: "f" }, /* @__PURE__ */ React.createElement("span", { className: "f__l" }, "Category"), /* @__PURE__ */ React.createElement("select", { className: "f__in", value: category, onChange: (e) => setCategory(e.target.value) }, window.WKB.CATEGORIES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c.id, value: c.id }, c.label)))), /* @__PURE__ */ React.createElement("label", { className: "f" }, /* @__PURE__ */ React.createElement("span", { className: "f__l" }, "Level"), /* @__PURE__ */ React.createElement("select", { className: "f__in", value: level, onChange: (e) => setLevel(e.target.value) }, window.WKB.LEVELS.map((l) => /* @__PURE__ */ React.createElement("option", { key: l, value: l }, l))))), /* @__PURE__ */ React.createElement("label", { className: "f" }, /* @__PURE__ */ React.createElement("span", { className: "f__l" }, "Added by"), /* @__PURE__ */ React.createElement("select", { className: "f__in", value: author, onChange: (e) => setAuthor(e.target.value) }, window.WKB.COACHES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c)))), /* @__PURE__ */ React.createElement("label", { className: "f" }, /* @__PURE__ */ React.createElement("span", { className: "f__l" }, "Summary"), /* @__PURE__ */ React.createElement("textarea", { className: "f__in f__ta", rows: 2, value: summary, onChange: (e) => setSummary(e.target.value), placeholder: "One or two sentences on what this is and why it matters." })), /* @__PURE__ */ React.createElement("label", { className: "f" }, /* @__PURE__ */ React.createElement("span", { className: "f__l" }, "Steps / Key points ", /* @__PURE__ */ React.createElement("em", { className: "f__hint" }, "one per line")), /* @__PURE__ */ React.createElement("textarea", { className: "f__in f__ta", rows: 4, value: stepsText, onChange: (e) => setStepsText(e.target.value), placeholder: "Level change, head up\nPenetration step\nFinish the corner" })), /* @__PURE__ */ React.createElement("label", { className: "f" }, /* @__PURE__ */ React.createElement("span", { className: "f__l" }, "Coach's notes ", /* @__PURE__ */ React.createElement("em", { className: "f__hint" }, "optional")), /* @__PURE__ */ React.createElement("textarea", { className: "f__in f__ta", rows: 2, value: coachNotes, onChange: (e) => setCoachNotes(e.target.value), placeholder: "The thing you say every practice about this." })), /* @__PURE__ */ React.createElement("label", { className: "f" }, /* @__PURE__ */ React.createElement("span", { className: "f__l" }, "Tags ", /* @__PURE__ */ React.createElement("em", { className: "f__hint" }, "comma separated")), /* @__PURE__ */ React.createElement("input", { className: "f__in", value: tags, onChange: (e) => setTags(e.target.value), placeholder: "takedown, neutral, leg attack" })), /* @__PURE__ */ React.createElement(FilmBuilder, { films, setFilms }), /* @__PURE__ */ React.createElement(DocBuilder, { docs, setDocs })), /* @__PURE__ */ React.createElement("div", { className: "detail__actions" }, /* @__PURE__ */ React.createElement("button", { className: "action" + (valid ? "" : " action--disabled"), onClick: submit, disabled: !valid }, /* @__PURE__ */ React.createElement(Icon, { name: edit ? "check" : "plus", size: 18, stroke: 2.4 }), edit ? "Save Changes" : "Add Entry"), /* @__PURE__ */ React.createElement("button", { className: "action action--ghost", onClick: onClose }, "Cancel"))));
  }
  Object.assign(window, { Icon, LevelTag, EntryCard, DetailView, AddEntryForm });
})();

/* ====== docs.jsx ====== */
(() => {
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
      pdf: "PDF",
      doc: "Word",
      docx: "Word",
      ppt: "PowerPoint",
      pptx: "PowerPoint",
      xls: "Excel",
      xlsx: "Excel",
      key: "Keynote",
      pages: "Pages",
      txt: "Text",
      csv: "Spreadsheet",
      rtf: "Document"
    };
    const e = docExt(doc);
    if (map[e]) return map[e];
    const u = (doc.url || "").toLowerCase();
    if (/docs\.google|drive\.google/.test(u)) return "Google Drive";
    if (/sharepoint|onedrive|1drv|office\.com/.test(u)) return "Office Online";
    if (u) return "Link";
    return "File";
  }
  function DocItem({ doc }) {
    const type = docTypeLabel(doc);
    const name = doc.label || doc.fileName || type + " document";
    const isLink = !!doc.url && !doc.fileKey;
    async function open() {
      if (doc.url) {
        window.open(doc.url, "_blank", "noopener");
        return;
      }
      if (doc.fileKey && window.FilmDB) {
        const blob = await window.FilmDB.get(doc.fileKey);
        if (!blob) {
          window.alert("This file isn't on this device. Re-upload it (it becomes available to everyone once you Publish).");
          return;
        }
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank", "noopener");
        setTimeout(() => URL.revokeObjectURL(url), 6e4);
      }
    }
    return /* @__PURE__ */ React.createElement("button", { className: "doc", onClick: open }, /* @__PURE__ */ React.createElement("span", { className: "doc__ic" }, /* @__PURE__ */ React.createElement(Icon, { name: "file", size: 20, stroke: 1.8 })), /* @__PURE__ */ React.createElement("span", { className: "doc__meta" }, /* @__PURE__ */ React.createElement("span", { className: "doc__name" }, name), /* @__PURE__ */ React.createElement("span", { className: "doc__type" }, type, doc.fileName && doc.fileName !== name ? " · " + doc.fileName : "")), /* @__PURE__ */ React.createElement("span", { className: "doc__act" }, /* @__PURE__ */ React.createElement(Icon, { name: isLink ? "external" : "download", size: 17, stroke: 2 })));
  }
  function DocLibrary({ entry }) {
    const docs = normalizeDocs(entry);
    if (!docs.length) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "docs" }, docs.map((d, i) => /* @__PURE__ */ React.createElement(DocItem, { key: d.id || i, doc: d })));
  }
  function DocBuilder({ docs, setDocs }) {
    function update(i, patch) {
      setDocs(docs.map((d, j) => j === i ? { ...d, ...patch } : d));
    }
    function add() {
      setDocs([...docs, { id: "d" + Date.now() + Math.random().toString(36).slice(2, 6), label: "", url: "" }]);
    }
    function remove(i) {
      const d = docs[i];
      if (d.fileKey && window.FilmDB) window.FilmDB.del(d.fileKey);
      setDocs(docs.filter((_, j) => j !== i));
    }
    async function onFile(i, file) {
      if (!file) return;
      const key = "file_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
      await window.FilmDB.put(key, file);
      update(i, { fileKey: key, fileName: file.name, mime: file.type, url: "" });
    }
    const ACCEPT = ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.key,.pages,.txt,.csv,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    return /* @__PURE__ */ React.createElement("div", { className: "fb" }, /* @__PURE__ */ React.createElement("span", { className: "f__l" }, "Handouts & documents ", /* @__PURE__ */ React.createElement("em", { className: "f__hint" }, "PDFs, Word docs, PowerPoints — or paste a Google Drive / OneDrive link")), docs.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "fb__empty" }, "No documents yet. Attach a scouting report, lifting program, or slide deck."), docs.map((d, i) => /* @__PURE__ */ React.createElement("div", { className: "fb__row", key: d.id || i }, /* @__PURE__ */ React.createElement("div", { className: "fb__head" }, /* @__PURE__ */ React.createElement("input", { className: "f__in fb__label", value: d.label || "", onChange: (e) => update(i, { label: e.target.value }), placeholder: "Document " + (i + 1) + " name — e.g. Week 3 lifting plan" }), /* @__PURE__ */ React.createElement("button", { className: "fb__rm", onClick: () => remove(i), "aria-label": "Remove document" }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 16, stroke: 2 }))), /* @__PURE__ */ React.createElement("div", { className: "fb__src" }, d.fileKey ? /* @__PURE__ */ React.createElement("div", { className: "fb__file" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 15, stroke: 2.4 }), /* @__PURE__ */ React.createElement("span", { className: "fb__filename" }, d.fileName || "Uploaded file"), /* @__PURE__ */ React.createElement("button", { className: "fb__clear", onClick: () => {
      window.FilmDB.del(d.fileKey);
      update(i, { fileKey: null, fileName: null, mime: null });
    } }, "Clear")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("input", { className: "f__in fb__url", value: d.url || "", onChange: (e) => update(i, { url: e.target.value }), placeholder: "Paste a link (Google Drive, OneDrive, PDF URL)" }), /* @__PURE__ */ React.createElement("span", { className: "fb__or" }, "or"), /* @__PURE__ */ React.createElement("label", { className: "fb__upload" }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 15, stroke: 2.4 }), "Upload file", /* @__PURE__ */ React.createElement("input", { type: "file", accept: ACCEPT, hidden: true, onChange: (e) => onFile(i, e.target.files[0]) })))), (d.url || d.fileKey) && /* @__PURE__ */ React.createElement("div", { className: "fb__prev fb__prev--ok" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 13, stroke: 2.6 }), docTypeLabel(d), d.fileKey ? " · uploaded · publishes to a docs/ folder" : " · opens in a new tab"))), /* @__PURE__ */ React.createElement("button", { className: "fb__add", onClick: add }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 16, stroke: 2.4 }), "Add a document"));
  }
  Object.assign(window, { normalizeDocs, docTypeLabel, DocLibrary, DocBuilder });
})();

/* ====== mindset.jsx ====== */
(() => {
  const { useEffect, useMemo, useRef, useState } = React;
  const MINDSET_STORAGE_KEY = "wkb_mindset_workbook_v1";
  const MINDSET_RESTORE_RECOVERY_KEY = "wkb_mindset_workbook_before_restore_v1";
  const MINDSET_BACKUP_TYPE = "wkb-mindset-workbook";
  const MINDSET_SCHEMA_VERSION = 1;
  const MINDSET_MAX_BACKUP_BYTES = 4 * 1024 * 1024;
  const MINDSET_MAX_HISTORY_ENTRIES = 200;
  const MINDSET_MAX_TEXT_LENGTH = 1e3;
  const BASELINE_GROUPS = [
    {
      id: "goal-setting",
      label: "Goal Setting",
      questions: [
        ["goal-clear", "I have clear season goals that I can describe in my own words."],
        ["goal-weekly", "I turn my bigger goals into specific actions for this week."],
        ["goal-review", "I review my goals and adjust my next steps when needed."]
      ]
    },
    {
      id: "mental-toughness",
      label: "Mental Toughness",
      questions: [
        ["tough-reset", "I can reset and choose a useful next action after a mistake."],
        ["tough-engage", "I stay engaged when practice or a match becomes difficult."],
        ["tough-setback", "I respond to setbacks with purposeful effort and attention."]
      ]
    },
    {
      id: "motivation",
      label: "Motivation",
      questions: [
        ["motivation-why", "I know why improving as a wrestler matters to me."],
        ["motivation-effort", "I can bring purposeful effort even when motivation is low."],
        ["motivation-connect", "I connect daily practice work to something I want to improve."]
      ]
    },
    {
      id: "present-moment",
      label: "Present Moment",
      questions: [
        ["present-position", "I focus on the current position instead of getting stuck on the outcome."],
        ["present-return", "When I notice a distraction, I return attention to my next job."],
        ["present-engaged", "I stay engaged with what is happening now in practice and competition."]
      ]
    },
    {
      id: "relaxing-under-pressure",
      label: "Relaxing under Pressure",
      questions: [
        ["relax-breathe", "I use a familiar breathing cue to settle before competition."],
        ["relax-ready", "I keep my body loose and ready when the moment feels important."],
        ["relax-release", "I notice unnecessary tension and return to my practiced routine."]
      ]
    },
    {
      id: "confidence",
      label: "Confidence",
      questions: [
        ["confidence-trust", "I trust the skills and positions I have prepared."],
        ["confidence-talk", "My self-talk reflects the work I have put in."],
        ["confidence-decide", "I can compete decisively after a mistake or lost position."]
      ]
    },
    {
      id: "clarity",
      label: "Clarity",
      questions: [
        ["clarity-opening", "I know my first attack and the pace I want to establish."],
        ["clarity-positions", "I know my first response from my key positions."],
        ["clarity-cues", "I have simple cues to use when a match feels chaotic."]
      ]
    },
    {
      id: "aggressiveness",
      label: "Aggressiveness",
      questions: [
        ["aggressive-pressure", "I move forward with controlled, purposeful pressure."],
        ["aggressive-initiate", "I initiate attacks instead of waiting for the other wrestler."],
        ["aggressive-follow", "I pursue finishes and re-attacks while staying technically sound."]
      ]
    }
  ];
  const BASELINE_QUESTION_IDS = BASELINE_GROUPS.reduce(
    (ids, group) => ids.concat(group.questions.map((question) => question[0])),
    []
  );
  const BASELINE_OPTIONS = [
    { value: "yes", label: "Yes" },
    { value: "working", label: "Working on it" },
    { value: "unsure", label: "Unsure" }
  ];
  const GAME_PLAN_TEXT_KEYS = [
    "tiePreference",
    "tieCreation",
    "tieAnswer",
    "counterOffense",
    "topFirstMove",
    "bottomFirstMove",
    "matReturn"
  ];
  const RESET_FIELDS = [
    { key: "dynamicStretch", label: "Dynamic stretch", placeholder: "The sequence and cues I use" },
    { key: "funElement", label: "Fun element", placeholder: "Something familiar that keeps the routine enjoyable" },
    { key: "deepBreathing", label: "Deep breathing", placeholder: "My breathing count or cue" },
    { key: "drilling", label: "Drilling and hand fighting", placeholder: "The positions, pace, and partner cues I want" },
    { key: "thoughtsMusic", label: "Exact thoughts or music", placeholder: "The exact words, cues, song, or quiet I choose" },
    { key: "shotgunRoutine", label: "Under-two-minute shotgun routine", placeholder: "My short routine, in order" }
  ];
  const POST_MATCH_CHECKLIST = [
    ["warmup", "Warm-up"],
    ["firstShot", "First shot"],
    ["forwardPressure", "Forward pressure"],
    ["attackAttempts", "Attack attempts"],
    ["tieControl", "Tie control"],
    ["firstMove", "Top/bottom first move"],
    ["matReturns", "Mat returns"],
    ["movement", "Movement"],
    ["neverQuit", "Never quit"],
    ["effort", "Effort"],
    ["composure", "Composure"],
    ["bodyLanguage", "Body language"],
    ["noClockWatching", "No clock watching"]
  ];
  function localDateValue() {
    const now = /* @__PURE__ */ new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + month + "-" + day;
  }
  function makeMindsetId(prefix) {
    return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  }
  function makeTakedowns() {
    return [0, 1, 2].map(() => ({ shot: "", setup: "", finish: "" }));
  }
  function makeGamePlan() {
    return {
      takedowns: makeTakedowns(),
      tiePreference: "",
      tieCreation: "",
      tieAnswer: "",
      counterOffense: "",
      topFirstMove: "",
      bottomFirstMove: "",
      matReturn: "",
      improvementAreas: ["", "", ""]
    };
  }
  function makeWeeklyDraft() {
    return {
      editingId: null,
      date: localDateValue(),
      confidence: 0,
      energy: 0,
      focus: 0,
      win: "",
      challenge: "",
      weeklyAction: "",
      why: ""
    };
  }
  function makePreMatchReset() {
    return RESET_FIELDS.reduce((routine, field) => {
      routine[field.key] = "";
      return routine;
    }, {});
  }
  function makePostChecklist() {
    return POST_MATCH_CHECKLIST.reduce((checklist, item) => {
      checklist[item[0]] = false;
      return checklist;
    }, {});
  }
  function makePostMatchDraft() {
    return {
      editingId: null,
      event: "",
      date: "",
      opponent: "",
      result: "",
      checklist: makePostChecklist(),
      reflection: "",
      improvements: ["", "", ""],
      nextAction: ""
    };
  }
  function copyWeeklyDraft(draft) {
    return {
      editingId: draft.editingId,
      date: draft.date,
      confidence: draft.confidence,
      energy: draft.energy,
      focus: draft.focus,
      win: draft.win,
      challenge: draft.challenge,
      weeklyAction: draft.weeklyAction,
      why: draft.why
    };
  }
  function copyPostMatchDraft(draft) {
    return {
      editingId: draft.editingId,
      event: draft.event,
      date: draft.date,
      opponent: draft.opponent,
      result: draft.result,
      checklist: POST_MATCH_CHECKLIST.reduce((result, item) => {
        result[item[0]] = draft.checklist[item[0]];
        return result;
      }, {}),
      reflection: draft.reflection,
      improvements: draft.improvements.slice(0, 3),
      nextAction: draft.nextAction
    };
  }
  function makeEmptyMindsetWorkbook() {
    return {
      type: MINDSET_BACKUP_TYPE,
      version: MINDSET_SCHEMA_VERSION,
      updatedAt: null,
      baseline: { answers: {}, notes: {} },
      gamePlan: makeGamePlan(),
      weeklyDraft: makeWeeklyDraft(),
      suspendedWeeklyDraft: null,
      weeklyCheckIns: [],
      preMatchReset: makePreMatchReset(),
      postMatchDraft: makePostMatchDraft(),
      suspendedPostMatchDraft: null,
      postMatchReviews: []
    };
  }
  function isRecord(value) {
    return !!value && typeof value === "object" && !Array.isArray(value);
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isSafeString(value) {
    return isString(value) && value.length <= MINDSET_MAX_TEXT_LENGTH;
  }
  function isRating(value) {
    return Number.isInteger(value) && value >= 0 && value <= 5;
  }
  function validBaseline(value) {
    if (!isRecord(value) || !isRecord(value.answers) || !isRecord(value.notes)) return false;
    const validId = (id) => BASELINE_QUESTION_IDS.indexOf(id) >= 0;
    const answersValid = Object.keys(value.answers).every(
      (id) => validId(id) && ["yes", "working", "unsure"].indexOf(value.answers[id]) >= 0
    );
    const notesValid = Object.keys(value.notes).every((id) => validId(id) && isSafeString(value.notes[id]));
    return answersValid && notesValid;
  }
  function validGamePlan(value) {
    if (!isRecord(value) || !Array.isArray(value.takedowns) || value.takedowns.length !== 3) return false;
    if (!value.takedowns.every(
      (item) => isRecord(item) && isSafeString(item.shot) && isSafeString(item.setup) && isSafeString(item.finish)
    )) return false;
    if (!GAME_PLAN_TEXT_KEYS.every((key) => isSafeString(value[key]))) return false;
    return Array.isArray(value.improvementAreas) && value.improvementAreas.length === 3 && value.improvementAreas.every(isSafeString);
  }
  function validWeeklyDraft(value) {
    return isRecord(value) && (value.editingId === null || isSafeString(value.editingId)) && isSafeString(value.date) && isRating(value.confidence) && isRating(value.energy) && isRating(value.focus) && isSafeString(value.win) && isSafeString(value.challenge) && isSafeString(value.weeklyAction) && isSafeString(value.why);
  }
  function validWeeklyEntry(value) {
    return validWeeklyDraft({ ...value, editingId: null }) && isSafeString(value.id) && isSafeString(value.createdAt) && isSafeString(value.updatedAt);
  }
  function validPreMatchReset(value) {
    return isRecord(value) && RESET_FIELDS.every((field) => isSafeString(value[field.key]));
  }
  function validPostDraft(value) {
    if (!isRecord(value) || value.editingId !== null && !isSafeString(value.editingId)) return false;
    if (!["event", "date", "opponent", "result", "reflection", "nextAction"].every((key) => isSafeString(value[key]))) return false;
    if (!Array.isArray(value.improvements) || value.improvements.length !== 3 || !value.improvements.every(isSafeString)) return false;
    if (!isRecord(value.checklist)) return false;
    return POST_MATCH_CHECKLIST.every((item) => typeof value.checklist[item[0]] === "boolean");
  }
  function validPostEntry(value) {
    return validPostDraft({ ...value, editingId: null }) && isSafeString(value.id) && isSafeString(value.createdAt) && isSafeString(value.updatedAt);
  }
  function validSuspendedWeeklyDraft(value) {
    return value === void 0 || value === null || validWeeklyDraft(value) && value.editingId === null;
  }
  function validSuspendedPostMatchDraft(value) {
    return value === void 0 || value === null || validPostDraft(value) && value.editingId === null;
  }
  function entriesHaveUniqueIds(entries) {
    const ids = /* @__PURE__ */ new Set();
    return entries.every((entry) => {
      if (!isSafeString(entry.id) || !entry.id.trim() || ids.has(entry.id)) return false;
      ids.add(entry.id);
      return true;
    });
  }
  function validateMindsetWorkbook(value) {
    if (!isRecord(value)) return "The selected file does not contain a workbook object.";
    if (value.type !== MINDSET_BACKUP_TYPE) return "This file is not a Mindset Workbook backup.";
    if (value.version !== MINDSET_SCHEMA_VERSION) return "This backup uses an unsupported workbook version.";
    if (value.updatedAt !== null && !isSafeString(value.updatedAt)) return "The backup has an invalid update timestamp.";
    if (!validBaseline(value.baseline)) return "The backup has an invalid baseline section.";
    if (!validGamePlan(value.gamePlan)) return "The backup has an invalid game-plan section.";
    if (!validWeeklyDraft(value.weeklyDraft)) return "The backup has an invalid weekly check-in draft.";
    if (!validSuspendedWeeklyDraft(value.suspendedWeeklyDraft)) return "The backup has an invalid suspended weekly check-in draft.";
    if (!Array.isArray(value.weeklyCheckIns) || value.weeklyCheckIns.length > MINDSET_MAX_HISTORY_ENTRIES || !value.weeklyCheckIns.every(validWeeklyEntry) || !entriesHaveUniqueIds(value.weeklyCheckIns)) {
      return "The backup has an invalid weekly check-in history.";
    }
    if (!validPreMatchReset(value.preMatchReset)) return "The backup has an invalid pre-match reset section.";
    if (!validPostDraft(value.postMatchDraft)) return "The backup has an invalid post-match draft.";
    if (!validSuspendedPostMatchDraft(value.suspendedPostMatchDraft)) return "The backup has an invalid suspended post-match draft.";
    if (!Array.isArray(value.postMatchReviews) || value.postMatchReviews.length > MINDSET_MAX_HISTORY_ENTRIES || !value.postMatchReviews.every(validPostEntry) || !entriesHaveUniqueIds(value.postMatchReviews)) {
      return "The backup has an invalid post-match history.";
    }
    return null;
  }
  function normalizeMindsetWorkbook(value) {
    const baselineAnswers = {};
    const baselineNotes = {};
    Object.keys(value.baseline.answers).forEach((id) => {
      baselineAnswers[id] = value.baseline.answers[id];
    });
    Object.keys(value.baseline.notes).forEach((id) => {
      baselineNotes[id] = value.baseline.notes[id];
    });
    return {
      type: MINDSET_BACKUP_TYPE,
      version: MINDSET_SCHEMA_VERSION,
      updatedAt: value.updatedAt,
      baseline: { answers: baselineAnswers, notes: baselineNotes },
      gamePlan: {
        takedowns: value.gamePlan.takedowns.map((item) => ({ shot: item.shot, setup: item.setup, finish: item.finish })),
        ...GAME_PLAN_TEXT_KEYS.reduce((result, key) => {
          result[key] = value.gamePlan[key];
          return result;
        }, {}),
        improvementAreas: value.gamePlan.improvementAreas.slice(0, 3)
      },
      weeklyDraft: copyWeeklyDraft(value.weeklyDraft),
      suspendedWeeklyDraft: value.suspendedWeeklyDraft == null ? null : copyWeeklyDraft(value.suspendedWeeklyDraft),
      weeklyCheckIns: value.weeklyCheckIns.map((entry) => ({
        id: entry.id,
        date: entry.date,
        confidence: entry.confidence,
        energy: entry.energy,
        focus: entry.focus,
        win: entry.win,
        challenge: entry.challenge,
        weeklyAction: entry.weeklyAction,
        why: entry.why,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt
      })),
      preMatchReset: RESET_FIELDS.reduce((result, field) => {
        result[field.key] = value.preMatchReset[field.key];
        return result;
      }, {}),
      postMatchDraft: copyPostMatchDraft(value.postMatchDraft),
      suspendedPostMatchDraft: value.suspendedPostMatchDraft == null ? null : copyPostMatchDraft(value.suspendedPostMatchDraft),
      postMatchReviews: value.postMatchReviews.map((entry) => ({
        id: entry.id,
        event: entry.event,
        date: entry.date,
        opponent: entry.opponent,
        result: entry.result,
        checklist: POST_MATCH_CHECKLIST.reduce((result, item) => {
          result[item[0]] = entry.checklist[item[0]];
          return result;
        }, {}),
        reflection: entry.reflection,
        improvements: entry.improvements.slice(0, 3),
        nextAction: entry.nextAction,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt
      }))
    };
  }
  function loadMindsetWorkbook() {
    const empty = makeEmptyMindsetWorkbook();
    let stored = null;
    try {
      stored = window.localStorage.getItem(MINDSET_STORAGE_KEY);
      if (!stored) return { data: empty, error: null, raw: null };
      const parsed = JSON.parse(stored);
      const error = validateMindsetWorkbook(parsed);
      if (error) return { data: empty, error: "Saved workbook data could not be loaded. " + error, raw: stored };
      return { data: normalizeMindsetWorkbook(parsed), error: null, raw: stored };
    } catch (error) {
      return {
        data: empty,
        error: "Saved workbook data could not be read. Download a backup or clear the workbook before starting over.",
        raw: stored
      };
    }
  }
  function displayDate(value) {
    if (!value) return "No date";
    const parts = value.split("-").map(Number);
    if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return value;
    try {
      return new Intl.DateTimeFormat(void 0, { year: "numeric", month: "short", day: "numeric" }).format(new Date(parts[0], parts[1] - 1, parts[2]));
    } catch (error) {
      return value;
    }
  }
  function nonEmpty(value) {
    return isString(value) && value.trim().length > 0;
  }
  function baselineStats(baseline) {
    return BASELINE_GROUPS.map((group) => {
      const counts = { yes: 0, working: 0, unsure: 0 };
      group.questions.forEach((question) => {
        const answer = baseline.answers[question[0]];
        if (counts[answer] !== void 0) counts[answer] += 1;
      });
      return {
        id: group.id,
        label: group.label,
        yes: counts.yes,
        working: counts.working,
        unsure: counts.unsure,
        answered: counts.yes + counts.working + counts.unsure,
        reflectionCount: counts.working + counts.unsure
      };
    });
  }
  function gamePlanCompletion(gamePlan) {
    let complete = 0;
    gamePlan.takedowns.forEach((item) => {
      [item.shot, item.setup, item.finish].forEach((value) => {
        if (nonEmpty(value)) complete += 1;
      });
    });
    GAME_PLAN_TEXT_KEYS.forEach((key) => {
      if (nonEmpty(gamePlan[key])) complete += 1;
    });
    gamePlan.improvementAreas.forEach((value) => {
      if (nonEmpty(value)) complete += 1;
    });
    return { complete, total: 19 };
  }
  function resetCompletion(reset) {
    const complete = RESET_FIELDS.filter((field) => nonEmpty(reset[field.key])).length;
    return { complete, total: RESET_FIELDS.length };
  }
  function weeklyDraftCompletion(draft) {
    const values = [draft.confidence, draft.energy, draft.focus, draft.win, draft.challenge, draft.weeklyAction, draft.why];
    const complete = values.filter((value) => typeof value === "number" ? value > 0 : nonEmpty(value)).length;
    return { complete, total: values.length };
  }
  function hasWeeklyDraftContent(draft) {
    return weeklyDraftCompletion(draft).complete > 0;
  }
  function postDraftCompletion(draft) {
    let complete = [draft.event, draft.date, draft.opponent, draft.result, draft.reflection, draft.nextAction].filter(nonEmpty).length;
    complete += draft.improvements.filter(nonEmpty).length;
    complete += POST_MATCH_CHECKLIST.filter((item) => draft.checklist[item[0]]).length;
    return { complete, total: 22 };
  }
  function hasPostDraftContent(draft) {
    return postDraftCompletion(draft).complete > 0;
  }
  function TextField({ id, label, value, onChange, placeholder, multiline = false, rows = 3, type = "text", required = false }) {
    const controlProps = {
      id,
      className: "wb-field-control",
      value,
      onChange: (event) => onChange(event.target.value),
      placeholder,
      required,
      maxLength: type === "date" ? void 0 : multiline ? MINDSET_MAX_TEXT_LENGTH : 180
    };
    return /* @__PURE__ */ React.createElement("label", { className: "wb-field", htmlFor: id }, /* @__PURE__ */ React.createElement("span", { className: "wb-field-label" }, label, !required && /* @__PURE__ */ React.createElement("span", { className: "wb-field-optional" }, "Optional")), multiline ? /* @__PURE__ */ React.createElement("textarea", { ...controlProps, rows }) : /* @__PURE__ */ React.createElement("input", { ...controlProps, type }));
  }
  function RatingField({ id, label, value, onChange }) {
    return /* @__PURE__ */ React.createElement("fieldset", { className: "wb-rating", "aria-describedby": id + "-help" }, /* @__PURE__ */ React.createElement("legend", { className: "wb-field-label" }, label), /* @__PURE__ */ React.createElement("span", { className: "wb-rating-help", id: id + "-help" }, "1 is low; 5 is high. Leave blank if you do not want to rate it."), /* @__PURE__ */ React.createElement("div", { className: "wb-rating-options" }, [1, 2, 3, 4, 5].map((rating) => /* @__PURE__ */ React.createElement("label", { className: "wb-rating-option", key: rating }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "radio",
        name: id,
        value: rating,
        checked: value === rating,
        onChange: () => onChange(rating)
      }
    ), /* @__PURE__ */ React.createElement("span", null, rating))), value > 0 && /* @__PURE__ */ React.createElement("button", { className: "wb-link-button", type: "button", onClick: () => onChange(0) }, "Clear rating")));
  }
  function ProgressMeter({ value, total, label }) {
    const safeValue = Math.min(value, total);
    return /* @__PURE__ */ React.createElement("div", { className: "wb-progress" }, /* @__PURE__ */ React.createElement("div", { className: "wb-progress-copy" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("span", null, safeValue, " of ", total)), /* @__PURE__ */ React.createElement("progress", { className: "wb-progress-bar", max: total, value: safeValue, "aria-label": label + ": " + safeValue + " of " + total }));
  }
  function ModuleHeader({ headingId, title, eyebrow, description, onBack }) {
    return /* @__PURE__ */ React.createElement("header", { className: "wb-module-header" }, /* @__PURE__ */ React.createElement("button", { className: "wb-back-button", type: "button", onClick: onBack }, /* @__PURE__ */ React.createElement(Icon, { name: "back", size: 18, stroke: 2.2 }), "Workbook home"), /* @__PURE__ */ React.createElement("p", { className: "wb-eyebrow" }, eyebrow), /* @__PURE__ */ React.createElement("h2", { className: "wb-module-title", id: headingId, tabIndex: "-1" }, title), /* @__PURE__ */ React.createElement("p", { className: "wb-module-description" }, description));
  }
  function DashboardCard({ module, title, description, summary, progress, progressTotal, buttonLabel, onOpen, history }) {
    return /* @__PURE__ */ React.createElement(
      "article",
      {
        className: "wb-module-card",
        "data-module-card": module,
        "data-mindset-module-card": module,
        "data-testid": "mindset-module-card-" + module
      },
      /* @__PURE__ */ React.createElement("div", { className: "wb-module-card-heading" }, /* @__PURE__ */ React.createElement("span", { className: "wb-module-card-icon", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(Icon, { name: module === "baseline" ? "brain" : module === "game-plan" ? "target" : module === "pre-match" ? "flag" : "check", size: 22, stroke: 2 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, title), /* @__PURE__ */ React.createElement("p", null, description))),
      /* @__PURE__ */ React.createElement(ProgressMeter, { value: progress, total: progressTotal, label: "Progress" }),
      /* @__PURE__ */ React.createElement("p", { className: "wb-module-card-summary" }, summary),
      history && /* @__PURE__ */ React.createElement("p", { className: "wb-module-card-history" }, history),
      /* @__PURE__ */ React.createElement("button", { className: "wb-primary-button wb-module-card-action", type: "button", onClick: onOpen }, buttonLabel, /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 17, stroke: 2.2 }))
    );
  }
  function BaselineModule({ baseline, onChange, onBack }) {
    const stats = useMemo(() => baselineStats(baseline), [baseline]);
    const answered = stats.reduce((total, item) => total + item.answered, 0);
    const priorities = stats.filter((item) => item.answered > 0 && item.reflectionCount > 0).slice().sort((a, b) => b.reflectionCount - a.reflectionCount || b.unsure - a.unsure || a.label.localeCompare(b.label)).slice(0, 3);
    function setAnswer(id, answer) {
      onChange({ ...baseline, answers: { ...baseline.answers, [id]: answer } });
    }
    function clearAnswer(id) {
      const answers = { ...baseline.answers };
      delete answers[id];
      onChange({ ...baseline, answers });
    }
    function setNote(id, note) {
      const notes = { ...baseline.notes };
      if (note) notes[id] = note;
      else delete notes[id];
      onChange({ ...baseline, notes });
    }
    return /* @__PURE__ */ React.createElement("section", { className: "wb-module wb-baseline", "aria-labelledby": "wb-baseline-title" }, /* @__PURE__ */ React.createElement(
      ModuleHeader,
      {
        headingId: "wb-baseline-title",
        title: "Mindset Baseline",
        eyebrow: "24 personal reflection prompts",
        description: "Answer from where you are today. The category counts help you choose what to reflect on; they are not a diagnosis, grade, or comparison with anyone else.",
        onBack
      }
    ), /* @__PURE__ */ React.createElement(ProgressMeter, { value: answered, total: BASELINE_QUESTION_IDS.length, label: "Baseline questions answered" }), /* @__PURE__ */ React.createElement("aside", { className: "wb-priorities", "aria-labelledby": "wb-priorities-title" }, /* @__PURE__ */ React.createElement("h3", { id: "wb-priorities-title" }, "Personal reflection priorities"), /* @__PURE__ */ React.createElement("p", null, "Categories with the most “Working on it” or “Unsure” responses appear first."), priorities.length ? /* @__PURE__ */ React.createElement("ol", { className: "wb-priority-list" }, priorities.map((item) => /* @__PURE__ */ React.createElement("li", { key: item.id }, /* @__PURE__ */ React.createElement("strong", null, item.label), /* @__PURE__ */ React.createElement("span", null, item.reflectionCount, " reflection ", item.reflectionCount === 1 ? "prompt" : "prompts")))) : /* @__PURE__ */ React.createElement("p", { className: "wb-empty-copy" }, "Answer a few prompts to see possible areas for reflection.")), /* @__PURE__ */ React.createElement("div", { className: "wb-baseline-groups" }, BASELINE_GROUPS.map((group, groupIndex) => {
      const stat = stats[groupIndex];
      return /* @__PURE__ */ React.createElement("section", { className: "wb-baseline-group", key: group.id, "aria-labelledby": "wb-group-" + group.id }, /* @__PURE__ */ React.createElement("header", { className: "wb-baseline-group-header" }, /* @__PURE__ */ React.createElement("h3", { id: "wb-group-" + group.id }, group.label), /* @__PURE__ */ React.createElement("span", null, stat.answered, " of ", group.questions.length, " answered")), /* @__PURE__ */ React.createElement("p", { className: "wb-category-counts", "aria-label": group.label + " response counts" }, /* @__PURE__ */ React.createElement("span", null, "Yes: ", stat.yes), /* @__PURE__ */ React.createElement("span", null, "Working on it: ", stat.working), /* @__PURE__ */ React.createElement("span", null, "Unsure: ", stat.unsure)), group.questions.map((question, questionIndex) => {
        const id = question[0];
        const answer = baseline.answers[id] || "";
        return /* @__PURE__ */ React.createElement("fieldset", { className: "wb-baseline-question", key: id }, /* @__PURE__ */ React.createElement("legend", null, /* @__PURE__ */ React.createElement("span", null, groupIndex * 3 + questionIndex + 1, "."), " ", question[1]), /* @__PURE__ */ React.createElement("div", { className: "wb-answer-options" }, BASELINE_OPTIONS.map((option) => /* @__PURE__ */ React.createElement("label", { className: "wb-answer-option", key: option.value }, /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "radio",
            name: "baseline-" + id,
            value: option.value,
            checked: answer === option.value,
            onChange: () => setAnswer(id, option.value)
          }
        ), /* @__PURE__ */ React.createElement("span", null, option.label))), answer && /* @__PURE__ */ React.createElement("button", { className: "wb-link-button", type: "button", onClick: () => clearAnswer(id) }, "Clear answer")), /* @__PURE__ */ React.createElement("label", { className: "wb-question-note", htmlFor: "note-" + id }, /* @__PURE__ */ React.createElement("span", null, "Personal note ", /* @__PURE__ */ React.createElement("span", { className: "wb-field-optional" }, "Optional")), /* @__PURE__ */ React.createElement(
          "textarea",
          {
            id: "note-" + id,
            className: "wb-field-control",
            rows: "2",
            maxLength: 600,
            value: baseline.notes[id] || "",
            onChange: (event) => setNote(id, event.target.value),
            placeholder: "A cue, example, or next step I want to remember"
          }
        )));
      }));
    })), /* @__PURE__ */ React.createElement("section", { className: "wb-count-table-wrap", "aria-labelledby": "wb-count-table-title" }, /* @__PURE__ */ React.createElement("h3", { id: "wb-count-table-title" }, "Category response counts"), /* @__PURE__ */ React.createElement("div", { className: "wb-table-scroll", tabIndex: "0" }, /* @__PURE__ */ React.createElement("table", { className: "wb-count-table" }, /* @__PURE__ */ React.createElement("caption", null, "Personal per-category summary; no overall score is calculated."), /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { scope: "col" }, "Category"), /* @__PURE__ */ React.createElement("th", { scope: "col" }, "Yes"), /* @__PURE__ */ React.createElement("th", { scope: "col" }, "Working on it"), /* @__PURE__ */ React.createElement("th", { scope: "col" }, "Unsure"))), /* @__PURE__ */ React.createElement("tbody", null, stats.map((item) => /* @__PURE__ */ React.createElement("tr", { key: item.id }, /* @__PURE__ */ React.createElement("th", { scope: "row" }, item.label), /* @__PURE__ */ React.createElement("td", null, item.yes), /* @__PURE__ */ React.createElement("td", null, item.working), /* @__PURE__ */ React.createElement("td", null, item.unsure))))))));
  }
  function GamePlanModule({ gamePlan, onChange, onBack }) {
    const completion = gamePlanCompletion(gamePlan);
    function setField(key, value) {
      onChange({ ...gamePlan, [key]: value });
    }
    function setTakedown(index, key, value) {
      const takedowns = gamePlan.takedowns.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item);
      onChange({ ...gamePlan, takedowns });
    }
    function setImprovement(index, value) {
      const improvementAreas = gamePlan.improvementAreas.map((item, itemIndex) => itemIndex === index ? value : item);
      onChange({ ...gamePlan, improvementAreas });
    }
    return /* @__PURE__ */ React.createElement("section", { className: "wb-module wb-game-plan", "aria-labelledby": "wb-game-plan-title" }, /* @__PURE__ */ React.createElement(
      ModuleHeader,
      {
        headingId: "wb-game-plan-title",
        title: "My Wrestling Game Plan",
        eyebrow: "A clear plan for your positions",
        description: "Write the options you have prepared with your coaches. Every free-text field is optional, and you can revise this plan at any time.",
        onBack
      }
    ), /* @__PURE__ */ React.createElement(ProgressMeter, { value: completion.complete, total: completion.total, label: "Game-plan fields completed" }), /* @__PURE__ */ React.createElement("section", { className: "wb-form-section", "aria-labelledby": "wb-takedowns-title" }, /* @__PURE__ */ React.createElement("h3", { id: "wb-takedowns-title" }, "Three takedowns"), /* @__PURE__ */ React.createElement("p", null, "For each option, name the shot, the setup that creates it, and the finish you expect to use."), /* @__PURE__ */ React.createElement("div", { className: "wb-takedown-grid" }, gamePlan.takedowns.map((item, index) => /* @__PURE__ */ React.createElement("fieldset", { className: "wb-takedown-card", key: index }, /* @__PURE__ */ React.createElement("legend", null, "Takedown ", index + 1), /* @__PURE__ */ React.createElement(TextField, { id: "wb-td-shot-" + index, label: "Shot", value: item.shot, onChange: (value) => setTakedown(index, "shot", value), placeholder: "My attack" }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-td-setup-" + index, label: "Setup", value: item.setup, onChange: (value) => setTakedown(index, "setup", value), placeholder: "How I create the opening" }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-td-finish-" + index, label: "Finish", value: item.finish, onChange: (value) => setTakedown(index, "finish", value), placeholder: "My practiced finish" }))))), /* @__PURE__ */ React.createElement("section", { className: "wb-form-section", "aria-labelledby": "wb-ties-title" }, /* @__PURE__ */ React.createElement("h3", { id: "wb-ties-title" }, "Ties and counter offense"), /* @__PURE__ */ React.createElement("div", { className: "wb-field-grid" }, /* @__PURE__ */ React.createElement(TextField, { id: "wb-tie-preference", label: "My best tie", value: gamePlan.tiePreference, onChange: (value) => setField("tiePreference", value), placeholder: "The tie I want" }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-tie-creation", label: "How I create and control it", value: gamePlan.tieCreation, onChange: (value) => setField("tieCreation", value), placeholder: "Hand-fighting cues and position", multiline: true }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-tie-answer", label: "My answer to an opponent’s preferred tie", value: gamePlan.tieAnswer, onChange: (value) => setField("tieAnswer", value), placeholder: "Clear, create space, or attack from it", multiline: true }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-counter-offense", label: "Counter offense", value: gamePlan.counterOffense, onChange: (value) => setField("counterOffense", value), placeholder: "My first re-attack or counter option", multiline: true }))), /* @__PURE__ */ React.createElement("section", { className: "wb-form-section", "aria-labelledby": "wb-mat-title" }, /* @__PURE__ */ React.createElement("h3", { id: "wb-mat-title" }, "Top and bottom"), /* @__PURE__ */ React.createElement("div", { className: "wb-field-grid" }, /* @__PURE__ */ React.createElement(TextField, { id: "wb-top-first", label: "Top: first move", value: gamePlan.topFirstMove, onChange: (value) => setField("topFirstMove", value), placeholder: "Breakdown, ride, or turn sequence", multiline: true }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-bottom-first", label: "Bottom: first move", value: gamePlan.bottomFirstMove, onChange: (value) => setField("bottomFirstMove", value), placeholder: "My first movement and follow-up", multiline: true }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-mat-return", label: "Mat return", value: gamePlan.matReturn, onChange: (value) => setField("matReturn", value), placeholder: "My preferred return and control cues", multiline: true }))), /* @__PURE__ */ React.createElement("section", { className: "wb-form-section", "aria-labelledby": "wb-improvement-title" }, /* @__PURE__ */ React.createElement("h3", { id: "wb-improvement-title" }, "Three improvement areas"), /* @__PURE__ */ React.createElement("div", { className: "wb-field-grid" }, gamePlan.improvementAreas.map((value, index) => /* @__PURE__ */ React.createElement(
      TextField,
      {
        key: index,
        id: "wb-improvement-area-" + index,
        label: "Improvement area " + (index + 1),
        value,
        onChange: (nextValue) => setImprovement(index, nextValue),
        placeholder: "A specific position, skill, or decision",
        multiline: true
      }
    )))));
  }
  function WeeklyModule({ draft, entries, onDraftChange, onSave, onEdit, onDelete, onCancelEdit, onBack }) {
    const [formMessage, setFormMessage] = useState("");
    const completion = weeklyDraftCompletion(draft);
    function submit(event) {
      event.preventDefault();
      if (!draft.date) {
        setFormMessage("Choose a check-in date before saving.");
        return;
      }
      if (!draft.editingId && entries.length >= MINDSET_MAX_HISTORY_ENTRIES) {
        setFormMessage("This browser profile has reached 200 saved check-ins. Download a backup and delete an older entry before adding another.");
        return;
      }
      onSave();
      setFormMessage(draft.editingId ? "Check-in updated." : "Check-in added to your saved history.");
    }
    function setField(key, value) {
      onDraftChange({ ...draft, [key]: value });
    }
    return /* @__PURE__ */ React.createElement("section", { className: "wb-module wb-weekly", "aria-labelledby": "wb-weekly-title" }, /* @__PURE__ */ React.createElement(
      ModuleHeader,
      {
        headingId: "wb-weekly-title",
        title: "Weekly Check-In",
        eyebrow: "Repeat as often as useful",
        description: "Capture a quick snapshot, one action for the coming week, and why that action matters to you.",
        onBack
      }
    ), /* @__PURE__ */ React.createElement(ProgressMeter, { value: completion.complete, total: completion.total, label: "Current check-in fields completed" }), /* @__PURE__ */ React.createElement("form", { className: "wb-entry-form", onSubmit: submit }, /* @__PURE__ */ React.createElement("header", { className: "wb-entry-form-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, draft.editingId ? "Edit check-in" : "New check-in"), /* @__PURE__ */ React.createElement("p", null, "Ratings and all free-text responses are optional.")), draft.editingId && /* @__PURE__ */ React.createElement("span", { className: "wb-editing-badge" }, "Editing saved entry")), /* @__PURE__ */ React.createElement(TextField, { id: "wb-weekly-date", type: "date", label: "Check-in date", value: draft.date, onChange: (value) => setField("date", value), required: true }), /* @__PURE__ */ React.createElement("div", { className: "wb-rating-grid" }, /* @__PURE__ */ React.createElement(RatingField, { id: "wb-weekly-confidence", label: "Confidence", value: draft.confidence, onChange: (value) => setField("confidence", value) }), /* @__PURE__ */ React.createElement(RatingField, { id: "wb-weekly-energy", label: "Energy", value: draft.energy, onChange: (value) => setField("energy", value) }), /* @__PURE__ */ React.createElement(RatingField, { id: "wb-weekly-focus", label: "Focus", value: draft.focus, onChange: (value) => setField("focus", value) })), /* @__PURE__ */ React.createElement("div", { className: "wb-field-grid" }, /* @__PURE__ */ React.createElement(TextField, { id: "wb-weekly-win", label: "A win from this week", value: draft.win, onChange: (value) => setField("win", value), placeholder: "Something I want to recognize", multiline: true }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-weekly-challenge", label: "A challenge from this week", value: draft.challenge, onChange: (value) => setField("challenge", value), placeholder: "A situation or position I want to learn from", multiline: true }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-weekly-action", label: "My action for next week", value: draft.weeklyAction, onChange: (value) => setField("weeklyAction", value), placeholder: "One specific, controllable action", multiline: true }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-weekly-why", label: "Why this action matters", value: draft.why, onChange: (value) => setField("why", value), placeholder: "My reason for choosing it", multiline: true })), /* @__PURE__ */ React.createElement("div", { className: "wb-form-actions" }, /* @__PURE__ */ React.createElement("button", { className: "wb-primary-button", type: "submit" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 18, stroke: 2.4 }), draft.editingId ? "Update check-in" : "Save check-in"), draft.editingId && /* @__PURE__ */ React.createElement("button", { className: "wb-secondary-button", type: "button", onClick: onCancelEdit }, "Cancel edit")), /* @__PURE__ */ React.createElement("p", { className: "wb-form-message", role: "status", "aria-live": "polite" }, formMessage)), /* @__PURE__ */ React.createElement("section", { className: "wb-history", "aria-labelledby": "wb-weekly-history-title" }, /* @__PURE__ */ React.createElement("header", { className: "wb-history-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { id: "wb-weekly-history-title" }, "Check-in history"), /* @__PURE__ */ React.createElement("p", null, entries.length, " saved ", entries.length === 1 ? "entry" : "entries"))), !entries.length && /* @__PURE__ */ React.createElement("p", { className: "wb-empty-copy" }, "Your saved weekly check-ins will appear here."), /* @__PURE__ */ React.createElement("div", { className: "wb-history-list" }, entries.map((entry) => /* @__PURE__ */ React.createElement("article", { className: "wb-history-card", key: entry.id }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", null, displayDate(entry.date)), /* @__PURE__ */ React.createElement("p", null, "Confidence ", entry.confidence || "—", " · Energy ", entry.energy || "—", " · Focus ", entry.focus || "—"))), /* @__PURE__ */ React.createElement("dl", { className: "wb-history-details" }, nonEmpty(entry.win) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("dt", null, "Win"), /* @__PURE__ */ React.createElement("dd", null, entry.win)), nonEmpty(entry.challenge) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("dt", null, "Challenge"), /* @__PURE__ */ React.createElement("dd", null, entry.challenge)), nonEmpty(entry.weeklyAction) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("dt", null, "Next action"), /* @__PURE__ */ React.createElement("dd", null, entry.weeklyAction)), nonEmpty(entry.why) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("dt", null, "Why"), /* @__PURE__ */ React.createElement("dd", null, entry.why))), /* @__PURE__ */ React.createElement("div", { className: "wb-history-actions" }, /* @__PURE__ */ React.createElement("button", { className: "wb-secondary-button", type: "button", onClick: () => onEdit(entry) }, /* @__PURE__ */ React.createElement(Icon, { name: "edit", size: 17, stroke: 2 }), "Edit"), /* @__PURE__ */ React.createElement("button", { className: "wb-danger-button", type: "button", onClick: () => onDelete(entry.id) }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 17, stroke: 2 }), "Delete")))))));
  }
  function PreMatchModule({ reset, onChange, onBack }) {
    const completion = resetCompletion(reset);
    const readout = RESET_FIELDS.filter((field) => nonEmpty(reset[field.key]));
    function setField(key, value) {
      onChange({ ...reset, [key]: value });
    }
    return /* @__PURE__ */ React.createElement("section", { className: "wb-module wb-pre-match", "aria-labelledby": "wb-pre-match-title" }, /* @__PURE__ */ React.createElement(
      ModuleHeader,
      {
        headingId: "wb-pre-match-title",
        title: "Pre-Match Reset",
        eyebrow: "Build it once, read it quickly",
        description: "Save the exact routine you have prepared so you can scan it before competition. All free-text fields are optional.",
        onBack
      }
    ), /* @__PURE__ */ React.createElement(ProgressMeter, { value: completion.complete, total: completion.total, label: "Reset routine fields completed" }), /* @__PURE__ */ React.createElement("div", { className: "wb-split-layout" }, /* @__PURE__ */ React.createElement("section", { className: "wb-form-section", "aria-labelledby": "wb-reset-builder-title" }, /* @__PURE__ */ React.createElement("h3", { id: "wb-reset-builder-title" }, "Full routine"), /* @__PURE__ */ React.createElement("div", { className: "wb-field-grid" }, RESET_FIELDS.map((field) => /* @__PURE__ */ React.createElement(
      TextField,
      {
        key: field.key,
        id: "wb-reset-" + field.key,
        label: field.label,
        value: reset[field.key],
        onChange: (value) => setField(field.key, value),
        placeholder: field.placeholder,
        multiline: true,
        rows: field.key === "shotgunRoutine" ? 5 : 3
      }
    )))), /* @__PURE__ */ React.createElement("aside", { className: "wb-quick-readout", "aria-labelledby": "wb-readout-title" }, /* @__PURE__ */ React.createElement("p", { className: "wb-eyebrow" }, "Quick readout"), /* @__PURE__ */ React.createElement("h3", { id: "wb-readout-title" }, "My saved reset"), readout.length ? /* @__PURE__ */ React.createElement("ol", null, readout.map((field) => /* @__PURE__ */ React.createElement("li", { key: field.key }, /* @__PURE__ */ React.createElement("strong", null, field.label), /* @__PURE__ */ React.createElement("span", null, reset[field.key])))) : /* @__PURE__ */ React.createElement("p", { className: "wb-empty-copy" }, "Add parts of your routine to create a quick readout."))));
  }
  function postHistoryTitle(entry) {
    const parts = [entry.event, entry.opponent ? "vs. " + entry.opponent : ""].filter(nonEmpty);
    return parts.join(" · ") || "Post-match review";
  }
  function PostMatchModule({ draft, entries, onDraftChange, onSave, onEdit, onDelete, onCancelEdit, onBack }) {
    const [formMessage, setFormMessage] = useState("");
    const completion = postDraftCompletion(draft);
    function setField(key, value) {
      onDraftChange({ ...draft, [key]: value });
    }
    function setImprovement(index, value) {
      const improvements = draft.improvements.map((item, itemIndex) => itemIndex === index ? value : item);
      onDraftChange({ ...draft, improvements });
    }
    function toggleChecklist(key) {
      onDraftChange({ ...draft, checklist: { ...draft.checklist, [key]: !draft.checklist[key] } });
    }
    function submit(event) {
      event.preventDefault();
      if (!hasPostDraftContent(draft)) {
        setFormMessage("Add at least one checklist mark or response before saving this review.");
        return;
      }
      if (!draft.editingId && entries.length >= MINDSET_MAX_HISTORY_ENTRIES) {
        setFormMessage("This browser profile has reached 200 saved reviews. Download a backup and delete an older entry before adding another.");
        return;
      }
      onSave();
      setFormMessage(draft.editingId ? "Post-match review updated." : "Post-match review added to your saved history.");
    }
    return /* @__PURE__ */ React.createElement("section", { className: "wb-module wb-post-match", "aria-labelledby": "wb-post-match-title" }, /* @__PURE__ */ React.createElement(
      ModuleHeader,
      {
        headingId: "wb-post-match-title",
        title: "Post-Match Review",
        eyebrow: "Repeat after any match",
        description: "Record what happened, recognize useful actions, and choose a specific next step. Metadata and every free-text field are optional.",
        onBack
      }
    ), /* @__PURE__ */ React.createElement(ProgressMeter, { value: completion.complete, total: completion.total, label: "Current review items completed" }), /* @__PURE__ */ React.createElement("form", { className: "wb-entry-form", onSubmit: submit }, /* @__PURE__ */ React.createElement("header", { className: "wb-entry-form-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, draft.editingId ? "Edit review" : "New review"), /* @__PURE__ */ React.createElement("p", null, "Use only the parts that help you reflect.")), draft.editingId && /* @__PURE__ */ React.createElement("span", { className: "wb-editing-badge" }, "Editing saved entry")), /* @__PURE__ */ React.createElement("div", { className: "wb-field-grid wb-field-grid-four" }, /* @__PURE__ */ React.createElement(TextField, { id: "wb-post-event", label: "Event", value: draft.event, onChange: (value) => setField("event", value), placeholder: "Meet, dual, or tournament" }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-post-date", type: "date", label: "Date", value: draft.date, onChange: (value) => setField("date", value) }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-post-opponent", label: "Opponent", value: draft.opponent, onChange: (value) => setField("opponent", value), placeholder: "Name or school" }), /* @__PURE__ */ React.createElement(TextField, { id: "wb-post-result", label: "Result", value: draft.result, onChange: (value) => setField("result", value), placeholder: "Result or match note" })), /* @__PURE__ */ React.createElement("fieldset", { className: "wb-review-checklist" }, /* @__PURE__ */ React.createElement("legend", null, "Match checklist"), /* @__PURE__ */ React.createElement("p", null, "Check the actions you want to recognize from this match."), /* @__PURE__ */ React.createElement("div", { className: "wb-check-grid" }, POST_MATCH_CHECKLIST.map((item) => /* @__PURE__ */ React.createElement("label", { className: "wb-check-item", key: item[0] }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: draft.checklist[item[0]], onChange: () => toggleChecklist(item[0]) }), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 16, stroke: 2.5, "aria-hidden": "true" }), item[1]))))), /* @__PURE__ */ React.createElement(TextField, { id: "wb-post-reflection", label: "Reflection", value: draft.reflection, onChange: (value) => setField("reflection", value), placeholder: "What did I notice about my decisions, positions, and response?", multiline: true, rows: 5 }), /* @__PURE__ */ React.createElement("section", { className: "wb-form-section", "aria-labelledby": "wb-post-improvements-title" }, /* @__PURE__ */ React.createElement("h3", { id: "wb-post-improvements-title" }, "Three improvements"), /* @__PURE__ */ React.createElement("div", { className: "wb-field-grid" }, draft.improvements.map((value, index) => /* @__PURE__ */ React.createElement(TextField, { key: index, id: "wb-post-improvement-" + index, label: "Improvement " + (index + 1), value, onChange: (nextValue) => setImprovement(index, nextValue), placeholder: "A specific position, action, or decision", multiline: true })))), /* @__PURE__ */ React.createElement(TextField, { id: "wb-post-next-action", label: "Next action", value: draft.nextAction, onChange: (value) => setField("nextAction", value), placeholder: "The first specific action I will take in practice", multiline: true }), /* @__PURE__ */ React.createElement("div", { className: "wb-form-actions" }, /* @__PURE__ */ React.createElement("button", { className: "wb-primary-button", type: "submit" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 18, stroke: 2.4 }), draft.editingId ? "Update review" : "Save review"), draft.editingId && /* @__PURE__ */ React.createElement("button", { className: "wb-secondary-button", type: "button", onClick: onCancelEdit }, "Cancel edit")), /* @__PURE__ */ React.createElement("p", { className: "wb-form-message", role: "status", "aria-live": "polite" }, formMessage)), /* @__PURE__ */ React.createElement("section", { className: "wb-history", "aria-labelledby": "wb-post-history-title" }, /* @__PURE__ */ React.createElement("header", { className: "wb-history-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { id: "wb-post-history-title" }, "Post-match history"), /* @__PURE__ */ React.createElement("p", null, entries.length, " saved ", entries.length === 1 ? "review" : "reviews"))), !entries.length && /* @__PURE__ */ React.createElement("p", { className: "wb-empty-copy" }, "Your saved post-match reviews will appear here."), /* @__PURE__ */ React.createElement("div", { className: "wb-history-list" }, entries.map((entry) => {
      const checkedActions = POST_MATCH_CHECKLIST.filter((item) => entry.checklist[item[0]]);
      const checked = checkedActions.length;
      return /* @__PURE__ */ React.createElement("article", { className: "wb-history-card", key: entry.id }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", null, postHistoryTitle(entry)), /* @__PURE__ */ React.createElement("p", null, displayDate(entry.date), entry.result ? " · " + entry.result : "")), /* @__PURE__ */ React.createElement("span", null, checked, " checklist ", checked === 1 ? "item" : "items")), /* @__PURE__ */ React.createElement("dl", { className: "wb-history-details" }, checkedActions.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("dt", null, "Recognized"), /* @__PURE__ */ React.createElement("dd", null, /* @__PURE__ */ React.createElement("ul", null, checkedActions.map((item) => /* @__PURE__ */ React.createElement("li", { key: item[0] }, item[1]))))), nonEmpty(entry.reflection) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("dt", null, "Reflection"), /* @__PURE__ */ React.createElement("dd", null, entry.reflection)), entry.improvements.some(nonEmpty) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("dt", null, "Improvements"), /* @__PURE__ */ React.createElement("dd", null, /* @__PURE__ */ React.createElement("ol", null, entry.improvements.filter(nonEmpty).map((item, index) => /* @__PURE__ */ React.createElement("li", { key: index }, item))))), nonEmpty(entry.nextAction) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("dt", null, "Next action"), /* @__PURE__ */ React.createElement("dd", null, entry.nextAction))), /* @__PURE__ */ React.createElement("div", { className: "wb-history-actions" }, /* @__PURE__ */ React.createElement("button", { className: "wb-secondary-button", type: "button", onClick: () => onEdit(entry) }, /* @__PURE__ */ React.createElement(Icon, { name: "edit", size: 17, stroke: 2 }), "Edit"), /* @__PURE__ */ React.createElement("button", { className: "wb-danger-button", type: "button", onClick: () => onDelete(entry.id) }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 17, stroke: 2 }), "Delete")));
    }))));
  }
  function readBackupFile(file) {
    if (file && typeof file.text === "function") return file.text();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("The file could not be read."));
      reader.readAsText(file);
    });
  }
  function MindsetWorkbook() {
    const [loaded] = useState(loadMindsetWorkbook);
    const [workbook, setWorkbook] = useState(loaded.data);
    const [activeModule, setActiveModule] = useState(null);
    const [saveStatus, setSaveStatus] = useState({
      kind: loaded.error ? "error" : "saved",
      message: loaded.error || "Workbook ready in this browser profile."
    });
    const [notice, setNotice] = useState("");
    const [canUndoRestore, setCanUndoRestore] = useState(() => {
      try {
        return !!window.localStorage.getItem(MINDSET_RESTORE_RECOVERY_KEY);
      } catch (error) {
        return false;
      }
    });
    const restoreInputRef = useRef(null);
    const skipInitialSaveRef = useRef(true);
    const skipNextSaveRef = useRef(false);
    const dirtyRef = useRef(false);
    const writeBlockedRef = useRef(!!loaded.error);
    const lastStoredRawRef = useRef(loaded.raw);
    const workbookRef = useRef(workbook);
    workbookRef.current = workbook;
    function persistWorkbook(value, reportStatus, force) {
      try {
        if (writeBlockedRef.current && !force) {
          if (reportStatus) setSaveStatus({ kind: "error", message: "Saving is paused because the stored workbook could not be loaded. Download it, then restore a valid backup or clear the workbook." });
          return false;
        }
        const currentRaw = window.localStorage.getItem(MINDSET_STORAGE_KEY);
        if (!force && dirtyRef.current && currentRaw !== lastStoredRawRef.current) {
          if (reportStatus) setSaveStatus({ kind: "error", message: "Another tab changed this workbook. Download your current responses before reloading so neither copy is lost." });
          return false;
        }
        const payload = { ...value, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        const serialized = JSON.stringify(payload);
        window.localStorage.setItem(MINDSET_STORAGE_KEY, serialized);
        lastStoredRawRef.current = serialized;
        writeBlockedRef.current = false;
        dirtyRef.current = false;
        if (reportStatus) setSaveStatus({ kind: "saved", message: "Saved in this browser profile." });
        return true;
      } catch (error) {
        if (reportStatus) {
          setSaveStatus({
            kind: "error",
            message: "Could not save on this device. Your current page remains available, but download a backup before leaving."
          });
        }
        return false;
      }
    }
    useEffect(() => {
      if (skipInitialSaveRef.current) {
        skipInitialSaveRef.current = false;
        return void 0;
      }
      if (skipNextSaveRef.current) {
        skipNextSaveRef.current = false;
        return void 0;
      }
      setSaveStatus({ kind: "saving", message: "Saving in this browser profile…" });
      const timer = window.setTimeout(() => {
        persistWorkbook(workbook, true);
      }, 350);
      return () => window.clearTimeout(timer);
    }, [workbook]);
    useEffect(() => {
      function flushLatestWorkbook() {
        if (!skipInitialSaveRef.current && dirtyRef.current) persistWorkbook(workbookRef.current, false);
      }
      function flushWhenHidden() {
        if (document.visibilityState === "hidden") flushLatestWorkbook();
      }
      window.addEventListener("pagehide", flushLatestWorkbook);
      document.addEventListener("visibilitychange", flushWhenHidden);
      return () => {
        window.removeEventListener("pagehide", flushLatestWorkbook);
        document.removeEventListener("visibilitychange", flushWhenHidden);
        flushLatestWorkbook();
      };
    }, []);
    useEffect(() => {
      function syncWorkbookFromAnotherTab(event) {
        if (event.key !== MINDSET_STORAGE_KEY) return;
        if (dirtyRef.current) {
          setSaveStatus({ kind: "error", message: "Another tab changed this workbook while you were editing. Download your current responses before reloading." });
          return;
        }
        if (!event.newValue) {
          lastStoredRawRef.current = null;
          writeBlockedRef.current = false;
          skipNextSaveRef.current = true;
          setWorkbook(makeEmptyMindsetWorkbook());
          setSaveStatus({ kind: "saved", message: "Workbook was cleared in another tab." });
          return;
        }
        try {
          const parsed = JSON.parse(event.newValue);
          const validationError = validateMindsetWorkbook(parsed);
          if (validationError) throw new Error(validationError);
          lastStoredRawRef.current = event.newValue;
          writeBlockedRef.current = false;
          skipNextSaveRef.current = true;
          setWorkbook(normalizeMindsetWorkbook(parsed));
          setSaveStatus({ kind: "saved", message: "Updated from another tab." });
        } catch (error) {
          lastStoredRawRef.current = event.newValue;
          writeBlockedRef.current = true;
          setSaveStatus({ kind: "error", message: "Another tab stored a workbook this version cannot load. Your current view was not replaced." });
        }
      }
      window.addEventListener("storage", syncWorkbookFromAnotherTab);
      return () => window.removeEventListener("storage", syncWorkbookFromAnotherTab);
    }, []);
    const stats = useMemo(() => baselineStats(workbook.baseline), [workbook.baseline]);
    const baselineAnswered = stats.reduce((total, item) => total + item.answered, 0);
    const baselinePriorities = stats.filter((item) => item.reflectionCount > 0).slice().sort((a, b) => b.reflectionCount - a.reflectionCount || b.unsure - a.unsure);
    const planCompletion = gamePlanCompletion(workbook.gamePlan);
    const resetProgress = resetCompletion(workbook.preMatchReset);
    const weeklyProgress = weeklyDraftCompletion(workbook.weeklyDraft);
    const postProgress = postDraftCompletion(workbook.postMatchDraft);
    function updateWorkbook(value) {
      dirtyRef.current = true;
      setWorkbook(value);
    }
    function setSection(key, value) {
      updateWorkbook((current) => ({ ...current, [key]: value }));
    }
    function scrollWorkbookToTop(focusId) {
      window.requestAnimationFrame(() => {
        const content = document.querySelector(".content--workbook");
        if (content) content.scrollTo({ top: 0, behavior: "smooth" });
        const target = focusId ? document.getElementById(focusId) : null;
        if (target) target.focus({ preventScroll: true });
      });
    }
    function focusWorkbookControl(id) {
      window.requestAnimationFrame(() => {
        const control = document.getElementById(id);
        if (!control) return;
        control.scrollIntoView({ block: "center", behavior: "smooth" });
        control.focus({ preventScroll: true });
      });
    }
    function openModule(module) {
      setActiveModule(module);
      const headingIds = { baseline: "wb-baseline-title", "game-plan": "wb-game-plan-title", weekly: "wb-weekly-title", "pre-match": "wb-pre-match-title", "post-match": "wb-post-match-title" };
      scrollWorkbookToTop(headingIds[module]);
    }
    function closeModule() {
      setActiveModule(null);
      scrollWorkbookToTop("wb-dashboard-title");
    }
    function saveWeeklyCheckIn() {
      updateWorkbook((current) => {
        const draft = current.weeklyDraft;
        const wasEditing = !!draft.editingId;
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const existing = draft.editingId ? current.weeklyCheckIns.find((entry2) => entry2.id === draft.editingId) : null;
        const entry = {
          id: existing ? existing.id : makeMindsetId("weekly"),
          date: draft.date,
          confidence: draft.confidence,
          energy: draft.energy,
          focus: draft.focus,
          win: draft.win,
          challenge: draft.challenge,
          weeklyAction: draft.weeklyAction,
          why: draft.why,
          createdAt: existing ? existing.createdAt : now,
          updatedAt: now
        };
        const weeklyCheckIns = existing ? current.weeklyCheckIns.map((item) => item.id === existing.id ? entry : item) : [entry].concat(current.weeklyCheckIns).slice(0, MINDSET_MAX_HISTORY_ENTRIES);
        return {
          ...current,
          weeklyCheckIns,
          weeklyDraft: wasEditing && current.suspendedWeeklyDraft ? copyWeeklyDraft(current.suspendedWeeklyDraft) : makeWeeklyDraft(),
          suspendedWeeklyDraft: null
        };
      });
    }
    function editWeeklyCheckIn(entry) {
      updateWorkbook((current) => ({
        ...current,
        suspendedWeeklyDraft: current.weeklyDraft.editingId ? current.suspendedWeeklyDraft : copyWeeklyDraft({ ...current.weeklyDraft, editingId: null }),
        weeklyDraft: {
          editingId: entry.id,
          date: entry.date,
          confidence: entry.confidence,
          energy: entry.energy,
          focus: entry.focus,
          win: entry.win,
          challenge: entry.challenge,
          weeklyAction: entry.weeklyAction,
          why: entry.why
        }
      }));
      focusWorkbookControl("wb-weekly-date");
    }
    function cancelWeeklyEdit() {
      updateWorkbook((current) => ({
        ...current,
        weeklyDraft: current.suspendedWeeklyDraft ? copyWeeklyDraft(current.suspendedWeeklyDraft) : makeWeeklyDraft(),
        suspendedWeeklyDraft: null
      }));
    }
    function deleteWeeklyCheckIn(id) {
      if (!window.confirm("Delete this weekly check-in? This cannot be undone.")) return;
      updateWorkbook((current) => {
        const deletingEditedEntry = current.weeklyDraft.editingId === id;
        return {
          ...current,
          weeklyCheckIns: current.weeklyCheckIns.filter((entry) => entry.id !== id),
          weeklyDraft: deletingEditedEntry ? current.suspendedWeeklyDraft ? copyWeeklyDraft(current.suspendedWeeklyDraft) : makeWeeklyDraft() : current.weeklyDraft,
          suspendedWeeklyDraft: deletingEditedEntry ? null : current.suspendedWeeklyDraft
        };
      });
      setNotice("Weekly check-in deleted.");
    }
    function savePostMatchReview() {
      updateWorkbook((current) => {
        const draft = current.postMatchDraft;
        const wasEditing = !!draft.editingId;
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const existing = draft.editingId ? current.postMatchReviews.find((entry2) => entry2.id === draft.editingId) : null;
        const entry = {
          id: existing ? existing.id : makeMindsetId("post"),
          event: draft.event,
          date: draft.date,
          opponent: draft.opponent,
          result: draft.result,
          checklist: { ...draft.checklist },
          reflection: draft.reflection,
          improvements: draft.improvements.slice(0, 3),
          nextAction: draft.nextAction,
          createdAt: existing ? existing.createdAt : now,
          updatedAt: now
        };
        const postMatchReviews = existing ? current.postMatchReviews.map((item) => item.id === existing.id ? entry : item) : [entry].concat(current.postMatchReviews).slice(0, MINDSET_MAX_HISTORY_ENTRIES);
        return {
          ...current,
          postMatchReviews,
          postMatchDraft: wasEditing && current.suspendedPostMatchDraft ? copyPostMatchDraft(current.suspendedPostMatchDraft) : makePostMatchDraft(),
          suspendedPostMatchDraft: null
        };
      });
    }
    function editPostMatchReview(entry) {
      updateWorkbook((current) => ({
        ...current,
        suspendedPostMatchDraft: current.postMatchDraft.editingId ? current.suspendedPostMatchDraft : copyPostMatchDraft({ ...current.postMatchDraft, editingId: null }),
        postMatchDraft: copyPostMatchDraft({ ...entry, editingId: entry.id })
      }));
      focusWorkbookControl("wb-post-event");
    }
    function cancelPostMatchEdit() {
      updateWorkbook((current) => ({
        ...current,
        postMatchDraft: current.suspendedPostMatchDraft ? copyPostMatchDraft(current.suspendedPostMatchDraft) : makePostMatchDraft(),
        suspendedPostMatchDraft: null
      }));
    }
    function deletePostMatchReview(id) {
      if (!window.confirm("Delete this post-match review? This cannot be undone.")) return;
      updateWorkbook((current) => {
        const deletingEditedEntry = current.postMatchDraft.editingId === id;
        return {
          ...current,
          postMatchReviews: current.postMatchReviews.filter((entry) => entry.id !== id),
          postMatchDraft: deletingEditedEntry ? current.suspendedPostMatchDraft ? copyPostMatchDraft(current.suspendedPostMatchDraft) : makePostMatchDraft() : current.postMatchDraft,
          suspendedPostMatchDraft: deletingEditedEntry ? null : current.suspendedPostMatchDraft
        };
      });
      setNotice("Post-match review deleted.");
    }
    function downloadJsonFile(text, suffix) {
      const blob = new Blob([text], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "badgers-mindset-workbook-" + suffix + "-" + localDateValue() + ".json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
    }
    function downloadBackup() {
      try {
        const payload = { ...workbook, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        downloadJsonFile(JSON.stringify(payload, null, 2), "backup");
        setNotice("Workbook backup downloaded.");
      } catch (error) {
        setNotice("The backup could not be downloaded in this browser.");
      }
    }
    function downloadStoredRecoveryCopy() {
      try {
        if (!lastStoredRawRef.current) throw new Error("No stored copy is available.");
        downloadJsonFile(lastStoredRawRef.current, "stored-recovery-copy");
        setNotice("The unreadable stored copy was downloaded without changing it.");
      } catch (error) {
        setNotice(error && error.message ? error.message : "The stored copy could not be downloaded.");
      }
    }
    async function restoreBackup(event) {
      const input = event.target;
      const file = input.files && input.files[0];
      if (!file) return;
      setNotice("");
      if (file.size > MINDSET_MAX_BACKUP_BYTES) {
        setNotice("Restore stopped: choose a JSON backup smaller than 4 MB.");
        input.value = "";
        return;
      }
      try {
        const text = await readBackupFile(file);
        if (new Blob([text]).size > MINDSET_MAX_BACKUP_BYTES) throw new Error("The decoded file is larger than 4 MB.");
        const parsed = JSON.parse(text);
        const validationError = validateMindsetWorkbook(parsed);
        if (validationError) throw new Error(validationError);
        if (!window.confirm("Restore this backup? It will replace the workbook currently saved in this browser profile. You can undo the most recent restore from the data tools below.")) return;
        const normalized = normalizeMindsetWorkbook(parsed);
        const previousRaw = window.localStorage.getItem(MINDSET_STORAGE_KEY);
        if (previousRaw) window.localStorage.setItem(MINDSET_RESTORE_RECOVERY_KEY, previousRaw);
        else window.localStorage.removeItem(MINDSET_RESTORE_RECOVERY_KEY);
        if (!persistWorkbook(normalized, false, true)) throw new Error("The restored workbook could not be saved in this browser profile.");
        skipNextSaveRef.current = true;
        dirtyRef.current = false;
        setWorkbook(normalized);
        setActiveModule(null);
        setCanUndoRestore(!!previousRaw);
        setSaveStatus({ kind: "saved", message: "Restored backup saved in this browser profile." });
        setNotice("Backup restored and saved. Your previous stored copy is available through Undo last restore.");
      } catch (error) {
        setNotice("Restore stopped: " + (error && error.message ? error.message : "the backup is not valid JSON."));
      } finally {
        input.value = "";
      }
    }
    function undoLastRestore() {
      if (!window.confirm("Undo the most recent restore and return to the workbook that was saved before it?")) return;
      try {
        const previousRaw = window.localStorage.getItem(MINDSET_RESTORE_RECOVERY_KEY);
        if (!previousRaw) throw new Error("No previous stored workbook is available.");
        window.localStorage.setItem(MINDSET_STORAGE_KEY, previousRaw);
        window.localStorage.removeItem(MINDSET_RESTORE_RECOVERY_KEY);
        window.location.reload();
      } catch (error) {
        setNotice("Undo failed: " + (error && error.message ? error.message : "the previous workbook could not be restored."));
      }
    }
    function clearAll() {
      if (!window.confirm("Clear every Mindset Workbook response and history entry in this browser profile? This cannot be undone unless you downloaded a backup.")) return;
      let currentRaw = null;
      let recoveryRaw = null;
      try {
        currentRaw = window.localStorage.getItem(MINDSET_STORAGE_KEY);
        recoveryRaw = window.localStorage.getItem(MINDSET_RESTORE_RECOVERY_KEY);
        window.localStorage.removeItem(MINDSET_STORAGE_KEY);
        window.localStorage.removeItem(MINDSET_RESTORE_RECOVERY_KEY);
        if (window.localStorage.getItem(MINDSET_STORAGE_KEY) || window.localStorage.getItem(MINDSET_RESTORE_RECOVERY_KEY)) {
          throw new Error("Browser storage still contains workbook data.");
        }
      } catch (error) {
        try {
          if (currentRaw) window.localStorage.setItem(MINDSET_STORAGE_KEY, currentRaw);
          if (recoveryRaw) window.localStorage.setItem(MINDSET_RESTORE_RECOVERY_KEY, recoveryRaw);
        } catch (rollbackError) {
        }
        setSaveStatus({ kind: "error", message: "The browser would not clear the stored workbook." });
        setNotice("Clear failed. Reload before making more changes, and download a backup if the workbook reappears.");
        return;
      }
      lastStoredRawRef.current = null;
      writeBlockedRef.current = false;
      dirtyRef.current = false;
      skipNextSaveRef.current = true;
      setWorkbook(makeEmptyMindsetWorkbook());
      setActiveModule(null);
      setCanUndoRestore(false);
      setSaveStatus({ kind: "saved", message: "Workbook cleared from this browser profile." });
      setNotice("All workbook responses and history were cleared from this browser profile.");
    }
    const latestWeekly = workbook.weeklyCheckIns[0];
    const latestPost = workbook.postMatchReviews[0];
    const firstTakedown = workbook.gamePlan.takedowns.find((item) => nonEmpty(item.shot));
    const resetReadoutCount = resetProgress.complete;
    let activeContent = null;
    if (activeModule === "baseline") activeContent = /* @__PURE__ */ React.createElement(BaselineModule, { baseline: workbook.baseline, onChange: (value) => setSection("baseline", value), onBack: closeModule });
    if (activeModule === "game-plan") activeContent = /* @__PURE__ */ React.createElement(GamePlanModule, { gamePlan: workbook.gamePlan, onChange: (value) => setSection("gamePlan", value), onBack: closeModule });
    if (activeModule === "weekly") activeContent = /* @__PURE__ */ React.createElement(WeeklyModule, { draft: workbook.weeklyDraft, entries: workbook.weeklyCheckIns, onDraftChange: (value) => setSection("weeklyDraft", value), onSave: saveWeeklyCheckIn, onEdit: editWeeklyCheckIn, onDelete: deleteWeeklyCheckIn, onCancelEdit: cancelWeeklyEdit, onBack: closeModule });
    if (activeModule === "pre-match") activeContent = /* @__PURE__ */ React.createElement(PreMatchModule, { reset: workbook.preMatchReset, onChange: (value) => setSection("preMatchReset", value), onBack: closeModule });
    if (activeModule === "post-match") activeContent = /* @__PURE__ */ React.createElement(PostMatchModule, { draft: workbook.postMatchDraft, entries: workbook.postMatchReviews, onDraftChange: (value) => setSection("postMatchDraft", value), onSave: savePostMatchReview, onEdit: editPostMatchReview, onDelete: deletePostMatchReview, onCancelEdit: cancelPostMatchEdit, onBack: closeModule });
    return /* @__PURE__ */ React.createElement("div", { className: "wb-workbook" }, /* @__PURE__ */ React.createElement("header", { className: "wb-workbook-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "wb-eyebrow" }, "Device-local athlete workspace"), /* @__PURE__ */ React.createElement("h1", null, "Mindset Workbook"), /* @__PURE__ */ React.createElement("p", null, "Build a game plan, reflect on your week and matches, and keep a routine you can revisit.")), /* @__PURE__ */ React.createElement("div", { className: "wb-save-status wb-save-status-" + saveStatus.kind, role: "status", "aria-live": "polite", "aria-atomic": "true" }, /* @__PURE__ */ React.createElement(Icon, { name: saveStatus.kind === "error" ? "close" : "check", size: 17, stroke: 2.3 }), /* @__PURE__ */ React.createElement("span", null, saveStatus.message))), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "wb-workbook-main",
        "data-active-module": activeModule || "dashboard",
        "data-mindset-active-module": activeModule || "dashboard",
        "data-testid": "mindset-active-module-" + (activeModule || "dashboard")
      },
      activeContent || /* @__PURE__ */ React.createElement("section", { className: "wb-dashboard", "aria-labelledby": "wb-dashboard-title" }, /* @__PURE__ */ React.createElement("header", { className: "wb-dashboard-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "wb-eyebrow" }, "Your local workbook"), /* @__PURE__ */ React.createElement("h2", { id: "wb-dashboard-title", tabIndex: "-1" }, "Choose a module")), /* @__PURE__ */ React.createElement("p", null, "Responses are not published, but anyone using this same browser profile can view them.")), /* @__PURE__ */ React.createElement("div", { className: "wb-module-grid" }, /* @__PURE__ */ React.createElement(
        DashboardCard,
        {
          module: "baseline",
          title: "Mindset Baseline",
          description: "24 prompts across eight reflection areas.",
          summary: baselinePriorities.length ? "Current reflection priority: " + baselinePriorities[0].label + "." : "Answer prompts to surface personal reflection priorities.",
          progress: baselineAnswered,
          progressTotal: BASELINE_QUESTION_IDS.length,
          buttonLabel: baselineAnswered ? "Resume baseline" : "Start baseline",
          onOpen: () => openModule("baseline")
        }
      ), /* @__PURE__ */ React.createElement(
        DashboardCard,
        {
          module: "game-plan",
          title: "My Wrestling Game Plan",
          description: "Takedowns, ties, counters, mat wrestling, and improvement areas.",
          summary: firstTakedown ? "First listed attack: " + firstTakedown.shot + "." : "Build a clear first-choice plan for your key positions.",
          progress: planCompletion.complete,
          progressTotal: planCompletion.total,
          buttonLabel: planCompletion.complete ? "Resume game plan" : "Start game plan",
          onOpen: () => openModule("game-plan")
        }
      ), /* @__PURE__ */ React.createElement(
        DashboardCard,
        {
          module: "weekly",
          title: "Weekly Check-In",
          description: "Ratings, a win, a challenge, and one next action.",
          summary: latestWeekly ? "Latest saved check-in: " + displayDate(latestWeekly.date) + "." : "Create your first weekly snapshot.",
          history: workbook.weeklyCheckIns.length + " saved " + (workbook.weeklyCheckIns.length === 1 ? "check-in" : "check-ins"),
          progress: weeklyProgress.complete,
          progressTotal: weeklyProgress.total,
          buttonLabel: hasWeeklyDraftContent(workbook.weeklyDraft) ? "Resume check-in" : workbook.weeklyCheckIns.length ? "Add check-in" : "Start check-in",
          onOpen: () => openModule("weekly")
        }
      ), /* @__PURE__ */ React.createElement(
        DashboardCard,
        {
          module: "pre-match",
          title: "Pre-Match Reset",
          description: "Your full saved routine and a fast readout.",
          summary: resetReadoutCount ? resetReadoutCount + " routine " + (resetReadoutCount === 1 ? "step is" : "steps are") + " ready to scan." : "Build a familiar routine you can scan before a match.",
          progress: resetProgress.complete,
          progressTotal: resetProgress.total,
          buttonLabel: resetProgress.complete ? "Resume routine" : "Build routine",
          onOpen: () => openModule("pre-match")
        }
      ), /* @__PURE__ */ React.createElement(
        DashboardCard,
        {
          module: "post-match",
          title: "Post-Match Review",
          description: "Action checklist, reflection, improvements, and next action.",
          summary: latestPost ? "Latest saved review: " + postHistoryTitle(latestPost) + "." : "Create your first personal match review.",
          history: workbook.postMatchReviews.length + " saved " + (workbook.postMatchReviews.length === 1 ? "review" : "reviews"),
          progress: postProgress.complete,
          progressTotal: postProgress.total,
          buttonLabel: hasPostDraftContent(workbook.postMatchDraft) ? "Resume review" : workbook.postMatchReviews.length ? "Add review" : "Start review",
          onOpen: () => openModule("post-match")
        }
      )))
    ), /* @__PURE__ */ React.createElement("footer", { className: "wb-workbook-footer" }, /* @__PURE__ */ React.createElement("section", { className: "wb-privacy-notice", "aria-labelledby": "wb-privacy-title" }, /* @__PURE__ */ React.createElement(Icon, { name: "brain", size: 21, stroke: 2 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { id: "wb-privacy-title" }, "Local to this browser profile"), /* @__PURE__ */ React.createElement("p", null, "Your responses are never added to ", /* @__PURE__ */ React.createElement("code", null, "window.WKB"), ", knowledge-base entries, or published content. Anyone using this same browser profile can view them. Use a personal browser profile on shared devices, and download a backup before clearing browser storage."))), /* @__PURE__ */ React.createElement("section", { className: "wb-data-tools", "aria-labelledby": "wb-data-tools-title" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { id: "wb-data-tools-title" }, "Backup and browser data"), /* @__PURE__ */ React.createElement("p", null, "Backups contain your personal responses. Keep the JSON file somewhere you trust.")), /* @__PURE__ */ React.createElement("div", { className: "wb-data-tool-actions" }, /* @__PURE__ */ React.createElement("button", { className: "wb-secondary-button", type: "button", onClick: downloadBackup }, /* @__PURE__ */ React.createElement(Icon, { name: "download", size: 18, stroke: 2.2 }), "Download JSON backup"), writeBlockedRef.current && lastStoredRawRef.current && /* @__PURE__ */ React.createElement("button", { className: "wb-secondary-button", type: "button", onClick: downloadStoredRecoveryCopy }, /* @__PURE__ */ React.createElement(Icon, { name: "download", size: 18, stroke: 2.2 }), "Download unreadable stored copy"), /* @__PURE__ */ React.createElement("button", { className: "wb-secondary-button", type: "button", onClick: () => restoreInputRef.current && restoreInputRef.current.click() }, /* @__PURE__ */ React.createElement(Icon, { name: "file", size: 18, stroke: 2.1 }), "Restore backup"), canUndoRestore && /* @__PURE__ */ React.createElement("button", { className: "wb-secondary-button", type: "button", onClick: undoLastRestore }, /* @__PURE__ */ React.createElement(Icon, { name: "back", size: 18, stroke: 2.1 }), "Undo last restore"), /* @__PURE__ */ React.createElement("input", { ref: restoreInputRef, className: "wb-visually-hidden", type: "file", accept: "application/json,.json", onChange: restoreBackup, "aria-label": "Choose a Mindset Workbook JSON backup to restore", tabIndex: "-1" }), /* @__PURE__ */ React.createElement("button", { className: "wb-danger-button", type: "button", onClick: clearAll }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 18, stroke: 2.1 }), "Clear all workbook data")), /* @__PURE__ */ React.createElement("p", { className: "wb-data-notice", role: "status", "aria-live": "polite", "aria-atomic": "true" }, notice))));
  }
  Object.assign(window, { MindsetWorkbook });
})();

/* ====== app.jsx ====== */
(() => {
  const { useState, useMemo, useEffect } = React;
  const LS = {
    saved: "wkb_saved",
    learned: "wkb_learned",
    user: "wkb_user",
    edits: "wkb_edits",
    deleted: "wkb_deleted",
    entryOrder: "wkb_entryOrder",
    catOrder: "wkb_catOrder"
  };
  function loadSet(key) {
    try {
      return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch (e) {
      return /* @__PURE__ */ new Set();
    }
  }
  function saveSet(key, set) {
    localStorage.setItem(key, JSON.stringify([...set]));
  }
  function loadArr(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch (e) {
      return [];
    }
  }
  function loadObj(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch (e) {
      return {};
    }
  }
  function applyOrder(items, order) {
    if (!order || !order.length) return items;
    const pos = new Map(order.map((id, i) => [id, i]));
    return items.map((it, i) => [it, i]).sort((a, b) => {
      const pa = pos.has(a[0].id) ? pos.get(a[0].id) : Infinity;
      const pb = pos.has(b[0].id) ? pos.get(b[0].id) : Infinity;
      return pa - pb || a[1] - b[1];
    }).map((x) => x[0]);
  }
  function moveId(order, fullIds, dragId, overId) {
    const base = order && order.length ? order.filter((id) => fullIds.includes(id)) : [...fullIds];
    for (const id of fullIds) if (!base.includes(id)) base.push(id);
    const from = base.indexOf(dragId), to = base.indexOf(overId);
    if (from < 0 || to < 0 || from === to) return base;
    base.splice(to, 0, base.splice(from, 1)[0]);
    return base;
  }
  function accentForeground(value) {
    const match = typeof value === "string" && value.trim().match(/^#([0-9a-f]{6})$/i);
    if (!match) return "#fff";
    const channels = match[1].match(/.{2}/g).map((part) => parseInt(part, 16) / 255);
    const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    const luminance = 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
    const whiteContrast = 1.05 / (luminance + 0.05);
    const blackContrast = (luminance + 0.05) / 0.05;
    return whiteContrast >= blackContrast ? "#fff" : "#000";
  }
  const DIRECTIONS = {
    "Black & Cardinal": { theme: "dark", accent: "#C5050C" },
    "White Court": { theme: "light", accent: "#C5050C" },
    "Locker Room": { theme: "ink", accent: "#C5050C" }
  };
  const TWEAK_DEFAULTS = (
    /*EDITMODE-BEGIN*/
    {
      "direction": "Black & Cardinal",
      "accent": "#C5050C",
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
    }
  );
  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const { CATEGORIES, ENTRIES, GATE, VERSION } = window.WKB;
    const athleteGateOn = !!(GATE && GATE.athlete);
    const coachAccessOn = !!(GATE && GATE.coach);
    const [role, setRole] = useState(() => {
      const stored = sessionStorage.getItem("wkb_role");
      if (stored === "coach" && coachAccessOn) return "coach";
      if (athleteGateOn) return stored === "athlete" ? "athlete" : null;
      return "athlete";
    });
    const [showCoachLogin, setShowCoachLogin] = useState(false);
    const coachMode = role === "coach";
    const canEdit = coachMode;
    function unlock(code) {
      if (GATE.coach && code === GATE.coach) {
        setRole("coach");
        sessionStorage.setItem("wkb_role", "coach");
        return true;
      }
      if (GATE.athlete && code === GATE.athlete) {
        setRole("athlete");
        sessionStorage.setItem("wkb_role", "athlete");
        return true;
      }
      return false;
    }
    function unlockCoach(code) {
      if (!GATE.coach || code !== GATE.coach) return false;
      setRole("coach");
      setShowCoachLogin(false);
      sessionStorage.setItem("wkb_role", "coach");
      return true;
    }
    function signOut() {
      sessionStorage.removeItem("wkb_role");
      setShowCoachLogin(false);
      setRole(athleteGateOn ? null : "athlete");
    }
    const [query, setQuery] = useState("");
    const [view, setView] = useState("all");
    const [openId, setOpenId] = useState(() => {
      const m = window.location.hash.match(/^#e=(.+)$/);
      return m ? decodeURIComponent(m[1]) : null;
    });
    const [showAdd, setShowAdd] = useState(false);
    const [editEntry, setEditEntry] = useState(null);
    const [navOpen, setNavOpen] = useState(false);
    const [mobileNavMode, setMobileNavMode] = useState(() => typeof window.matchMedia === "function" && window.matchMedia("(max-width: 920px)").matches);
    const sideRef = React.useRef(null);
    const mainRef = React.useRef(null);
    const hamburgerRef = React.useRef(null);
    const navCloseRef = React.useRef(null);
    const navWasOpenRef = React.useRef(false);
    function closeMobileNav() {
      if (mobileNavMode) {
        if (mainRef.current) mainRef.current.inert = false;
        if (hamburgerRef.current) hamburgerRef.current.focus({ preventScroll: true });
      }
      setNavOpen(false);
    }
    const [saved, setSaved] = useState(() => loadSet(LS.saved));
    const [learned, setLearned] = useState(() => loadSet(LS.learned));
    const [userEntries, setUserEntries] = useState(() => loadArr(LS.user));
    const [edits, setEdits] = useState(() => loadObj(LS.edits));
    const [deleted, setDeleted] = useState(() => loadSet(LS.deleted));
    const [entryOrder, setEntryOrder] = useState(() => loadArr(LS.entryOrder));
    const [catOrder, setCatOrder] = useState(() => loadArr(LS.catOrder));
    const [dragId, setDragId] = useState(null);
    const [navDragId, setNavDragId] = useState(null);
    useEffect(() => saveSet(LS.saved, saved), [saved]);
    useEffect(() => saveSet(LS.learned, learned), [learned]);
    useEffect(() => localStorage.setItem(LS.user, JSON.stringify(userEntries)), [userEntries]);
    useEffect(() => localStorage.setItem(LS.edits, JSON.stringify(edits)), [edits]);
    useEffect(() => saveSet(LS.deleted, deleted), [deleted]);
    useEffect(() => localStorage.setItem(LS.entryOrder, JSON.stringify(entryOrder)), [entryOrder]);
    useEffect(() => localStorage.setItem(LS.catOrder, JSON.stringify(catOrder)), [catOrder]);
    useEffect(() => {
      try {
        const base = window.location.pathname + window.location.search;
        history.replaceState(null, "", openId ? base + "#e=" + encodeURIComponent(openId) : base);
      } catch (e) {
      }
    }, [openId]);
    useEffect(() => {
      function onKey(e) {
        if (e.key !== "Escape") return;
        if (showAdd) setShowAdd(false);
        else if (editEntry) setEditEntry(null);
        else if (openId) setOpenId(null);
        else if (navOpen) closeMobileNav();
      }
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [showAdd, editEntry, openId, navOpen]);
    useEffect(() => {
      if (typeof window.matchMedia !== "function") return void 0;
      const query2 = window.matchMedia("(max-width: 920px)");
      const update = () => setMobileNavMode(query2.matches);
      update();
      if (typeof query2.addEventListener === "function") query2.addEventListener("change", update);
      else query2.addListener(update);
      return () => {
        if (typeof query2.removeEventListener === "function") query2.removeEventListener("change", update);
        else query2.removeListener(update);
      };
    }, []);
    useEffect(() => {
      if (sideRef.current) sideRef.current.inert = mobileNavMode && !navOpen;
      if (mainRef.current) mainRef.current.inert = mobileNavMode && navOpen;
      if (mobileNavMode && navOpen) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            const target = navCloseRef.current || sideRef.current;
            if (target) target.focus();
          });
        });
      } else if (mobileNavMode && navWasOpenRef.current) {
        window.requestAnimationFrame(() => hamburgerRef.current && hamburgerRef.current.focus());
      }
      navWasOpenRef.current = navOpen;
    }, [mobileNavMode, navOpen]);
    useEffect(() => {
      const r = document.documentElement;
      r.setAttribute("data-theme", t.theme);
      r.setAttribute("data-density", t.density);
      r.style.setProperty("--accent", t.accent);
      r.style.setProperty("--accent-ink", accentForeground(t.accent));
      r.style.setProperty("--card-radius", t.cardRadius + "px");
      r.style.setProperty("--card-rest-shadow", t.cardShadow ? "var(--shadow)" : "none");
      r.style.setProperty("--detail-width", `min(${t.detailWidth}px, 100%)`);
    }, [t.theme, t.density, t.accent, t.cardRadius, t.cardShadow, t.detailWidth]);
    const allEntries = useMemo(() => {
      const base = [...userEntries, ...ENTRIES];
      const seen = /* @__PURE__ */ new Set();
      return base.filter((e) => {
        if (seen.has(e.id)) return false;
        seen.add(e.id);
        return true;
      }).filter((e) => !deleted.has(e.id)).map((e) => edits[e.id] ? { ...e, ...edits[e.id] } : e);
    }, [userEntries, edits, deleted]);
    const catNames = {
      technique: t.catTechnique,
      drills: t.catDrills,
      mindset: t.catMindset,
      weight: t.catWeight,
      strategy: t.catStrategy,
      matchstudy: t.catMatchstudy,
      culture: t.catCulture
    };
    const cats = useMemo(() => {
      const named = CATEGORIES.map((c) => ({ ...c, label: catNames[c.id] || c.label }));
      return applyOrder(named, catOrder);
    }, [t.catTechnique, t.catDrills, t.catMindset, t.catWeight, t.catStrategy, t.catMatchstudy, t.catCulture, catOrder]);
    const catOf = (id) => cats.find((c) => c.id === id) || cats[0];
    function onCatDrop(overId) {
      if (!navDragId || navDragId === overId) return setNavDragId(null);
      setCatOrder(moveId(catOrder, CATEGORIES.map((c) => c.id), navDragId, overId));
      setNavDragId(null);
    }
    const toggle = (setFn) => (id) => setFn((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
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
        setUserEntries((prev) => prev.map((e) => e.id === entry.id ? entry : e));
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
        window.normalizeFilms(ent).forEach((f) => {
          if (f.fileKey && window.FilmDB) window.FilmDB.del(f.fileKey);
        });
      }
      if (ent && Array.isArray(ent.docs)) {
        ent.docs.forEach((d) => {
          if (d && d.fileKey && window.FilmDB) window.FilmDB.del(d.fileKey);
        });
      }
      setDeleted((prev) => new Set(prev).add(id));
      setEdits((prev) => {
        const n = { ...prev };
        delete n[id];
        return n;
      });
      setSaved((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
      setLearned((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
      setOpenId(null);
    }
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
    }, [allEntries, view, query, saved, learned, entryOrder, cats]);
    const canDragEntries = !query.trim();
    function onEntryDrop(overId) {
      if (!dragId || dragId === overId) return setDragId(null);
      setEntryOrder(moveId(entryOrder, allEntries.map((e) => e.id), dragId, overId));
      setDragId(null);
    }
    const openEntry = openId ? allEntries.find((e) => e.id === openId) : null;
    const learnedCount = allEntries.reduce((count, entry) => count + (learned.has(entry.id) ? 1 : 0), 0);
    const savedCount = allEntries.reduce((count, entry) => count + (saved.has(entry.id) ? 1 : 0), 0);
    const totalCount = allEntries.length;
    const pct = totalCount ? Math.round(learnedCount / totalCount * 100) : 0;
    const navItems = [
      { id: "all", label: t.allTitle, icon: "search", count: allEntries.length },
      ...cats.map((c) => ({
        id: c.id,
        label: c.label,
        icon: c.icon,
        count: allEntries.filter((e) => e.category === c.id).length
      }))
    ];
    function go(v) {
      setView(v);
      setQuery("");
      closeMobileNav();
    }
    function extFor(film) {
      const fromName = (film.fileName || "").match(/\.([a-z0-9]+)$/i);
      if (fromName) return fromName[1].toLowerCase();
      const m = { "video/mp4": "mp4", "video/webm": "webm", "video/ogg": "ogg", "video/quicktime": "mov" };
      return m[film.mime] || "mp4";
    }
    function downloadBlob(blob, name) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4e3);
    }
    async function publishContent() {
      const publishCats = cats.map((c) => ({ id: c.id, label: c.label, short: c.short, icon: c.icon }));
      const videoFiles = [];
      const docFiles = [];
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
        version: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        gate: { athlete: t.athletePass || "", coach: t.coachPass || "" },
        categories: publishCats,
        entries: publishEntries
      };
      const text = "// ============================================================\n//  content.js — PUBLISHED Badger Knowledge Base content\n//  Generated " + (/* @__PURE__ */ new Date()).toLocaleString() + "\n//  Replace this file on your host and re-deploy to update every athlete.\n// ============================================================\n\nwindow.WKB_PUBLISHED = " + JSON.stringify(body, null, 2) + ";\n";
      const hasUploads = videoFiles.length > 0 || docFiles.length > 0;
      const zipper = await loadJSZip();
      if (zipper) {
        const zip = new zipper();
        zip.file("content.js", text);
        videoFiles.forEach((v) => zip.file("films/" + v.name, v.blob));
        docFiles.forEach((d) => zip.file("docs/" + d.name, d.blob));
        const blob = await zip.generateAsync({ type: "blob" });
        downloadBlob(blob, "badgers-publish-" + body.version + ".zip");
        const lines2 = [
          "Publish zip downloaded.",
          "",
          "1. Unzip it.",
          "2. Copy everything inside into your site folder (replace content.js" + (hasUploads ? ", keep the films/ and docs/ folders next to it" : "") + ").",
          "3. Re-deploy (drag the folder onto Netlify Drop)."
        ];
        if (missing.length) {
          lines2.push(
            "",
            "⚠ Could not find the file for: " + missing.join(", "),
            "(It was cleared from this browser. Re-upload it, then Publish again.)"
          );
        }
        setTimeout(() => window.alert(lines2.join("\n")), 200);
        return;
      }
      downloadBlob(new Blob([text], { type: "text/javascript" }), "content.js");
      const allDl = [...videoFiles, ...docFiles];
      for (let i = 0; i < allDl.length; i++) {
        const f = allDl[i];
        setTimeout(() => downloadBlob(f.blob, f.name), 700 * (i + 1));
      }
      const lines = ["Published content.js downloaded."];
      if (videoFiles.length) {
        lines.push(
          "",
          videoFiles.length + " uploaded video file(s) are downloading too.",
          "Put ALL of them inside a folder named  films/  next to your other files, then re-deploy."
        );
      }
      if (docFiles.length) {
        lines.push(
          "",
          docFiles.length + " uploaded document(s) are downloading too.",
          "Put ALL of them inside a folder named  docs/  next to your other files, then re-deploy."
        );
      }
      if (missing.length) {
        lines.push(
          "",
          "⚠ Could not find the file for: " + missing.join(", "),
          "(It was cleared from this browser. Re-upload it, then Publish again.)"
        );
      }
      setTimeout(() => window.alert(lines.join("\n")), 200);
    }
    function loadJSZip() {
      if (window.JSZip) return Promise.resolve(window.JSZip);
      return new Promise((res) => {
        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
        s.onload = () => res(window.JSZip || null);
        s.onerror = () => res(null);
        document.head.appendChild(s);
      });
    }
    function clearLocalDrafts() {
      if (!window.confirm("Clear your local drafts on this device? This removes unpublished adds/edits/deletes and custom ordering. Already-published content is unaffected.")) return;
      [LS.user, LS.edits, LS.deleted, LS.entryOrder, LS.catOrder].forEach((k) => localStorage.removeItem(k));
      setUserEntries([]);
      setEdits({});
      setDeleted(/* @__PURE__ */ new Set());
      setEntryOrder([]);
      setCatOrder([]);
    }
    if (athleteGateOn && !role) {
      return /* @__PURE__ */ React.createElement(LoginGate, { team: t.brandTeam, onUnlock: unlock });
    }
    const viewTitle = view === "workbook" ? "Mindset Workbook" : view === "all" ? t.allTitle : view === "saved" ? "Saved" : view === "progress" ? "My Progress" : catOf(view).label;
    const viewSub = view === "workbook" ? "Personal practice tools stored in this browser profile." : view === "all" ? t.allSub : view === "saved" ? "Everything you've starred to come back to." : view === "progress" ? "What you've locked in this season." : {
      technique: "Positions and finishes drilled in the room.",
      drills: "Conditioning and skill circuits.",
      mindset: "The mental side of the six minutes.",
      weight: "Making weight the smart way, fueling to compete.",
      strategy: "Scouting, the clock, and match tactics.",
      matchstudy: "Full matches broken down — watch, study, apply.",
      culture: "Who we are and what we stand for."
    }[view] || "";
    const gridStyle = t.layout !== "List" && t.gridCols !== "Auto" ? { gridTemplateColumns: `repeat(${t.gridCols}, minmax(0,1fr))` } : void 0;
    const cardShow = { summary: t.cardSummary, level: t.cardLevel, film: t.cardFilm };
    return /* @__PURE__ */ React.createElement("div", { className: "shell" }, /* @__PURE__ */ React.createElement(
      "aside",
      {
        ref: sideRef,
        id: "site-navigation",
        className: "side" + (navOpen ? " side--open" : ""),
        tabIndex: "-1",
        "aria-hidden": mobileNavMode && !navOpen ? "true" : void 0
      },
      /* @__PURE__ */ React.createElement("button", { ref: navCloseRef, className: "side__close", type: "button", onClick: closeMobileNav, "aria-label": "Close menu" }, /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 20, stroke: 2.2 })),
      /* @__PURE__ */ React.createElement("div", { className: "brand" }, /* @__PURE__ */ React.createElement("div", { className: "brand__mark" }, "W"), /* @__PURE__ */ React.createElement("div", { className: "brand__text" }, /* @__PURE__ */ React.createElement("span", { className: "brand__team" }, t.brandTeam), /* @__PURE__ */ React.createElement("span", { className: "brand__sub" }, t.brandSub))),
      (athleteGateOn || coachAccessOn) && /* @__PURE__ */ React.createElement("div", { className: "rolebar" }, /* @__PURE__ */ React.createElement("span", { className: "rolebar__tag" + (coachMode ? " rolebar__tag--coach" : "") }, coachMode ? "Coach — editing" : "Athlete"), /* @__PURE__ */ React.createElement("span", { style: { display: "flex", gap: 12, alignItems: "center" } }, canEdit && /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "rolebar__out",
          onClick: () => window.postMessage({ type: "__activate_edit_mode" }, "*")
        },
        "Publish / Settings"
      ), !coachMode && coachAccessOn && /* @__PURE__ */ React.createElement("button", { className: "rolebar__out", onClick: () => setShowCoachLogin(true) }, "Coach sign in"), (athleteGateOn || coachMode) && /* @__PURE__ */ React.createElement("button", { className: "rolebar__out", onClick: signOut }, athleteGateOn ? "Sign out" : "Exit coach mode"))),
      /* @__PURE__ */ React.createElement("nav", { className: "nav" }, /* @__PURE__ */ React.createElement("span", { className: "nav__head" }, "Browse"), navItems.map((n) => {
        const draggable = n.id !== "all";
        return /* @__PURE__ */ React.createElement(
          "button",
          {
            key: n.id,
            className: "navitem" + (view === n.id ? " navitem--on" : "") + (navDragId === n.id ? " navitem--dragging" : ""),
            onClick: () => go(n.id),
            draggable,
            onDragStart: draggable ? (e) => {
              setNavDragId(n.id);
              e.dataTransfer.effectAllowed = "move";
            } : void 0,
            onDragOver: draggable ? (e) => {
              e.preventDefault();
            } : void 0,
            onDrop: draggable ? (e) => {
              e.preventDefault();
              onCatDrop(n.id);
            } : void 0,
            onDragEnd: () => setNavDragId(null)
          },
          draggable && /* @__PURE__ */ React.createElement(Icon, { name: "grip", size: 15, stroke: 2, className: "navitem__grip" }),
          /* @__PURE__ */ React.createElement(Icon, { name: n.icon, size: 18, stroke: 2 }),
          /* @__PURE__ */ React.createElement("span", { className: "navitem__l" }, n.label),
          /* @__PURE__ */ React.createElement("span", { className: "navitem__c" }, n.count)
        );
      }), /* @__PURE__ */ React.createElement("span", { className: "nav__head" }, "You"), /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "navitem navitem--workbook" + (view === "workbook" ? " navitem--on" : ""),
          onClick: () => go("workbook"),
          "data-testid": "mindset-workbook-nav",
          "aria-current": view === "workbook" ? "page" : void 0
        },
        /* @__PURE__ */ React.createElement(Icon, { name: "brain", size: 18, stroke: 2 }),
        /* @__PURE__ */ React.createElement("span", { className: "navitem__l" }, "Mindset Workbook"),
        /* @__PURE__ */ React.createElement("span", { className: "navitem__private" }, "Local")
      ), /* @__PURE__ */ React.createElement("button", { className: "navitem" + (view === "saved" ? " navitem--on" : ""), onClick: () => go("saved") }, /* @__PURE__ */ React.createElement(Icon, { name: "star", size: 18, stroke: 2 }), /* @__PURE__ */ React.createElement("span", { className: "navitem__l" }, "Saved"), /* @__PURE__ */ React.createElement("span", { className: "navitem__c" }, savedCount)), t.showYouNav && /* @__PURE__ */ React.createElement("button", { className: "navitem" + (view === "progress" ? " navitem--on" : ""), onClick: () => go("progress") }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 18, stroke: 2.2 }), /* @__PURE__ */ React.createElement("span", { className: "navitem__l" }, "My Progress"), /* @__PURE__ */ React.createElement("span", { className: "navitem__c" }, learnedCount))),
      t.showProgressWidget && /* @__PURE__ */ React.createElement("div", { className: "progress" }, /* @__PURE__ */ React.createElement("div", { className: "progress__top" }, /* @__PURE__ */ React.createElement("span", { className: "progress__lab" }, "Season Progress"), /* @__PURE__ */ React.createElement("span", { className: "progress__pct" }, pct, "%")), /* @__PURE__ */ React.createElement("div", { className: "progress__bar" }, /* @__PURE__ */ React.createElement("div", { className: "progress__fill", style: { width: pct + "%" } })), /* @__PURE__ */ React.createElement("span", { className: "progress__sub" }, learnedCount, " of ", totalCount, " learned"))
    ), navOpen && /* @__PURE__ */ React.createElement("button", { className: "scrim", type: "button", tabIndex: "-1", onClick: closeMobileNav, "aria-label": "Close menu" }), /* @__PURE__ */ React.createElement("main", { ref: mainRef, className: "main" }, /* @__PURE__ */ React.createElement("header", { className: "top" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        ref: hamburgerRef,
        className: "hamb",
        onClick: () => setNavOpen(true),
        "aria-label": "Open menu",
        "aria-expanded": navOpen,
        "aria-controls": "site-navigation"
      },
      /* @__PURE__ */ React.createElement("span", null),
      /* @__PURE__ */ React.createElement("span", null),
      /* @__PURE__ */ React.createElement("span", null)
    ), view === "workbook" ? /* @__PURE__ */ React.createElement("div", { className: "top__workbook", "aria-label": "Mindset Workbook" }, /* @__PURE__ */ React.createElement(Icon, { name: "brain", size: 20, stroke: 2 }), /* @__PURE__ */ React.createElement("span", null, "Mindset Workbook"), /* @__PURE__ */ React.createElement("em", null, "Stored in this browser profile")) : /* @__PURE__ */ React.createElement("label", { className: "searchbar" }, /* @__PURE__ */ React.createElement("span", { className: "sr-only" }, "Search the knowledge base"), /* @__PURE__ */ React.createElement(Icon, { name: "search", size: 19, stroke: 2 }), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "searchbar__in",
        value: query,
        onChange: (e) => setQuery(e.target.value),
        placeholder: "Search moves, drills, mindset…"
      }
    ), query && /* @__PURE__ */ React.createElement("button", { type: "button", className: "searchbar__x", onClick: () => setQuery(""), "aria-label": "Clear search" }, /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 16 }))), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "addbtn",
        onClick: () => setShowAdd(true),
        style: { display: canEdit && view !== "workbook" ? void 0 : "none" }
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 18, stroke: 2.4 }),
      /* @__PURE__ */ React.createElement("span", null, "Add Entry")
    )), /* @__PURE__ */ React.createElement("div", { className: "content" + (view === "workbook" ? " content--workbook" : "") }, view === "workbook" ? /* @__PURE__ */ React.createElement(MindsetWorkbook, null) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "phead" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "phead__title" }, viewTitle), /* @__PURE__ */ React.createElement("p", { className: "phead__sub" }, viewSub)), /* @__PURE__ */ React.createElement("div", { className: "phead__count" }, results.length, " ", results.length === 1 ? "entry" : "entries")), view === "all" && !query.trim() && /* @__PURE__ */ React.createElement("section", { className: "wb-launch", "aria-labelledby": "wb-launch-title" }, /* @__PURE__ */ React.createElement("div", { className: "wb-launch__mark" }, /* @__PURE__ */ React.createElement(Icon, { name: "brain", size: 27, stroke: 1.9 })), /* @__PURE__ */ React.createElement("div", { className: "wb-launch__copy" }, /* @__PURE__ */ React.createElement("span", { className: "wb-eyebrow" }, "Personal mindset practice"), /* @__PURE__ */ React.createElement("h2", { id: "wb-launch-title" }, "Turn the worksheets into your plan"), /* @__PURE__ */ React.createElement("p", null, "Five short, phone-first tools with automatic saving, match reviews, and a backup you control.")), /* @__PURE__ */ React.createElement("button", { className: "wb-primary wb-launch__button", onClick: () => go("workbook") }, "Open Mindset Workbook ", /* @__PURE__ */ React.createElement(Icon, { name: "chevron", size: 17, stroke: 2.2 }))), view !== "saved" && view !== "progress" && /* @__PURE__ */ React.createElement("div", { className: "chips" }, /* @__PURE__ */ React.createElement("button", { className: "chip" + (view === "all" ? " chip--on" : ""), onClick: () => go("all") }, "All"), cats.map((c) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: c.id,
        className: "chip" + (view === c.id ? " chip--on" : "") + (navDragId === c.id ? " chip--dragging" : ""),
        onClick: () => go(c.id),
        draggable: true,
        onDragStart: (e) => {
          setNavDragId(c.id);
          e.dataTransfer.effectAllowed = "move";
        },
        onDragOver: (e) => e.preventDefault(),
        onDrop: (e) => {
          e.preventDefault();
          onCatDrop(c.id);
        },
        onDragEnd: () => setNavDragId(null)
      },
      /* @__PURE__ */ React.createElement(Icon, { name: c.icon, size: 14, stroke: 2 }),
      c.short
    ))), results.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement("div", { className: "empty__mark" }, /* @__PURE__ */ React.createElement(Icon, { name: view === "saved" ? "star" : view === "progress" ? "check" : "search", size: 30, stroke: 1.7 })), /* @__PURE__ */ React.createElement("h3", null, query ? "No results" : view === "saved" ? "Nothing saved yet" : view === "progress" ? "Nothing learned yet" : "Empty"), /* @__PURE__ */ React.createElement("p", null, query ? `Nothing matches “${query}”. Try another term.` : view === "saved" ? "Tap the star on any entry to keep it here." : view === "progress" ? "Open an entry and mark it learned to track your season." : "Add the first entry for this category.")) : /* @__PURE__ */ React.createElement("div", { className: "grid" + (t.layout === "List" ? " grid--list" : ""), style: gridStyle }, results.map((e) => /* @__PURE__ */ React.createElement(
      EntryCard,
      {
        key: e.id,
        entry: e,
        cat: catOf(e.category),
        saved: saved.has(e.id),
        learned: learned.has(e.id),
        list: t.layout === "List",
        show: cardShow,
        dragging: dragId === e.id,
        drag: canDragEntries ? {
          draggable: true,
          onDragStart: (ev) => {
            setDragId(e.id);
            ev.dataTransfer.effectAllowed = "move";
          },
          onDragOver: (ev) => ev.preventDefault(),
          onDrop: (ev) => {
            ev.preventDefault();
            onEntryDrop(e.id);
          },
          onDragEnd: () => setDragId(null)
        } : null,
        onOpen: () => setOpenId(e.id),
        onSave
      }
    )))))), openEntry && /* @__PURE__ */ React.createElement(
      DetailView,
      {
        entry: openEntry,
        cat: catOf(openEntry.category),
        saved: saved.has(openEntry.id),
        learned: learned.has(openEntry.id),
        onClose: () => setOpenId(null),
        onSave,
        onLearn,
        onEdit: startEdit,
        onDelete: deleteEntry,
        canEdit,
        show: { film: t.detailFilm, steps: t.detailSteps, coachNotes: t.detailCoachNotes, tags: t.detailTags }
      }
    ), showAdd && /* @__PURE__ */ React.createElement(AddEntryForm, { onClose: () => setShowAdd(false), onAdd: addEntry }), editEntry && /* @__PURE__ */ React.createElement(AddEntryForm, { initial: editEntry, onClose: () => setEditEntry(null), onAdd: saveEdit }), showCoachLogin && /* @__PURE__ */ React.createElement(LoginGate, { team: t.brandTeam, onUnlock: unlockCoach, coachOnly: true, onClose: () => setShowCoachLogin(false) }), /* @__PURE__ */ React.createElement(TweaksPanel, null, canEdit && /* @__PURE__ */ React.createElement(TweakSection, { label: "Publishing" }), canEdit && /* @__PURE__ */ React.createElement(TweakButton, { label: "Publish content (download)", onClick: publishContent }), canEdit && /* @__PURE__ */ React.createElement(TweakText, { label: "Athlete passcode", value: t.athletePass, onChange: (v) => setTweak("athletePass", v) }), canEdit && /* @__PURE__ */ React.createElement(TweakText, { label: "Coach passcode", value: t.coachPass, onChange: (v) => setTweak("coachPass", v) }), canEdit && /* @__PURE__ */ React.createElement(TweakButton, { label: "Clear my local drafts", secondary: true, onClick: clearLocalDrafts }), /* @__PURE__ */ React.createElement(TweakSection, { label: "Preset" }), /* @__PURE__ */ React.createElement(
      TweakSelect,
      {
        label: "Direction",
        value: t.direction,
        options: Object.keys(DIRECTIONS),
        onChange: (v) => setTweak({ direction: v, theme: DIRECTIONS[v].theme, accent: DIRECTIONS[v].accent })
      }
    ), /* @__PURE__ */ React.createElement(TweakSection, { label: "Color" }), /* @__PURE__ */ React.createElement(TweakColor, { label: "Accent", value: t.accent, onChange: (v) => setTweak("accent", v) }), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: "Theme",
        value: t.theme,
        options: ["dark", "light", "ink"],
        onChange: (v) => setTweak("theme", v)
      }
    ), /* @__PURE__ */ React.createElement(TweakSection, { label: "Layout" }), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: "Cards",
        value: t.layout,
        options: ["Grid", "List"],
        onChange: (v) => setTweak("layout", v)
      }
    ), /* @__PURE__ */ React.createElement(
      TweakSelect,
      {
        label: "Columns",
        value: t.gridCols,
        options: ["Auto", "2", "3", "4"],
        onChange: (v) => setTweak("gridCols", v)
      }
    ), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: "Density",
        value: t.density,
        options: ["compact", "regular", "comfy"],
        onChange: (v) => setTweak("density", v)
      }
    ), /* @__PURE__ */ React.createElement(
      TweakButton,
      {
        label: "Reset all ordering",
        secondary: true,
        onClick: () => {
          setEntryOrder([]);
          setCatOrder([]);
        }
      }
    ), /* @__PURE__ */ React.createElement(TweakSection, { label: "Cards" }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Summary text", value: t.cardSummary, onChange: (v) => setTweak("cardSummary", v) }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Level badge", value: t.cardLevel, onChange: (v) => setTweak("cardLevel", v) }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Film thumbnail", value: t.cardFilm, onChange: (v) => setTweak("cardFilm", v) }), /* @__PURE__ */ React.createElement(
      TweakSlider,
      {
        label: "Corner radius",
        value: t.cardRadius,
        min: 0,
        max: 28,
        unit: "px",
        onChange: (v) => setTweak("cardRadius", v)
      }
    ), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Card shadow", value: t.cardShadow, onChange: (v) => setTweak("cardShadow", v) }), /* @__PURE__ */ React.createElement(TweakSection, { label: "Detail Panel" }), /* @__PURE__ */ React.createElement(
      TweakSlider,
      {
        label: "Width",
        value: t.detailWidth,
        min: 440,
        max: 760,
        step: 20,
        unit: "px",
        onChange: (v) => setTweak("detailWidth", v)
      }
    ), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Film library", value: t.detailFilm, onChange: (v) => setTweak("detailFilm", v) }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Steps / key points", value: t.detailSteps, onChange: (v) => setTweak("detailSteps", v) }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Coach's notes", value: t.detailCoachNotes, onChange: (v) => setTweak("detailCoachNotes", v) }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Tags", value: t.detailTags, onChange: (v) => setTweak("detailTags", v) }), /* @__PURE__ */ React.createElement(TweakSection, { label: "Sidebar" }), /* @__PURE__ */ React.createElement(TweakText, { label: "Team name", value: t.brandTeam, onChange: (v) => setTweak("brandTeam", v) }), /* @__PURE__ */ React.createElement(TweakText, { label: "Subtitle", value: t.brandSub, onChange: (v) => setTweak("brandSub", v) }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Progress widget", value: t.showProgressWidget, onChange: (v) => setTweak("showProgressWidget", v) }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "“My Progress” nav", value: t.showYouNav, onChange: (v) => setTweak("showYouNav", v) }), /* @__PURE__ */ React.createElement(TweakSection, { label: "Page Header" }), /* @__PURE__ */ React.createElement(TweakText, { label: "Home title", value: t.allTitle, onChange: (v) => setTweak("allTitle", v) }), /* @__PURE__ */ React.createElement(TweakText, { label: "Home subtitle", value: t.allSub, onChange: (v) => setTweak("allSub", v) }), /* @__PURE__ */ React.createElement(TweakSection, { label: "Category Names" }), /* @__PURE__ */ React.createElement(TweakText, { label: "Technique", value: t.catTechnique, onChange: (v) => setTweak("catTechnique", v) }), /* @__PURE__ */ React.createElement(TweakText, { label: "Drills", value: t.catDrills, onChange: (v) => setTweak("catDrills", v) }), /* @__PURE__ */ React.createElement(TweakText, { label: "Mindset", value: t.catMindset, onChange: (v) => setTweak("catMindset", v) }), /* @__PURE__ */ React.createElement(TweakText, { label: "Weight", value: t.catWeight, onChange: (v) => setTweak("catWeight", v) }), /* @__PURE__ */ React.createElement(TweakText, { label: "Strategy", value: t.catStrategy, onChange: (v) => setTweak("catStrategy", v) }), /* @__PURE__ */ React.createElement(TweakText, { label: "Match Study", value: t.catMatchstudy, onChange: (v) => setTweak("catMatchstudy", v) }), /* @__PURE__ */ React.createElement(TweakText, { label: "Culture", value: t.catCulture, onChange: (v) => setTweak("catCulture", v) })));
  }
  function LoginGate({ team, onUnlock, coachOnly = false, onClose = null }) {
    const [code, setCode] = useState("");
    const [err, setErr] = useState(false);
    function submit(e) {
      e.preventDefault();
      if (!onUnlock(code.trim())) {
        setErr(true);
        setCode("");
      }
    }
    return /* @__PURE__ */ React.createElement("div", { className: "gate", "data-testid": coachOnly ? "coach-login-gate" : "athlete-login-gate" }, /* @__PURE__ */ React.createElement("form", { className: "gate__card", onSubmit: submit }, /* @__PURE__ */ React.createElement("div", { className: "gate__mark" }, "W"), /* @__PURE__ */ React.createElement("h1", { className: "gate__team" }, team), /* @__PURE__ */ React.createElement("p", { className: "gate__sub" }, coachOnly ? "Enter the coach passcode to unlock editing tools." : "Team passcode required to enter the knowledge base."), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "gate__in" + (err ? " gate__in--err" : ""),
        type: "password",
        value: code,
        autoFocus: true,
        placeholder: "Passcode",
        onChange: (e) => {
          setCode(e.target.value);
          setErr(false);
        }
      }
    ), err && /* @__PURE__ */ React.createElement("span", { className: "gate__err" }, "That passcode didn't match. Try again."), /* @__PURE__ */ React.createElement("button", { className: "gate__btn", type: "submit" }, coachOnly ? "Unlock coach tools" : "Enter"), onClose && /* @__PURE__ */ React.createElement("button", { className: "rolebar__out", type: "button", onClick: onClose }, "Cancel")));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
