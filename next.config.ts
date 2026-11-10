import type { NextConfig } from "next";

/**
 * Exportación 100 % estática: `next build` genera HTML/CSS/JS en ./out,
 * que Netlify sirve directamente desde su CDN (sin funciones ni servidor).
 */
const nextConfig: NextConfig = {
  output: "export",
  // /blog/mi-articulo/ -> out/blog/mi-articulo/index.html (rutas limpias en cualquier hosting estático)
  trailingSlash: true,
  images: {
    // La optimización en tiempo de ejecución no existe en una exportación estática.
    // Las imágenes ya se entregan optimizadas en WebP (ver scripts/optimize-images.mjs).
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
