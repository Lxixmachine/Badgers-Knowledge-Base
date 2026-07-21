// mindset.jsx — private, device-local athlete reflection workbook.
// This component intentionally never reads from or writes to window.WKB.
const { useEffect, useMemo, useRef, useState } = React;
const MINDSET_CURRICULUM_UNITS = window.MINDSET_CURRICULUM_UNITS || [];
const MINDSET_CURRICULUM_CONTEXT = window.MINDSET_CURRICULUM_CONTEXT || {};
const MINDSET_CURRICULUM_UNIT_CONTEXT = window.MINDSET_CURRICULUM_UNIT_CONTEXT || {};

const MINDSET_STORAGE_KEY = "wkb_mindset_workbook_v1";
const MINDSET_RESTORE_RECOVERY_KEY = "wkb_mindset_workbook_before_restore_v1";
const MINDSET_BACKUP_TYPE = "wkb-mindset-workbook";
const MINDSET_SCHEMA_VERSION = 1;
const MINDSET_MAX_BACKUP_BYTES = 4 * 1024 * 1024;
const MINDSET_MAX_HISTORY_ENTRIES = 200;
const MINDSET_MAX_TEXT_LENGTH = 1000;

const BASELINE_GROUPS = [
  {
    id: "goal-setting",
    label: "Goal Setting",
    questions: [
      ["goal-clear", "I have clear season goals that I can describe in my own words."],
      ["goal-weekly", "I turn my bigger goals into specific actions for this week."],
      ["goal-review", "I review my goals and adjust my next steps when needed."],
    ],
  },
  {
    id: "mental-toughness",
    label: "Mental Toughness",
    questions: [
      ["tough-reset", "I can reset and choose a useful next action after a mistake."],
      ["tough-engage", "I stay engaged when practice or a match becomes difficult."],
      ["tough-setback", "I respond to setbacks with purposeful effort and attention."],
    ],
  },
  {
    id: "motivation",
    label: "Motivation",
    questions: [
      ["motivation-why", "I know why improving as a wrestler matters to me."],
      ["motivation-effort", "I can bring purposeful effort even when motivation is low."],
      ["motivation-connect", "I connect daily practice work to something I want to improve."],
    ],
  },
  {
    id: "present-moment",
    label: "Present Moment",
    questions: [
      ["present-position", "I focus on the current position instead of getting stuck on the outcome."],
      ["present-return", "When I notice a distraction, I return attention to my next job."],
      ["present-engaged", "I stay engaged with what is happening now in practice and competition."],
    ],
  },
  {
    id: "relaxing-under-pressure",
    label: "Relaxing under Pressure",
    questions: [
      ["relax-breathe", "I use a familiar breathing cue to settle before competition."],
      ["relax-ready", "I keep my body loose and ready when the moment feels important."],
      ["relax-release", "I notice unnecessary tension and return to my practiced routine."],
    ],
  },
  {
    id: "confidence",
    label: "Confidence",
    questions: [
      ["confidence-trust", "I trust the skills and positions I have prepared."],
      ["confidence-talk", "My self-talk reflects the work I have put in."],
      ["confidence-decide", "I can compete decisively after a mistake or lost position."],
    ],
  },
  {
    id: "clarity",
    label: "Clarity",
    questions: [
      ["clarity-opening", "I know my first attack and the pace I want to establish."],
      ["clarity-positions", "I know my first response from my key positions."],
      ["clarity-cues", "I have simple cues to use when a match feels chaotic."],
    ],
  },
  {
    id: "aggressiveness",
    label: "Aggressiveness",
    questions: [
      ["aggressive-pressure", "I move forward with controlled, purposeful pressure."],
      ["aggressive-initiate", "I initiate attacks instead of waiting for the other wrestler."],
      ["aggressive-follow", "I pursue finishes and re-attacks while staying technically sound."],
    ],
  },
];

const BASELINE_QUESTION_IDS = BASELINE_GROUPS.reduce(
  (ids, group) => ids.concat(group.questions.map((question) => question[0])),
  []
);

const BASELINE_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "working", label: "Working on it" },
  { value: "unsure", label: "Unsure" },
];

const GAME_PLAN_TEXT_KEYS = [
  "tiePreference",
  "tieCreation",
  "tieAnswer",
  "counterOffense",
  "topFirstMove",
  "bottomFirstMove",
  "matReturn",
];

const RESET_FIELDS = [
  { key: "dynamicStretch", label: "Dynamic stretch", placeholder: "The sequence and cues I use" },
  { key: "funElement", label: "Fun element", placeholder: "Something familiar that keeps the routine enjoyable" },
  { key: "deepBreathing", label: "Deep breathing", placeholder: "My breathing count or cue" },
  { key: "drilling", label: "Drilling and hand fighting", placeholder: "The positions, pace, and partner cues I want" },
  { key: "thoughtsMusic", label: "Exact thoughts or music", placeholder: "The exact words, cues, song, or quiet I choose" },
  { key: "shotgunRoutine", label: "Under-two-minute shotgun routine", placeholder: "My short routine, in order" },
];

const POST_MATCH_CHECKLIST = [
  ["warmup", "Warm-up"],
  ["fullRoutine", "Full pre-match routine"],
  ["firstShot", "First shot"],
  ["forwardPressure", "Forward pressure"],
  ["attackAttempts", "Attack attempts"],
  ["tieControl", "Tie control"],
  ["topFirstMove", "Top first move"],
  ["turnAttempts", "Looked to turn or pin"],
  ["matReturns", "Mat returns"],
  ["bottomFirstMove", "Bottom first move"],
  ["movement", "Constant bottom movement"],
  ["finishedPeriods", "Finished no period on bottom"],
  ["neverQuit", "Never quit"],
  ["effort", "Effort"],
  ["edgeEffort", "Wrestled through edges and period endings"],
  ["hustleCenter", "Hustled back to center"],
  ["composure", "Composure"],
  ["bodyLanguage", "Body language"],
  ["noClockWatching", "No clock watching"],
];
const LEGACY_POST_MATCH_REQUIRED_KEYS = [
  "warmup", "firstShot", "forwardPressure", "attackAttempts", "tieControl", "matReturns", "movement",
  "neverQuit", "effort", "composure", "bodyLanguage", "noClockWatching",
];
const POST_MATCH_ADDED_KEYS = ["fullRoutine", "turnAttempts", "finishedPeriods", "edgeEffort", "hustleCenter"];

const MINDSET_CURRICULUM_LESSONS = MINDSET_CURRICULUM_UNITS.reduce(
  (lessons, unit) => lessons.concat(unit.lessons.map((lesson) => ({ ...lesson, unitId: unit.id, unitTitle: unit.title }))),
  []
);
const MINDSET_CURRICULUM_LESSON_MAP = MINDSET_CURRICULUM_LESSONS.reduce((result, lesson) => {
  result[lesson.id] = lesson;
  return result;
}, {});
const MINDSET_CURRICULUM_RESPONSE_KEYS = new Set(
  MINDSET_CURRICULUM_LESSONS.reduce((keys, lesson) => keys.concat((lesson.fields || []).map((field) => lesson.id + "." + field.id)), [])
);

function localDateValue() {
  const now = new Date();
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
    improvementAreas: ["", "", ""],
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
    why: "",
  };
}

function makePreMatchReset() {
  return RESET_FIELDS.reduce((routine, field) => {
    routine[field.key] = "";
    return routine;
  }, {});
}

function makePostChecklist() {
  const checklist = POST_MATCH_CHECKLIST.reduce((result, item) => {
    result[item[0]] = false;
    return result;
  }, {});
  checklist.firstMove = false;
  return checklist;
}

function copyPostChecklist(checklist) {
  const result = POST_MATCH_CHECKLIST.reduce((copy, item) => {
    const legacyFirstMove = item[0] === "topFirstMove" || item[0] === "bottomFirstMove";
    copy[item[0]] = checklist[item[0]] === true || (legacyFirstMove && checklist.firstMove === true);
    return copy;
  }, {});
  result.firstMove = result.topFirstMove || result.bottomFirstMove;
  return result;
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
    nextAction: "",
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
    why: draft.why,
  };
}

