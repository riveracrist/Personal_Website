/**
 * Convierte las imágenes originales (PNG/JPG) a WebP optimizado.
 *
 * Uso:
 *   npm run images                     # usa ../static/images (repositorio Hugo original)
 *   npm run images -- ruta/a/imagenes  # usa otra carpeta de origen
 *
 * Los archivos originales NO se modifican. El resultado se escribe en
 * public/images/ y se versiona en git, por lo que este script NO forma parte
 * del build de Netlify: solo se ejecuta cuando se agregan o cambian imágenes.
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = path.resolve(process.argv[2] ?? "../static/images");
const out = path.resolve("public/images");

// [archivo de origen, nombre de salida, ancho máximo]
const jobs = [
  ["projects/sitioweb.png", "projects/sitio-web-adso.webp", 1200],
  ["projects/call_center2.png", "projects/tablero-call-center.webp", 1200],
  ["projects/tableroarduino.png", "projects/tablero-arduino.webp", 1200],
  ["projects/rstuio_mysql.png", "projects/r-mysql.webp", 1200],
  ["projects/shinydashboard_resistores.png", "projects/calculadora-resistores.webp", 1200],
  ["projects/learnr.png", "projects/learnr.webp", 1200],
  ["eduacion.png", "blog/educacion-4-0.webp", 1400],
  ["webscraping.png", "blog/web-scraping.webp", 1400],
  // La imagen Open Graph (public/og-image.jpg, 1200x630) se generó a partir de projects/call_center2.png
  ["oracle.png", "badges/oracle.webp", 240],
  ["python-essentials-1.png", "badges/python-essentials-1.webp", 240],
  ["python-essentials-2.png", "badges/python-essentials-2.webp", 240],
  ["coursera.png", "badges/coursera.webp", 240],
  ["kubernetsMinTIC.png", "badges/kubernetes-gke.webp", 240],
  ["google-ai-essentials-v1.png", "badges/google-ai-essentials.webp", 240],
  ["google-prompting-essentials.1.png", "badges/google-prompting-essentials.webp", 240],
];

let before = 0;
let after = 0;
for (const [from, to, width] of jobs) {
  const input = path.join(src, from);
  const output = path.join(out, to);
  await mkdir(path.dirname(output), { recursive: true });
  const info = await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(output);
  const s = (await stat(input)).size;
  before += s;
  after += info.size;
  console.log(`${to.padEnd(42)} ${info.width}x${info.height}  ${(s / 1024).toFixed(0)} KB -> ${(info.size / 1024).toFixed(0)} KB`);
}
console.log(`\nTotal: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
