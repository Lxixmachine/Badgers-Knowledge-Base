import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import vm from "node:vm";
import { transform } from "esbuild";
import { JSDOM, VirtualConsole } from "jsdom";
import React from "react";

const root = new URL("./", import.meta.url);
const read = (name) => readFile(new URL(name, root), "utf8");
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const trace = (message) => { if (process.env.WKB_TEST_TRACE) console.log(`  -> ${message}`); };

async function testStaticArtifacts() {
  const [html, duplicate, standalone, bundle, content, distHtml, distBundle, distContent, distTree] = await Promise.all([
    read("index.html"), read("Badgers Knowledge Base.html"), read("Badgers Knowledge Base (standalone).html"),
    read("app.compiled.js"), read("content.js"), read("dist/index.html"), read("dist/app.compiled.js"), read("dist/content.js"),
    readdir(new URL("dist/", root), { recursive: true }),
  ]);
  assert.match(html, /<script src="content\.js"><\/script>\s*<script src="app\.compiled\.js"><\/script>/);
  assert.match(bundle, /MindsetWorkbook/);
  assert.match(bundle, /wkb_mindset_workbook_v1/);
  assert.match(bundle, /Understand the work before you answer/);
  assert.match(bundle, /MINDSET_CURRICULUM_CONTEXT/);
  assert.match(html, /\.wb-workbook\{/);
  assert.match(html, /@media\(max-width:720px\)/);
  const styleDom = new JSDOM(html);
  const findStyleRule = (selector) => {
    let match = null;
    const visit = (rules) => {
      for (const rule of rules) {
        if (rule.selectorText === selector) match = rule;
        if (rule.cssRules) visit(rule.cssRules);
      }
    };
    for (const sheet of styleDom.window.document.styleSheets) visit(sheet.cssRules);
    return match;
  };
  const questionRule = findStyleRule(".wb-baseline-question");
  const answerRowRule = findStyleRule(".wb-baseline-question>legend+.wb-answer-options");
  const curriculumSummaryFocusRule = findStyleRule(".wb-curriculum-unit>summary:focus-visible");
  const lessonGuideRule = findStyleRule(".wb-lesson-guide");
  assert.equal(questionRule?.style.getPropertyValue("min-width"), "0");
  assert.equal(answerRowRule?.style.getPropertyValue("clear"), "left");
  assert.equal(answerRowRule?.style.getPropertyValue("width"), "100%");
  assert.match(curriculumSummaryFocusRule?.style.getPropertyValue("outline") || "", /3px solid/);
  assert.equal(curriculumSummaryFocusRule?.style.getPropertyValue("outline-offset"), "-4px");
  assert.match(lessonGuideRule?.style.getPropertyValue("border") || "", /1px solid/);
  assert.equal(duplicate, html);
  assert.equal(distHtml, html);
  assert.equal(distBundle, bundle);
  assert.equal(distContent, content);
  assert.equal(distTree.some((path) => path === "uploads" || path.startsWith("uploads/")), false);
  assert.equal(distTree.some((path) => /(?:\.jsx$|package(?:-lock)?\.json$|(?:build|serve|test)\.mjs$)/.test(path)), false);
  assert.match(standalone, /MindsetWorkbook/);
  assert.doesNotMatch(standalone, /<script src="(?:content|app\.compiled)\.js"><\/script>/);
  assert.doesNotMatch(content, /18O7Lj-WjcaTx0T6ZR1hQvfZoxvtP8LzTGYG7Vr2phUQ/);
}

function relativeLuminance(hex) {
  const channels = hex.slice(1).match(/.{2}/g).map((value) => parseInt(value, 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(first, second) {
  const values = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

async function testThemeContrast() {
  const [html, components, app] = await Promise.all([read("index.html"), read("components.jsx"), read("app.jsx")]);
  for (const token of [
    "#C5050C", "#ff6b70", "#a50008", "#9a9aa5", "#68635c", "#91919c",
    "#55c987", "#187a42", "#ff8585", "#a8000b", "#b4232d",
    "#7db2f1", "#1d62ae", "#e4a04f", "#8b4b00", "#e1798b", "#a72d45",
  ]) {
    assert.match(html.toLowerCase(), new RegExp(token.toLowerCase()));
  }
  const pairs = [
    ["#ffffff", "#C5050C"],
    ["#ff6b70", "#17171d"],
    ["#ff6b70", "#101013"],
    ["#a50008", "#ffffff"],
    ["#9a9aa5", "#17171d"],
    ["#68635c", "#ffffff"],
    ["#68635c", "#f7f6f2"],
    ["#91919c", "#101013"],
    ["#55c987", "#17171d"],
    ["#187a42", "#ffffff"],
    ["#ffffff", "#187a42"],
    ["#ff8585", "#17171d"],
    ["#a8000b", "#ffffff"],
    ["#ffffff", "#b4232d"],
    ["#7db2f1", "#17171d"],
    ["#1d62ae", "#ffffff"],
    ["#e4a04f", "#17171d"],
    ["#8b4b00", "#ffffff"],
    ["#e1798b", "#17171d"],
    ["#a72d45", "#ffffff"],
  ];
  pairs.forEach(([foreground, background]) => {
    assert.ok(contrastRatio(foreground, background) >= 4.5, `${foreground} on ${background} must meet 4.5:1`);
  });
  assert.doesNotMatch(components, /className="(?:card__cat|detail__cat)"[^>]*var\(--accent\)/);
  assert.match(components, /className="card__cat"[^>]*var\(--accent-tx\)/);
  assert.match(components, /className="detail__cat"[^>]*var\(--accent-tx\)/);
  assert.match(app, /function accentForeground\(/);
  assert.match(app, /setProperty\("--accent-ink", accentForeground\(t\.accent\)\)/);
}

async function testAccessibilityStructure() {
  const [components, app, mindset] = await Promise.all([read("components.jsx"), read("app.jsx"), read("mindset.jsx")]);
  assert.match(components, /<button className="card__open"[^>]*onClick=/);
  assert.match(components, /role="dialog" aria-modal="true" aria-labelledby="entry-detail-title"/);
  assert.match(components, /role="dialog" aria-modal="true" aria-labelledby="entry-form-title"/);
  assert.match(components, /role="alertdialog"[\s\S]*aria-describedby="entry-delete-description"/);
  assert.match(components, /function useDialogFocus\(/);
  assert.match(app, /className="side__close"[^>]*aria-label="Close menu"/);
  assert.match(app, /<button className="scrim"[^>]*aria-label="Close menu"/);
  assert.doesNotMatch(mindset, />Private note</);
  assert.match(mindset, />Personal note/);
  assert.doesNotMatch(mindset, /Private · Optional/);
  assert.match(mindset, /Sensitive · Optional/);
  assert.match(mindset, /aria-describedby=\{field\.hint \? hintId : undefined\}/);
  assert.match(mindset, /<fieldset className="wb-rating" aria-describedby=\{id \+ "-help"\}>/);
  assert.match(mindset, /<section className="wb-lesson-guide" aria-labelledby=\{headingId\}>/);
  assert.match(mindset, /<section className="wb-unit-guide" aria-label=\{unit\.title \+ " unit roadmap"\}>/);
}

async function loadMindsetCore() {
  const [curriculumSource, foundationsContext, performanceContext, competitionContext, source] = await Promise.all([
    read("mindset-curriculum.jsx"),
    read("mindset-context-foundations.jsx"),
    read("mindset-context-performance.jsx"),
    read("mindset-context-competition.jsx"),
    read("mindset.jsx"),
  ]);
  const instrumented = source + `\nObject.assign(window.__mindsetTest, {
    makeEmptyMindsetWorkbook, validateMindsetWorkbook, normalizeMindsetWorkbook,
    baselineStats, gamePlanCompletion, weeklyDraftCompletion, postDraftCompletion,
    makeWeeklyDraft, makePostMatchDraft, makeGoalAction, makeGoalCurrentWeek, makeGoalSystem,
    goalWeekStats, goalSystemProgress, goalReviewFromSystem, goalSystemSummary, goalReviewSummary,
    postMatchCurriculumProgress, curriculumProgramProgress,
    MINDSET_CURRICULUM_LESSONS, MINDSET_CURRICULUM_RESPONSE_KEYS,
    MINDSET_CURRICULUM_CONTEXT, MINDSET_CURRICULUM_UNIT_CONTEXT,
    MINDSET_SCHEMA_VERSION, MINDSET_MAX_HISTORY_ENTRIES, MINDSET_MAX_TEXT_LENGTH,
    MINDSET_MAX_GOAL_ACTIONS, MINDSET_MAX_GOAL_WEEKLY_TARGET, MINDSET_MAX_GOAL_REVIEWS
  });`;
  const context = {
    window: { __mindsetTest: {}, localStorage: { getItem: () => null, setItem() {}, removeItem() {} } },
    document: {},
    React: { useEffect() {}, useMemo() {}, useRef() {}, useState() {}, createElement() {} },
    Blob,
    Date,
    FileReader: function FileReader() {},
    Intl,
    JSON,
    Math,
    Object,
    Set,
    crypto: { randomUUID: () => "00000000-0000-4000-8000-000000000000" },
  };
  const curriculumCompiled = await transform(curriculumSource, { loader: "jsx", format: "iife", target: "es2018" });
  vm.runInNewContext(curriculumCompiled.code, context, { filename: "mindset-curriculum.test.js" });
  for (const [filename, contextSource] of [
    ["mindset-context-foundations.test.js", foundationsContext],
    ["mindset-context-performance.test.js", performanceContext],
    ["mindset-context-competition.test.js", competitionContext],
  ]) {
    const contextCompiled = await transform(contextSource, { loader: "jsx", format: "iife", target: "es2018" });
    vm.runInNewContext(contextCompiled.code, context, { filename });
  }
  const compiled = await transform(instrumented, { loader: "jsx", format: "iife", target: "es2018" });
  vm.runInNewContext(compiled.code, context, { filename: "mindset.test.js" });
  return context.window.__mindsetTest;
}

async function testWorkbookValidation() {
  const core = await loadMindsetCore();
  const empty = core.makeEmptyMindsetWorkbook();
  assert.equal(core.validateMindsetWorkbook(empty), null);
  assert.equal(empty.version, 2);
  assert.equal(empty.goalSystem.actions.length, 0);
  assert.equal(empty.goalSystem.reviews.length, 0);
  assert.equal(empty.postMatchDraft.checklist.firstMove, false);

  const legacyBackup = structuredClone(empty);
  legacyBackup.version = 1;
  legacyBackup.baseline.notes["goal-clear"] = "Preserve this version-one response";
  delete legacyBackup.suspendedWeeklyDraft;
  delete legacyBackup.suspendedPostMatchDraft;
  delete legacyBackup.curriculum;
  delete legacyBackup.goalSystem;
  assert.equal(core.validateMindsetWorkbook(legacyBackup), null);
  const normalizedLegacyBackup = core.normalizeMindsetWorkbook(legacyBackup);
  assert.equal(normalizedLegacyBackup.version, core.MINDSET_SCHEMA_VERSION);
  assert.equal(normalizedLegacyBackup.baseline.notes["goal-clear"], "Preserve this version-one response");
  assert.equal(normalizedLegacyBackup.suspendedWeeklyDraft, null);
  assert.equal(normalizedLegacyBackup.suspendedPostMatchDraft, null);
  assert.equal(Object.keys(normalizedLegacyBackup.curriculum.responses).length, 0);
  assert.equal(normalizedLegacyBackup.goalSystem.actions.length, 0);
  assert.equal(normalizedLegacyBackup.goalSystem.reviews.length, 0);

  const backupWithSuspendedDrafts = structuredClone(empty);
  backupWithSuspendedDrafts.suspendedWeeklyDraft = {
    ...core.makeWeeklyDraft(),
    date: "2026-07-21",
    win: "Weekly draft survives restore",
    hidden: "must not survive",
  };
  backupWithSuspendedDrafts.suspendedPostMatchDraft = {
    ...core.makePostMatchDraft(),
    event: "Post-match draft survives restore",
    improvements: ["First", "Second", "Third"],
    hidden: "must not survive",
  };
  assert.equal(core.validateMindsetWorkbook(backupWithSuspendedDrafts), null);
  const normalizedSuspendedDrafts = core.normalizeMindsetWorkbook(backupWithSuspendedDrafts);
  assert.equal(normalizedSuspendedDrafts.suspendedWeeklyDraft.win, "Weekly draft survives restore");
  assert.equal(normalizedSuspendedDrafts.suspendedPostMatchDraft.event, "Post-match draft survives restore");
  assert.equal("hidden" in normalizedSuspendedDrafts.suspendedWeeklyDraft, false);
  assert.equal("hidden" in normalizedSuspendedDrafts.suspendedPostMatchDraft, false);

  const legacyPostBackup = structuredClone(empty);
  const legacyPostChecklist = { ...legacyPostBackup.postMatchDraft.checklist, firstMove: true };
  for (const key of ["topFirstMove", "bottomFirstMove", "fullRoutine", "turnAttempts", "finishedPeriods", "edgeEffort", "hustleCenter"]) delete legacyPostChecklist[key];
  legacyPostBackup.postMatchDraft.checklist = legacyPostChecklist;
  legacyPostBackup.postMatchReviews = [{
    ...legacyPostBackup.postMatchDraft,
    editingId: undefined,
    id: "legacy-post",
    createdAt: "2026-07-20T00:00:00.000Z",
    updatedAt: "2026-07-20T00:00:00.000Z",
  }];
  delete legacyPostBackup.postMatchReviews[0].editingId;
  assert.equal(core.validateMindsetWorkbook(legacyPostBackup), null);
  const normalizedLegacyPost = core.normalizeMindsetWorkbook(legacyPostBackup);
  assert.equal(normalizedLegacyPost.postMatchDraft.checklist.topFirstMove, true);
  assert.equal(normalizedLegacyPost.postMatchDraft.checklist.bottomFirstMove, true);
  assert.equal(normalizedLegacyPost.postMatchReviews[0].checklist.topFirstMove, true);
  assert.equal(normalizedLegacyPost.postMatchReviews[0].checklist.bottomFirstMove, true);
  assert.equal(normalizedLegacyPost.postMatchReviews[0].checklist.firstMove, true);

  const savedReviewProgress = core.postMatchCurriculumProgress(core.makePostMatchDraft(), [{
    ...core.makePostMatchDraft(),
    event: "Saved dual",
    reflection: "Completed review",
  }]);
  assert.equal(savedReviewProgress.complete, 2);

  const invalidSuspendedDraft = structuredClone(backupWithSuspendedDrafts);
  invalidSuspendedDraft.suspendedWeeklyDraft.editingId = "history-entry";
  assert.match(core.validateMindsetWorkbook(invalidSuspendedDraft), /invalid suspended weekly check-in draft/i);

  const wrongVersion = structuredClone(empty);
  wrongVersion.version = 99;
  assert.match(core.validateMindsetWorkbook(wrongVersion), /unsupported workbook version/i);

  const duplicateIds = structuredClone(empty);
  const weekly = {
    ...core.makeWeeklyDraft(), editingId: undefined, id: "same-id",
    date: "2026-07-20", createdAt: "2026-07-20T00:00:00.000Z", updatedAt: "2026-07-20T00:00:00.000Z",
  };
  delete weekly.editingId;
  duplicateIds.weeklyCheckIns = [weekly, { ...weekly }];
  assert.match(core.validateMindsetWorkbook(duplicateIds), /invalid weekly check-in history/i);

  const tooLong = structuredClone(empty);
  tooLong.gamePlan.tiePreference = "x".repeat(core.MINDSET_MAX_TEXT_LENGTH + 1);
  assert.match(core.validateMindsetWorkbook(tooLong), /invalid game-plan section/i);

  const goalBackup = structuredClone(empty);
  const goalAction = {
    id: "goal-action-1",
    title: "Drill first-move sequence",
    category: "technique",
    weeklyTarget: 3,
    cue: "After practice Tuesday and Thursday",
    proof: "Practice-log note",
  };
  goalBackup.goalSystem.goal = {
    title: "Win bottom position",
    why: "Stay dangerous and dependable late in matches",
    successDefinition: "Escape within twenty seconds against live resistance",
    targetDate: "2026-10-31",
  };
  goalBackup.goalSystem.actions = [goalAction];
  goalBackup.goalSystem.currentWeek = {
    weekOf: "2026-07-20",
    completions: { [goalAction.id]: 2 },
    win: "Hit the sequence under pressure",
    obstacle: "Rushed the hand clear",
    adjustment: "Slow the first hand movement",
    checkInCompleted: true,
  };
  goalBackup.goalSystem.accountability = {
    partnerName: "Coach",
    method: "Text message",
    reviewDay: "Sunday",
    reviewTime: "18:00",
    checkInPrompt: "Ask me what I learned and what I will adjust",
    resetPlan: "Restart with the next smallest planned action",
  };
  const goalReview = core.goalReviewFromSystem(goalBackup.goalSystem, "goal-review-1", "2026-07-20T18:00:00.000Z");
  goalBackup.goalSystem.reviews = [goalReview];
  assert.equal(core.validateMindsetWorkbook(goalBackup), null);
  assert.equal(core.goalWeekStats(goalBackup.goalSystem).percent, 67);
  assert.equal(core.goalSystemProgress(goalBackup.goalSystem).complete, 10);

  const displayFixtureDate = (value) => {
    const [year, month, day] = value.split("-").map(Number);
    return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" })
      .format(new Date(year, month - 1, day));
  };
  const expectedGoalSummary = [
    "GOAL CHECK-IN — Week of " + displayFixtureDate("2026-07-20"),
    "Goal: Win bottom position",
    "Why it matters: Stay dangerous and dependable late in matches",
    "Success looks like: Escape within twenty seconds against live resistance",
    "Target date: " + displayFixtureDate("2026-10-31"),
    "",
    "Action score: 2/3 planned reps (67%)",
    "- Drill first-move sequence: 2/3",
    "",
    "Win: Hit the sequence under pressure",
    "Barrier: Rushed the hand clear",
    "Next adjustment: Slow the first hand movement",
    "Accountability check-in shared: Yes",
    "Next check-in: Sunday · 18:00 · Text message",
    "With: Coach",
    "Support request: Ask me what I learned and what I will adjust",
  ].join("\n");
  assert.equal(core.goalSystemSummary(goalBackup.goalSystem), expectedGoalSummary);
  assert.equal(core.goalSystemSummary(goalBackup.goalSystem), expectedGoalSummary);
  assert.match(core.goalReviewSummary(goalReview), /Action score: 2\/3 planned reps \(67%\)/);

  const duplicateGoalActions = structuredClone(goalBackup);
  duplicateGoalActions.goalSystem.actions.push({ ...duplicateGoalActions.goalSystem.actions[0] });
  assert.match(core.validateMindsetWorkbook(duplicateGoalActions), /invalid goal-system section/i);

  const duplicateGoalReviews = structuredClone(goalBackup);
  duplicateGoalReviews.goalSystem.reviews.push({ ...duplicateGoalReviews.goalSystem.reviews[0] });
  assert.match(core.validateMindsetWorkbook(duplicateGoalReviews), /invalid goal-system section/i);

  for (const invalidCompletions of [
    { unknown: 1 },
    { [goalAction.id]: -1 },
    { [goalAction.id]: 4 },
    { [goalAction.id]: 1.5 },
  ]) {
    const invalidGoalCount = structuredClone(goalBackup);
    invalidGoalCount.goalSystem.currentWeek.completions = invalidCompletions;
    assert.match(core.validateMindsetWorkbook(invalidGoalCount), /invalid goal-system section/i);
  }

  const excessiveGoalTarget = structuredClone(goalBackup);
  excessiveGoalTarget.goalSystem.actions[0].weeklyTarget = core.MINDSET_MAX_GOAL_WEEKLY_TARGET + 1;
  assert.match(core.validateMindsetWorkbook(excessiveGoalTarget), /invalid goal-system section/i);

  const excessiveGoalActions = structuredClone(empty);
  excessiveGoalActions.goalSystem.actions = Array.from({ length: core.MINDSET_MAX_GOAL_ACTIONS + 1 }, (_, index) => ({
    ...goalAction,
    id: "goal-action-limit-" + index,
  }));
  assert.match(core.validateMindsetWorkbook(excessiveGoalActions), /invalid goal-system section/i);

  const excessiveGoalReviews = structuredClone(goalBackup);
  excessiveGoalReviews.goalSystem.reviews = Array.from({ length: core.MINDSET_MAX_GOAL_REVIEWS + 1 }, (_, index) => ({
    ...goalReview,
    id: "goal-review-limit-" + index,
  }));
  assert.match(core.validateMindsetWorkbook(excessiveGoalReviews), /invalid goal-system section/i);

  const unsafeGoalId = structuredClone(goalBackup);
  unsafeGoalId.goalSystem.actions[0].id = "__proto__";
  unsafeGoalId.goalSystem.currentWeek.completions = { ["__proto__"]: 1 };
  assert.match(core.validateMindsetWorkbook(unsafeGoalId), /invalid goal-system section/i);

  const excessiveGoalShortText = structuredClone(goalBackup);
  excessiveGoalShortText.goalSystem.actions[0].cue = "x".repeat(181);
  assert.match(core.validateMindsetWorkbook(excessiveGoalShortText), /invalid goal-system section/i);

  const tooLongGoal = structuredClone(goalBackup);
  tooLongGoal.goalSystem.goal.why = "x".repeat(core.MINDSET_MAX_TEXT_LENGTH + 1);
  assert.match(core.validateMindsetWorkbook(tooLongGoal), /invalid goal-system section/i);

  const hiddenGoalData = structuredClone(goalBackup);
  hiddenGoalData.goalSystem.hidden = "must not survive";
  hiddenGoalData.goalSystem.goal.hidden = "must not survive";
  hiddenGoalData.goalSystem.actions[0].hidden = "must not survive";
  hiddenGoalData.goalSystem.currentWeek.hidden = "must not survive";
  hiddenGoalData.goalSystem.accountability.hidden = "must not survive";
  hiddenGoalData.goalSystem.reviews[0].hidden = "must not survive";
  hiddenGoalData.goalSystem.reviews[0].actions[0].hidden = "must not survive";
  assert.equal(core.validateMindsetWorkbook(hiddenGoalData), null);
  const normalizedGoalData = core.normalizeMindsetWorkbook(hiddenGoalData);
  assert.equal("hidden" in normalizedGoalData.goalSystem, false);
  assert.equal("hidden" in normalizedGoalData.goalSystem.goal, false);
  assert.equal("hidden" in normalizedGoalData.goalSystem.actions[0], false);
  assert.equal("hidden" in normalizedGoalData.goalSystem.currentWeek, false);
  assert.equal("hidden" in normalizedGoalData.goalSystem.accountability, false);
  assert.equal("hidden" in normalizedGoalData.goalSystem.reviews[0], false);
  assert.equal("hidden" in normalizedGoalData.goalSystem.reviews[0].actions[0], false);

  assert.equal(core.MINDSET_CURRICULUM_LESSONS.length, 70);
  const curriculumLessonIds = core.MINDSET_CURRICULUM_LESSONS.map((lesson) => lesson.id);
  const curriculumContextIds = Object.keys(core.MINDSET_CURRICULUM_CONTEXT);
  const wordCount = (value) => value.trim().split(/\s+/).length;
  assert.equal(curriculumContextIds.length, 70);
  assert.equal(new Set(curriculumContextIds).size, 70);
  assert.equal(curriculumContextIds.slice().sort().join("|"), curriculumLessonIds.slice().sort().join("|"));
  for (const lesson of core.MINDSET_CURRICULUM_LESSONS) {
    const guide = core.MINDSET_CURRICULUM_CONTEXT[lesson.id];
    assert.ok(guide.why.trim().length >= 80, `${lesson.id} needs useful why context`);
    assert.ok(wordCount(guide.why) <= 55, `${lesson.id} why context must stay phone-friendly`);
    assert.equal(Array.isArray(guide.steps), true, `${lesson.id} steps must be an array`);
    assert.equal(guide.steps.length, 3, `${lesson.id} needs exactly three instructions`);
    assert.equal(guide.steps.every((step) => typeof step === "string" && step.trim().length >= 20), true, `${lesson.id} instructions need substance`);
    assert.equal(guide.steps.every((step) => wordCount(step) <= 35), true, `${lesson.id} instructions must stay phone-friendly`);
    assert.ok(guide.example.trim().length >= 45, `${lesson.id} needs a concrete example`);
    assert.ok(wordCount(guide.example) <= 40, `${lesson.id} example must stay phone-friendly`);
  }
  const curriculumUnitIds = [...new Set(core.MINDSET_CURRICULUM_LESSONS.map((lesson) => lesson.unitId))];
  assert.equal(Object.keys(core.MINDSET_CURRICULUM_UNIT_CONTEXT).length, 11);
  for (const unitId of curriculumUnitIds) {
    const guide = core.MINDSET_CURRICULUM_UNIT_CONTEXT[unitId];
    assert.ok(guide.overview.trim().length >= 100, `${unitId} needs a useful unit overview`);
    assert.ok(guide.approach.trim().length >= 35, `${unitId} needs unit instructions`);
  }
  const curriculumGuidanceText = JSON.stringify({ lessons: core.MINDSET_CURRICULUM_CONTEXT, units: core.MINDSET_CURRICULUM_UNIT_CONTEXT });
  assert.doesNotMatch(curriculumGuidanceText, /compete through pain|push through pain|no mercy|score 50 points|castor oil|success hotline|text mindset|inner wimp|shut up/i);
  assert.match(core.MINDSET_CURRICULUM_CONTEXT["relaxing-under-pressure-1"].why, /mild pre-match sensations/i);
  assert.match(core.MINDSET_CURRICULUM_CONTEXT["injury-recovery-1"].steps.join(" "), /restrictions[\s\S]*stop and report/i);
  assert.ok(core.MINDSET_CURRICULUM_RESPONSE_KEYS.size > 100);
  const curriculumKey = [...core.MINDSET_CURRICULUM_RESPONSE_KEYS][0];
  const curriculumBackup = structuredClone(empty);
  curriculumBackup.curriculum.responses[curriculumKey] = "Saved development response";
  assert.equal(core.validateMindsetWorkbook(curriculumBackup), null);
  const unknownCurriculumField = structuredClone(empty);
  unknownCurriculumField.curriculum.responses["unknown.lesson"] = "must be rejected";
  assert.match(core.validateMindsetWorkbook(unknownCurriculumField), /invalid development-program section/i);

  const hiddenData = structuredClone(empty);
  hiddenData.weeklyDraft.hidden = "must not survive";
  hiddenData.postMatchDraft.hidden = "must not survive";
  const normalized = core.normalizeMindsetWorkbook(hiddenData);
  assert.equal("hidden" in normalized.weeklyDraft, false);
  assert.equal("hidden" in normalized.postMatchDraft, false);
  assert.equal(core.MINDSET_MAX_HISTORY_ENTRIES, 200);
  assert.equal(core.MINDSET_MAX_GOAL_REVIEWS, 104);
}

async function waitForServer(url, child) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`Local server exited with ${child.exitCode}.`);
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {}
    await delay(50);
  }
  throw new Error("Local server did not become ready.");
}

async function testLocalServer() {
  const port = 4300 + Math.floor(Math.random() * 300);
  const base = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ["serve.mjs", String(port)], { cwd: new URL(".", root), stdio: "ignore" });
  try {
    const indexResponse = await waitForServer(`${base}/`, child);
    assert.match(await indexResponse.text(), /Badgers Wrestling/);
    for (const path of ["/content.js", "/app.compiled.js"]) {
      const response = await fetch(base + path);
      assert.equal(response.status, 200, `${path} should load`);
      assert.match(response.headers.get("content-type") || "", /javascript/);
    }
    assert.equal((await fetch(`${base}/missing-file`)).status, 404);
    assert.equal((await fetch(`${base}/..%2Fpackage.json`)).status, 404);
  } finally {
    child.kill();
  }
}

function setControlValue(window, control, value) {
  const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(control), "value");
  descriptor.set.call(control, value);
  control.dispatchEvent(new window.Event("input", { bubbles: true }));
  control.dispatchEvent(new window.Event("change", { bubbles: true }));
}

async function click(window, act, element) {
  assert.ok(element, "Expected a clickable element");
  await act(async () => {
    element.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }));
    await delay(0);
  });
}