function copyPostMatchDraft(draft) {
  return {
    editingId: draft.editingId,
    event: draft.event,
    date: draft.date,
    opponent: draft.opponent,
    result: draft.result,
    checklist: copyPostChecklist(draft.checklist),
    reflection: draft.reflection,
    improvements: draft.improvements.slice(0, 3),
    nextAction: draft.nextAction,
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
    postMatchReviews: [],
    curriculum: { responses: {} },
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

function hasOnlyStringValues(record) {
  return isRecord(record) && Object.keys(record).every((key) => isString(record[key]));
}

function validBaseline(value) {
  if (!isRecord(value) || !isRecord(value.answers) || !isRecord(value.notes)) return false;
  const validId = (id) => BASELINE_QUESTION_IDS.indexOf(id) >= 0;
  const answersValid = Object.keys(value.answers).every((id) =>
    validId(id) && ["yes", "working", "unsure"].indexOf(value.answers[id]) >= 0
  );
  const notesValid = Object.keys(value.notes).every((id) => validId(id) && isSafeString(value.notes[id]));
  return answersValid && notesValid;
}

function validGamePlan(value) {
  if (!isRecord(value) || !Array.isArray(value.takedowns) || value.takedowns.length !== 3) return false;
  if (!value.takedowns.every((item) =>
    isRecord(item) && isSafeString(item.shot) && isSafeString(item.setup) && isSafeString(item.finish)
  )) return false;
  if (!GAME_PLAN_TEXT_KEYS.every((key) => isSafeString(value[key]))) return false;
  return Array.isArray(value.improvementAreas) && value.improvementAreas.length === 3 &&
    value.improvementAreas.every(isSafeString);
}

function validWeeklyDraft(value) {
  return isRecord(value) && (value.editingId === null || isSafeString(value.editingId)) &&
    isSafeString(value.date) && isRating(value.confidence) && isRating(value.energy) && isRating(value.focus) &&
    isSafeString(value.win) && isSafeString(value.challenge) && isSafeString(value.weeklyAction) && isSafeString(value.why);
}

function validWeeklyEntry(value) {
  return validWeeklyDraft({ ...value, editingId: null }) && isSafeString(value.id) &&
    isSafeString(value.createdAt) && isSafeString(value.updatedAt);
}

function validPreMatchReset(value) {
  return isRecord(value) && RESET_FIELDS.every((field) => isSafeString(value[field.key]));
}

function validPostDraft(value) {
  if (!isRecord(value) || (value.editingId !== null && !isSafeString(value.editingId))) return false;
  if (!["event", "date", "opponent", "result", "reflection", "nextAction"].every((key) => isSafeString(value[key]))) return false;
  if (!Array.isArray(value.improvements) || value.improvements.length !== 3 || !value.improvements.every(isSafeString)) return false;
  if (!isRecord(value.checklist)) return false;
  if (!LEGACY_POST_MATCH_REQUIRED_KEYS.every((key) => typeof value.checklist[key] === "boolean")) return false;
  const hasLegacyFirstMove = typeof value.checklist.firstMove === "boolean";
  const hasSplitFirstMoves = typeof value.checklist.topFirstMove === "boolean" && typeof value.checklist.bottomFirstMove === "boolean";
  if (!hasLegacyFirstMove && !hasSplitFirstMoves) return false;
  return POST_MATCH_ADDED_KEYS.every((key) => value.checklist[key] === undefined || typeof value.checklist[key] === "boolean");
}

function validPostEntry(value) {
  return validPostDraft({ ...value, editingId: null }) && isSafeString(value.id) &&
    isSafeString(value.createdAt) && isSafeString(value.updatedAt);
}

function validCurriculum(value) {
  if (value === undefined) return true;
  if (!isRecord(value) || !isRecord(value.responses)) return false;
  return Object.keys(value.responses).every((key) =>
    MINDSET_CURRICULUM_RESPONSE_KEYS.has(key) && isSafeString(value.responses[key])
  );
}

function validSuspendedWeeklyDraft(value) {
  return value === undefined || value === null || (validWeeklyDraft(value) && value.editingId === null);
}

function validSuspendedPostMatchDraft(value) {
  return value === undefined || value === null || (validPostDraft(value) && value.editingId === null);
}

function entriesHaveUniqueIds(entries) {
  const ids = new Set();
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
  if (!validCurriculum(value.curriculum)) return "The backup has an invalid development-program section.";
  return null;
}

function normalizeMindsetWorkbook(value) {
  const baselineAnswers = {};
  const baselineNotes = {};
  Object.keys(value.baseline.answers).forEach((id) => { baselineAnswers[id] = value.baseline.answers[id]; });
  Object.keys(value.baseline.notes).forEach((id) => { baselineNotes[id] = value.baseline.notes[id]; });
  return {
    type: MINDSET_BACKUP_TYPE,
    version: MINDSET_SCHEMA_VERSION,
    updatedAt: value.updatedAt,
    baseline: { answers: baselineAnswers, notes: baselineNotes },
    gamePlan: {
      takedowns: value.gamePlan.takedowns.map((item) => ({ shot: item.shot, setup: item.setup, finish: item.finish })),
      ...GAME_PLAN_TEXT_KEYS.reduce((result, key) => { result[key] = value.gamePlan[key]; return result; }, {}),
      improvementAreas: value.gamePlan.improvementAreas.slice(0, 3),
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
      updatedAt: entry.updatedAt,
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
      checklist: copyPostChecklist(entry.checklist),
      reflection: entry.reflection,
      improvements: entry.improvements.slice(0, 3),
      nextAction: entry.nextAction,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    })),
    curriculum: {
      responses: Object.keys(value.curriculum && value.curriculum.responses || {}).reduce((result, key) => {
        if (MINDSET_CURRICULUM_RESPONSE_KEYS.has(key)) result[key] = value.curriculum.responses[key];
        return result;
      }, {}),
    },
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
      raw: stored,
    };
  }
}

function displayDate(value) {
  if (!value) return "No date";
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return value;
  try {
    return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" })
      .format(new Date(parts[0], parts[1] - 1, parts[2]));
  } catch (error) {
    return value;
  }
}

function nonEmpty(value) {
  return isString(value) && value.trim().length > 0;
}

function clampPercent(value, total) {
  return total ? Math.round((value / total) * 100) : 0;
}

function baselineStats(baseline) {
  return BASELINE_GROUPS.map((group) => {
    const counts = { yes: 0, working: 0, unsure: 0 };
    group.questions.forEach((question) => {
      const answer = baseline.answers[question[0]];
      if (counts[answer] !== undefined) counts[answer] += 1;
    });
    return {
      id: group.id,
      label: group.label,
      yes: counts.yes,
      working: counts.working,
      unsure: counts.unsure,
      answered: counts.yes + counts.working + counts.unsure,
      reflectionCount: counts.working + counts.unsure,
    };
  });
}

function gamePlanCompletion(gamePlan) {
  let complete = 0;
  gamePlan.takedowns.forEach((item) => {
    [item.shot, item.setup, item.finish].forEach((value) => { if (nonEmpty(value)) complete += 1; });
  });
  GAME_PLAN_TEXT_KEYS.forEach((key) => { if (nonEmpty(gamePlan[key])) complete += 1; });
  gamePlan.improvementAreas.forEach((value) => { if (nonEmpty(value)) complete += 1; });
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
  let complete = [draft.event, draft.date, draft.opponent, draft.result, draft.reflection, draft.nextAction]
    .filter(nonEmpty).length;
  complete += draft.improvements.filter(nonEmpty).length;
  complete += POST_MATCH_CHECKLIST.filter((item) => draft.checklist[item[0]]).length;
  return { complete, total: 6 + 3 + POST_MATCH_CHECKLIST.length };
}

function hasPostDraftContent(draft) {
  return postDraftCompletion(draft).complete > 0;
}

function postMatchCurriculumProgress(draft, entries) {
  return [draft].concat(entries || []).reduce((best, item) => {
    const progress = postDraftCompletion(item);
    return progress.complete > best.complete ? progress : best;
  }, { complete: 0, total: postDraftCompletion(draft).total });
}

function curriculumResponseKey(lessonId, fieldId) {
  return lessonId + "." + fieldId;
}

function curriculumFieldProgress(lesson, curriculum) {
  const fields = lesson.fields || [];
  const complete = fields.filter((field) => nonEmpty(curriculum.responses[curriculumResponseKey(lesson.id, field.id)])).length;
  return { complete, total: fields.length };
}

function curriculumLessonProgress(lesson, curriculum, linkedProgress) {
  if (lesson.linkedModule) return linkedProgress[lesson.linkedModule] || { complete: 0, total: 1 };
  return curriculumFieldProgress(lesson, curriculum);
}

function curriculumProgramProgress(curriculum, linkedProgress) {
  return MINDSET_CURRICULUM_LESSONS.reduce((result, lesson) => {
    const progress = curriculumLessonProgress(lesson, curriculum, linkedProgress);
    result.complete += progress.complete;
    result.total += progress.total;
    return result;
  }, { complete: 0, total: 0 });
}

function curriculumUnitProgress(unit, curriculum, linkedProgress) {
  return unit.lessons.reduce((result, lesson) => {
    const progress = curriculumLessonProgress(lesson, curriculum, linkedProgress);
    result.complete += progress.complete;
    result.total += progress.total;
    return result;
  }, { complete: 0, total: 0 });
}

function checklistSelections(value) {
  return nonEmpty(value) ? value.split("\n").filter(Boolean) : [];
}

function toggleChecklistSelection(value, option) {
  const selected = checklistSelections(value);
  const next = selected.indexOf(option) >= 0 ? selected.filter((item) => item !== option) : selected.concat(option);
  return next.join("\n");
}

