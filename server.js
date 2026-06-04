// Minimal zero-dependency static file server for Railway/Railpack.
// Serves the dallas-detail-co/ folder. Listens on $PORT (Railway sets this).
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "dallas-detail-co");
const PORT = process.env.PORT || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".gif": "image/gif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const server = http.createServer((req, res) => {
  try {
    // strip query string, decode, and normalize to prevent path traversal
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";
    const safePath = path
      .normalize(urlPath)
      .replace(/^(\.\.[/\\])+/, "")
      .replace(/^[/\\]+/, "");
    let filePath = path.join(ROOT, safePath);

    // if it's a directory, serve its index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // SPA-ish fallback: serve the homepage for unknown routes
        fs.readFile(path.join(ROOT, "index.html"), (e2, home) => {
          if (e2) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
          } else {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(home);
          }
        });
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      const type = TYPES[ext] || "application/octet-stream";
      const headers = { "Content-Type": type };
      // cache static assets (not the HTML) for a day
      if (ext !== ".html") headers["Cache-Control"] = "public, max-age=86400";
      res.writeHead(200, headers);
      res.end(data);
    });
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 Server Error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Dallas Detail Co. static site serving ${ROOT} on port ${PORT}`);
});
