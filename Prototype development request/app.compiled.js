// app.compiled.js — precompiled bundle (generated from the .jsx sources; do not hand-edit)
// Rebuild: ask Claude to recompile the bundle after changing any .jsx file.
'use strict';

/* ====== tweaks-panel.jsx ====== */
(function(){
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
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return React.createElement(React.Fragment, null, React.createElement("style", null, __TWEAKS_STYLE), React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, React.createElement("b", null, title), React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "✕")), React.createElement("div", {
    className: "twk-body"
  }, children)));
}
function TweakSection({
  label,
  children
}) {
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, React.createElement("div", {
    className: "twk-lbl"
  }, React.createElement("span", null, label), value != null && React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}
function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return React.createElement("div", {
    className: "twk-row twk-row-h"
  }, React.createElement("div", {
    className: "twk-lbl"
  }, React.createElement("span", null, label)), React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return React.createElement(TweakRow, {
    label: label
  }, React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return React.createElement(TweakRow, {
    label: label
  }, React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return React.createElement(TweakRow, {
    label: label
  }, React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return React.createElement("div", {
    className: "twk-num"
  }, React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return React.createElement("div", {
      className: "twk-row twk-row-h"
    }, React.createElement("div", {
      className: "twk-lbl"
    }, React.createElement("span", null, label)), React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return React.createElement(TweakRow, {
    label: label
  }, React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && React.createElement("span", null, sup.map((c, j) => React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
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
(function(){
const CATEGORIES = [{
  id: "technique",
  label: "Technique",
  short: "Moves",
  icon: "grapple"
}, {
  id: "drills",
  label: "Drills & Conditioning",
  short: "Drills",
  icon: "lungs"
}, {
  id: "mindset",
  label: "Mindset",
  short: "Mindset",
  icon: "brain"
}, {
  id: "weight",
  label: "Weight & Nutrition",
  short: "Weight",
  icon: "scale"
}, {
  id: "strategy",
  label: "Strategy & Scouting",
  short: "Strategy",
  icon: "target"
}, {
  id: "matchstudy",
  label: "Match Study",
  short: "Match Study",
  icon: "clapper"
}, {
  id: "culture",
  label: "Culture & Quotes",
  short: "Culture",
  icon: "flag"
}];
const LEVELS = ["Fundamental", "Varsity", "Advanced"];
const COACHES = ["Coach Bono", "Coach Cassioppi", "Coach Model", "Coach Zargo"];
const ENTRIES = [{
  id: "t-high-c",
  title: "High Crotch to Double",
  category: "technique",
  level: "Fundamental",
  tags: ["takedown", "neutral", "leg attack"],
  author: "Coach Bono",
  hasVideo: true,
  films: [{
    id: "hc1",
    role: "Demo",
    label: "Coach Bono — full breakdown"
  }, {
    id: "hc2",
    role: "Match",
    label: "State final — high c to double"
  }, {
    id: "hc3",
    role: "Slow-mo",
    label: "Corner finish, frame by frame"
  }, {
    id: "hc4",
    role: "Common mistake",
    label: "Dropping the head — what not to do"
  }, {
    id: "hc5",
    role: "Drill",
    label: "Live go from the room"
  }],
  summary: "The bread-and-butter Badger leg attack. Penetrate on the high crotch, then convert to a double when they sprawl.",
  steps: ["Level change — head up, hips drop. Don't bend at the waist.", "Penetration step to the knee, ear tight to the hip, hand cupping behind the knee.", "Drive the corner: turn the body, don't lift straight up.", "If they sprawl, switch the near hand to the far knee and run the pipe to a double.", "Finish facing the same direction you started — head inside, follow the hips down."],
  coachNotes: "Number one error is dropping the head. You penetrate with your eyes up so you can see the finish. Live this every Monday until it's reflex."
}, {
  id: "t-sprawl",
  title: "Sprawl & Spin Behind",
  category: "technique",
  level: "Fundamental",
  tags: ["defense", "neutral", "scramble"],
  author: "Coach Cassioppi",
  hasVideo: true,
  films: [{
    id: "sp1",
    role: "Demo",
    label: "Coach Cassioppi — sprawl mechanics"
  }, {
    id: "sp2",
    role: "Match",
    label: "Sprawl to spin-behind, dual meet"
  }, {
    id: "sp3",
    role: "Drill",
    label: "50-rep sprawl conditioning"
  }],
  summary: "First line of defense against any leg attack. Hips down, legs back, then circle to the back.",
  steps: ["React to the level change — snap the hips down and legs back in one motion.", "Crossface and underhook to flatten their attack and kill the head.", "Walk the legs away from their grip; don't let them reattach.", "Once their head pops out, circle hard to the same side as your underhook.", "Get to the back, hands locked, and run a tight far ankle to finish."],
  coachNotes: "A good sprawl wins matches. We chart sprawl reps in conditioning — 50 a day, every day. Heavy hips beat fast legs."
}, {
  id: "t-half",
  title: "Tight Waist to Half Nelson",
  category: "technique",
  level: "Fundamental",
  tags: ["top", "turn", "pin"],
  author: "Coach Zargo",
  hasVideo: false,
  duration: null,
  summary: "The most reliable turn in folkstyle. Break them down, lock the half, and walk them to their back.",
  steps: ["From the top ref position, chop the near arm and drive the tight waist to break them flat.", "Slide the half nelson deep — your forearm through the armpit, hand on the back of the neck.", "Hip into them, lift the elbow, and crank toward their far shoulder.", "Drive off your toes and follow them over; flatten the half to lock the pin."],
  coachNotes: "A shallow half gets reversed. Get it deep or don't get it at all. Always pair it with a tight waist so they can't post."
}, {
  id: "t-stand",
  title: "Stand-Up Escape",
  category: "technique",
  level: "Fundamental",
  tags: ["bottom", "escape", "neutral"],
  author: "Coach Cassioppi",
  hasVideo: true,
  films: [{
    id: "su1",
    role: "Demo",
    label: "Stand-up to escape — step by step"
  }, {
    id: "su2",
    role: "Match",
    label: "Escape in the final period"
  }, {
    id: "su3",
    role: "Common mistake",
    label: "Bending forward — getting ridden"
  }],
  summary: "Your go-to escape from the bottom. Hand control, stand, and cut the corner.",
  steps: ["Win the whistle — explode up off the near foot before they can ride.", "Control the hands: peel their lock and clamp wrist control.", "Stand tall, hips back into them, never bend forward.", "Cut a sharp corner, clear the hips, and face them to score the escape."],
  coachNotes: "Hand control first, always. You can't escape what's still locked around your waist. Drill the wrist peel until it's automatic."
}, {
  id: "d-grind",
  title: "The Badger Grind Circuit",
  category: "drills",
  level: "Varsity",
  tags: ["conditioning", "circuit", "in-season"],
  author: "Coach Model",
  hasVideo: false,
  duration: null,
  summary: "Six-station match-pace circuit built to make the third period feel like the first.",
  steps: ["Station 1 — Sprawl & recover, 45 sec.", "Station 2 — Stand-up reps with a partner riding, 45 sec.", "Station 3 — Spin drill on a downed partner, 45 sec.", "Station 4 — Penetration steps across the mat, 45 sec.", "Station 5 — Buddy carries, 45 sec.", "Station 6 — Hand-fighting, live, 45 sec. Rest 60 sec. Repeat x4."],
  coachNotes: "Matches are won in the third period. This circuit is non-negotiable Tuesday and Thursday. Track your rounds and beat last week."
}, {
  id: "d-handfight",
  title: "Hand-Fighting Ladder",
  category: "drills",
  level: "Fundamental",
  tags: ["neutral", "ties", "warmup"],
  author: "Coach Bono",
  hasVideo: true,
  films: [{
    id: "hf1",
    role: "Demo",
    label: "Tie progression walkthrough"
  }, {
    id: "hf2",
    role: "Drill",
    label: "Two-on-one, 30-second rounds"
  }, {
    id: "hf3",
    role: "Match",
    label: "Winning the ties at the whistle"
  }],
  summary: "Progressive tie-up drill that builds the grip strength and head position to dictate every neutral exchange.",
  steps: ["Collar tie snaps — pull the head down, snap to the side, reset.", "Two-on-one wrist control — strip and re-pummel for 30 sec.", "Underhook pummeling — fight for the inside, hips tight.", "Live hand-fight to a single touch behind the elbow scores."],
  coachNotes: "The wrestler who controls the ties controls the match. We hand-fight every single practice. Win the hands, win the shot."
}, {
  id: "m-sixmin",
  title: "The Six-Minute Mindset",
  category: "mindset",
  level: "Fundamental",
  tags: ["focus", "match prep", "mental"],
  author: "Coach Bono",
  hasVideo: false,
  duration: null,
  summary: "How to compete one position at a time instead of being overwhelmed by the scoreboard.",
  steps: ["Before the whistle, narrow your world to the next exchange — not the score, not the crowd.", "Win the first contact. A strong first tie sets the tone for six minutes.", "If you get scored on, reset to neutral in your head before the ref restarts.", "Bank small wins — a good stance, a stuffed shot, a re-shot — they compound."],
  coachNotes: "You can't wrestle six minutes at once. You wrestle the next ten seconds, then the next. Stay in the position you're in."
}, {
  id: "m-pressure",
  title: "Embracing the Grind",
  category: "mindset",
  level: "Varsity",
  tags: ["toughness", "adversity", "mental"],
  author: "Coach Model",
  hasVideo: false,
  duration: null,
  summary: "Reframing hard practices and tough losses as the exact thing that builds a champion.",
  steps: ["Name the discomfort — fatigue, doubt, soreness — then keep moving anyway.", "Treat every tough partner as a free scouting report on your weaknesses.", "After a loss, separate emotion from information. Watch the film, fix one thing.", "Show up the next day. Consistency under fatigue is the whole skill."],
  coachNotes: "Nobody remembers the easy days. The grind is the point. When it's hardest is exactly when you're becoming who you want to be."
}, {
  id: "m-routine",
  title: "Pre-Match Routine",
  category: "mindset",
  level: "Fundamental",
  tags: ["focus", "match prep", "nerves"],
  author: "Coach Cassioppi",
  hasVideo: false,
  duration: null,
  summary: "A repeatable warm-up-to-whistle routine that turns nervous energy into controlled aggression.",
  steps: ["90 minutes out: hydrate, light snack if you've weighed in, headphones on.", "40 minutes out: break a sweat — jog, jumping jacks, a few sprawls.", "15 minutes out: hand-fight a teammate, hit your two best shots.", "On deck: three slow breaths, picture your first attack, then attack."],
  coachNotes: "Nerves mean you care. The routine gives the nerves a job. Same warm-up every time so your body knows it's go-time."
}, {
  id: "w-cut",
  title: "Smart Weight Management",
  category: "weight",
  level: "Varsity",
  tags: ["weight cut", "hydration", "safety"],
  author: "Coach Zargo",
  hasVideo: false,
  duration: null,
  summary: "The Badger approach to making weight without wrecking your performance or health.",
  steps: ["Wrestle the weight you walk around at, plus a few pounds — not a class below your body.", "Manage water and sodium across the week; never crash-dehydrate the night before.", "Eat to fuel practice. An empty tank in the room means a slow tank on match day.", "Refuel immediately after weigh-ins: water, carbs, a little protein."],
  coachNotes: "We do not cut to the point it costs us in the third period. If the cut makes you weaker, you're in the wrong class. Talk to a coach before you change weight."
}, {
  id: "w-fuel",
  title: "Tournament Day Fueling",
  category: "weight",
  level: "Fundamental",
  tags: ["nutrition", "competition", "energy"],
  author: "Coach Zargo",
  hasVideo: false,
  duration: null,
  summary: "What to eat between matches at an all-day tournament so you've got gas in the final.",
  steps: ["Pack it yourself — don't rely on the concession stand.", "Between matches: easy carbs (banana, rice, bagel), small protein, sip water steadily.", "Avoid heavy, greasy food that sits in your stomach.", "Keep moving between matches — light walk, stay warm, don't cool all the way down."],
  coachNotes: "Bracket day is a marathon of sprints. The kid who fuels right is the kid still scoring in the finals."
}, {
  id: "s-scout",
  title: "How to Scout an Opponent",
  category: "strategy",
  level: "Varsity",
  tags: ["scouting", "film", "match prep"],
  author: "Coach Bono",
  hasVideo: true,
  films: [{
    id: "sc1",
    role: "Demo",
    label: "How to break down film — the checklist"
  }, {
    id: "sc2",
    role: "Other",
    label: "Example scout: reading lead leg & ties"
  }],
  summary: "A checklist for breaking down film so you walk to the line already knowing what they do.",
  steps: ["Stance & lead leg — which side do they shoot from, which leg is exposed?", "First-move tendency — do they shoot early, tie up, or wait and counter?", "Top game — what's their go-to turn? Bottom game — stand-up or roll?", "Score situations — what do they do up two? Down two with a minute left?"],
  coachNotes: "Wrestle the man, not the name. Every opponent has a pattern. Find it on film and take it away on the mat."
}, {
  id: "s-late",
  title: "Riding Time & Late Leads",
  category: "strategy",
  level: "Advanced",
  tags: ["folkstyle", "clock", "tactics"],
  author: "Coach Cassioppi",
  hasVideo: false,
  duration: null,
  summary: "Managing the clock and riding time when you're protecting a one-point lead in the third.",
  steps: ["Up late on top — ride legs in, stay chest-to-back, kill their hips.", "Bank riding time; that point is real and it wins overtime seeds.", "Down late — pick your escape and commit fully; half effort gets ridden out.", "Neutral and up — stay in good stance, hand-fight, force the action to the edge."],
  coachNotes: "The last minute is its own skill. We drill 'protect the lead' and 'must-score' situations live every week so the clock never surprises you."
}, {
  id: "c-standard",
  title: "The Badger Standard",
  category: "culture",
  level: "Fundamental",
  tags: ["team", "values", "culture"],
  author: "Coach Bono",
  hasVideo: false,
  duration: null,
  summary: "The five things every wrestler in this room is held to — on the mat and off it.",
  steps: ["Be on time. Early is on time; on time is late.", "Out-work the room. Effort is the one thing fully in your control.", "Represent the W — in class, in the hallways, in the community.", "Pick your teammates up. A hard room makes hard wrestlers.", "Finish everything you start — drills, sprints, matches, seasons."],
  coachNotes: "Talent is common. The standard is what separates us. You don't rise to the occasion — you fall to your training. Hold the standard daily."
}, {
  id: "c-quotes",
  title: "Words to Wrestle By",
  category: "culture",
  level: "Fundamental",
  tags: ["quotes", "motivation", "mental"],
  author: "Coach Model",
  hasVideo: false,
  duration: null,
  summary: "A short collection of lines we come back to when it's hard. Read one before you step on the mat.",
  steps: ["\"Once you've wrestled, everything else in life is easy.\" — Dan Gable", "\"The harder I work, the harder it is to surrender.\"", "\"Champions are made when no one is watching.\"", "\"Win the position you're in.\""],
  coachNotes: "Pick one that hits you and make it yours this season. These aren't posters — they're reminders of how we've decided to compete."
}];
const P = window.WKB_PUBLISHED || {};
function mergeCategories() {
  const published = P.categories && P.categories.length ? P.categories.slice() : null;
  if (!published) return CATEGORIES;
  const have = new Set(published.map(c => c.id));
  CATEGORIES.forEach(c => {
    if (!have.has(c.id)) published.push(c);
  });
  return published;
}
window.WKB = {
  CATEGORIES: mergeCategories(),
  LEVELS,
  COACHES,
  ENTRIES: P.entries && P.entries.length ? P.entries : ENTRIES,
  GATE: P.gate || {
    athlete: "",
    coach: ""
  },
  VERSION: P.version || null
};
})();

/* ====== film.jsx ====== */
(function(){
const {
  useState,
  useEffect
} = React;
const FilmDB = (() => {
  const DB = "wkb_films",
    STORE = "films";
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
      return new Promise(res => {
        const tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).delete(key);
        tx.oncomplete = () => res();
        tx.onerror = () => res();
      });
    } catch {}
  }
  return {
    put,
    get,
    del
  };
})();
const FILM_ROLES = ["Demo", "Match", "Drill", "Slow-mo", "Common mistake", "Other"];
function parseFilm(url) {
  if (!url) return null;
  url = String(url).trim();
  let m;
  if (m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)) return {
    type: "youtube",
    id: m[1],
    embed: `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0&modestbranding=1`,
    thumb: `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`
  };
  if (m = url.match(/vimeo\.com\/(\d+)/)) return {
    type: "vimeo",
    id: m[1],
    embed: `https://player.vimeo.com/video/${m[1]}?autoplay=1`,
    thumb: null
  };
  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)) return {
    type: "file",
    src: url,
    thumb: null
  };
  return {
    type: "link",
    href: url,
    thumb: null
  };
}
function normalizeFilms(entry) {
  if (Array.isArray(entry.films)) return entry.films;
  if (entry.filmUrl) return [{
    id: "f0",
    label: entry.videoLabel || "Film",
    role: "Demo",
    url: entry.filmUrl
  }];
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
function UploadVideo({
  fileKey
}) {
  const [url, setUrl] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    let u,
      live = true;
    FilmDB.get(fileKey).then(blob => {
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
  if (err) return React.createElement("div", {
    className: "vthumb vthumb--big lib__empty"
  }, React.createElement("div", {
    className: "lib__emptytxt"
  }, React.createElement("span", null, "Film file unavailable"), React.createElement("em", null, "It may have been cleared from this browser.")));
  if (!url) return React.createElement("div", {
    className: "vthumb vthumb--big lib__empty"
  }, React.createElement("div", {
    className: "lib__emptytxt"
  }, React.createElement("span", null, "Loading film…")));
  return React.createElement("div", {
    className: "player"
  }, React.createElement("video", {
    src: url,
    controls: true,
    playsInline: true
  }));
}
function FileVideo({
  src
}) {
  const [err, setErr] = useState(false);
  if (err) return React.createElement("div", {
    className: "vthumb vthumb--big lib__empty"
  }, React.createElement("div", {
    className: "lib__emptytxt"
  }, React.createElement("span", null, "Film unavailable"), React.createElement("em", null, "The video file couldn't load. It may not have been uploaded to the site yet — a coach can re-publish or link it from YouTube instead.")));
  return React.createElement("div", {
    className: "player"
  }, React.createElement("video", {
    src: src,
    controls: true,
    autoPlay: true,
    playsInline: true,
    onError: () => setErr(true)
  }));
}
function FilmStage({
  film,
  playing,
  onPlay
}) {
  const kind = filmKind(film);
  if (kind === "upload") return React.createElement(UploadVideo, {
    fileKey: film.fileKey
  });
  if (playing && (kind === "youtube" || kind === "vimeo")) {
    const p = parseFilm(film.url);
    return React.createElement("div", {
      className: "player"
    }, React.createElement("iframe", {
      src: p.embed,
      allow: "autoplay; fullscreen; encrypted-media",
      allowFullScreen: true,
      title: "Film"
    }));
  }
  if (playing && kind === "file") return React.createElement(FileVideo, {
    src: film.url
  });
  if (kind === "placeholder") return React.createElement("div", {
    className: "vthumb vthumb--big lib__empty"
  }, React.createElement("div", {
    className: "vthumb__grain"
  }), React.createElement("div", {
    className: "lib__emptytxt"
  }, React.createElement(Icon, {
    name: "play",
    size: 22
  }), React.createElement("span", null, "No film attached yet"), React.createElement("em", null, "Use Edit to paste a YouTube/Vimeo link or upload a clip.")), film.label && React.createElement("div", {
    className: "vthumb__label"
  }, film.label));
  const thumb = filmThumb(film);
  const onClick = () => {
    if (kind === "link") window.open(parseFilm(film.url).href, "_blank", "noopener");else onPlay();
  };
  return React.createElement("div", {
    className: "vthumb vthumb--big vthumb--live",
    onClick: onClick,
    role: "button"
  }, thumb ? React.createElement("img", {
    className: "vthumb__img",
    src: thumb,
    alt: ""
  }) : React.createElement("div", {
    className: "vthumb__grain"
  }), React.createElement("div", {
    className: "vthumb__play"
  }, React.createElement(Icon, {
    name: "play",
    size: 26,
    fill: true
  })), React.createElement("div", {
    className: "vthumb__meta"
  }, React.createElement("span", {
    className: "vthumb__film"
  }, "FILM")), film.label && React.createElement("div", {
    className: "vthumb__label"
  }, film.label, kind === "link" ? " · opens in new tab" : ""));
}
function ClipThumb({
  film
}) {
  const kind = filmKind(film);
  const thumb = filmThumb(film);
  if (thumb) return React.createElement("span", {
    className: "clip__thumb"
  }, React.createElement("img", {
    src: thumb,
    alt: ""
  }));
  return React.createElement("span", {
    className: "clip__thumb clip__thumb--" + kind
  }, React.createElement(Icon, {
    name: kind === "placeholder" ? "plus" : "play",
    size: 15,
    fill: kind !== "placeholder"
  }));
}
function FilmLibrary({
  entry
}) {
  const films = normalizeFilms(entry);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    setIdx(0);
    setPlaying(false);
  }, [entry.id]);
  if (!films.length) return null;
  const film = films[Math.min(idx, films.length - 1)];
  return React.createElement("div", {
    className: "lib"
  }, React.createElement("div", {
    className: "lib__stage"
  }, React.createElement(FilmStage, {
    key: (film.id || idx) + ":" + playing,
    film: film,
    playing: playing,
    onPlay: () => setPlaying(true)
  })), films.length > 1 && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "lib__count"
  }, films.length, " clips in this library"), React.createElement("div", {
    className: "lib__strip"
  }, films.map((f, i) => React.createElement("button", {
    key: f.id || i,
    className: "clip" + (i === idx ? " clip--on" : ""),
    onClick: () => {
      setIdx(i);
      setPlaying(false);
    }
  }, React.createElement(ClipThumb, {
    film: f
  }), React.createElement("div", {
    className: "clip__meta"
  }, f.role && React.createElement("span", {
    className: "clip__role"
  }, f.role), React.createElement("span", {
    className: "clip__label"
  }, f.label || "Clip " + (i + 1))))))));
}
function VideoThumb({
  entry
}) {
  const films = normalizeFilms(entry);
  if (!films.length) return null;
  const thumb = filmThumb(films[0]);
  return React.createElement("div", {
    className: "vthumb"
  }, thumb ? React.createElement("img", {
    className: "vthumb__img",
    src: thumb,
    alt: "",
    loading: "lazy"
  }) : React.createElement("div", {
    className: "vthumb__grain"
  }), React.createElement("div", {
    className: "vthumb__play"
  }, React.createElement(Icon, {
    name: "play",
    size: 18,
    fill: true
  })), React.createElement("div", {
    className: "vthumb__meta"
  }, React.createElement("span", {
    className: "vthumb__film"
  }, "FILM"), films.length > 1 && React.createElement("span", {
    className: "vthumb__dur"
  }, films.length, " clips")));
}
function FilmRowPreview({
  film
}) {
  if (film.fileKey) return React.createElement("div", {
    className: "fb__prev fb__prev--ok"
  }, React.createElement(Icon, {
    name: "check",
    size: 13,
    stroke: 2.6
  }), "Local file ready · plays inline");
  const p = parseFilm(film.url);
  if (!p) return null;
  const m = {
    youtube: "YouTube clip",
    vimeo: "Vimeo clip",
    file: "Direct video file",
    link: "External link — opens in new tab"
  };
  return React.createElement("div", {
    className: "fb__prev" + (p.type === "link" ? " fb__prev--warn" : " fb__prev--ok")
  }, p.thumb && React.createElement("img", {
    className: "fb__prevthumb",
    src: p.thumb,
    alt: ""
  }), React.createElement(Icon, {
    name: p.type === "link" ? "play" : "check",
    size: 13,
    stroke: 2.6
  }), m[p.type]);
}
function FilmBuilder({
  films,
  setFilms
}) {
  function update(i, patch) {
    setFilms(films.map((f, j) => j === i ? {
      ...f,
      ...patch
    } : f));
  }
  function add() {
    setFilms([...films, {
      id: "f" + Date.now() + Math.random().toString(36).slice(2, 6),
      label: "",
      role: "Demo",
      url: ""
    }]);
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
    update(i, {
      fileKey: key,
      fileName: file.name,
      mime: file.type,
      url: ""
    });
  }
  return React.createElement("div", {
    className: "fb"
  }, React.createElement("span", {
    className: "f__l"
  }, "Film library ", React.createElement("em", {
    className: "f__hint"
  }, "add as many examples as you want — demo, match film, drills, mistakes")), films.length === 0 && React.createElement("div", {
    className: "fb__empty"
  }, "No clips yet. Add a demonstration, then stack on match examples and drill reps."), films.map((f, i) => React.createElement("div", {
    className: "fb__row",
    key: f.id || i
  }, React.createElement("div", {
    className: "fb__head"
  }, React.createElement("input", {
    className: "f__in fb__label",
    value: f.label || "",
    onChange: e => update(i, {
      label: e.target.value
    }),
    placeholder: "Clip " + (i + 1) + " caption — e.g. Coach demo"
  }), React.createElement("select", {
    className: "f__in fb__role",
    value: f.role || "Demo",
    onChange: e => update(i, {
      role: e.target.value
    })
  }, FILM_ROLES.map(r => React.createElement("option", {
    key: r,
    value: r
  }, r))), React.createElement("button", {
    className: "fb__rm",
    onClick: () => remove(i),
    "aria-label": "Remove clip"
  }, React.createElement(Icon, {
    name: "trash",
    size: 16,
    stroke: 2
  }))), React.createElement("div", {
    className: "fb__src"
  }, f.fileKey ? React.createElement("div", {
    className: "fb__file"
  }, React.createElement(Icon, {
    name: "check",
    size: 15,
    stroke: 2.4
  }), React.createElement("span", {
    className: "fb__filename"
  }, f.fileName || "Uploaded file"), React.createElement("button", {
    className: "fb__clear",
    onClick: () => {
      FilmDB.del(f.fileKey);
      update(i, {
        fileKey: null,
        fileName: null,
        mime: null
      });
    }
  }, "Clear")) : React.createElement(React.Fragment, null, React.createElement("input", {
    className: "f__in fb__url",
    value: f.url || "",
    onChange: e => update(i, {
      url: e.target.value
    }),
    placeholder: "Paste YouTube / Vimeo / .mp4 URL"
  }), React.createElement("span", {
    className: "fb__or"
  }, "or"), React.createElement("label", {
    className: "fb__upload"
  }, React.createElement(Icon, {
    name: "plus",
    size: 15,
    stroke: 2.4
  }), "Upload file", React.createElement("input", {
    type: "file",
    accept: "video/*",
    hidden: true,
    onChange: e => onFile(i, e.target.files[0])
  })))), (f.url || f.fileKey) && React.createElement(FilmRowPreview, {
    film: f
  }))), React.createElement("button", {
    className: "fb__add",
    onClick: add
  }, React.createElement(Icon, {
    name: "plus",
    size: 16,
    stroke: 2.4
  }), "Add a clip"));
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
(function(){
const {
  useState,
  useRef,
  useEffect
} = React;
const ICON_PATHS = {
  search: React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), React.createElement("path", {
    d: "M21 21l-4.3-4.3"
  })),
  plus: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M12 5v14M5 12h14"
  })),
  close: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  })),
  star: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M12 3.5l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 17l-5.3 2.8 1.1-5.9L3.4 9.8l6-.8z"
  })),
  check: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M4 12l5 5L20 6"
  })),
  play: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M7 5l11 7-11 7z"
  })),
  back: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M15 6l-6 6 6 6"
  })),
  chevron: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M9 6l6 6-6 6"
  })),
  edit: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M4 20h4l10-10-4-4L4 16z"
  }), React.createElement("path", {
    d: "M13.5 6.5l4 4"
  })),
  trash: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"
  })),
  grapple: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M5 19c2-4 4-6 7-6s5 2 7 6"
  }), React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "2.4"
  }), React.createElement("circle", {
    cx: "15.5",
    cy: "9",
    r: "2.1"
  })),
  lungs: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M12 3v8"
  }), React.createElement("path", {
    d: "M12 8c0 4-3 4-4 8-.5 2-3 2-3-1 0-4 1-7 3-7 1.5 0 1.7 1 4 0"
  }), React.createElement("path", {
    d: "M12 8c0 4 3 4 4 8 .5 2 3 2 3-1 0-4-1-7-3-7-1.5 0-1.7 1-4 0"
  })),
  brain: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M9 4a3 3 0 00-3 3 3 3 0 00-1 5 3 3 0 001 5 3 3 0 003 2.5V4z"
  }), React.createElement("path", {
    d: "M15 4a3 3 0 013 3 3 3 0 011 5 3 3 0 01-1 5 3 3 0 01-3 2.5V4z"
  })),
  scale: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M12 4v16"
  }), React.createElement("path", {
    d: "M6 8h12l3 6a4 4 0 01-6 0zM6 8L3 14a4 4 0 006 0z"
  }), React.createElement("path", {
    d: "M7 20h10"
  })),
  target: React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "8"
  }), React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3.4"
  })),
  flag: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M6 21V4"
  }), React.createElement("path", {
    d: "M6 4h11l-2 4 2 4H6"
  })),
  grip: React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "9",
    cy: "6",
    r: "1.4"
  }), React.createElement("circle", {
    cx: "15",
    cy: "6",
    r: "1.4"
  }), React.createElement("circle", {
    cx: "9",
    cy: "12",
    r: "1.4"
  }), React.createElement("circle", {
    cx: "15",
    cy: "12",
    r: "1.4"
  }), React.createElement("circle", {
    cx: "9",
    cy: "18",
    r: "1.4"
  }), React.createElement("circle", {
    cx: "15",
    cy: "18",
    r: "1.4"
  })),
  file: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"
  }), React.createElement("path", {
    d: "M14 3v5h5"
  })),
  download: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5"
  }), React.createElement("path", {
    d: "M5 19h14"
  })),
  external: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M14 4h6v6"
  }), React.createElement("path", {
    d: "M20 4l-8.5 8.5"
  }), React.createElement("path", {
    d: "M18 13.5V19a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5.5"
  })),
  clapper: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M4 9h16v9a2 2 0 01-2 2H6a2 2 0 01-2-2z"
  }), React.createElement("path", {
    d: "M4 9l1.2-3.2 15 .9L19 9"
  }), React.createElement("path", {
    d: "M8.5 5.9l1.5 3M13 6.2l1.5 3"
  })),
  link: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M10 14a5 5 0 007.1 0l2.4-2.4a5 5 0 00-7.1-7.1l-1.2 1.2"
  }), React.createElement("path", {
    d: "M14 10a5 5 0 00-7.1 0l-2.4 2.4a5 5 0 007.1 7.1l1.2-1.2"
  }))
};
function Icon({
  name,
  size = 22,
  stroke = 1.9,
  fill = false,
  style,
  className
}) {
  return React.createElement("svg", {
    className: className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill ? "currentColor" : name === "grip" ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style
  }, ICON_PATHS[name]);
}
function LevelTag({
  level
}) {
  if (!level) return null;
  return React.createElement("span", {
    className: "level level--" + level.toLowerCase()
  }, level);
}
function EntryCard({
  entry,
  cat,
  saved,
  learned,
  onOpen,
  onSave,
  list,
  show = {},
  drag = null,
  dragging = false
}) {
  const films = normalizeFilms(entry);
  const {
    summary = true,
    level = true,
    film = true
  } = show;
  return React.createElement("article", {
    className: "card" + (list ? " card--list" : "") + (dragging ? " card--dragging" : "") + (drag ? " card--draggable" : ""),
    onClick: () => onOpen(entry),
    ...(drag || {})
  }, drag && React.createElement("span", {
    className: "card__grip",
    title: "Drag to reorder",
    onClick: e => e.stopPropagation()
  }, React.createElement(Icon, {
    name: "grip",
    size: 16,
    stroke: 2
  })), film && films.length > 0 && !list && React.createElement(VideoThumb, {
    entry: entry
  }), React.createElement("div", {
    className: "card__body"
  }, React.createElement("div", {
    className: "card__top"
  }, React.createElement("span", {
    className: "card__cat",
    style: {
      color: "var(--accent)"
    }
  }, React.createElement(Icon, {
    name: cat.icon,
    size: 15,
    stroke: 2
  }), cat.label), learned && React.createElement("span", {
    className: "card__learned"
  }, React.createElement(Icon, {
    name: "check",
    size: 13,
    stroke: 2.6
  }), "Learned")), React.createElement("h3", {
    className: "card__title"
  }, entry.title), summary && React.createElement("p", {
    className: "card__summary"
  }, entry.summary), React.createElement("div", {
    className: "card__foot"
  }, React.createElement("div", {
    className: "card__tags"
  }, level && React.createElement(LevelTag, {
    level: entry.level
  }), film && films.length > 0 && list && React.createElement("span", {
    className: "card__hasvid"
  }, React.createElement(Icon, {
    name: "play",
    size: 12,
    fill: true
  }), films.length > 1 ? films.length + " clips" : "Film")), React.createElement("button", {
    className: "savebtn" + (saved ? " savebtn--on" : ""),
    onClick: e => {
      e.stopPropagation();
      onSave(entry.id);
    },
    "aria-label": saved ? "Unsave" : "Save"
  }, React.createElement(Icon, {
    name: "star",
    size: 18,
    fill: saved,
    stroke: 2
  })))));
}
function DetailView({
  entry,
  cat,
  saved,
  learned,
  onClose,
  onSave,
  onLearn,
  onEdit,
  onDelete,
  show = {},
  canEdit = true
}) {
  const ref = useRef(null);
  const [confirm, setConfirm] = useState(false);
  const [copied, setCopied] = useState(false);
  const {
    film = true,
    coachNotes = true,
    tags = true,
    steps = true
  } = show;
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
  return React.createElement("div", {
    className: "detail",
    onClick: onClose
  }, React.createElement("div", {
    className: "detail__panel",
    ref: ref,
    onClick: e => e.stopPropagation()
  }, React.createElement("div", {
    className: "detail__tools"
  }, React.createElement("button", {
    className: "detail__tool",
    onClick: copyLink,
    "aria-label": "Copy link",
    title: copied ? "Link copied!" : "Copy link to this entry"
  }, React.createElement(Icon, {
    name: copied ? "check" : "link",
    size: 18,
    stroke: 2,
    style: copied ? {
      color: "#3fae6b"
    } : undefined
  })), canEdit && React.createElement("button", {
    className: "detail__tool",
    onClick: () => onEdit(entry),
    "aria-label": "Edit",
    title: "Edit"
  }, React.createElement(Icon, {
    name: "edit",
    size: 19,
    stroke: 2
  })), canEdit && React.createElement("button", {
    className: "detail__tool detail__tool--danger",
    onClick: () => setConfirm(true),
    "aria-label": "Delete",
    title: "Delete"
  }, React.createElement(Icon, {
    name: "trash",
    size: 18,
    stroke: 2
  })), React.createElement("button", {
    className: "detail__tool",
    onClick: onClose,
    "aria-label": "Close"
  }, React.createElement(Icon, {
    name: "close",
    size: 20
  }))), React.createElement("div", {
    className: "detail__inner"
  }, React.createElement("span", {
    className: "detail__cat",
    style: {
      color: "var(--accent)"
    }
  }, React.createElement(Icon, {
    name: cat.icon,
    size: 16,
    stroke: 2
  }), cat.label), React.createElement("h2", {
    className: "detail__title"
  }, entry.title), React.createElement("div", {
    className: "detail__meta"
  }, React.createElement(LevelTag, {
    level: entry.level
  }), React.createElement("span", {
    className: "detail__author"
  }, "Added by ", entry.author)), React.createElement("p", {
    className: "detail__summary"
  }, entry.summary), normalizeFilms(entry).length > 0 && film && React.createElement("div", {
    className: "detail__section"
  }, React.createElement("h4", {
    className: "detail__h"
  }, "Film Library"), React.createElement(FilmLibrary, {
    entry: entry
  })), normalizeDocs(entry).length > 0 && React.createElement("div", {
    className: "detail__section"
  }, React.createElement("h4", {
    className: "detail__h"
  }, "Handouts & Documents"), React.createElement(DocLibrary, {
    entry: entry
  })), steps && entry.steps && entry.steps.length > 0 && React.createElement("div", {
    className: "detail__section"
  }, React.createElement("h4", {
    className: "detail__h"
  }, quoteCat ? "The Lines" : entry.category === "mindset" || entry.category === "weight" || entry.category === "strategy" ? "Key Points" : "Steps"), React.createElement("ol", {
    className: "steps" + (quoteCat ? " steps--quote" : "")
  }, entry.steps.map((s, i) => React.createElement("li", {
    key: i,
    className: "step"
  }, !quoteCat && React.createElement("span", {
    className: "step__n"
  }, i + 1), React.createElement("span", {
    className: "step__t"
  }, s))))), entry.coachNotes && coachNotes && React.createElement("div", {
    className: "coachnote"
  }, React.createElement("div", {
    className: "coachnote__tab"
  }, "Coach's Notes"), React.createElement("p", {
    className: "coachnote__body"
  }, entry.coachNotes)), React.createElement("div", {
    className: "detail__tags"
  }, tags && entryTags.map(t => React.createElement("span", {
    key: t,
    className: "chip chip--static"
  }, "#", t)))), React.createElement("div", {
    className: "detail__actions"
  }, React.createElement("button", {
    className: "action" + (learned ? " action--done" : ""),
    onClick: () => onLearn(entry.id)
  }, React.createElement(Icon, {
    name: "check",
    size: 18,
    stroke: 2.6
  }), learned ? "Marked Learned" : "Mark as Learned"), React.createElement("button", {
    className: "action action--ghost" + (saved ? " action--saved" : ""),
    onClick: () => onSave(entry.id)
  }, React.createElement(Icon, {
    name: "star",
    size: 18,
    fill: saved,
    stroke: 2
  }), saved ? "Saved" : "Save"))), confirm && React.createElement("div", {
    className: "confirm",
    onClick: e => {
      e.stopPropagation();
      setConfirm(false);
    }
  }, React.createElement("div", {
    className: "confirm__box",
    onClick: e => e.stopPropagation()
  }, React.createElement("h4", {
    className: "confirm__title"
  }, "Delete this entry?"), React.createElement("p", {
    className: "confirm__text"
  }, "“", entry.title, "” will be removed from the database. This can’t be undone."), React.createElement("div", {
    className: "confirm__row"
  }, React.createElement("button", {
    className: "action action--danger",
    onClick: () => {
      onDelete(entry.id);
    }
  }, React.createElement(Icon, {
    name: "trash",
    size: 17,
    stroke: 2.2
  }), "Delete"), React.createElement("button", {
    className: "action action--ghost",
    onClick: () => setConfirm(false)
  }, "Cancel")))));
}
function AddEntryForm({
  onClose,
  onAdd,
  initial
}) {
  const edit = !!initial;
  const [title, setTitle] = useState(initial ? initial.title : "");
  const [category, setCategory] = useState(initial ? initial.category : "technique");
  const [level, setLevel] = useState(initial ? initial.level : "Fundamental");
  const [author, setAuthor] = useState(initial ? initial.author : window.WKB.COACHES[0]);
  const [summary, setSummary] = useState(initial ? initial.summary : "");
  const [films, setFilms] = useState(initial ? normalizeFilms(initial).map(f => ({
    ...f
  })) : []);
  const [docs, setDocs] = useState(initial && Array.isArray(initial.docs) ? initial.docs.map(d => ({
    ...d
  })) : []);
  const [tags, setTags] = useState(initial && Array.isArray(initial.tags) ? initial.tags.join(", ") : "");
  const [stepsText, setStepsText] = useState(initial && Array.isArray(initial.steps) ? initial.steps.join("\n") : "");
  const [coachNotes, setCoachNotes] = useState(initial ? initial.coachNotes || "" : "");
  const valid = title.trim() && summary.trim();
  function submit() {
    if (!valid) return;
    const steps = stepsText.split("\n").map(s => s.trim()).filter(Boolean);
    const cleanFilms = films.filter(f => f.url && f.url.trim() || f.fileKey || f.label && f.label.trim()).map(f => ({
      id: f.id || "f" + Math.random().toString(36).slice(2, 8),
      label: (f.label || "").trim(),
      role: f.role || "Demo",
      url: f.url ? f.url.trim() : null,
      fileKey: f.fileKey || null,
      fileName: f.fileName || null,
      mime: f.mime || null
    }));
    const cleanDocs = docs.filter(d => d.url && d.url.trim() || d.fileKey).map(d => ({
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
      tags: tags.split(",").map(t => t.trim().replace(/^#/, "")).filter(Boolean),
      films: cleanFilms,
      docs: cleanDocs,
      hasVideo: cleanFilms.length > 0,
      summary: summary.trim(),
      steps,
      coachNotes: coachNotes.trim() || null,
      userAdded: edit ? initial.userAdded : true
    });
  }
  return React.createElement("div", {
    className: "detail",
    onClick: onClose
  }, React.createElement("div", {
    className: "detail__panel detail__panel--form",
    onClick: e => e.stopPropagation()
  }, React.createElement("button", {
    className: "detail__close",
    onClick: onClose,
    "aria-label": "Close"
  }, React.createElement(Icon, {
    name: "close",
    size: 22
  })), React.createElement("div", {
    className: "detail__inner"
  }, React.createElement("span", {
    className: "detail__cat",
    style: {
      color: "var(--accent)"
    }
  }, edit ? "Edit Entry" : "New Entry"), React.createElement("h2", {
    className: "detail__title"
  }, edit ? "Edit This Entry" : "Add to the Database"), React.createElement("label", {
    className: "f"
  }, React.createElement("span", {
    className: "f__l"
  }, "Title"), React.createElement("input", {
    className: "f__in",
    value: title,
    onChange: e => setTitle(e.target.value),
    placeholder: "e.g. Ankle Pick from a Tie"
  })), React.createElement("div", {
    className: "f__row"
  }, React.createElement("label", {
    className: "f"
  }, React.createElement("span", {
    className: "f__l"
  }, "Category"), React.createElement("select", {
    className: "f__in",
    value: category,
    onChange: e => setCategory(e.target.value)
  }, window.WKB.CATEGORIES.map(c => React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.label)))), React.createElement("label", {
    className: "f"
  }, React.createElement("span", {
    className: "f__l"
  }, "Level"), React.createElement("select", {
    className: "f__in",
    value: level,
    onChange: e => setLevel(e.target.value)
  }, window.WKB.LEVELS.map(l => React.createElement("option", {
    key: l,
    value: l
  }, l))))), React.createElement("label", {
    className: "f"
  }, React.createElement("span", {
    className: "f__l"
  }, "Added by"), React.createElement("select", {
    className: "f__in",
    value: author,
    onChange: e => setAuthor(e.target.value)
  }, window.WKB.COACHES.map(c => React.createElement("option", {
    key: c,
    value: c
  }, c)))), React.createElement("label", {
    className: "f"
  }, React.createElement("span", {
    className: "f__l"
  }, "Summary"), React.createElement("textarea", {
    className: "f__in f__ta",
    rows: 2,
    value: summary,
    onChange: e => setSummary(e.target.value),
    placeholder: "One or two sentences on what this is and why it matters."
  })), React.createElement("label", {
    className: "f"
  }, React.createElement("span", {
    className: "f__l"
  }, "Steps / Key points ", React.createElement("em", {
    className: "f__hint"
  }, "one per line")), React.createElement("textarea", {
    className: "f__in f__ta",
    rows: 4,
    value: stepsText,
    onChange: e => setStepsText(e.target.value),
    placeholder: "Level change, head up\nPenetration step\nFinish the corner"
  })), React.createElement("label", {
    className: "f"
  }, React.createElement("span", {
    className: "f__l"
  }, "Coach's notes ", React.createElement("em", {
    className: "f__hint"
  }, "optional")), React.createElement("textarea", {
    className: "f__in f__ta",
    rows: 2,
    value: coachNotes,
    onChange: e => setCoachNotes(e.target.value),
    placeholder: "The thing you say every practice about this."
  })), React.createElement("label", {
    className: "f"
  }, React.createElement("span", {
    className: "f__l"
  }, "Tags ", React.createElement("em", {
    className: "f__hint"
  }, "comma separated")), React.createElement("input", {
    className: "f__in",
    value: tags,
    onChange: e => setTags(e.target.value),
    placeholder: "takedown, neutral, leg attack"
  })), React.createElement(FilmBuilder, {
    films: films,
    setFilms: setFilms
  }), React.createElement(DocBuilder, {
    docs: docs,
    setDocs: setDocs
  })), React.createElement("div", {
    className: "detail__actions"
  }, React.createElement("button", {
    className: "action" + (valid ? "" : " action--disabled"),
    onClick: submit
  }, React.createElement(Icon, {
    name: edit ? "check" : "plus",
    size: 18,
    stroke: 2.4
  }), edit ? "Save Changes" : "Add Entry"), React.createElement("button", {
    className: "action action--ghost",
    onClick: onClose
  }, "Cancel"))));
}
Object.assign(window, {
  Icon,
  LevelTag,
  EntryCard,
  DetailView,
  AddEntryForm
});
})();