function TextField({ id, label, value, onChange, placeholder, multiline = false, rows = 3, type = "text", required = false }) {
  const controlProps = {
    id,
    className: "wb-field-control",
    value,
    onChange: (event) => onChange(event.target.value),
    placeholder,
    required,
    maxLength: type === "date" ? undefined : (multiline ? MINDSET_MAX_TEXT_LENGTH : 180),
  };
  return (
    <label className="wb-field" htmlFor={id}>
      <span className="wb-field-label">
        {label}
        {!required && <span className="wb-field-optional">Optional</span>}
      </span>
      {multiline ? <textarea {...controlProps} rows={rows} /> : <input {...controlProps} type={type} />}
    </label>
  );
}

function RatingField({ id, label, value, onChange }) {
  return (
    <fieldset className="wb-rating" aria-describedby={id + "-help"}>
      <legend className="wb-field-label">{label}</legend>
      <span className="wb-rating-help" id={id + "-help"}>1 is low; 5 is high. Leave blank if you do not want to rate it.</span>
      <div className="wb-rating-options">
        {[1, 2, 3, 4, 5].map((rating) => (
          <label className="wb-rating-option" key={rating}>
            <input
              type="radio"
              name={id}
              value={rating}
              checked={value === rating}
              onChange={() => onChange(rating)}
            />
            <span>{rating}</span>
          </label>
        ))}
        {value > 0 && (
          <button className="wb-link-button" type="button" onClick={() => onChange(0)}>Clear rating</button>
        )}
      </div>
    </fieldset>
  );
}

function ProgressMeter({ value, total, label }) {
  const safeValue = Math.min(value, total);
  return (
    <div className="wb-progress">
      <div className="wb-progress-copy">
        <span>{label}</span>
        <span>{safeValue} of {total}</span>
      </div>
      <progress className="wb-progress-bar" max={total} value={safeValue} aria-label={label + ": " + safeValue + " of " + total} />
    </div>
  );
}

function ModuleHeader({ headingId, title, eyebrow, description, onBack, backLabel = "Workbook home" }) {
  return (
    <header className="wb-module-header">
      <button className="wb-back-button" type="button" onClick={onBack}>
        <Icon name="back" size={18} stroke={2.2} />
        {backLabel}
      </button>
      <p className="wb-eyebrow">{eyebrow}</p>
      <h2 className="wb-module-title" id={headingId} tabIndex="-1">{title}</h2>
      <p className="wb-module-description">{description}</p>
    </header>
  );
}

function DashboardCard({ module, title, description, summary, progress, progressTotal, buttonLabel, onOpen, history }) {
  return (
    <article
      className="wb-module-card"
      data-module-card={module}
      data-mindset-module-card={module}
      data-testid={"mindset-module-card-" + module}
    >
      <div className="wb-module-card-heading">
        <span className="wb-module-card-icon" aria-hidden="true"><Icon name={module === "baseline" || module === "development" ? "brain" : module === "game-plan" ? "target" : module === "pre-match" ? "flag" : "check"} size={22} stroke={2} /></span>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <ProgressMeter value={progress} total={progressTotal} label="Progress" />
      <p className="wb-module-card-summary">{summary}</p>
      {history && <p className="wb-module-card-history">{history}</p>}
      <button className="wb-primary-button wb-module-card-action" type="button" onClick={onOpen}>
        {buttonLabel}
        <Icon name="chevron" size={17} stroke={2.2} />
      </button>
    </article>
  );
}

function curriculumOptionLabel(option) {
  return isRecord(option) ? option.label : option;
}

function curriculumOptionValue(option) {
  return isRecord(option) ? option.value : option;
}

