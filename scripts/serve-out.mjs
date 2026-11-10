/**
 * Servidor estático mínimo (sin dependencias) para previsualizar ./out
 * tal como lo serviría Netlify: /ruta/ -> /ruta/index.html y 404.html.
 * Uso: npm run build && npm start   (PORT=4000 npm start para otro puerto)
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.env.PORT ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".txt": "text/plain",
  ".xml": "application/xml", ".woff2": "font/woff2", ".map": "application/json",
};

async function resolveFile(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  let file = path.join(root, clean);
  if (!file.startsWith(root)) return null;
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = path.join(file, "index.html");
    await stat(file);
    return file;
  } catch {
    try {
      await stat(`${file}.html`);
      return `${file}.html`;
    } catch {
      return null;
    }
  }
}

createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");
  const target = file ?? path.join(root, "404.html");
  try {
    const body = await readFile(target);
    res.writeHead(file ? 200 : 404, { "Content-Type": types[path.extname(target)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500).end("Ejecute primero: npm run build");
  }
}).listen(port, () => console.log(`Sirviendo ./out en http://localhost:${port}`));
