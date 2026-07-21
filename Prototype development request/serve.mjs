import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, isAbsolute, join, normalize, relative, resolve } from "node:path";

const hostFlagIndex = process.argv.indexOf("--host");
const host = hostFlagIndex >= 0 && process.argv[hostFlagIndex + 1] ? process.argv[hostFlagIndex + 1] : "127.0.0.1";
const portArg = process.argv.find((value) => /^\d+$/.test(value));
const port = portArg ? Number(portArg) : 4173;
const root = resolve(".");
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webm": "video/webm",
  ".mp4": "video/mp4",
};

createServer((request, response) => {
  try {
    const requestPath = decodeURIComponent(new URL(request.url, `http://${host}`).pathname);
    const requestRelative = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
    const filePath = normalize(join(root, requestRelative));
    const fromRoot = relative(root, filePath);
    if (fromRoot.startsWith("..") || isAbsolute(fromRoot) || !statSync(filePath).isFile()) {
      throw new Error("Not found");
    }
    response.writeHead(200, {
      "Content-Type": types[extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, host, () => {
  console.log(`Local URL: http://${host}:${port}/`);
});