/* ====== docs.jsx ====== */
(function(){
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
function DocItem({
  doc
}) {
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
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    }
  }
  return React.createElement("button", {
    className: "doc",
    onClick: open
  }, React.createElement("span", {
    className: "doc__ic"
  }, React.createElement(Icon, {
    name: "file",
    size: 20,
    stroke: 1.8
  })), React.createElement("span", {
    className: "doc__meta"
  }, React.createElement("span", {
    className: "doc__name"
  }, name), React.createElement("span", {
    className: "doc__type"
  }, type, doc.fileName && doc.fileName !== name ? " · " + doc.fileName : "")), React.createElement("span", {
    className: "doc__act"
  }, React.createElement(Icon, {
    name: isLink ? "external" : "download",
    size: 17,
    stroke: 2
  })));
}
function DocLibrary({
  entry
}) {
  const docs = normalizeDocs(entry);
  if (!docs.length) return null;
  return React.createElement("div", {
    className: "docs"
  }, docs.map((d, i) => React.createElement(DocItem, {
    key: d.id || i,
    doc: d
  })));
}
function DocBuilder({
  docs,
  setDocs
}) {
  function update(i, patch) {
    setDocs(docs.map((d, j) => j === i ? {
      ...d,
      ...patch
    } : d));
  }
  function add() {
    setDocs([...docs, {
      id: "d" + Date.now() + Math.random().toString(36).slice(2, 6),
      label: "",
      url: ""
    }]);
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
    update(i, {
      fileKey: key,
      fileName: file.name,
      mime: file.type,
      url: ""
    });
  }
  const ACCEPT = ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.key,.pages,.txt,.csv,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  return React.createElement("div", {
    className: "fb"
  }, React.createElement("span", {
    className: "f__l"
  }, "Handouts & documents ", React.createElement("em", {
    className: "f__hint"
  }, "PDFs, Word docs, PowerPoints — or paste a Google Drive / OneDrive link")), docs.length === 0 && React.createElement("div", {
    className: "fb__empty"
  }, "No documents yet. Attach a scouting report, lifting program, or slide deck."), docs.map((d, i) => React.createElement("div", {
    className: "fb__row",
    key: d.id || i
  }, React.createElement("div", {
    className: "fb__head"
  }, React.createElement("input", {
    className: "f__in fb__label",
    value: d.label || "",
    onChange: e => update(i, {
      label: e.target.value
    }),
    placeholder: "Document " + (i + 1) + " name — e.g. Week 3 lifting plan"
  }), React.createElement("button", {
    className: "fb__rm",
    onClick: () => remove(i),
    "aria-label": "Remove document"
  }, React.createElement(Icon, {
    name: "trash",
    size: 16,
    stroke: 2
  }))), React.createElement("div", {
    className: "fb__src"
  }, d.fileKey ? React.createElement("div", {
    className: "fb__file"
  }, React.createElement(Icon, {
    name: "check",
    size: 15,
    stroke: 2.4
  }), React.createElement("span", {
    className: "fb__filename"
  }, d.fileName || "Uploaded file"), React.createElement("button", {
    className: "fb__clear",
    onClick: () => {
      window.FilmDB.del(d.fileKey);
      update(i, {
        fileKey: null,
        fileName: null,
        mime: null
      });
    }
  }, "Clear")) : React.createElement(React.Fragment, null, React.createElement("input", {
    className: "f__in fb__url",
    value: d.url || "",
    onChange: e => update(i, {
      url: e.target.value
    }),
    placeholder: "Paste a link (Google Drive, OneDrive, PDF URL)"
  }), React.createElement("span", {
    className: "fb__or"
  }, "or"), React.createElement("label", {
    className: "fb__upload"
  }, React.createElement(Icon, {
    name: "plus",
    size: 15,
    stroke: 2.4
  }), "Upload file", React.createElement("input", {
    type: "file",
    accept: ACCEPT,
    hidden: true,
    onChange: e => onFile(i, e.target.files[0])
  })))), (d.url || d.fileKey) && React.createElement("div", {
    className: "fb__prev fb__prev--ok"
  }, React.createElement(Icon, {
    name: "check",
    size: 13,
    stroke: 2.6
  }), docTypeLabel(d), d.fileKey ? " · uploaded · publishes to a docs/ folder" : " · opens in a new tab"))), React.createElement("button", {
    className: "fb__add",
    onClick: add
  }, React.createElement(Icon, {
    name: "plus",
    size: 16,
    stroke: 2.4
  }), "Add a document"));
}
Object.assign(window, {
  normalizeDocs,
  docTypeLabel,
  DocLibrary,
  DocBuilder
});
})();