async function change(window, act, control, value) {
  assert.ok(control, "Expected a form control");
  await act(async () => {
    setControlValue(window, control, value);
    await delay(0);
  });
}

async function testOpenAthleteGate() {
  const jsdomErrors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", (error) => jsdomErrors.push(error));
  const dom = new JSDOM("<!doctype html><html><body><div id=\"root\"></div></body></html>", {
    url: "https://badgers.test/",
    runScripts: "outside-only",
    pretendToBeVisual: true,
    virtualConsole,
  });
  const { window } = dom;
  const globalKeys = ["window", "document", "navigator", "HTMLElement", "Node"];
  const previousGlobals = Object.fromEntries(globalKeys.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const replacements = { window, document: window.document, navigator: window.navigator, HTMLElement: window.HTMLElement, Node: window.Node };
  globalKeys.forEach((key) => Object.defineProperty(globalThis, key, { value: replacements[key], configurable: true, writable: true }));
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;

  window.matchMedia = () => ({
    matches: false,
    media: "(max-width: 920px)",
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  });
  window.confirm = () => true;
  window.scrollTo = () => {};
  window.HTMLElement.prototype.scrollTo = () => {};
  window.HTMLElement.prototype.scrollIntoView = () => {};
  window.URL.createObjectURL = () => "blob:test";
  window.URL.revokeObjectURL = () => {};
  window.React = React;

  const { createRoot } = await import("react-dom/client");
  const act = React.act;
  window.ReactDOM = { createRoot };
  try {
    window.eval(await read("content.js"));
    window.WKB_PUBLISHED.gate = { athlete: "", coach: "coachonly" };
    await act(async () => {
      window.eval(await read("app.compiled.js"));
      await delay(0);
    });
    trace("rendered app and gate");

    assert.equal(window.document.querySelector('[data-testid="athlete-login-gate"]'), null);
    assert.equal(window.document.querySelector(".addbtn").style.display, "none");
    const coachSignIn = [...window.document.querySelectorAll(".rolebar__out")]
      .find((button) => button.textContent.trim() === "Coach sign in");
    await click(window, act, coachSignIn);
    assert.match(window.document.querySelector('[data-testid="coach-login-gate"] .gate__sub').textContent, /coach passcode/i);

    await change(window, act, window.document.querySelector(".gate__in"), "badgers");
    await act(async () => {
      window.document.querySelector(".gate__card").dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
      await delay(0);
    });
    trace("unlocked athlete app");
    assert.match(window.document.querySelector(".gate__err").textContent, /didn't match/i);

    await change(window, act, window.document.querySelector(".gate__in"), "coachonly");
    await act(async () => {
      window.document.querySelector(".gate__card").dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
      await delay(0);
    });
    assert.equal(window.document.querySelector('[data-testid="coach-login-gate"]'), null);
    assert.match(window.document.querySelector(".rolebar__tag").textContent, /coach/i);
    assert.notEqual(window.document.querySelector(".addbtn").style.display, "none");

    const exitCoachMode = [...window.document.querySelectorAll(".rolebar__out")]
      .find((button) => button.textContent.trim() === "Exit coach mode");
    await click(window, act, exitCoachMode);
    assert.equal(window.document.querySelector('[data-testid="athlete-login-gate"]'), null);
    assert.equal(window.document.querySelector(".addbtn").style.display, "none");
    assert.ok([...window.document.querySelectorAll(".rolebar__out")]
      .some((button) => button.textContent.trim() === "Coach sign in"));
    assert.equal(jsdomErrors.length, 0, jsdomErrors.map((error) => error.stack || error.message).join("\n"));
  } finally {
    dom.window.close();
    globalKeys.forEach((key) => {
      if (previousGlobals[key]) Object.defineProperty(globalThis, key, previousGlobals[key]);
      else delete globalThis[key];
    });
    delete globalThis.IS_REACT_ACT_ENVIRONMENT;
  }
}

async function testRenderedWorkbook() {
  const jsdomErrors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", (error) => jsdomErrors.push(error));
  const dom = new JSDOM("<!doctype html><html><body><div id=\"root\"></div></body></html>", {
    url: "https://badgers.test/",
    runScripts: "outside-only",
    pretendToBeVisual: true,
    virtualConsole,
  });
  const { window } = dom;
  const globalKeys = ["window", "document", "navigator", "HTMLElement", "Node"];
  const previousGlobals = Object.fromEntries(globalKeys.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const replacements = { window, document: window.document, navigator: window.navigator, HTMLElement: window.HTMLElement, Node: window.Node };
  globalKeys.forEach((key) => Object.defineProperty(globalThis, key, { value: replacements[key], configurable: true, writable: true }));
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;

  const mediaListeners = new Set();
  window.matchMedia = () => ({
    matches: true,
    media: "(max-width: 920px)",
    addEventListener: (_type, listener) => mediaListeners.add(listener),
    removeEventListener: (_type, listener) => mediaListeners.delete(listener),
    addListener: (listener) => mediaListeners.add(listener),
    removeListener: (listener) => mediaListeners.delete(listener),
  });
  window.confirm = () => true;
  window.scrollTo = () => {};
  window.HTMLElement.prototype.scrollTo = () => {};
  window.HTMLElement.prototype.scrollIntoView = () => {};
  window.URL.createObjectURL = () => "blob:test";
  window.URL.revokeObjectURL = () => {};
  window.React = React;

  const { createRoot } = await import("react-dom/client");
  const act = React.act;
  window.ReactDOM = { createRoot };
  try {
    window.eval(await read("content.js"));
    await act(async () => {
      window.eval(await read("app.compiled.js"));
      await delay(0);
    });

    const gateInput = window.document.querySelector(".gate__in");
    trace("rendered workbook-flow gate");
    await change(window, act, gateInput, "wrong");
    await act(async () => {
      window.document.querySelector(".gate__card").dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
      await delay(0);
    });
    assert.match(window.document.body.textContent, /passcode didn't match/i);
    await change(window, act, window.document.querySelector(".gate__in"), "badgers");
    await act(async () => {
      window.document.querySelector(".gate__card").dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
      await delay(0);
    });

    const side = window.document.getElementById("site-navigation");
    trace("unlocked workbook-flow athlete app");
    assert.equal(side.getAttribute("aria-hidden"), "true");
    await click(window, act, window.document.querySelector(".hamb"));
    assert.equal(side.hasAttribute("aria-hidden"), false);
    assert.equal(window.document.querySelector("main.main").inert, true);
    await act(async () => { await delay(50); });
    const drawerClose = side.querySelector('.side__close[aria-label="Close menu"]');
    assert.ok(window.document.activeElement === drawerClose, "Drawer close button should receive focus");
    await click(window, act, drawerClose);
    assert.equal(side.getAttribute("aria-hidden"), "true");
    assert.equal(window.document.querySelector("main.main").inert, false);
    assert.ok(window.document.activeElement === window.document.querySelector(".hamb"), "Hamburger should regain focus");
    await click(window, act, window.document.querySelector(".hamb"));
    trace("verified mobile drawer focus");

    await click(window, act, window.document.querySelector('[data-testid="mindset-workbook-nav"]'));
    assert.equal(window.document.querySelectorAll("[data-mindset-module-card]").length, 7);
    assert.match(window.document.querySelector(".wb-dashboard-header").textContent, /same browser profile can view them/i);
    trace("opened workbook dashboard");

    await click(window, act, window.document.querySelector('[data-testid="mindset-module-card-development"] .wb-primary-button'));
    assert.equal(window.document.querySelectorAll(".wb-curriculum-unit").length, 11);
    assert.equal(window.document.querySelectorAll(".wb-curriculum-lesson-button").length, 70);
    assert.equal(window.document.querySelectorAll(".wb-unit-guide").length, 11);
    await click(window, act, window.document.querySelector(".wb-curriculum-lesson-button"));
    assert.match(window.document.querySelector(".wb-lesson-guide").textContent, /Why this matters/i);
    assert.match(window.document.querySelector(".wb-lesson-guide").textContent, /Wrestling example/i);
    assert.equal(window.document.querySelectorAll(".wb-guide-steps li").length, 3);
    const firstCurriculumControl = window.document.querySelector(".wb-curriculum-form textarea.wb-field-control");
    assert.ok(firstCurriculumControl, "The first development worksheet should contain a response control");
    await change(window, act, firstCurriculumControl, "My complete-program response");
    await click(window, act, window.document.querySelector(".wb-back-button"));
    const returnedCurriculumUnit = window.document.getElementById("wb-curriculum-unit-self-knowledge");
    const returnedLessonButton = window.document.getElementById("wb-curriculum-open-self-knowledge-1");
    assert.equal(returnedCurriculumUnit.open, true);
    await act(async () => { await delay(50); });
    assert.ok(window.document.activeElement === returnedLessonButton, "Returning from a worksheet should restore its unit and focus its row");
    await click(window, act, window.document.querySelector('[data-testid="curriculum-open-self-knowledge-4"]'));
    await click(window, act, window.document.querySelector(".wb-linked-worksheet .wb-primary-button"));
    assert.ok(window.document.getElementById("wb-pre-match-title"));
    assert.match(window.document.querySelector(".wb-back-button").textContent, /Development worksheet/);
    await click(window, act, window.document.querySelector(".wb-back-button"));
    assert.ok(window.document.querySelector('[data-testid="curriculum-lesson-self-knowledge-4"]'), "Linked tools should return to their source worksheet");
    await click(window, act, window.document.querySelector(".wb-back-button"));
    await click(window, act, window.document.querySelector(".wb-back-button"));
    assert.ok(window.document.querySelector('[data-testid="mindset-module-card-baseline"]'));
    trace("verified comprehensive development program");

    await click(window, act, window.document.querySelector('[data-testid="mindset-module-card-goal-system"] .wb-primary-button'));
    assert.ok(window.document.getElementById("wb-goal-system-title"));
    await change(window, act, window.document.getElementById("wb-goal-title"), "Become dependable from bottom");
    await change(window, act, window.document.getElementById("wb-goal-why"), "I want a reliable answer late in close matches");
    await change(window, act, window.document.getElementById("wb-goal-success"), "Escape within twenty seconds against live resistance");
    await change(window, act, window.document.getElementById("wb-goal-target-date"), "2026-10-31");
    await click(window, act, window.document.getElementById("wb-goal-add-action"));
    const goalActionTitle = window.document.querySelector('[id^="wb-goal-action-title-"]');
    assert.ok(goalActionTitle, "Adding a goal action should render its controls");
    await change(window, act, goalActionTitle, "Drill first-move sequence");
    const renderedGoalActionId = goalActionTitle.id.replace("wb-goal-action-title-", "");
    await change(window, act, window.document.getElementById("wb-goal-action-target-" + renderedGoalActionId), "2");
    await change(window, act, window.document.getElementById("wb-goal-action-cue-" + renderedGoalActionId), "After practice Tuesday and Thursday");
    await change(window, act, window.document.getElementById("wb-goal-action-proof-" + renderedGoalActionId), "Practice-log note");
    await change(window, act, window.document.getElementById("wb-goal-week-of"), "2026-07-20");
    await change(window, act, window.document.getElementById("wb-goal-week-win"), "Finished the sequence under pressure");
    await change(window, act, window.document.getElementById("wb-goal-week-obstacle"), "Rushed the hand clear");
    await change(window, act, window.document.getElementById("wb-goal-week-adjustment"), "Slow the first hand movement");
    await change(window, act, window.document.getElementById("wb-goal-partner"), "Coach");
    await change(window, act, window.document.getElementById("wb-goal-method"), "Text message");
    await change(window, act, window.document.getElementById("wb-goal-review-day"), "Sunday");
    const incrementGoalAction = [...window.document.querySelectorAll(".wb-goal-count-button")]
      .find((button) => /Mark one completed rep/.test(button.getAttribute("aria-label") || ""));
    await click(window, act, incrementGoalAction);
    const copyCurrentGoal = [...window.document.querySelectorAll(".wb-goal-score-share .wb-secondary-button")]
      .find((button) => /Copy current check-in/i.test(button.textContent));
    await click(window, act, copyCurrentGoal);
    assert.match(window.document.querySelector(".wb-goal-score-share .wb-form-message").textContent, /copied|automatic copy is unavailable/i);
    await click(window, act, window.document.getElementById("wb-goal-check-in-complete"));
    assert.match(window.document.getElementById("wb-goal-share-summary").value, /Action score: 1\/2 planned reps \(50%\)/);
    assert.match(window.document.getElementById("wb-goal-share-summary").value, /Accountability check-in shared: Yes/);
    const saveGoalReview = [...window.document.querySelectorAll(".wb-goal-scoreboard .wb-primary-button")]
      .find((button) => /Save weekly review/i.test(button.textContent));
    await click(window, act, saveGoalReview);
    assert.equal(window.document.querySelectorAll(".wb-goal-history-card").length, 1);
    assert.match(window.document.querySelector(".wb-goal-history-card").textContent, /Drill first-move sequence: 1\/2/);
    assert.match(window.document.querySelector(".wb-goal-history-card").textContent, /SharedYes/);
    await click(window, act, [...window.document.querySelectorAll(".wb-goal-history-card .wb-secondary-button")].find((button) => /Reopen/i.test(button.textContent)));
    assert.equal(window.document.querySelectorAll(".wb-goal-history-card").length, 0);
    assert.equal(window.document.getElementById("wb-goal-week-of").value, "2026-07-20");
    assert.match(window.document.querySelector(".wb-goal-count output").textContent, /1of 2/);
    await click(window, act, [...window.document.querySelectorAll(".wb-goal-scoreboard .wb-primary-button")].find((button) => /Save weekly review/i.test(button.textContent)));
    assert.equal(window.document.querySelectorAll(".wb-goal-history-card").length, 1);

    await click(window, act, window.document.querySelector('.navitem:not(.navitem--workbook)'));
    const storedGoalSystem = JSON.parse(window.localStorage.getItem("wkb_mindset_workbook_v1"));
    assert.equal(storedGoalSystem.version, 2);
    assert.equal(storedGoalSystem.goalSystem.goal.title, "Become dependable from bottom");
    assert.equal(storedGoalSystem.goalSystem.actions[0].title, "Drill first-move sequence");
    assert.equal(storedGoalSystem.goalSystem.actions[0].weeklyTarget, 2);
    assert.equal(storedGoalSystem.goalSystem.accountability.partnerName, "Coach");
    assert.equal(storedGoalSystem.goalSystem.reviews.length, 1);
    assert.equal(storedGoalSystem.goalSystem.reviews[0].actions[0].completed, 1);
    assert.equal(storedGoalSystem.goalSystem.reviews[0].checkInCompleted, true);
    assert.equal(Object.keys(storedGoalSystem.goalSystem.currentWeek.completions).length, 0);
    trace("saved goal system and weekly review on fast exit");

    await click(window, act, window.document.querySelector('[data-testid="mindset-workbook-nav"]'));
    assert.match(window.document.querySelector('[data-testid="mindset-module-card-goal-system"]').textContent, /Become dependable from bottom/);

    await click(window, act, window.document.querySelector('[data-testid="mindset-module-card-baseline"] .wb-primary-button'));
    const baselineQuestions = [...window.document.querySelectorAll(".wb-baseline-question")];
    assert.ok(baselineQuestions.length > 0);
    baselineQuestions.forEach((question) => assert.equal(question.querySelectorAll(".wb-answer-option").length, 3));
    await click(window, act, window.document.querySelector('.wb-baseline-question input[value="working"]'));
    await change(window, act, window.document.querySelector(".wb-question-note textarea"), "Reset after the next whistle");
    await click(window, act, window.document.querySelector(".wb-back-button"));
    await click(window, act, window.document.querySelector('.navitem:not(.navitem--workbook)'));
    const storedAfterFastExit = JSON.parse(window.localStorage.getItem("wkb_mindset_workbook_v1"));
    assert.equal(Object.values(storedAfterFastExit.baseline.answers)[0], "working");
    assert.equal(Object.values(storedAfterFastExit.baseline.notes)[0], "Reset after the next whistle");
    assert.ok(Object.values(storedAfterFastExit.curriculum.responses).includes("My complete-program response"));
    trace("saved baseline fast-exit state");

    await click(window, act, window.document.querySelector('[data-testid="mindset-workbook-nav"]'));
    await click(window, act, window.document.querySelector('[data-testid="mindset-module-card-weekly"] .wb-primary-button'));
    await change(window, act, window.document.getElementById("wb-weekly-date"), "2026-07-20");
    await change(window, act, window.document.getElementById("wb-weekly-win"), "Finished strong");
    await click(window, act, window.document.querySelector(".wb-entry-form .wb-primary-button"));
    assert.equal(window.document.querySelectorAll(".wb-history-card").length, 1);

    await change(window, act, window.document.getElementById("wb-weekly-date"), "2026-07-21");
    await change(window, act, window.document.getElementById("wb-weekly-win"), "New draft stays safe");
    await click(window, act, window.document.querySelector(".wb-history-card .wb-secondary-button"));
    assert.equal(window.document.getElementById("wb-weekly-date").value, "2026-07-20");
    await click(window, act, window.document.querySelector('.navitem:not(.navitem--workbook)'));
    const storedWhileEditingWeekly = JSON.parse(window.localStorage.getItem("wkb_mindset_workbook_v1"));
    assert.equal(storedWhileEditingWeekly.suspendedWeeklyDraft.date, "2026-07-21");
    assert.equal(storedWhileEditingWeekly.suspendedWeeklyDraft.win, "New draft stays safe");
    await click(window, act, window.document.querySelector('[data-testid="mindset-workbook-nav"]'));
    await click(window, act, window.document.querySelector('[data-testid="mindset-module-card-weekly"] .wb-primary-button'));
    assert.equal(window.document.getElementById("wb-weekly-date").value, "2026-07-20");
    await click(window, act, window.document.querySelector(".wb-form-actions .wb-secondary-button"));
    assert.equal(window.document.getElementById("wb-weekly-date").value, "2026-07-21");
    assert.equal(window.document.getElementById("wb-weekly-win").value, "New draft stays safe");
    trace("restored displaced weekly draft");

    await click(window, act, window.document.querySelector(".wb-back-button"));
    await click(window, act, window.document.querySelector('[data-testid="mindset-module-card-post-match"] .wb-primary-button'));
    const checklist = window.document.querySelector(".wb-check-item input");
    await change(window, act, window.document.getElementById("wb-post-event"), "Saved dual");
    await click(window, act, checklist);
    const chosenLabel = checklist.parentElement.textContent.trim();
    await click(window, act, window.document.querySelector(".wb-entry-form .wb-primary-button"));
    assert.match(window.document.querySelector(".wb-history-card .wb-history-details").textContent, new RegExp(chosenLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(window.document.querySelector('.wb-visually-hidden[tabindex="-1"]'));

    await change(window, act, window.document.getElementById("wb-post-event"), "Unsaved tournament draft");
    await change(window, act, window.document.getElementById("wb-post-reflection"), "Keep this reflection safe");
    await click(window, act, window.document.querySelector(".wb-history-card .wb-secondary-button"));
    assert.equal(window.document.getElementById("wb-post-event").value, "Saved dual");
    await click(window, act, window.document.querySelector('.navitem:not(.navitem--workbook)'));
    const storedWhileEditingPostMatch = JSON.parse(window.localStorage.getItem("wkb_mindset_workbook_v1"));
    assert.equal(storedWhileEditingPostMatch.suspendedPostMatchDraft.event, "Unsaved tournament draft");
    assert.equal(storedWhileEditingPostMatch.suspendedPostMatchDraft.reflection, "Keep this reflection safe");
    await click(window, act, window.document.querySelector('[data-testid="mindset-workbook-nav"]'));
    await click(window, act, window.document.querySelector('[data-testid="mindset-module-card-post-match"] .wb-primary-button'));
    assert.equal(window.document.getElementById("wb-post-event").value, "Saved dual");
    await click(window, act, window.document.querySelector(".wb-form-actions .wb-secondary-button"));
    assert.equal(window.document.getElementById("wb-post-event").value, "Unsaved tournament draft");
    assert.equal(window.document.getElementById("wb-post-reflection").value, "Keep this reflection safe");
    trace("restored displaced post-match draft");

    const unsupportedRaw = JSON.stringify({ type: "wkb-mindset-workbook", version: 99, newerData: "preserve me" });
    await act(async () => {
      window.localStorage.setItem("wkb_mindset_workbook_v1", unsupportedRaw);
      window.dispatchEvent(new window.StorageEvent("storage", {
        key: "wkb_mindset_workbook_v1",
        newValue: unsupportedRaw,
        url: "https://badgers.test/other-tab",
      }));
      await delay(0);
    });
    await click(window, act, window.document.querySelector('.navitem:not(.navitem--workbook)'));
    assert.equal(window.localStorage.getItem("wkb_mindset_workbook_v1"), unsupportedRaw);
    trace("preserved unsupported external schema");
    const cardOpener = window.document.querySelector(".card__open");
    assert.equal(cardOpener.tagName, "BUTTON");
    cardOpener.focus();
    await click(window, act, cardOpener);
    await act(async () => { await delay(25); });
    const entryDialog = window.document.querySelector('.detail__panel[role="dialog"][aria-modal="true"]');
    assert.ok(entryDialog);
    assert.equal(entryDialog.getAttribute("aria-labelledby"), "entry-detail-title");
    assert.ok(window.document.activeElement === entryDialog.querySelector('.detail__tool[aria-label="Close"]'), "Dialog close button should receive focus");
    await act(async () => {
      window.document.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
      await delay(25);
    });
    assert.equal(window.document.querySelector('.detail__panel[role="dialog"]'), null);
    await act(async () => { await delay(25); });
    assert.ok(window.document.activeElement === cardOpener, "Entry opener should regain focus");
    trace("verified entry dialog focus return");
    assert.equal(jsdomErrors.length, 0, jsdomErrors.map((error) => error.stack || error.message).join("\n"));
  } finally {
    dom.window.close();
    globalKeys.forEach((key) => {
      if (previousGlobals[key]) Object.defineProperty(globalThis, key, previousGlobals[key]);
      else delete globalThis[key];
    });
    delete globalThis.IS_REACT_ACT_ENVIRONMENT;
  }
}

const tests = [
  ["static artifacts", testStaticArtifacts],
  ["theme contrast", testThemeContrast],
  ["accessibility structure", testAccessibilityStructure],
  ["workbook validation", testWorkbookValidation],
  ["local server", testLocalServer],
  ["open athlete gate", testOpenAthleteGate],
  ["rendered workbook flow", testRenderedWorkbook],
];

const requestedTests = new Set(process.argv.slice(2));
const selectedTests = requestedTests.size
  ? tests.filter(([name]) => requestedTests.has(name))
  : tests;
if (requestedTests.size && selectedTests.length !== requestedTests.size) {
  throw new Error(`Unknown test name. Available tests: ${tests.map(([name]) => name).join(", ")}`);
}

for (const [name, test] of selectedTests) {
  await test();
  console.log(`✓ ${name}`);
}
