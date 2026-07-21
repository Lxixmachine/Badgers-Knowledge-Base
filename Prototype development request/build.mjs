import { copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { transform } from "esbuild";

const sources = [
  "tweaks-panel.jsx",
  "data.jsx",
  "film.jsx",
  "components.jsx",
  "docs.jsx",
  "mindset-curriculum.jsx",
  "mindset-context-foundations.jsx",
  "mindset-context-performance.jsx",
  "mindset-context-competition.jsx",
  "mindset.jsx",
  "app.jsx",
];

const sections = [];
for (const file of sources) {
  const input = await readFile(file, "utf8");
  const result = await transform(input, {
    loader: "jsx",
    format: "iife",
    target: "es2018",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    charset: "utf8",
    legalComments: "none",
    minify: false,
    sourcemap: false,
  });
  sections.push(`/* ====== ${file} ====== */\n${result.code.trim()}\n`);
}

const banner = [
  "// app.compiled.js — generated from the editable .jsx sources; do not hand-edit",
  "// Rebuild with: npm run build",
  "'use strict';",
  "",
].join("\n");

const bundle = banner + sections.join("\n");
await writeFile("app.compiled.js", bundle, "utf8");

const [index, content] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("content.js", "utf8"),
]);
await writeFile("Badgers Knowledge Base.html", index, "utf8");

const safeInlineScript = (value) => value.replace(/<\/script/gi, "<\\/script");
const standalone = index
  .replace('<script src="content.js"></script>', `<script>\n${safeInlineScript(content)}\n</script>`)
  .replace('<script src="app.compiled.js"></script>', `<script>\n${safeInlineScript(bundle)}\n</script>`);
await writeFile("Badgers Knowledge Base (standalone).html", standalone, "utf8");

const distDirectory = "dist";
await rm(distDirectory, { recursive: true, force: true });
await mkdir(distDirectory, { recursive: true });
for (const file of ["index.html", "content.js", "app.compiled.js"]) {
  await copyFile(file, `${distDirectory}/${file}`);
}
for (const directory of ["assets", "films", "docs"]) {
  try {
    await cp(directory, `${distDirectory}/${directory}`, { recursive: true });
  } catch (error) {
    if (error && error.code !== "ENOENT") throw error;
  }
}

console.log(`Built app.compiled.js from ${sources.length} source files, refreshed HTML copies, and staged dist/.`);