/* ====== app.jsx ====== */
(function(){
const {
  useState,
  useMemo,
  useEffect
} = React;
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
  } catch {
    return new Set();
  }
}
function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}
function loadArr(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}
function loadObj(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
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
  }).map(x => x[0]);
}
function moveId(order, fullIds, dragId, overId) {
  const base = order && order.length ? order.filter(id => fullIds.includes(id)) : [...fullIds];
  for (const id of fullIds) if (!base.includes(id)) base.push(id);
  const from = base.indexOf(dragId),
    to = base.indexOf(overId);
  if (from < 0 || to < 0 || from === to) return base;
  base.splice(to, 0, base.splice(from, 1)[0]);
  return base;
}
const DIRECTIONS = {
  "Black & Cardinal": {
    theme: "dark",
    accent: "#E23B3F"
  },
  "White Court": {
    theme: "light",
    accent: "#C5050C"
  },
  "Locker Room": {
    theme: "ink",
    accent: "#E23B3F"
  }
};
const TWEAK_DEFAULTS = {
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
};
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const {
    CATEGORIES,
    ENTRIES,
    GATE,
    VERSION
  } = window.WKB;
  const gateOn = !!(GATE && (GATE.athlete || GATE.coach));
  const [role, setRole] = useState(() => gateOn ? sessionStorage.getItem("wkb_role") || null : "athlete");
  const coachMode = role === "coach";
  const canEdit = coachMode || !gateOn;
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
  function signOut() {
    sessionStorage.removeItem("wkb_role");
    setRole(null);
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
    } catch {}
  }, [openId]);
  useEffect(() => {
    function onKey(e) {
      if (e.key !== "Escape") return;
      if (showAdd) setShowAdd(false);else if (editEntry) setEditEntry(null);else if (openId) setOpenId(null);else if (navOpen) setNavOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showAdd, editEntry, openId, navOpen]);
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
    return base.filter(e => {
      if (seen.has(e.id)) return false;
      seen.add(e.id);
      return true;
    }).filter(e => !deleted.has(e.id)).map(e => edits[e.id] ? {
      ...e,
      ...edits[e.id]
    } : e);
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
    const named = CATEGORIES.map(c => ({
      ...c,
      label: catNames[c.id] || c.label
    }));
    return applyOrder(named, catOrder);
  }, [t.catTechnique, t.catDrills, t.catMindset, t.catWeight, t.catStrategy, t.catMatchstudy, t.catCulture, catOrder]);
  const catOf = id => cats.find(c => c.id === id) || cats[0];
  function onCatDrop(overId) {
    if (!navDragId || navDragId === overId) return setNavDragId(null);
    setCatOrder(moveId(catOrder, CATEGORIES.map(c => c.id), navDragId, overId));
    setNavDragId(null);
  }
  const toggle = setFn => id => setFn(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const onSave = toggle(setSaved);
  const onLearn = toggle(setLearned);
  function addEntry(entry) {
    setUserEntries(prev => [entry, ...prev]);
    setShowAdd(false);
    setView(entry.category);
    setTimeout(() => setOpenId(entry.id), 60);
  }
  function saveEdit(entry) {
    if (userEntries.some(e => e.id === entry.id)) {
      setUserEntries(prev => prev.map(e => e.id === entry.id ? entry : e));
    } else {
      setEdits(prev => ({
        ...prev,
        [entry.id]: entry
      }));
    }
    setEditEntry(null);
    setTimeout(() => setOpenId(entry.id), 60);
  }
  function startEdit(entry) {
    setOpenId(null);
    setEditEntry(entry);
  }
  function deleteEntry(id) {
    const ent = allEntries.find(e => e.id === id);
    if (ent && window.normalizeFilms) {
      window.normalizeFilms(ent).forEach(f => {
        if (f.fileKey && window.FilmDB) window.FilmDB.del(f.fileKey);
      });
    }
    if (ent && Array.isArray(ent.docs)) {
      ent.docs.forEach(d => {
        if (d && d.fileKey && window.FilmDB) window.FilmDB.del(d.fileKey);
      });
    }
    setDeleted(prev => new Set(prev).add(id));
    setEdits(prev => {
      const n = {
        ...prev
      };
      delete n[id];
      return n;
    });
    setSaved(prev => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
    setLearned(prev => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
    setOpenId(null);
  }
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = allEntries.filter(e => {
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
    setEntryOrder(moveId(entryOrder, allEntries.map(e => e.id), dragId, overId));
    setDragId(null);
  }
  const openEntry = openId ? allEntries.find(e => e.id === openId) : null;
  const learnedCount = learned.size;
  const totalCount = allEntries.length;
  const pct = totalCount ? Math.round(learnedCount / totalCount * 100) : 0;
  const navItems = [{
    id: "all",
    label: t.allTitle,
    icon: "search",
    count: allEntries.length
  }, ...cats.map(c => ({
    id: c.id,
    label: c.label,
    icon: c.icon,
    count: allEntries.filter(e => e.category === c.id).length
  }))];
  function go(v) {
    setView(v);
    setQuery("");
    setNavOpen(false);
  }
  function extFor(film) {
    const fromName = (film.fileName || "").match(/\.([a-z0-9]+)$/i);
    if (fromName) return fromName[1].toLowerCase();
    const m = {
      "video/mp4": "mp4",
      "video/webm": "webm",
      "video/ogg": "ogg",
      "video/quicktime": "mov"
    };
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
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }
  async function publishContent() {
    const publishCats = cats.map(c => ({
      id: c.id,
      label: c.label,
      short: c.short,
      icon: c.icon
    }));
    const videoFiles = [];
    const docFiles = [];
    const missing = [];
    const ordered = applyOrder(allEntries, entryOrder);
    const publishEntries = [];
    for (const e of ordered) {
      const {
        _local,
        ...rest
      } = e;
      if (Array.isArray(rest.films)) {
        rest.films = await Promise.all(rest.films.map(async f => {
          if (!f.fileKey) return f;
          const ext = extFor(f);
          const name = f.fileKey + "." + ext;
          const blob = window.FilmDB ? await window.FilmDB.get(f.fileKey) : null;
          if (blob) videoFiles.push({
            name,
            blob
          });else missing.push(f.fileName || name);
          const {
            fileKey,
            mime,
            ...keep
          } = f;
          return {
            ...keep,
            url: "films/" + name
          };
        }));
      }
      if (Array.isArray(rest.docs)) {
        rest.docs = await Promise.all(rest.docs.map(async d => {
          if (!d.fileKey) return d;
          const m = (d.fileName || "").match(/\.([a-z0-9]+)$/i);
          const ext = m ? m[1].toLowerCase() : "bin";
          const name = d.fileKey + "." + ext;
          const blob = window.FilmDB ? await window.FilmDB.get(d.fileKey) : null;
          if (blob) docFiles.push({
            name,
            blob
          });else missing.push(d.fileName || name);
          const {
            fileKey,
            mime,
            ...keep
          } = d;
          return {
            ...keep,
            url: "docs/" + name
          };
        }));
      }
      publishEntries.push(rest);
    }
    const body = {
      version: new Date().toISOString().slice(0, 10),
      gate: {
        athlete: t.athletePass || "",
        coach: t.coachPass || ""
      },
      categories: publishCats,
      entries: publishEntries
    };
    const text = "// ============================================================\n" + "//  content.js — PUBLISHED Badger Knowledge Base content\n" + "//  Generated " + new Date().toLocaleString() + "\n" + "//  Replace this file on your host and re-deploy to update every athlete.\n" + "// ============================================================\n\n" + "window.WKB_PUBLISHED = " + JSON.stringify(body, null, 2) + ";\n";
    const hasUploads = videoFiles.length > 0 || docFiles.length > 0;
    const zipper = await loadJSZip();
    if (zipper) {
      const zip = new zipper();
      zip.file("content.js", text);
      videoFiles.forEach(v => zip.file("films/" + v.name, v.blob));
      docFiles.forEach(d => zip.file("docs/" + d.name, d.blob));
      const blob = await zip.generateAsync({
        type: "blob"
      });
      downloadBlob(blob, "badgers-publish-" + body.version + ".zip");
      const lines = ["Publish zip downloaded.", "", "1. Unzip it.", "2. Copy everything inside into your site folder (replace content.js" + (hasUploads ? ", keep the films/ and docs/ folders next to it" : "") + ").", "3. Re-deploy (drag the folder onto Netlify Drop)."];
      if (missing.length) {
        lines.push("", "⚠ Could not find the file for: " + missing.join(", "), "(It was cleared from this browser. Re-upload it, then Publish again.)");
      }
      setTimeout(() => window.alert(lines.join("\n")), 200);
      return;
    }
    downloadBlob(new Blob([text], {
      type: "text/javascript"
    }), "content.js");
    const allDl = [...videoFiles, ...docFiles];
    for (let i = 0; i < allDl.length; i++) {
      const f = allDl[i];
      setTimeout(() => downloadBlob(f.blob, f.name), 700 * (i + 1));
    }
    const lines = ["Published content.js downloaded."];
    if (videoFiles.length) {
      lines.push("", videoFiles.length + " uploaded video file(s) are downloading too.", "Put ALL of them inside a folder named  films/  next to your other files, then re-deploy.");
    }
    if (docFiles.length) {
      lines.push("", docFiles.length + " uploaded document(s) are downloading too.", "Put ALL of them inside a folder named  docs/  next to your other files, then re-deploy.");
    }
    if (missing.length) {
      lines.push("", "⚠ Could not find the file for: " + missing.join(", "), "(It was cleared from this browser. Re-upload it, then Publish again.)");
    }
    setTimeout(() => window.alert(lines.join("\n")), 200);
  }
  function loadJSZip() {
    if (window.JSZip) return Promise.resolve(window.JSZip);
    return new Promise(res => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      s.onload = () => res(window.JSZip || null);
      s.onerror = () => res(null);
      document.head.appendChild(s);
    });
  }
  function clearLocalDrafts() {
    if (!window.confirm("Clear your local drafts on this device? This removes unpublished adds/edits/deletes and custom ordering. Already-published content is unaffected.")) return;
    [LS.user, LS.edits, LS.deleted, LS.entryOrder, LS.catOrder].forEach(k => localStorage.removeItem(k));
    setUserEntries([]);
    setEdits({});
    setDeleted(new Set());
    setEntryOrder([]);
    setCatOrder([]);
  }
  if (gateOn && !role) {
    return React.createElement(LoginGate, {
      team: t.brandTeam,
      onUnlock: unlock
    });
  }
  const viewTitle = view === "all" ? t.allTitle : view === "saved" ? "Saved" : view === "progress" ? "My Progress" : catOf(view).label;
  const viewSub = view === "all" ? t.allSub : view === "saved" ? "Everything you've starred to come back to." : view === "progress" ? "What you've locked in this season." : {
    technique: "Positions and finishes drilled in the room.",
    drills: "Conditioning and skill circuits.",
    mindset: "The mental side of the six minutes.",
    weight: "Making weight the smart way, fueling to compete.",
    strategy: "Scouting, the clock, and match tactics.",
    matchstudy: "Full matches broken down — watch, study, apply.",
    culture: "Who we are and what we stand for."
  }[view] || "";
  const gridStyle = t.layout !== "List" && t.gridCols !== "Auto" ? {
    gridTemplateColumns: `repeat(${t.gridCols}, minmax(0,1fr))`
  } : undefined;
  const cardShow = {
    summary: t.cardSummary,
    level: t.cardLevel,
    film: t.cardFilm
  };
  return React.createElement("div", {
    className: "shell"
  }, React.createElement("aside", {
    className: "side" + (navOpen ? " side--open" : "")
  }, React.createElement("div", {
    className: "brand"
  }, React.createElement("div", {
    className: "brand__mark"
  }, "W"), React.createElement("div", {
    className: "brand__text"
  }, React.createElement("span", {
    className: "brand__team"
  }, t.brandTeam), React.createElement("span", {
    className: "brand__sub"
  }, t.brandSub))), gateOn && React.createElement("div", {
    className: "rolebar"
  }, React.createElement("span", {
    className: "rolebar__tag" + (coachMode ? " rolebar__tag--coach" : "")
  }, coachMode ? "Coach — editing" : "Athlete"), React.createElement("span", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, canEdit && React.createElement("button", {
    className: "rolebar__out",
    onClick: () => window.postMessage({
      type: "__activate_edit_mode"
    }, "*")
  }, "Publish / Settings"), React.createElement("button", {
    className: "rolebar__out",
    onClick: signOut
  }, "Sign out"))), React.createElement("nav", {
    className: "nav"
  }, React.createElement("span", {
    className: "nav__head"
  }, "Browse"), navItems.map(n => {
    const draggable = n.id !== "all";
    return React.createElement("button", {
      key: n.id,
      className: "navitem" + (view === n.id ? " navitem--on" : "") + (navDragId === n.id ? " navitem--dragging" : ""),
      onClick: () => go(n.id),
      draggable: draggable,
      onDragStart: draggable ? e => {
        setNavDragId(n.id);
        e.dataTransfer.effectAllowed = "move";
      } : undefined,
      onDragOver: draggable ? e => {
        e.preventDefault();
      } : undefined,
      onDrop: draggable ? e => {
        e.preventDefault();
        onCatDrop(n.id);
      } : undefined,
      onDragEnd: () => setNavDragId(null)
    }, draggable && React.createElement(Icon, {
      name: "grip",
      size: 15,
      stroke: 2,
      className: "navitem__grip"
    }), React.createElement(Icon, {
      name: n.icon,
      size: 18,
      stroke: 2
    }), React.createElement("span", {
      className: "navitem__l"
    }, n.label), React.createElement("span", {
      className: "navitem__c"
    }, n.count));
  }), React.createElement("span", {
    className: "nav__head"
  }, "You"), React.createElement("button", {
    className: "navitem" + (view === "saved" ? " navitem--on" : ""),
    onClick: () => go("saved")
  }, React.createElement(Icon, {
    name: "star",
    size: 18,
    stroke: 2
  }), React.createElement("span", {
    className: "navitem__l"
  }, "Saved"), React.createElement("span", {
    className: "navitem__c"
  }, saved.size)), t.showYouNav && React.createElement("button", {
    className: "navitem" + (view === "progress" ? " navitem--on" : ""),
    onClick: () => go("progress")
  }, React.createElement(Icon, {
    name: "check",
    size: 18,
    stroke: 2.2
  }), React.createElement("span", {
    className: "navitem__l"
  }, "My Progress"), React.createElement("span", {
    className: "navitem__c"
  }, learned.size))), t.showProgressWidget && React.createElement("div", {
    className: "progress"
  }, React.createElement("div", {
    className: "progress__top"
  }, React.createElement("span", {
    className: "progress__lab"
  }, "Season Progress"), React.createElement("span", {
    className: "progress__pct"
  }, pct, "%")), React.createElement("div", {
    className: "progress__bar"
  }, React.createElement("div", {
    className: "progress__fill",
    style: {
      width: pct + "%"
    }
  })), React.createElement("span", {
    className: "progress__sub"
  }, learnedCount, " of ", totalCount, " learned"))), navOpen && React.createElement("div", {
    className: "scrim",
    onClick: () => setNavOpen(false)
  }), React.createElement("main", {
    className: "main"
  }, React.createElement("header", {
    className: "top"
  }, React.createElement("button", {
    className: "hamb",
    onClick: () => setNavOpen(true),
    "aria-label": "Menu"
  }, React.createElement("span", null), React.createElement("span", null), React.createElement("span", null)), React.createElement("div", {
    className: "searchbar"
  }, React.createElement(Icon, {
    name: "search",
    size: 19,
    stroke: 2
  }), React.createElement("input", {
    className: "searchbar__in",
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search moves, drills, mindset…"
  }), query && React.createElement("button", {
    className: "searchbar__x",
    onClick: () => setQuery("")
  }, React.createElement(Icon, {
    name: "close",
    size: 16
  }))), React.createElement("button", {
    className: "addbtn",
    onClick: () => setShowAdd(true),
    style: {
      display: canEdit ? undefined : "none"
    }
  }, React.createElement(Icon, {
    name: "plus",
    size: 18,
    stroke: 2.4
  }), React.createElement("span", null, "Add Entry"))), React.createElement("div", {
    className: "content"
  }, React.createElement("div", {
    className: "phead"
  }, React.createElement("div", null, React.createElement("h1", {
    className: "phead__title"
  }, viewTitle), React.createElement("p", {
    className: "phead__sub"
  }, viewSub)), React.createElement("div", {
    className: "phead__count"
  }, results.length, " ", results.length === 1 ? "entry" : "entries")), view !== "saved" && view !== "progress" && React.createElement("div", {
    className: "chips"
  }, React.createElement("button", {
    className: "chip" + (view === "all" ? " chip--on" : ""),
    onClick: () => go("all")
  }, "All"), cats.map(c => React.createElement("button", {
    key: c.id,
    className: "chip" + (view === c.id ? " chip--on" : "") + (navDragId === c.id ? " chip--dragging" : ""),
    onClick: () => go(c.id),
    draggable: true,
    onDragStart: e => {
      setNavDragId(c.id);
      e.dataTransfer.effectAllowed = "move";
    },
    onDragOver: e => e.preventDefault(),
    onDrop: e => {
      e.preventDefault();
      onCatDrop(c.id);
    },
    onDragEnd: () => setNavDragId(null)
  }, React.createElement(Icon, {
    name: c.icon,
    size: 14,
    stroke: 2
  }), c.short))), results.length === 0 ? React.createElement("div", {
    className: "empty"
  }, React.createElement("div", {
    className: "empty__mark"
  }, React.createElement(Icon, {
    name: view === "saved" ? "star" : view === "progress" ? "check" : "search",
    size: 30,
    stroke: 1.7
  })), React.createElement("h3", null, query ? "No results" : view === "saved" ? "Nothing saved yet" : view === "progress" ? "Nothing learned yet" : "Empty"), React.createElement("p", null, query ? `Nothing matches “${query}”. Try another term.` : view === "saved" ? "Tap the star on any entry to keep it here." : view === "progress" ? "Open an entry and mark it learned to track your season." : "Add the first entry for this category.")) : React.createElement("div", {
    className: "grid" + (t.layout === "List" ? " grid--list" : ""),
    style: gridStyle
  }, results.map(e => React.createElement(EntryCard, {
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
      onDragStart: ev => {
        setDragId(e.id);
        ev.dataTransfer.effectAllowed = "move";
      },
      onDragOver: ev => ev.preventDefault(),
      onDrop: ev => {
        ev.preventDefault();
        onEntryDrop(e.id);
      },
      onDragEnd: () => setDragId(null)
    } : null,
    onOpen: () => setOpenId(e.id),
    onSave: onSave
  }))))), openEntry && React.createElement(DetailView, {
    entry: openEntry,
    cat: catOf(openEntry.category),
    saved: saved.has(openEntry.id),
    learned: learned.has(openEntry.id),
    onClose: () => setOpenId(null),
    onSave: onSave,
    onLearn: onLearn,
    onEdit: startEdit,
    onDelete: deleteEntry,
    canEdit: canEdit,
    show: {
      film: t.detailFilm,
      steps: t.detailSteps,
      coachNotes: t.detailCoachNotes,
      tags: t.detailTags
    }
  }), showAdd && React.createElement(AddEntryForm, {
    onClose: () => setShowAdd(false),
    onAdd: addEntry
  }), editEntry && React.createElement(AddEntryForm, {
    initial: editEntry,
    onClose: () => setEditEntry(null),
    onAdd: saveEdit
  }), React.createElement(TweaksPanel, null, canEdit && React.createElement(TweakSection, {
    label: "Publishing"
  }), canEdit && React.createElement(TweakButton, {
    label: "Publish content (download)",
    onClick: publishContent
  }), canEdit && React.createElement(TweakText, {
    label: "Athlete passcode",
    value: t.athletePass,
    onChange: v => setTweak("athletePass", v)
  }), canEdit && React.createElement(TweakText, {
    label: "Coach passcode",
    value: t.coachPass,
    onChange: v => setTweak("coachPass", v)
  }), canEdit && React.createElement(TweakButton, {
    label: "Clear my local drafts",
    secondary: true,
    onClick: clearLocalDrafts
  }), React.createElement(TweakSection, {
    label: "Preset"
  }), React.createElement(TweakSelect, {
    label: "Direction",
    value: t.direction,
    options: Object.keys(DIRECTIONS),
    onChange: v => setTweak({
      direction: v,
      theme: DIRECTIONS[v].theme,
      accent: DIRECTIONS[v].accent
    })
  }), React.createElement(TweakSection, {
    label: "Color"
  }), React.createElement(TweakColor, {
    label: "Accent",
    value: t.accent,
    onChange: v => setTweak("accent", v)
  }), React.createElement(TweakRadio, {
    label: "Theme",
    value: t.theme,
    options: ["dark", "light", "ink"],
    onChange: v => setTweak("theme", v)
  }), React.createElement(TweakSection, {
    label: "Layout"
  }), React.createElement(TweakRadio, {
    label: "Cards",
    value: t.layout,
    options: ["Grid", "List"],
    onChange: v => setTweak("layout", v)
  }), React.createElement(TweakSelect, {
    label: "Columns",
    value: t.gridCols,
    options: ["Auto", "2", "3", "4"],
    onChange: v => setTweak("gridCols", v)
  }), React.createElement(TweakRadio, {
    label: "Density",
    value: t.density,
    options: ["compact", "regular", "comfy"],
    onChange: v => setTweak("density", v)
  }), React.createElement(TweakButton, {
    label: "Reset all ordering",
    secondary: true,
    onClick: () => {
      setEntryOrder([]);
      setCatOrder([]);
    }
  }), React.createElement(TweakSection, {
    label: "Cards"
  }), React.createElement(TweakToggle, {
    label: "Summary text",
    value: t.cardSummary,
    onChange: v => setTweak("cardSummary", v)
  }), React.createElement(TweakToggle, {
    label: "Level badge",
    value: t.cardLevel,
    onChange: v => setTweak("cardLevel", v)
  }), React.createElement(TweakToggle, {
    label: "Film thumbnail",
    value: t.cardFilm,
    onChange: v => setTweak("cardFilm", v)
  }), React.createElement(TweakSlider, {
    label: "Corner radius",
    value: t.cardRadius,
    min: 0,
    max: 28,
    unit: "px",
    onChange: v => setTweak("cardRadius", v)
  }), React.createElement(TweakToggle, {
    label: "Card shadow",
    value: t.cardShadow,
    onChange: v => setTweak("cardShadow", v)
  }), React.createElement(TweakSection, {
    label: "Detail Panel"
  }), React.createElement(TweakSlider, {
    label: "Width",
    value: t.detailWidth,
    min: 440,
    max: 760,
    step: 20,
    unit: "px",
    onChange: v => setTweak("detailWidth", v)
  }), React.createElement(TweakToggle, {
    label: "Film library",
    value: t.detailFilm,
    onChange: v => setTweak("detailFilm", v)
  }), React.createElement(TweakToggle, {
    label: "Steps / key points",
    value: t.detailSteps,
    onChange: v => setTweak("detailSteps", v)
  }), React.createElement(TweakToggle, {
    label: "Coach's notes",
    value: t.detailCoachNotes,
    onChange: v => setTweak("detailCoachNotes", v)
  }), React.createElement(TweakToggle, {
    label: "Tags",
    value: t.detailTags,
    onChange: v => setTweak("detailTags", v)
  }), React.createElement(TweakSection, {
    label: "Sidebar"
  }), React.createElement(TweakText, {
    label: "Team name",
    value: t.brandTeam,
    onChange: v => setTweak("brandTeam", v)
  }), React.createElement(TweakText, {
    label: "Subtitle",
    value: t.brandSub,
    onChange: v => setTweak("brandSub", v)
  }), React.createElement(TweakToggle, {
    label: "Progress widget",
    value: t.showProgressWidget,
    onChange: v => setTweak("showProgressWidget", v)
  }), React.createElement(TweakToggle, {
    label: "“My Progress” nav",
    value: t.showYouNav,
    onChange: v => setTweak("showYouNav", v)
  }), React.createElement(TweakSection, {
    label: "Page Header"
  }), React.createElement(TweakText, {
    label: "Home title",
    value: t.allTitle,
    onChange: v => setTweak("allTitle", v)
  }), React.createElement(TweakText, {
    label: "Home subtitle",
    value: t.allSub,
    onChange: v => setTweak("allSub", v)
  }), React.createElement(TweakSection, {
    label: "Category Names"
  }), React.createElement(TweakText, {
    label: "Technique",
    value: t.catTechnique,
    onChange: v => setTweak("catTechnique", v)
  }), React.createElement(TweakText, {
    label: "Drills",
    value: t.catDrills,
    onChange: v => setTweak("catDrills", v)
  }), React.createElement(TweakText, {
    label: "Mindset",
    value: t.catMindset,
    onChange: v => setTweak("catMindset", v)
  }), React.createElement(TweakText, {
    label: "Weight",
    value: t.catWeight,
    onChange: v => setTweak("catWeight", v)
  }), React.createElement(TweakText, {
    label: "Strategy",
    value: t.catStrategy,
    onChange: v => setTweak("catStrategy", v)
  }), React.createElement(TweakText, {
    label: "Match Study",
    value: t.catMatchstudy,
    onChange: v => setTweak("catMatchstudy", v)
  }), React.createElement(TweakText, {
    label: "Culture",
    value: t.catCulture,
    onChange: v => setTweak("catCulture", v)
  })));
}
function LoginGate({
  team,
  onUnlock
}) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  function submit(e) {
    e.preventDefault();
    if (!onUnlock(code.trim())) {
      setErr(true);
      setCode("");
    }
  }
  return React.createElement("div", {
    className: "gate"
  }, React.createElement("form", {
    className: "gate__card",
    onSubmit: submit
  }, React.createElement("div", {
    className: "gate__mark"
  }, "W"), React.createElement("h1", {
    className: "gate__team"
  }, team), React.createElement("p", {
    className: "gate__sub"
  }, "Team passcode required to enter the knowledge base."), React.createElement("input", {
    className: "gate__in" + (err ? " gate__in--err" : ""),
    type: "password",
    value: code,
    autoFocus: true,
    placeholder: "Passcode",
    onChange: e => {
      setCode(e.target.value);
      setErr(false);
    }
  }), err && React.createElement("span", {
    className: "gate__err"
  }, "That passcode didn't match. Try again."), React.createElement("button", {
    className: "gate__btn",
    type: "submit"
  }, "Enter")));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
})();
