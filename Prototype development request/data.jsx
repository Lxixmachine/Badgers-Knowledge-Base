// data.jsx — seed content for the Badgers Wrestling Knowledge Base
// Exposed on window for the other Babel scripts.

const CATEGORIES = [
  { id: "technique",  label: "Technique",        short: "Moves",      icon: "grapple" },
  { id: "drills",     label: "Drills & Conditioning", short: "Drills", icon: "lungs" },
  { id: "mindset",    label: "Mindset",          short: "Mindset",    icon: "brain" },
  { id: "weight",     label: "Weight & Nutrition", short: "Weight",   icon: "scale" },
  { id: "strategy",   label: "Strategy & Scouting", short: "Strategy", icon: "target" },
  { id: "matchstudy", label: "Match Study",        short: "Match Study", icon: "clapper" },
  { id: "culture",    label: "Culture & Quotes", short: "Culture",    icon: "flag" },
];

const LEVELS = ["Fundamental", "Varsity", "Advanced"];

// Coaches in the program (for the "added by" line + add-entry author menu)
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
      { id: "hc5", role: "Drill", label: "Live go from the room" },
    ],
    summary: "The bread-and-butter Badger leg attack. Penetrate on the high crotch, then convert to a double when they sprawl.",
    steps: [
      "Level change — head up, hips drop. Don't bend at the waist.",
      "Penetration step to the knee, ear tight to the hip, hand cupping behind the knee.",
      "Drive the corner: turn the body, don't lift straight up.",
      "If they sprawl, switch the near hand to the far knee and run the pipe to a double.",
      "Finish facing the same direction you started — head inside, follow the hips down.",
    ],
    coachNotes: "Number one error is dropping the head. You penetrate with your eyes up so you can see the finish. Live this every Monday until it's reflex.",
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
      { id: "sp3", role: "Drill", label: "50-rep sprawl conditioning" },
    ],
    summary: "First line of defense against any leg attack. Hips down, legs back, then circle to the back.",
    steps: [
      "React to the level change — snap the hips down and legs back in one motion.",
      "Crossface and underhook to flatten their attack and kill the head.",
      "Walk the legs away from their grip; don't let them reattach.",
      "Once their head pops out, circle hard to the same side as your underhook.",
      "Get to the back, hands locked, and run a tight far ankle to finish.",
    ],
    coachNotes: "A good sprawl wins matches. We chart sprawl reps in conditioning — 50 a day, every day. Heavy hips beat fast legs.",
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
      "Drive off your toes and follow them over; flatten the half to lock the pin.",
    ],
    coachNotes: "A shallow half gets reversed. Get it deep or don't get it at all. Always pair it with a tight waist so they can't post.",
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
      { id: "su3", role: "Common mistake", label: "Bending forward — getting ridden" },
    ],
    summary: "Your go-to escape from the bottom. Hand control, stand, and cut the corner.",
    steps: [
      "Win the whistle — explode up off the near foot before they can ride.",
      "Control the hands: peel their lock and clamp wrist control.",
      "Stand tall, hips back into them, never bend forward.",
      "Cut a sharp corner, clear the hips, and face them to score the escape.",
    ],
    coachNotes: "Hand control first, always. You can't escape what's still locked around your waist. Drill the wrist peel until it's automatic.",
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
      "Station 6 — Hand-fighting, live, 45 sec. Rest 60 sec. Repeat x4.",
    ],
    coachNotes: "Matches are won in the third period. This circuit is non-negotiable Tuesday and Thursday. Track your rounds and beat last week.",
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
      { id: "hf3", role: "Match", label: "Winning the ties at the whistle" },
    ],
    summary: "Progressive tie-up drill that builds the grip strength and head position to dictate every neutral exchange.",
    steps: [
      "Collar tie snaps — pull the head down, snap to the side, reset.",
      "Two-on-one wrist control — strip and re-pummel for 30 sec.",
      "Underhook pummeling — fight for the inside, hips tight.",
      "Live hand-fight to a single touch behind the elbow scores.",
    ],
    coachNotes: "The wrestler who controls the ties controls the match. We hand-fight every single practice. Win the hands, win the shot.",
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
      "Bank small wins — a good stance, a stuffed shot, a re-shot — they compound.",
    ],
    coachNotes: "You can't wrestle six minutes at once. You wrestle the next ten seconds, then the next. Stay in the position you're in.",
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
      "Show up the next day. Consistency under fatigue is the whole skill.",
    ],
    coachNotes: "Nobody remembers the easy days. The grind is the point. When it's hardest is exactly when you're becoming who you want to be.",
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
      "On deck: three slow breaths, picture your first attack, then attack.",
    ],
    coachNotes: "Nerves mean you care. The routine gives the nerves a job. Same warm-up every time so your body knows it's go-time.",
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
      "Refuel immediately after weigh-ins: water, carbs, a little protein.",
    ],
    coachNotes: "We do not cut to the point it costs us in the third period. If the cut makes you weaker, you're in the wrong class. Talk to a coach before you change weight.",
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
      "Keep moving between matches — light walk, stay warm, don't cool all the way down.",
    ],
    coachNotes: "Bracket day is a marathon of sprints. The kid who fuels right is the kid still scoring in the finals.",
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
      { id: "sc2", role: "Other", label: "Example scout: reading lead leg & ties" },
    ],
    summary: "A checklist for breaking down film so you walk to the line already knowing what they do.",
    steps: [
      "Stance & lead leg — which side do they shoot from, which leg is exposed?",
      "First-move tendency — do they shoot early, tie up, or wait and counter?",
      "Top game — what's their go-to turn? Bottom game — stand-up or roll?",
      "Score situations — what do they do up two? Down two with a minute left?",
    ],
    coachNotes: "Wrestle the man, not the name. Every opponent has a pattern. Find it on film and take it away on the mat.",
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
      "Neutral and up — stay in good stance, hand-fight, force the action to the edge.",
    ],
    coachNotes: "The last minute is its own skill. We drill 'protect the lead' and 'must-score' situations live every week so the clock never surprises you.",
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
      "Finish everything you start — drills, sprints, matches, seasons.",
    ],
    coachNotes: "Talent is common. The standard is what separates us. You don't rise to the occasion — you fall to your training. Hold the standard daily.",
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
      "\"Once you've wrestled, everything else in life is easy.\" — Dan Gable",
      "\"The harder I work, the harder it is to surrender.\"",
      "\"Champions are made when no one is watching.\"",
      "\"Win the position you're in.\"",
    ],
    coachNotes: "Pick one that hits you and make it yours this season. These aren't posters — they're reminders of how we've decided to compete.",
  },
];

// Merge in published content (content.js) when present; otherwise use the built-in seed.
const P = window.WKB_PUBLISHED || {};
// Start from the published categories (if any), then append any built-in categories
// the publish predates — so newly added defaults (e.g. Match Study) always show,
// even on a site whose content.js was published before they existed.
function mergeCategories() {
  const published = (P.categories && P.categories.length) ? P.categories.slice() : null;
  if (!published) return CATEGORIES;
  const have = new Set(published.map((c) => c.id));
  CATEGORIES.forEach((c) => { if (!have.has(c.id)) published.push(c); });
  return published;
}
window.WKB = {
  CATEGORIES: mergeCategories(),
  LEVELS,
  COACHES,
  ENTRIES: (P.entries && P.entries.length) ? P.entries : ENTRIES,
  GATE: P.gate || { athlete: "", coach: "" },
  VERSION: P.version || null,
};