function CurriculumLessonGuide({ lesson }) {
  const guide = MINDSET_CURRICULUM_CONTEXT[lesson.id];
  if (!guide) return null;
  const headingId = "wb-curriculum-guide-" + lesson.id;
  return (
    <section className="wb-lesson-guide" aria-labelledby={headingId}>
      <header className="wb-lesson-guide-header">
        <span className="wb-lesson-guide-icon" aria-hidden="true"><Icon name="brain" size={21} stroke={2} /></span>
        <div>
          <span className="wb-guide-eyebrow">Worksheet guide</span>
          <h3 id={headingId}>Understand the work before you answer</h3>
        </div>
      </header>
      <div className="wb-lesson-guide-grid">
        <article className="wb-guide-why">
          <h4>Why this matters</h4>
          <p>{guide.why}</p>
        </article>
        <article className="wb-guide-steps">
          <h4>How to use this worksheet</h4>
          <ol>{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </article>
        <article className="wb-guide-example">
          <h4>Wrestling example</h4>
          <p>{guide.example}</p>
          <small>Use the example as a model for specificity, not as a required answer.</small>
        </article>
      </div>
    </section>
  );
}

function CurriculumField({ lessonId, field, value, onChange }) {
  const id = "wb-curriculum-" + lessonId + "-" + field.id;
  const hintId = id + "-hint";
  const label = (
    <span className="wb-field-label">
      {field.label}
      <span className="wb-field-optional">{field.sensitive ? "Sensitive · Optional" : "Optional"}</span>
    </span>
  );

  if (field.type === "choice") {
    return (
      <fieldset className="wb-curriculum-choice" aria-describedby={field.hint ? hintId : undefined}>
        <legend>{label}</legend>
        {field.hint && <p className="wb-curriculum-field-hint" id={hintId}>{field.hint}</p>}
        <div className="wb-answer-options">
          {(field.options || []).map((option) => {
            const optionValue = curriculumOptionValue(option);
            return (
              <label className="wb-answer-option" key={optionValue}>
                <input type="radio" name={id} value={optionValue} checked={value === optionValue} onChange={() => onChange(optionValue)} />
                <span>{curriculumOptionLabel(option)}</span>
              </label>
            );
          })}
          {nonEmpty(value) && <button className="wb-link-button" type="button" onClick={() => onChange("")}>Clear answer</button>}
        </div>
      </fieldset>
    );
  }

  if (field.type === "checklist") {
    const selected = checklistSelections(value);
    return (
      <fieldset className="wb-curriculum-checklist" aria-describedby={field.hint ? hintId : undefined}>
        <legend>{label}</legend>
        {field.hint && <p className="wb-curriculum-field-hint" id={hintId}>{field.hint}</p>}
        <div className="wb-curriculum-check-grid">
          {(field.options || []).map((option) => {
            const optionValue = curriculumOptionValue(option);
            return (
              <label className="wb-check-item" key={optionValue}>
                <input type="checkbox" checked={selected.indexOf(optionValue) >= 0} onChange={() => onChange(toggleChecklistSelection(value, optionValue))} />
                <span><Icon name="check" size={16} stroke={2.4} />{curriculumOptionLabel(option)}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  const inputType = field.type === "date" || field.type === "time" ? field.type : "text";
  const multiline = field.type !== "short" && field.type !== "date" && field.type !== "time";
  return (
    <label className="wb-field wb-curriculum-field" htmlFor={id}>
      {label}
      {field.hint && <span className="wb-curriculum-field-hint" id={hintId}>{field.hint}</span>}
      {multiline ? (
        <textarea id={id} className="wb-field-control" value={value} onChange={(event) => onChange(event.target.value)} placeholder={field.placeholder || "Add your response"} rows={field.rows || 4} maxLength={MINDSET_MAX_TEXT_LENGTH} aria-describedby={field.hint ? hintId : undefined} />
      ) : (
        <input id={id} className="wb-field-control" type={inputType} value={value} onChange={(event) => onChange(event.target.value)} placeholder={field.placeholder || "Add your response"} maxLength={inputType === "text" ? 180 : undefined} aria-describedby={field.hint ? hintId : undefined} />
      )}
    </label>
  );
}

function CurriculumProgram({ curriculum, onChange, onBack, onOpenLinked, linkedProgress, selectedLessonId, showLesson, onOpenLesson, onCloseLesson }) {
  const selectedLesson = showLesson && selectedLessonId ? MINDSET_CURRICULUM_LESSON_MAP[selectedLessonId] : null;
  const [openUnitIds, setOpenUnitIds] = useState(() => {
    const initialLesson = selectedLessonId ? MINDSET_CURRICULUM_LESSON_MAP[selectedLessonId] : null;
    return initialLesson ? [initialLesson.unitId] : [];
  });
  const selectedIndex = selectedLesson ? MINDSET_CURRICULUM_LESSONS.findIndex((lesson) => lesson.id === selectedLesson.id) : -1;
  const overallProgress = curriculumProgramProgress(curriculum, linkedProgress);

  function setUnitOpen(unitId, open) {
    setOpenUnitIds((current) => open
      ? (current.indexOf(unitId) >= 0 ? current : current.concat(unitId))
      : current.filter((id) => id !== unitId));
  }

  useEffect(() => {
    if (showLesson || !selectedLessonId) return;
    const lesson = MINDSET_CURRICULUM_LESSON_MAP[selectedLessonId];
    if (!lesson) return;
    setUnitOpen(lesson.unitId, true);
    window.requestAnimationFrame(() => {
      const target = document.getElementById("wb-curriculum-open-" + lesson.id);
      if (!target) return;
      if (typeof target.scrollIntoView === "function") target.scrollIntoView({ block: "center", behavior: "smooth" });
      target.focus({ preventScroll: true });
    });
  }, [showLesson, selectedLessonId]);

  function focusAfterNavigation(id) {
    window.requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) target.focus({ preventScroll: true });
      const content = document.querySelector(".content--workbook");
      if (content) content.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function openLesson(id) {
    onOpenLesson(id);
    focusAfterNavigation("wb-curriculum-lesson-title");
  }

  function closeLesson() {
    const unitId = selectedLesson.unitId;
    setUnitOpen(unitId, true);
    onCloseLesson();
  }

  function setResponse(lessonId, fieldId, response) {
    const key = curriculumResponseKey(lessonId, fieldId);
    const responses = { ...curriculum.responses };
    if (response) responses[key] = response;
    else delete responses[key];
    onChange({ responses });
  }

  if (selectedLesson) {
    const progress = curriculumLessonProgress(selectedLesson, curriculum, linkedProgress);
    const linkedLabels = { "pre-match": "Pre-Match Reset", "post-match": "Post-Match Review", "game-plan": "My Wrestling Game Plan" };
    return (
      <section className="wb-module wb-curriculum-lesson" aria-labelledby="wb-curriculum-lesson-title" data-testid={"curriculum-lesson-" + selectedLesson.id}>
        <ModuleHeader
          headingId="wb-curriculum-lesson-title"
          title={selectedLesson.title}
          eyebrow={selectedLesson.unitTitle + " · " + (selectedLesson.weekLabel || "Week " + selectedLesson.week)}
          description={selectedLesson.objective}
          onBack={closeLesson}
          backLabel="Development program"
        />
        <ProgressMeter value={progress.complete} total={progress.total} label="Worksheet progress" />
        <CurriculumLessonGuide lesson={selectedLesson} />
        {(selectedLesson.notice || selectedLesson.sensitive) && (
          <aside className={"wb-curriculum-notice" + (selectedLesson.sensitive ? " wb-curriculum-notice-sensitive" : "")}>
            <Icon name={selectedLesson.sensitive ? "brain" : "check"} size={20} stroke={2} />
            <p>
              {selectedLesson.notice || "These sensitive responses are optional."}
              {selectedLesson.sensitive && " Anyone using this same browser profile can view saved responses, so use a personal browser profile on shared devices."}
            </p>
          </aside>
        )}
        {selectedLesson.linkedModule ? (
          <section className="wb-form-section wb-linked-worksheet">
            <h3>Use the complete core tool</h3>
            <p>This source worksheet is already built as a dedicated phone-first tool, so your plan stays in one place.</p>
            <button className="wb-primary-button" type="button" onClick={() => onOpenLinked(selectedLesson.linkedModule)}>
              Open {linkedLabels[selectedLesson.linkedModule] || "core tool"}
              <Icon name="chevron" size={17} stroke={2.2} />
            </button>
          </section>
        ) : (
          <section className="wb-form-section wb-curriculum-form" aria-label={selectedLesson.title + " worksheet fields"}>
            {(selectedLesson.fields || []).map((field) => (
              <CurriculumField
                key={field.id}
                lessonId={selectedLesson.id}
                field={field}
                value={curriculum.responses[curriculumResponseKey(selectedLesson.id, field.id)] || ""}
                onChange={(value) => setResponse(selectedLesson.id, field.id, value)}
              />
            ))}
          </section>
        )}
        <nav className="wb-curriculum-pager" aria-label="Development worksheet navigation">
          <button className="wb-secondary-button" type="button" disabled={selectedIndex <= 0} onClick={() => openLesson(MINDSET_CURRICULUM_LESSONS[selectedIndex - 1].id)}>
            <Icon name="back" size={17} stroke={2.2} /> Previous
          </button>
          <span>Worksheet {selectedIndex + 1} of {MINDSET_CURRICULUM_LESSONS.length}</span>
          <button className="wb-secondary-button" type="button" disabled={selectedIndex >= MINDSET_CURRICULUM_LESSONS.length - 1} onClick={() => openLesson(MINDSET_CURRICULUM_LESSONS[selectedIndex + 1].id)}>
            Next <Icon name="chevron" size={17} stroke={2.2} />
          </button>
        </nav>
      </section>
    );
  }

  return (
    <section className="wb-module wb-curriculum" aria-labelledby="wb-curriculum-title">
      <ModuleHeader
        headingId="wb-curriculum-title"
        title="Complete Development Program"
        eyebrow={MINDSET_CURRICULUM_LESSONS.length + " guided worksheets · " + MINDSET_CURRICULUM_UNITS.length + " units"}
        description="Work in order or choose the area that fits today. Each worksheet includes the performance concept, completion steps, and a wrestling example before the response fields."
        onBack={onBack}
      />
      <ProgressMeter value={overallProgress.complete} total={overallProgress.total} label="Program fields completed" />
      <aside className="wb-curriculum-notice">
        <Icon name="brain" size={20} stroke={2} />
        <p>The guide sections paraphrase the teaching context from the worksheet packet. This is an educational reflection tool, not medical or mental-health care; follow your athletic trainer, physician, coaches, and support team for injury, sleep, or safety concerns.</p>
      </aside>
      <div className="wb-curriculum-units">
        {MINDSET_CURRICULUM_UNITS.map((unit) => {
          const progress = curriculumUnitProgress(unit, curriculum, linkedProgress);
          const unitGuide = MINDSET_CURRICULUM_UNIT_CONTEXT[unit.id];
          return (
            <details className="wb-curriculum-unit" id={"wb-curriculum-unit-" + unit.id} key={unit.id} open={openUnitIds.indexOf(unit.id) >= 0} onToggle={(event) => setUnitOpen(unit.id, event.currentTarget.open)}>
              <summary>
                <span><strong>{unit.title}</strong><small>{unit.lessons.length} worksheets · {unit.description}</small></span>
                <span>{progress.complete} / {progress.total}</span>
              </summary>
              <ProgressMeter value={progress.complete} total={progress.total} label={unit.title + " progress"} />
              {unitGuide && (
                <section className="wb-unit-guide" aria-label={unit.title + " unit roadmap"}>
                  <span>Unit roadmap</span>
                  <p>{unitGuide.overview}</p>
                  <small>{unitGuide.approach}</small>
                </section>
              )}
              <div className="wb-curriculum-lesson-list">
                {unit.lessons.map((lesson) => {
                  const lessonProgress = curriculumLessonProgress(lesson, curriculum, linkedProgress);
                  return (
                    <button className="wb-curriculum-lesson-button" id={"wb-curriculum-open-" + lesson.id} type="button" key={lesson.id} onClick={() => openLesson(lesson.id)} data-testid={"curriculum-open-" + lesson.id}>
                      <span className="wb-curriculum-week">{lesson.weekLabel || "Week " + lesson.week}</span>
                      <span><strong>{lesson.title}</strong><small>{lesson.objective}</small></span>
                      <span className="wb-curriculum-lesson-progress">{lessonProgress.complete}/{lessonProgress.total}<Icon name="chevron" size={16} stroke={2.2} /></span>
                    </button>
                  );
                })}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

function BaselineModule({ baseline, onChange, onBack }) {
  const stats = useMemo(() => baselineStats(baseline), [baseline]);
  const answered = stats.reduce((total, item) => total + item.answered, 0);
  const priorities = stats
    .filter((item) => item.answered > 0 && item.reflectionCount > 0)
    .slice()
    .sort((a, b) => b.reflectionCount - a.reflectionCount || b.unsure - a.unsure || a.label.localeCompare(b.label))
    .slice(0, 3);

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

  return (
    <section className="wb-module wb-baseline" aria-labelledby="wb-baseline-title">
      <ModuleHeader
        headingId="wb-baseline-title"
        title="Mindset Baseline"
        eyebrow="24 personal reflection prompts"
        description="Answer from where you are today. The category counts help you choose what to reflect on; they are not a diagnosis, grade, or comparison with anyone else."
        onBack={onBack}
      />
      <ProgressMeter value={answered} total={BASELINE_QUESTION_IDS.length} label="Baseline questions answered" />

      <aside className="wb-priorities" aria-labelledby="wb-priorities-title">
        <h3 id="wb-priorities-title">Personal reflection priorities</h3>
        <p>Categories with the most “Working on it” or “Unsure” responses appear first.</p>
        {priorities.length ? (
          <ol className="wb-priority-list">
            {priorities.map((item) => (
              <li key={item.id}>
                <strong>{item.label}</strong>
                <span>{item.reflectionCount} reflection {item.reflectionCount === 1 ? "prompt" : "prompts"}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="wb-empty-copy">Answer a few prompts to see possible areas for reflection.</p>
        )}
      </aside>

      <div className="wb-baseline-groups">
        {BASELINE_GROUPS.map((group, groupIndex) => {
          const stat = stats[groupIndex];
          return (
            <section className="wb-baseline-group" key={group.id} aria-labelledby={"wb-group-" + group.id}>
              <header className="wb-baseline-group-header">
                <h3 id={"wb-group-" + group.id}>{group.label}</h3>
                <span>{stat.answered} of {group.questions.length} answered</span>
              </header>
              <p className="wb-category-counts" aria-label={group.label + " response counts"}>
                <span>Yes: {stat.yes}</span>
                <span>Working on it: {stat.working}</span>
                <span>Unsure: {stat.unsure}</span>
              </p>
              {group.questions.map((question, questionIndex) => {
                const id = question[0];
                const answer = baseline.answers[id] || "";
                return (
                  <fieldset className="wb-baseline-question" key={id}>
                    <legend><span>{groupIndex * 3 + questionIndex + 1}.</span> {question[1]}</legend>
                    <div className="wb-answer-options">
                      {BASELINE_OPTIONS.map((option) => (
                        <label className="wb-answer-option" key={option.value}>
                          <input
                            type="radio"
                            name={"baseline-" + id}
                            value={option.value}
                            checked={answer === option.value}
                            onChange={() => setAnswer(id, option.value)}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                      {answer && <button className="wb-link-button" type="button" onClick={() => clearAnswer(id)}>Clear answer</button>}
                    </div>
                    <label className="wb-question-note" htmlFor={"note-" + id}>
                      <span>Personal note <span className="wb-field-optional">Optional</span></span>
                      <textarea
                        id={"note-" + id}
                        className="wb-field-control"
                        rows="2"
                        maxLength={600}
                        value={baseline.notes[id] || ""}
                        onChange={(event) => setNote(id, event.target.value)}
                        placeholder="A cue, example, or next step I want to remember"
                      />
                    </label>
                  </fieldset>
                );
              })}
            </section>
          );
        })}
      </div>

      <section className="wb-count-table-wrap" aria-labelledby="wb-count-table-title">
        <h3 id="wb-count-table-title">Category response counts</h3>
        <div className="wb-table-scroll" tabIndex="0">
          <table className="wb-count-table">
            <caption>Personal per-category summary; no overall score is calculated.</caption>
            <thead><tr><th scope="col">Category</th><th scope="col">Yes</th><th scope="col">Working on it</th><th scope="col">Unsure</th></tr></thead>
            <tbody>
              {stats.map((item) => (
                <tr key={item.id}><th scope="row">{item.label}</th><td>{item.yes}</td><td>{item.working}</td><td>{item.unsure}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

function GamePlanModule({ gamePlan, onChange, onBack, backLabel }) {
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

  return (
    <section className="wb-module wb-game-plan" aria-labelledby="wb-game-plan-title">
      <ModuleHeader
        headingId="wb-game-plan-title"
        title="My Wrestling Game Plan"
        eyebrow="A clear plan for your positions"
        description="Write the options you have prepared with your coaches. Every free-text field is optional, and you can revise this plan at any time."
        onBack={onBack}
        backLabel={backLabel}
      />
      <ProgressMeter value={completion.complete} total={completion.total} label="Game-plan fields completed" />

      <section className="wb-form-section" aria-labelledby="wb-takedowns-title">
        <h3 id="wb-takedowns-title">Three takedowns</h3>
        <p>For each option, name the shot, the setup that creates it, and the finish you expect to use.</p>
        <div className="wb-takedown-grid">
          {gamePlan.takedowns.map((item, index) => (
            <fieldset className="wb-takedown-card" key={index}>
              <legend>Takedown {index + 1}</legend>
              <TextField id={"wb-td-shot-" + index} label="Shot" value={item.shot} onChange={(value) => setTakedown(index, "shot", value)} placeholder="My attack" />
              <TextField id={"wb-td-setup-" + index} label="Setup" value={item.setup} onChange={(value) => setTakedown(index, "setup", value)} placeholder="How I create the opening" />
              <TextField id={"wb-td-finish-" + index} label="Finish" value={item.finish} onChange={(value) => setTakedown(index, "finish", value)} placeholder="My practiced finish" />
            </fieldset>
          ))}
        </div>
      </section>

      <section className="wb-form-section" aria-labelledby="wb-ties-title">
        <h3 id="wb-ties-title">Ties and counter offense</h3>
        <div className="wb-field-grid">
          <TextField id="wb-tie-preference" label="My best tie" value={gamePlan.tiePreference} onChange={(value) => setField("tiePreference", value)} placeholder="The tie I want" />
          <TextField id="wb-tie-creation" label="How I create and control it" value={gamePlan.tieCreation} onChange={(value) => setField("tieCreation", value)} placeholder="Hand-fighting cues and position" multiline />
          <TextField id="wb-tie-answer" label="My answer to an opponent’s preferred tie" value={gamePlan.tieAnswer} onChange={(value) => setField("tieAnswer", value)} placeholder="Clear, create space, or attack from it" multiline />
          <TextField id="wb-counter-offense" label="Counter offense" value={gamePlan.counterOffense} onChange={(value) => setField("counterOffense", value)} placeholder="My first re-attack or counter option" multiline />
        </div>
      </section>

      <section className="wb-form-section" aria-labelledby="wb-mat-title">
        <h3 id="wb-mat-title">Top and bottom</h3>
        <div className="wb-field-grid">
          <TextField id="wb-top-first" label="Top: first move" value={gamePlan.topFirstMove} onChange={(value) => setField("topFirstMove", value)} placeholder="Breakdown, ride, or turn sequence" multiline />
          <TextField id="wb-bottom-first" label="Bottom: first move" value={gamePlan.bottomFirstMove} onChange={(value) => setField("bottomFirstMove", value)} placeholder="My first movement and follow-up" multiline />
          <TextField id="wb-mat-return" label="Mat return" value={gamePlan.matReturn} onChange={(value) => setField("matReturn", value)} placeholder="My preferred return and control cues" multiline />
        </div>
      </section>

      <section className="wb-form-section" aria-labelledby="wb-improvement-title">
        <h3 id="wb-improvement-title">Three improvement areas</h3>
        <div className="wb-field-grid">
          {gamePlan.improvementAreas.map((value, index) => (
            <TextField
              key={index}
              id={"wb-improvement-area-" + index}
              label={"Improvement area " + (index + 1)}
              value={value}
              onChange={(nextValue) => setImprovement(index, nextValue)}
              placeholder="A specific position, skill, or decision"
              multiline
            />
          ))}
        </div>
      </section>
    </section>
  );
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

  return (
    <section className="wb-module wb-weekly" aria-labelledby="wb-weekly-title">
      <ModuleHeader
        headingId="wb-weekly-title"
        title="Weekly Check-In"
        eyebrow="Repeat as often as useful"
        description="Capture a quick snapshot, one action for the coming week, and why that action matters to you."
        onBack={onBack}
      />
      <ProgressMeter value={completion.complete} total={completion.total} label="Current check-in fields completed" />

      <form className="wb-entry-form" onSubmit={submit}>
        <header className="wb-entry-form-header">
          <div><h3>{draft.editingId ? "Edit check-in" : "New check-in"}</h3><p>Ratings and all free-text responses are optional.</p></div>
          {draft.editingId && <span className="wb-editing-badge">Editing saved entry</span>}
        </header>
        <TextField id="wb-weekly-date" type="date" label="Check-in date" value={draft.date} onChange={(value) => setField("date", value)} required />
        <div className="wb-rating-grid">
          <RatingField id="wb-weekly-confidence" label="Confidence" value={draft.confidence} onChange={(value) => setField("confidence", value)} />
          <RatingField id="wb-weekly-energy" label="Energy" value={draft.energy} onChange={(value) => setField("energy", value)} />
          <RatingField id="wb-weekly-focus" label="Focus" value={draft.focus} onChange={(value) => setField("focus", value)} />
        </div>
        <div className="wb-field-grid">
          <TextField id="wb-weekly-win" label="A win from this week" value={draft.win} onChange={(value) => setField("win", value)} placeholder="Something I want to recognize" multiline />
          <TextField id="wb-weekly-challenge" label="A challenge from this week" value={draft.challenge} onChange={(value) => setField("challenge", value)} placeholder="A situation or position I want to learn from" multiline />
          <TextField id="wb-weekly-action" label="My action for next week" value={draft.weeklyAction} onChange={(value) => setField("weeklyAction", value)} placeholder="One specific, controllable action" multiline />
          <TextField id="wb-weekly-why" label="Why this action matters" value={draft.why} onChange={(value) => setField("why", value)} placeholder="My reason for choosing it" multiline />
        </div>
        <div className="wb-form-actions">
          <button className="wb-primary-button" type="submit"><Icon name="check" size={18} stroke={2.4} />{draft.editingId ? "Update check-in" : "Save check-in"}</button>
          {draft.editingId && <button className="wb-secondary-button" type="button" onClick={onCancelEdit}>Cancel edit</button>}
        </div>
        <p className="wb-form-message" role="status" aria-live="polite">{formMessage}</p>
      </form>

      <section className="wb-history" aria-labelledby="wb-weekly-history-title">
        <header className="wb-history-header"><div><h3 id="wb-weekly-history-title">Check-in history</h3><p>{entries.length} saved {entries.length === 1 ? "entry" : "entries"}</p></div></header>
        {!entries.length && <p className="wb-empty-copy">Your saved weekly check-ins will appear here.</p>}
        <div className="wb-history-list">
          {entries.map((entry) => (
            <article className="wb-history-card" key={entry.id}>
              <header><div><h4>{displayDate(entry.date)}</h4><p>Confidence {entry.confidence || "—"} · Energy {entry.energy || "—"} · Focus {entry.focus || "—"}</p></div></header>
              <dl className="wb-history-details">
                {nonEmpty(entry.win) && <><dt>Win</dt><dd>{entry.win}</dd></>}
                {nonEmpty(entry.challenge) && <><dt>Challenge</dt><dd>{entry.challenge}</dd></>}
                {nonEmpty(entry.weeklyAction) && <><dt>Next action</dt><dd>{entry.weeklyAction}</dd></>}
                {nonEmpty(entry.why) && <><dt>Why</dt><dd>{entry.why}</dd></>}
              </dl>
              <div className="wb-history-actions">
                <button className="wb-secondary-button" type="button" onClick={() => onEdit(entry)}><Icon name="edit" size={17} stroke={2} />Edit</button>
                <button className="wb-danger-button" type="button" onClick={() => onDelete(entry.id)}><Icon name="trash" size={17} stroke={2} />Delete</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function PreMatchModule({ reset, onChange, onBack, backLabel }) {
  const completion = resetCompletion(reset);
  const readout = RESET_FIELDS.filter((field) => nonEmpty(reset[field.key]));

  function setField(key, value) {
    onChange({ ...reset, [key]: value });
  }

  return (
    <section className="wb-module wb-pre-match" aria-labelledby="wb-pre-match-title">
      <ModuleHeader
        headingId="wb-pre-match-title"
        title="Pre-Match Reset"
        eyebrow="Build it once, read it quickly"
        description="Save the exact routine you have prepared so you can scan it before competition. All free-text fields are optional."
        onBack={onBack}
        backLabel={backLabel}
      />
      <ProgressMeter value={completion.complete} total={completion.total} label="Reset routine fields completed" />
      <div className="wb-split-layout">
        <section className="wb-form-section" aria-labelledby="wb-reset-builder-title">
          <h3 id="wb-reset-builder-title">Full routine</h3>
          <div className="wb-field-grid">
            {RESET_FIELDS.map((field) => (
              <TextField
                key={field.key}
                id={"wb-reset-" + field.key}
                label={field.label}
                value={reset[field.key]}
                onChange={(value) => setField(field.key, value)}
                placeholder={field.placeholder}
                multiline
                rows={field.key === "shotgunRoutine" ? 5 : 3}
              />
            ))}
          </div>
        </section>
        <aside className="wb-quick-readout" aria-labelledby="wb-readout-title">
          <p className="wb-eyebrow">Quick readout</p>
          <h3 id="wb-readout-title">My saved reset</h3>
          {readout.length ? (
            <ol>
              {readout.map((field) => <li key={field.key}><strong>{field.label}</strong><span>{reset[field.key]}</span></li>)}
            </ol>
          ) : (
            <p className="wb-empty-copy">Add parts of your routine to create a quick readout.</p>
          )}
        </aside>
      </div>
    </section>
  );
}

function postHistoryTitle(entry) {
  const parts = [entry.event, entry.opponent ? "vs. " + entry.opponent : ""].filter(nonEmpty);
  return parts.join(" · ") || "Post-match review";
}

function PostMatchModule({ draft, entries, onDraftChange, onSave, onEdit, onDelete, onCancelEdit, onBack, backLabel }) {
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
    const checklist = { ...draft.checklist, [key]: !draft.checklist[key] };
    if (key === "topFirstMove" || key === "bottomFirstMove") checklist.firstMove = checklist.topFirstMove || checklist.bottomFirstMove;
    onDraftChange({ ...draft, checklist });
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

  return (
    <section className="wb-module wb-post-match" aria-labelledby="wb-post-match-title">
      <ModuleHeader
        headingId="wb-post-match-title"
        title="Post-Match Review"
        eyebrow="Repeat after any match"
        description="Record what happened, recognize useful actions, and choose a specific next step. Metadata and every free-text field are optional."
        onBack={onBack}
        backLabel={backLabel}
      />
      <ProgressMeter value={completion.complete} total={completion.total} label="Current review items completed" />

      <form className="wb-entry-form" onSubmit={submit}>
        <header className="wb-entry-form-header">
          <div><h3>{draft.editingId ? "Edit review" : "New review"}</h3><p>Use only the parts that help you reflect.</p></div>
          {draft.editingId && <span className="wb-editing-badge">Editing saved entry</span>}
        </header>
        <div className="wb-field-grid wb-field-grid-four">
          <TextField id="wb-post-event" label="Event" value={draft.event} onChange={(value) => setField("event", value)} placeholder="Meet, dual, or tournament" />
          <TextField id="wb-post-date" type="date" label="Date" value={draft.date} onChange={(value) => setField("date", value)} />
          <TextField id="wb-post-opponent" label="Opponent" value={draft.opponent} onChange={(value) => setField("opponent", value)} placeholder="Name or school" />
          <TextField id="wb-post-result" label="Result" value={draft.result} onChange={(value) => setField("result", value)} placeholder="Result or match note" />
        </div>

        <fieldset className="wb-review-checklist">
          <legend>Match checklist</legend>
          <p>Check the actions you want to recognize from this match.</p>
          <div className="wb-check-grid">
            {POST_MATCH_CHECKLIST.map((item) => (
              <label className="wb-check-item" key={item[0]}>
                <input type="checkbox" checked={draft.checklist[item[0]]} onChange={() => toggleChecklist(item[0])} />
                <span><Icon name="check" size={16} stroke={2.5} aria-hidden="true" />{item[1]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <TextField id="wb-post-reflection" label="Reflection" value={draft.reflection} onChange={(value) => setField("reflection", value)} placeholder="What did I notice about my decisions, positions, and response?" multiline rows={5} />
        <section className="wb-form-section" aria-labelledby="wb-post-improvements-title">
          <h3 id="wb-post-improvements-title">Three improvements</h3>
          <div className="wb-field-grid">
            {draft.improvements.map((value, index) => (
              <TextField key={index} id={"wb-post-improvement-" + index} label={"Improvement " + (index + 1)} value={value} onChange={(nextValue) => setImprovement(index, nextValue)} placeholder="A specific position, action, or decision" multiline />
            ))}
          </div>
        </section>
        <TextField id="wb-post-next-action" label="Next action" value={draft.nextAction} onChange={(value) => setField("nextAction", value)} placeholder="The first specific action I will take in practice" multiline />
        <div className="wb-form-actions">
          <button className="wb-primary-button" type="submit"><Icon name="check" size={18} stroke={2.4} />{draft.editingId ? "Update review" : "Save review"}</button>
          {draft.editingId && <button className="wb-secondary-button" type="button" onClick={onCancelEdit}>Cancel edit</button>}
        </div>
        <p className="wb-form-message" role="status" aria-live="polite">{formMessage}</p>
      </form>

      <section className="wb-history" aria-labelledby="wb-post-history-title">
        <header className="wb-history-header"><div><h3 id="wb-post-history-title">Post-match history</h3><p>{entries.length} saved {entries.length === 1 ? "review" : "reviews"}</p></div></header>
        {!entries.length && <p className="wb-empty-copy">Your saved post-match reviews will appear here.</p>}
        <div className="wb-history-list">
          {entries.map((entry) => {
            const checkedActions = POST_MATCH_CHECKLIST.filter((item) => entry.checklist[item[0]]);
            const checked = checkedActions.length;
            return (
              <article className="wb-history-card" key={entry.id}>
                <header><div><h4>{postHistoryTitle(entry)}</h4><p>{displayDate(entry.date)}{entry.result ? " · " + entry.result : ""}</p></div><span>{checked} checklist {checked === 1 ? "item" : "items"}</span></header>
                <dl className="wb-history-details">
                  {checkedActions.length > 0 && <><dt>Recognized</dt><dd><ul>{checkedActions.map((item) => <li key={item[0]}>{item[1]}</li>)}</ul></dd></>}
                  {nonEmpty(entry.reflection) && <><dt>Reflection</dt><dd>{entry.reflection}</dd></>}
                  {entry.improvements.some(nonEmpty) && <><dt>Improvements</dt><dd><ol>{entry.improvements.filter(nonEmpty).map((item, index) => <li key={index}>{item}</li>)}</ol></dd></>}
                  {nonEmpty(entry.nextAction) && <><dt>Next action</dt><dd>{entry.nextAction}</dd></>}
                </dl>
                <div className="wb-history-actions">
                  <button className="wb-secondary-button" type="button" onClick={() => onEdit(entry)}><Icon name="edit" size={17} stroke={2} />Edit</button>
                  <button className="wb-danger-button" type="button" onClick={() => onDelete(entry.id)}><Icon name="trash" size={17} stroke={2} />Delete</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
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
  const [curriculumLessonId, setCurriculumLessonId] = useState(null);
  const [showCurriculumLesson, setShowCurriculumLesson] = useState(false);
  const [returnToCurriculumFromLinked, setReturnToCurriculumFromLinked] = useState(false);
  const [saveStatus, setSaveStatus] = useState({
    kind: loaded.error ? "error" : "saved",
    message: loaded.error || "Workbook ready in this browser profile.",
  });
  const [notice, setNotice] = useState("");
  const [canUndoRestore, setCanUndoRestore] = useState(() => {
    try { return !!window.localStorage.getItem(MINDSET_RESTORE_RECOVERY_KEY); }
    catch (error) { return false; }
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
      const payload = { ...value, updatedAt: new Date().toISOString() };
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
          message: "Could not save on this device. Your current page remains available, but download a backup before leaving.",
        });
      }
      return false;
    }
  }

  useEffect(() => {
    if (skipInitialSaveRef.current) {
      skipInitialSaveRef.current = false;
      return undefined;
    }
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return undefined;
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
  const baselinePriorities = stats
    .filter((item) => item.reflectionCount > 0)
    .slice()
    .sort((a, b) => b.reflectionCount - a.reflectionCount || b.unsure - a.unsure);
  const planCompletion = gamePlanCompletion(workbook.gamePlan);
  const resetProgress = resetCompletion(workbook.preMatchReset);
  const weeklyProgress = weeklyDraftCompletion(workbook.weeklyDraft);
  const postProgress = postMatchCurriculumProgress(workbook.postMatchDraft, workbook.postMatchReviews);
  const linkedCurriculumProgress = { "game-plan": planCompletion, "pre-match": resetProgress, "post-match": postProgress };
  const developmentProgress = curriculumProgramProgress(workbook.curriculum, linkedCurriculumProgress);

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
    setReturnToCurriculumFromLinked(false);
    setActiveModule(module);
    const headingIds = { development: showCurriculumLesson && curriculumLessonId ? "wb-curriculum-lesson-title" : "wb-curriculum-title", baseline: "wb-baseline-title", "game-plan": "wb-game-plan-title", weekly: "wb-weekly-title", "pre-match": "wb-pre-match-title", "post-match": "wb-post-match-title" };
    scrollWorkbookToTop(headingIds[module]);
  }

  function openCurriculumLinkedModule(module) {
    setReturnToCurriculumFromLinked(true);
    setActiveModule(module);
    const headingIds = { "game-plan": "wb-game-plan-title", "pre-match": "wb-pre-match-title", "post-match": "wb-post-match-title" };
    scrollWorkbookToTop(headingIds[module]);
  }

  function returnToCurriculumLesson() {
    setReturnToCurriculumFromLinked(false);
    setActiveModule("development");
    scrollWorkbookToTop("wb-curriculum-lesson-title");
  }

  function closeModule() {
    setReturnToCurriculumFromLinked(false);
    setActiveModule(null);
    scrollWorkbookToTop("wb-dashboard-title");
  }

  function saveWeeklyCheckIn() {
    updateWorkbook((current) => {
      const draft = current.weeklyDraft;
      const wasEditing = !!draft.editingId;
      const now = new Date().toISOString();
      const existing = draft.editingId ? current.weeklyCheckIns.find((entry) => entry.id === draft.editingId) : null;
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
        updatedAt: now,
      };
      const weeklyCheckIns = existing
        ? current.weeklyCheckIns.map((item) => item.id === existing.id ? entry : item)
        : [entry].concat(current.weeklyCheckIns).slice(0, MINDSET_MAX_HISTORY_ENTRIES);
      return {
        ...current,
        weeklyCheckIns,
        weeklyDraft: wasEditing && current.suspendedWeeklyDraft
          ? copyWeeklyDraft(current.suspendedWeeklyDraft)
          : makeWeeklyDraft(),
        suspendedWeeklyDraft: null,
      };
    });
  }

  function editWeeklyCheckIn(entry) {
    updateWorkbook((current) => ({
      ...current,
      suspendedWeeklyDraft: current.weeklyDraft.editingId
        ? current.suspendedWeeklyDraft
        : copyWeeklyDraft({ ...current.weeklyDraft, editingId: null }),
      weeklyDraft: {
        editingId: entry.id,
        date: entry.date,
        confidence: entry.confidence,
        energy: entry.energy,
        focus: entry.focus,
        win: entry.win,
        challenge: entry.challenge,
        weeklyAction: entry.weeklyAction,
        why: entry.why,
      },
    }));
    focusWorkbookControl("wb-weekly-date");
  }

  function cancelWeeklyEdit() {
    updateWorkbook((current) => ({
      ...current,
      weeklyDraft: current.suspendedWeeklyDraft
        ? copyWeeklyDraft(current.suspendedWeeklyDraft)
        : makeWeeklyDraft(),
      suspendedWeeklyDraft: null,
    }));
  }

  function deleteWeeklyCheckIn(id) {
    if (!window.confirm("Delete this weekly check-in? This cannot be undone.")) return;
    updateWorkbook((current) => {
      const deletingEditedEntry = current.weeklyDraft.editingId === id;
      return {
        ...current,
        weeklyCheckIns: current.weeklyCheckIns.filter((entry) => entry.id !== id),
        weeklyDraft: deletingEditedEntry
          ? (current.suspendedWeeklyDraft ? copyWeeklyDraft(current.suspendedWeeklyDraft) : makeWeeklyDraft())
          : current.weeklyDraft,
        suspendedWeeklyDraft: deletingEditedEntry ? null : current.suspendedWeeklyDraft,
      };
    });
    setNotice("Weekly check-in deleted.");
  }

  function savePostMatchReview() {
    updateWorkbook((current) => {
      const draft = current.postMatchDraft;
      const wasEditing = !!draft.editingId;
      const now = new Date().toISOString();
      const existing = draft.editingId ? current.postMatchReviews.find((entry) => entry.id === draft.editingId) : null;
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
        updatedAt: now,
      };
      const postMatchReviews = existing
        ? current.postMatchReviews.map((item) => item.id === existing.id ? entry : item)
        : [entry].concat(current.postMatchReviews).slice(0, MINDSET_MAX_HISTORY_ENTRIES);
      return {
        ...current,
        postMatchReviews,
        postMatchDraft: wasEditing && current.suspendedPostMatchDraft
          ? copyPostMatchDraft(current.suspendedPostMatchDraft)
          : makePostMatchDraft(),
        suspendedPostMatchDraft: null,
      };
    });
  }

  function editPostMatchReview(entry) {
    updateWorkbook((current) => ({
      ...current,
      suspendedPostMatchDraft: current.postMatchDraft.editingId
        ? current.suspendedPostMatchDraft
        : copyPostMatchDraft({ ...current.postMatchDraft, editingId: null }),
      postMatchDraft: copyPostMatchDraft({ ...entry, editingId: entry.id }),
    }));
    focusWorkbookControl("wb-post-event");
  }

  function cancelPostMatchEdit() {
    updateWorkbook((current) => ({
      ...current,
      postMatchDraft: current.suspendedPostMatchDraft
        ? copyPostMatchDraft(current.suspendedPostMatchDraft)
        : makePostMatchDraft(),
      suspendedPostMatchDraft: null,
    }));
  }

  function deletePostMatchReview(id) {
    if (!window.confirm("Delete this post-match review? This cannot be undone.")) return;
    updateWorkbook((current) => {
      const deletingEditedEntry = current.postMatchDraft.editingId === id;
      return {
        ...current,
        postMatchReviews: current.postMatchReviews.filter((entry) => entry.id !== id),
        postMatchDraft: deletingEditedEntry
          ? (current.suspendedPostMatchDraft ? copyPostMatchDraft(current.suspendedPostMatchDraft) : makePostMatchDraft())
          : current.postMatchDraft,
        suspendedPostMatchDraft: deletingEditedEntry ? null : current.suspendedPostMatchDraft,
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
      const payload = { ...workbook, updatedAt: new Date().toISOString() };
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
      setCurriculumLessonId(null);
      setShowCurriculumLesson(false);
      setReturnToCurriculumFromLinked(false);
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
      } catch (rollbackError) {}
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
    setCurriculumLessonId(null);
    setShowCurriculumLesson(false);
    setReturnToCurriculumFromLinked(false);
    setCanUndoRestore(false);
    setSaveStatus({ kind: "saved", message: "Workbook cleared from this browser profile." });
    setNotice("All workbook responses and history were cleared from this browser profile.");
  }

  const latestWeekly = workbook.weeklyCheckIns[0];
  const latestPost = workbook.postMatchReviews[0];
  const firstTakedown = workbook.gamePlan.takedowns.find((item) => nonEmpty(item.shot));
  const resetReadoutCount = resetProgress.complete;

  let activeContent = null;
  const linkedModuleBack = returnToCurriculumFromLinked ? returnToCurriculumLesson : closeModule;
  const linkedModuleBackLabel = returnToCurriculumFromLinked ? "Development worksheet" : undefined;
  if (activeModule === "development") activeContent = (
    <CurriculumProgram
      curriculum={workbook.curriculum}
      onChange={(value) => setSection("curriculum", value)}
      onBack={closeModule}
      onOpenLinked={openCurriculumLinkedModule}
      linkedProgress={linkedCurriculumProgress}
      selectedLessonId={curriculumLessonId}
      showLesson={showCurriculumLesson}
      onOpenLesson={(id) => { setCurriculumLessonId(id); setShowCurriculumLesson(true); }}
      onCloseLesson={() => setShowCurriculumLesson(false)}
    />
  );
  if (activeModule === "baseline") activeContent = <BaselineModule baseline={workbook.baseline} onChange={(value) => setSection("baseline", value)} onBack={closeModule} />;
  if (activeModule === "game-plan") activeContent = <GamePlanModule gamePlan={workbook.gamePlan} onChange={(value) => setSection("gamePlan", value)} onBack={linkedModuleBack} backLabel={linkedModuleBackLabel} />;
  if (activeModule === "weekly") activeContent = <WeeklyModule draft={workbook.weeklyDraft} entries={workbook.weeklyCheckIns} onDraftChange={(value) => setSection("weeklyDraft", value)} onSave={saveWeeklyCheckIn} onEdit={editWeeklyCheckIn} onDelete={deleteWeeklyCheckIn} onCancelEdit={cancelWeeklyEdit} onBack={closeModule} />;
  if (activeModule === "pre-match") activeContent = <PreMatchModule reset={workbook.preMatchReset} onChange={(value) => setSection("preMatchReset", value)} onBack={linkedModuleBack} backLabel={linkedModuleBackLabel} />;
  if (activeModule === "post-match") activeContent = <PostMatchModule draft={workbook.postMatchDraft} entries={workbook.postMatchReviews} onDraftChange={(value) => setSection("postMatchDraft", value)} onSave={savePostMatchReview} onEdit={editPostMatchReview} onDelete={deletePostMatchReview} onCancelEdit={cancelPostMatchEdit} onBack={linkedModuleBack} backLabel={linkedModuleBackLabel} />;

  return (
    <div className="wb-workbook">
      <header className="wb-workbook-header">
        <div>
          <p className="wb-eyebrow">Device-local athlete workspace</p>
          <h1>Mindset Workbook</h1>
          <p>Use the complete worksheet program, quick match tools, and saved plans in one phone-first workspace.</p>
        </div>
        <div className={"wb-save-status wb-save-status-" + saveStatus.kind} role="status" aria-live="polite" aria-atomic="true">
          <Icon name={saveStatus.kind === "error" ? "close" : "check"} size={17} stroke={2.3} />
          <span>{saveStatus.message}</span>
        </div>
      </header>

      <div
        className="wb-workbook-main"
        data-active-module={activeModule || "dashboard"}
        data-mindset-active-module={activeModule || "dashboard"}
        data-testid={"mindset-active-module-" + (activeModule || "dashboard")}
      >
        {activeContent || (
          <section className="wb-dashboard" aria-labelledby="wb-dashboard-title">
            <header className="wb-dashboard-header">
              <div><p className="wb-eyebrow">Your local workbook</p><h2 id="wb-dashboard-title" tabIndex="-1">Choose a module</h2></div>
              <p>Responses are not published, but anyone using this same browser profile can view them.</p>
            </header>
            <div className="wb-module-grid">
              <DashboardCard
                module="development"
                title="Complete Development Program"
                description={MINDSET_CURRICULUM_LESSONS.length + " context-rich worksheets across " + MINDSET_CURRICULUM_UNITS.length + " curriculum units."}
                summary="Every worksheet explains why the topic matters, how to complete it, and what a specific wrestling application can look like."
                progress={developmentProgress.complete}
                progressTotal={developmentProgress.total}
                buttonLabel={developmentProgress.complete ? "Resume program" : "Explore full program"}
                onOpen={() => openModule("development")}
              />
              <DashboardCard
                module="baseline"
                title="Mindset Baseline"
                description="24 prompts across eight reflection areas."
                summary={baselinePriorities.length ? "Current reflection priority: " + baselinePriorities[0].label + "." : "Answer prompts to surface personal reflection priorities."}
                progress={baselineAnswered}
                progressTotal={BASELINE_QUESTION_IDS.length}
                buttonLabel={baselineAnswered ? "Resume baseline" : "Start baseline"}
                onOpen={() => openModule("baseline")}
              />
              <DashboardCard
                module="game-plan"
                title="My Wrestling Game Plan"
                description="Takedowns, ties, counters, mat wrestling, and improvement areas."
                summary={firstTakedown ? "First listed attack: " + firstTakedown.shot + "." : "Build a clear first-choice plan for your key positions."}
                progress={planCompletion.complete}
                progressTotal={planCompletion.total}
                buttonLabel={planCompletion.complete ? "Resume game plan" : "Start game plan"}
                onOpen={() => openModule("game-plan")}
              />
              <DashboardCard
                module="weekly"
                title="Weekly Check-In"
                description="Ratings, a win, a challenge, and one next action."
                summary={latestWeekly ? "Latest saved check-in: " + displayDate(latestWeekly.date) + "." : "Create your first weekly snapshot."}
                history={workbook.weeklyCheckIns.length + " saved " + (workbook.weeklyCheckIns.length === 1 ? "check-in" : "check-ins")}
                progress={weeklyProgress.complete}
                progressTotal={weeklyProgress.total}
                buttonLabel={hasWeeklyDraftContent(workbook.weeklyDraft) ? "Resume check-in" : (workbook.weeklyCheckIns.length ? "Add check-in" : "Start check-in")}
                onOpen={() => openModule("weekly")}
              />
              <DashboardCard
                module="pre-match"
                title="Pre-Match Reset"
                description="Your full saved routine and a fast readout."
                summary={resetReadoutCount ? resetReadoutCount + " routine " + (resetReadoutCount === 1 ? "step is" : "steps are") + " ready to scan." : "Build a familiar routine you can scan before a match."}
                progress={resetProgress.complete}
                progressTotal={resetProgress.total}
                buttonLabel={resetProgress.complete ? "Resume routine" : "Build routine"}
                onOpen={() => openModule("pre-match")}
              />
              <DashboardCard
                module="post-match"
                title="Post-Match Review"
                description="Action checklist, reflection, improvements, and next action."
                summary={latestPost ? "Latest saved review: " + postHistoryTitle(latestPost) + "." : "Create your first personal match review."}
                history={workbook.postMatchReviews.length + " saved " + (workbook.postMatchReviews.length === 1 ? "review" : "reviews")}
                progress={postProgress.complete}
                progressTotal={postProgress.total}
                buttonLabel={hasPostDraftContent(workbook.postMatchDraft) ? "Resume review" : (workbook.postMatchReviews.length ? "Add review" : "Start review")}
                onOpen={() => openModule("post-match")}
              />
            </div>
          </section>
        )}
      </div>

      <footer className="wb-workbook-footer">
        <section className="wb-privacy-notice" aria-labelledby="wb-privacy-title">
          <Icon name="brain" size={21} stroke={2} />
          <div><h2 id="wb-privacy-title">Local to this browser profile</h2><p>Your responses are never added to <code>window.WKB</code>, knowledge-base entries, or published content. Anyone using this same browser profile can view them. Use a personal browser profile on shared devices, and download a backup before clearing browser storage.</p></div>
        </section>
        <section className="wb-data-tools" aria-labelledby="wb-data-tools-title">
          <div><h2 id="wb-data-tools-title">Backup and browser data</h2><p>Backups contain your personal responses. Keep the JSON file somewhere you trust.</p></div>
          <div className="wb-data-tool-actions">
            <button className="wb-secondary-button" type="button" onClick={downloadBackup}><Icon name="download" size={18} stroke={2.2} />Download JSON backup</button>
            {writeBlockedRef.current && lastStoredRawRef.current && <button className="wb-secondary-button" type="button" onClick={downloadStoredRecoveryCopy}><Icon name="download" size={18} stroke={2.2} />Download unreadable stored copy</button>}
            <button className="wb-secondary-button" type="button" onClick={() => restoreInputRef.current && restoreInputRef.current.click()}><Icon name="file" size={18} stroke={2.1} />Restore backup</button>
            {canUndoRestore && <button className="wb-secondary-button" type="button" onClick={undoLastRestore}><Icon name="back" size={18} stroke={2.1} />Undo last restore</button>}
            <input ref={restoreInputRef} className="wb-visually-hidden" type="file" accept="application/json,.json" onChange={restoreBackup} aria-label="Choose a Mindset Workbook JSON backup to restore" tabIndex="-1" />
            <button className="wb-danger-button" type="button" onClick={clearAll}><Icon name="trash" size={18} stroke={2.1} />Clear all workbook data</button>
          </div>
          <p className="wb-data-notice" role="status" aria-live="polite" aria-atomic="true">{notice}</p>
        </section>
      </footer>
    </div>
  );
}

Object.assign(window, { MindsetWorkbook });
