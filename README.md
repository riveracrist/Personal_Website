# Cristian Rivera G. — Sitio web personal (versión 2)

Sitio web personal moderno, construido con **Next.js 16** (exportación estática), **React 19**, **Tailwind CSS v4** y **Motion**, preparado para versionarse en **GitHub** y desplegarse automáticamente en **Netlify**.

Esta versión reemplaza al sitio anterior construido con Hugo (tema `hugo-profile`) + blogdown. Todo el contenido (perfil, formación, cursos, proyectos y artículos) proviene de ese sitio original; no se agregó información nueva sobre la trayectoria.

---

## Índice

1. [Descripción del proyecto](#1-descripción-del-proyecto)
2. [Tecnologías y herramientas](#2-tecnologías-y-herramientas)
3. [Arquitectura y diseño](#3-arquitectura-y-diseño)
4. [Instalación y ejecución local](#4-instalación-y-ejecución-local)
5. [Compilación para producción](#5-compilación-para-producción)
6. [Despliegue con GitHub y Netlify](#6-despliegue-con-github-y-netlify)
7. [Mantenimiento y personalización](#7-mantenimiento-y-personalización)
8. [Validaciones y estado del proyecto](#8-validaciones-y-estado-del-proyecto)

---

## 1. Descripción del proyecto

### Objetivo

Presentar el perfil profesional de Cristian Rivera G. (Ingeniería de Telecomunicaciones, Análisis y Desarrollo de Software y ciencia de datos), sus proyectos, su formación y sus publicaciones, con una identidad visual moderna, rápida y accesible.

### Características principales

- **Página única con secciones**: Inicio, Sobre mí, Habilidades, Proyectos, Formación académica y complementaria, Experiencia y liderazgo, Publicaciones y Contacto.
- **Blog estático**: índice (`/blog/`) y una página por artículo (`/blog/<slug>/`), con tabla de contenido, tiempo de lectura y metadatos SEO. Los artículos se escriben en Markdown.
- **Tema claro y oscuro**: botón para alternar, persistencia en `localStorage`, respeto por la preferencia del sistema y sin parpadeo al cargar.
- **Animaciones**:
  - Titular revelado palabra por palabra y fondo animado de "red de nodos" en `<canvas>`.
  - Visual orbital con paralaje, aparición escalonada al hacer scroll y franja continua de tecnologías.
  - Indicador circular de progreso que también sirve para volver arriba.
- **Microinteracciones**:
  - Halo de luz que sigue al cursor en las tarjetas y borde con degradado al pasar el cursor.
  - Zoom en imágenes y flechas que giran o se desplazan.
  - Subrayados animados y la "píldora" que marca la sección activa en el menú.
- **Mobile First**: menú móvil accesible (Escape, bloqueo de scroll, foco), cuadrículas que se adaptan de 1 a 3 columnas y objetivos táctiles de 40 px o más.
- **Rendimiento**: HTML estático, imágenes en WebP (4 MB → 386 KB) y fuentes autoalojadas con `next/font`. La animación del canvas se pausa cuando no está visible.
- **Accesibilidad**:
  - HTML semántico, enlace "Saltar al contenido" y foco visible.
  - Contraste AA/AAA en ambos temas, textos alternativos y etiquetas ARIA.
  - Soporte de `prefers-reduced-motion`.
- **SEO**: títulos y descripciones por página, Open Graph/Twitter, URL canónica, `sitemap.xml`, `robots.txt` y datos estructurados JSON-LD (`Person` y `BlogPosting`).
- **Redirecciones** desde las URL del blog Hugo anterior (`/blogs/...`) hacia las nuevas.

### Estructura general

```
mejora_sitio_web/
├── content/blog/            # Artículos en Markdown (frontmatter compatible con el sitio Hugo)
├── public/                  # Archivos estáticos servidos tal cual
│   ├── images/              # Imágenes optimizadas (WebP): projects/, badges/, blog/
│   ├── og-image.jpg         # Imagen para compartir en redes (1200×630)
│   └── apple-touch-icon.png
├── scripts/
│   ├── optimize-images.mjs  # Conversión PNG/JPG → WebP (manual, no forma parte del build)
│   └── serve-out.mjs        # Servidor estático local para previsualizar ./out
├── src/
│   ├── app/                 # Rutas (App Router de Next.js)
│   │   ├── layout.tsx       # HTML raíz, fuentes, metadatos SEO, navbar y footer
│   │   ├── page.tsx         # Página de inicio (todas las secciones)
│   │   ├── globals.css      # Tailwind v4 + tokens de diseño + estilos de artículos
│   │   ├── icon.png         # Favicon
│   │   ├── blog/page.tsx            # /blog/
│   │   ├── blog/[slug]/page.tsx     # /blog/<slug>/
│   │   ├── not-found.tsx    # Página 404
│   │   ├── sitemap.ts       # /sitemap.xml
│   │   └── robots.ts        # /robots.txt
│   ├── components/          # Componentes reutilizables
│   │   └── sections/        # Una sección de la página de inicio por archivo
│   ├── data/profile.ts      # ★ TODO el contenido del sitio (editar aquí)
│   └── lib/posts.ts         # Lectura y conversión de Markdown a HTML
├── netlify.toml             # Configuración de build y despliegue
├── next.config.ts           # output: "export" (sitio estático)
├── postcss.config.mjs       # Plugin de Tailwind CSS v4
├── tsconfig.json
├── .nvmrc                   # Versión de Node.js (24)
└── package.json / package-lock.json
```

---

## 2. Tecnologías y herramientas

| Categoría | Herramienta | Versión | Función |
|---|---|---|---|
| Framework principal | [Next.js](https://nextjs.org/) | 16.4.6 | Enrutamiento (App Router), generación estática (SSG), optimización de fuentes y metadatos SEO. Se usa con `output: "export"`. |
| Biblioteca de interfaz | [React](https://react.dev/) | 19.3.1 | Componentes de la interfaz. |
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | Tipado estático. Se fijó la rama 5.x por compatibilidad con Next.js 16. |
| Estilos | [Tailwind CSS](https://tailwindcss.com/) + `@tailwindcss/postcss` | 4.3.5 | Sistema de estilos *utility-first*; la configuración vive en CSS (`@theme`, `@custom-variant`, `@utility`). |
| CSS moderno | Variables nativas, Grid, Flexbox, `color-mix()`, `mask` | — | Tokens de color por tema, maquetación adaptable y efectos. |
| Animaciones | [Motion](https://motion.dev/) (antes Framer Motion) | 14.12.0 | Animaciones al hacer scroll, paralaje, transiciones de entrada y del menú; respeta el movimiento reducido. |
| Animaciones | CSS `@keyframes` + `<canvas>` 2D | — | Órbitas, pulsos, la franja de tecnologías y la red de nodos del hero (sin bibliotecas). |
| Iconografía | [Lucide React](https://lucide.dev/) | 1.71.0 | Íconos SVG. Los logotipos de GitHub y X son SVG propios en `components/icons.tsx`. |
| Contenido | [gray-matter](https://github.com/jonschlinkert/gray-matter) | 4.0.3 | Lectura del frontmatter YAML de los artículos. |
| Contenido | [marked](https://marked.js.org/) | 18.2.0 | Conversión de Markdown a HTML en tiempo de compilación (con ids en los encabezados para la tabla de contenido). |
| Tipografías | `next/font/google` | — | Space Grotesk, Inter y JetBrains Mono, descargadas en la compilación y autoalojadas. |
| Imágenes (desarrollo) | [sharp](https://sharp.pixelplumbing.com/) | 0.35.5 | Conversión de las imágenes originales a WebP. Solo se usa en `npm run images`. |
| Compilación | Turbopack (incluido en Next.js) + PostCSS | — | Empaquetado y procesamiento de CSS. |
| Entorno | Node.js / npm | 24.x / 11.x | Ejecución y gestión de dependencias. |
| Hosting | Netlify | — | CDN estático con despliegue continuo desde GitHub. |

> No se usan bases de datos, funciones *serverless*, formularios ni variables de entorno secretas.

---

## 3. Arquitectura y diseño

### Arquitectura general

- **Generación estática completa (SSG)**: `next build` renderiza todas las páginas a HTML en `out/`. El sitio no requiere servidor; Netlify lo sirve desde su CDN.
- **Server Components por defecto**: las secciones sin interactividad (Sobre mí, Proyectos, Formación…) son componentes de servidor. Solo usan `"use client"` los que lo necesitan: navbar, tema, hero, canvas, indicador de progreso, tarjetas con halo y envoltorios de animación.
- **Contenido separado de la presentación**: los textos están en `src/data/profile.ts` y en `content/blog/*.md`; los componentes solo los presentan.
- **Netlify sin adaptador SSR**: como el sitio es estático, `netlify.toml` define `NETLIFY_NEXT_PLUGIN_SKIP=true` para que Netlify no aplique automáticamente el adaptador OpenNext. Así lo indica la documentación de Netlify para sitios Next.js solo estáticos.

### Componentes principales

| Componente | Archivo | Descripción |
|---|---|---|
| `Navbar` | `components/navbar.tsx` | Barra fija con desenfoque al hacer scroll, resaltado de la sección activa (IntersectionObserver) y menú móvil animado y accesible. |
| `ThemeScript` / `ThemeToggle` | `components/theme.tsx` | Script previo al pintado que evita el parpadeo y botón con animación sol/luna. |
| `Hero` | `components/sections/hero.tsx` | Titular revelado palabra por palabra, visual orbital con paralaje y franja de tecnologías. |
| `NetworkCanvas` | `components/network-canvas.tsx` | Red de nodos en `<canvas>`: densidad adaptativa, pausa fuera de pantalla, reacción al puntero y colores sincronizados con el tema. |
| `Reveal`, `RevealGroup`, `RevealItem` | `components/reveal.tsx` | Aparición (individual o escalonada) al entrar en pantalla. |
| `SpotlightCard` | `components/spotlight-card.tsx` | Tarjeta con halo que sigue al cursor. |
| `ScrollProgress` | `components/scroll-progress.tsx` | Anillo de progreso de lectura y botón "volver arriba". |
| `SectionHeading` | `components/section-heading.tsx` | Encabezado numerado y consistente para todas las secciones. |
| `PostCard` | `components/post-card.tsx` | Tarjeta de artículo (inicio y `/blog/`). |

### Sistema de diseño y paleta de colores

Los colores son variables CSS definidas en `src/app/globals.css` (`:root` para el tema claro, `.dark` para el oscuro). Tailwind las expone como clases mediante `@theme inline` (`bg-bg`, `text-fg`, `text-muted`, `text-accent`, `bg-surface`, `border-border`, etc.).

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` | `#f6f7fb` | `#070b14` | Fondo de página |
| `--surface` / `--surface-2` | `#ffffff` / `#eef1f7` | `#0d1321` / `#131a2b` | Tarjetas y chips |
| `--fg` | `#0b1220` | `#e8edf6` | Texto principal |
| `--muted` | `#475467` | `#9ba7bd` | Texto secundario |
| `--accent` | `#0369a1` (azul señal) | `#38bdf8` | Enlaces, botones, detalles |
| `--accent-2` | `#6d28d9` (violeta) | `#a78bfa` | Degradados |
| `--accent-fg` | `#ffffff` | `#04111f` | Texto sobre botones de acento |

La identidad azul → violeta retoma el degradado del ícono del sitio original.

**Contraste (WCAG 2.1)**, calculado con la fórmula de luminancia relativa:

| Par | Claro | Oscuro |
|---|---|---|
| Texto / fondo | 17.5:1 | 16.8:1 |
| Texto secundario / fondo | 7.2:1 | 8.1:1 |
| Acento / fondo | 5.5:1 | 9.2:1 |
| Texto de botón / botón | 5.9:1 | 8.9:1 |

Todos superan el mínimo AA (4.5:1).

### Tipografías

- **Space Grotesk** (500–700): títulos y marca. Geométrica y técnica.
- **Inter** (variable): texto de lectura.
- **JetBrains Mono** (400–500): etiquetas, fechas y chips técnicos.

Se cargan con `next/font/google`: se descargan durante la compilación, se sirven desde el propio sitio (sin peticiones a Google en el navegador) y usan `display: swap`.

### Tema claro y oscuro

1. `ThemeScript` (en `<head>`) se ejecuta antes del primer pintado. Lee `localStorage.theme` o, si no existe, `prefers-color-scheme`, y agrega o quita la clase `dark` en `<html>`. Así se evita el parpadeo de tema.
2. `ThemeToggle` alterna la clase, guarda la elección y, mientras el usuario no haya elegido un tema, sigue los cambios de la preferencia del sistema.
3. En CSS, `@custom-variant dark (&:where(.dark, .dark *));` habilita las clases `dark:` de Tailwind. La mayoría de los estilos no las necesitan porque usan los tokens.
4. Los cambios de color tienen una transición suave (`.theme-fade`), y el canvas del hero vuelve a leer los colores mediante un `MutationObserver`.

### Estrategia responsive (Mobile First)

- Los estilos base corresponden a móvil; `sm:` (640 px), `md:` (768 px) y `lg:` (1024 px) agregan columnas y tamaños.
- Hero: una columna en móvil (texto y luego la visual) y dos columnas en `lg`.
- Cuadrículas: 1 columna en móvil → 2 en tableta → 3 en escritorio. Las certificaciones usan 6 columnas en escritorio para repartir 5 tarjetas sin huecos.
- Menú: hamburguesa por debajo de `lg`, con panel a pantalla completa, enlaces grandes y bloqueo del scroll del fondo.
- Unidades `svh` y `dvh` para manejar bien la barra del navegador móvil. `overflow-x: clip` evita el desplazamiento horizontal.
- Imágenes con `sizes` adaptados y `fill` + `aspect-ratio` para evitar saltos de diseño (CLS).

### Sistema de animaciones y transiciones

| Tipo | Implementación |
|---|---|
| Entrada del hero | Motion: máscara por palabra (`y: 110% → 0`), desenfoque → nitidez y elementos escalonados. |
| Scroll | `Reveal` / `RevealGroup` con `whileInView` (una sola vez, margen de −10 % a −12 %). |
| Paralaje | `useScroll` + `useTransform` en el hero (texto y visual a distinta velocidad). |
| Navegación | Píldora animada con `layoutId` (resorte) y menú móvil con `clipPath` y enlaces escalonados. |
| Decorativas | CSS `@keyframes`: órbitas, flotación, pulso y franja de tecnologías (se pausa al pasar el cursor). |
| Microinteracciones | Transiciones de Tailwind: elevación, rotación, escala y subrayados. Curva `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`). |
| Movimiento reducido | `MotionConfig reducedMotion="user"`, una regla CSS global que anula animaciones y transiciones, un canvas estático y scroll sin suavizado. |

---

## 4. Instalación y ejecución local

### Requisitos

- **Node.js ≥ 20.9** (se recomienda **24**, indicado en `.nvmrc`)
- **npm** (incluido con Node.js)
- Git (para versionar y desplegar)

Comprobar las versiones:

```bash
node -v   # v24.x recomendado
npm -v
```

Con [nvm](https://github.com/nvm-sh/nvm) instalado:

```bash
nvm install   # lee .nvmrc
nvm use
```

### Pasos

```bash
# 1. Entrar al proyecto
cd mejora_sitio_web

# 2. Instalar dependencias exactamente como en package-lock.json
npm ci            # (o: npm install)

# 3. Servidor de desarrollo con recarga en caliente
npm run dev
```

Abrir <http://localhost:3000>.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo (Turbopack, recarga en caliente). |
| `npm run build` | Compilación de producción → genera `out/`. |
| `npm start` | Sirve `out/` en <http://localhost:3000> como lo haría Netlify (requiere `npm run build` antes). `PORT=4000 npm start` cambia el puerto. |
| `npm run typecheck` | Verificación de tipos con TypeScript. |
| `npm run images` | Regenera las imágenes WebP desde `../static/images` (o desde la carpeta que se indique: `npm run images -- ruta/`). |

---

## 5. Compilación para producción

```bash
npm run build
```

**Qué ocurre:**

1. Next.js compila TypeScript/React con Turbopack y procesa Tailwind CSS mediante PostCSS.
2. Se verifican los tipos.
3. Se pre-renderizan todas las rutas a HTML estático: `/`, `/blog/`, `/blog/<slug>/` (una por cada `.md` de `content/blog/` que no sea borrador), `404`, `sitemap.xml`, `robots.txt` e `icon.png`.
4. Se copia `public/` y los recursos con hash a `out/_next/static/`.

**Directorio de salida (publish directory): `out/`**

**Comprobaciones posteriores recomendadas:**

```bash
npm start                                   # previsualizar out/
curl -I http://localhost:3000/              # 200
curl -I http://localhost:3000/blog/         # 200
curl -I http://localhost:3000/no-existe/    # 404
ls out/blog                                 # una carpeta por artículo
```

**Requisitos del entorno de compilación:**

- Node.js ≥ 20.9 (Netlify usa 24 según `netlify.toml`).
- Acceso a internet durante la compilación para descargar las fuentes de Google (Netlify lo tiene).
- No se requieren variables de entorno.

---


