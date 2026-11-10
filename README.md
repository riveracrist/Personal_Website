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

## 6. Despliegue con GitHub y Netlify

### 6.1. Crear el repositorio de GitHub

**Opción A (recomendada): repositorio nuevo solo con este sitio**

`mejora_sitio_web/` está dentro del repositorio del sitio Hugo original. Para tener un repositorio propio:

1. En GitHub: **New repository** → nombre, por ejemplo, `sitio-web-personal` → **sin** README, .gitignore ni licencia → **Create repository**.
2. Copiar la carpeta fuera del repositorio original e inicializar git:

```bash
# Desde la carpeta que contiene el repositorio original
cp -r sitio_web_personal_hugo/mejora_sitio_web ~/sitio-web-personal
cd ~/sitio-web-personal
rm -rf node_modules .next out   # no se versionan (también están en .gitignore)

git init -b main
git add .
git commit -m "Sitio web personal: Next.js + Tailwind v4, listo para Netlify"
git remote add origin https://github.com/riveracrist/sitio-web-personal.git
git push -u origin main
```

**Opción B: usar el repositorio actual (monorepo)**

Confirmar y subir `mejora_sitio_web/` al repositorio existente:

```bash
cd sitio_web_personal_hugo
git add mejora_sitio_web
git commit -m "Agregar nueva versión del sitio (Next.js)"
git push
```

Luego, en Netlify, indicar **Base directory = `mejora_sitio_web`** (ver 6.3).

### 6.2. Conectar GitHub con Netlify

1. Entrar a <https://app.netlify.com> e iniciar sesión (se puede usar la cuenta de GitHub).
2. **Add new project → Import an existing project → GitHub**.
3. Autorizar la aplicación de Netlify en GitHub y darle acceso al repositorio.
4. Seleccionar el repositorio y la rama **`main`**.

### 6.3. Configuración de compilación

Netlify lee `netlify.toml` automáticamente, así que los campos se completan solos. Valores esperados:

| Campo | Opción A (repo propio) | Opción B (monorepo) |
|---|---|---|
| Base directory | *(vacío)* | `mejora_sitio_web` |
| Build command | `npm run build` | `npm run build` |
| Publish directory | `out` | `mejora_sitio_web/out` |
| Node.js | 24 (`NODE_VERSION` en `netlify.toml`) | 24 |

Pulsar **Deploy**. Al terminar, Netlify asigna una URL `https://<nombre>.netlify.app`.

> Si se quiere conservar `cristianriverag.netlify.app`, hay dos opciones: cambiar el repositorio o la configuración de compilación del proyecto Netlify existente (**Project configuration → Build & deploy**) con los valores de la tabla, o renombrar el proyecto nuevo en **Project configuration → Change project name**. Si se usa otro dominio, actualizar `site.url` en `src/data/profile.ts` (lo usan el sitemap, la URL canónica y Open Graph).

### 6.4. Variables de entorno

No se requieren secretos. `netlify.toml` ya define estas variables, que no son sensibles:

| Variable | Valor | Motivo |
|---|---|---|
| `NODE_VERSION` | `24` | Versión de Node.js del build. |
| `NETLIFY_NEXT_PLUGIN_SKIP` | `true` | El sitio es estático; evita aplicar el adaptador SSR de Next.js. |
| `NEXT_TELEMETRY_DISABLED` | `1` | Desactiva la telemetría de Next.js. |

Si en el futuro se necesita algún secreto (por ejemplo, la clave de un servicio de formularios), debe configurarse en **Netlify → Project configuration → Environment variables**, nunca en el código ni en el repositorio. Para desarrollo local se usaría un archivo `.env.local`, que ya está en `.gitignore`.

### 6.5. Despliegues automáticos

Con el repositorio conectado, Netlify activa por defecto:

- **Despliegue de producción** en cada `git push` a `main`.
- **Deploy Previews** para cada Pull Request (URL de vista previa).

Se puede verificar en **Project configuration → Build & deploy → Continuous deployment** (*Branches and deploy contexts*: Production branch = `main`).

### 6.6. Actualizar el sitio

```bash
# 1. Editar contenido o código (p. ej. src/data/profile.ts)
# 2. Probar localmente
npm run dev
npm run build        # verificar que compila

# 3. Publicar
git add .
git commit -m "Actualizar proyectos"
git push             # Netlify compila y publica automáticamente
```

El estado de cada despliegue se ve en la pestaña **Deploys** de Netlify. Si un despliegue falla, el sitio sigue mostrando la última versión correcta.

### Redirecciones y encabezados

`netlify.toml` incluye:

- Redirecciones 301 desde las URL del blog Hugo (`/blogs/mipost/`, `/blogs/webscraping-scrapy/`, `/blogs/*`) hacia las nuevas.
- Encabezados de seguridad (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Caché inmutable para `/_next/static/*` y caché de 7 días para `/images/*`.
- La página `404.html` generada se usa automáticamente para rutas inexistentes.

---

## 7. Mantenimiento y personalización

### Información personal y profesional

Todo está en **`src/data/profile.ts`**:

| Objeto | Contenido |
|---|---|
| `site` | Nombre, iniciales, URL, título SEO, descripción, rol, titular del hero e introducción. |
| `social` | Redes (GitHub, X). Para agregar una, añadir `{ label, handle, url, icon }` y, si es una red nueva, su ícono en `components/icons.tsx`. |
| `about` | Párrafos de "Sobre mí", tarjetas de enfoque (`icon`: `chart`, `database`, `cpu`, `code`, `cloud`, `wrench`) e intereses. |
| `skills` | Grupos de habilidades. |
| `experience` | Roles de liderazgo y experiencia (`url` es opcional). |
| `education` | Programas académicos (`status`: `"current"` muestra el indicador animado). |
| `certifications` | Formación complementaria: cursos (con enlace opcional al certificado) e insignias. |
| `projects` | Proyectos (`featured: true` lo muestra como proyecto destacado). |
| `nav` | Enlaces del menú (el `id` debe coincidir con el `id` de la sección). |

> **Contacto:** el sitio original no tenía un correo propio ni un perfil de LinkedIn válidos, por lo que no se incluyeron. Para agregar un correo, añadir una entrada a `social` con `url: "mailto:tu@correo.com"` y un ícono (por ejemplo, `Mail` de lucide-react).

### Experiencia laboral y formación

Agregar o editar objetos en `experience`, `education` o `certifications`. El orden del arreglo es el orden en pantalla.

### Proyectos

```ts
{
  title: "Nombre del proyecto",
  description: "Descripción breve.",
  image: "/images/projects/mi-proyecto.webp",
  url: "https://…",
  tags: ["R", "Shiny"],
  featured: false,
}
```

### Publicaciones (blog)

Crear `content/blog/mi-articulo.md`. El nombre del archivo define la URL (`/blog/mi-articulo/`).

```markdown
---
title: "Título del artículo"
description: "Resumen de una línea"
author: Cristian Rivera
date: "2026-11-10"
image: /images/blog/mi-portada.webp
tags:
- Datos
- Python
draft: false
---

## Primera sección
Contenido en Markdown (listas, tablas, código, enlaces…).
```

- Los encabezados `##` y `###` generan la tabla de contenido.
- `draft: true` oculta el artículo.
- Los artículos se ordenan por fecha (los más recientes primero).

### Imágenes y recursos gráficos

1. Colocar la imagen ya optimizada en `public/images/...`. Se recomienda WebP y un ancho máximo de unos 1200 px para proyectos o 240 px para insignias.
2. Para convertir imágenes con el script incluido, añadir una entrada `[origen, destino, anchoMáximo]` al arreglo `jobs` de `scripts/optimize-images.mjs` y ejecutar:

   ```bash
   npm run images                    # origen por defecto: ../static/images
   npm run images -- /ruta/a/fotos   # otra carpeta de origen
   ```

3. Favicon: reemplazar `src/app/icon.png`. Icono iOS: `public/apple-touch-icon.png`. Imagen para redes: `public/og-image.jpg` (1200×630).

### Colores y tipografías

- **Colores**: editar las variables de `:root` (claro) y `.dark` (oscuro) en `src/app/globals.css`. Al cambiar `--accent`, comprobar que el contraste con `--bg` sea ≥ 4.5:1.
- **Tipografías**: en `src/app/layout.tsx`, cambiar las importaciones de `next/font/google` (por ejemplo, `import { Sora } from "next/font/google"`) manteniendo el nombre de la variable CSS (`--font-space-grotesk`, `--font-inter`, `--font-jetbrains`), o actualizar `--font-display`, `--font-sans` y `--font-mono` en `@theme inline`.

### Animaciones y componentes

- Velocidad y estilo de aparición: `components/reveal.tsx` (`duration`, `y`, `stagger`).
- Animaciones del hero: `components/sections/hero.tsx` (retrasos, paralaje en `useTransform`, etiquetas de órbita `orbitA` y `orbitB`).
- Red de nodos: `components/network-canvas.tsx` (`LINK` = distancia de conexión; densidad en `resize()`). Para quitarla, eliminar `<NetworkCanvas />` del hero.
- Animaciones CSS (órbitas, franja, pulso): `@keyframes` y clases `.animate-*` en `globals.css`.
- Curva de animación global: `--ease-out-expo` en `globals.css`.

### Configuración de los temas

- Tema por defecto: el del sistema. Para forzar uno, editar `ThemeScript` en `components/theme.tsx`. Por ejemplo, para que el oscuro sea el predeterminado: `var d=t?t==='dark':true;`.
- Para eliminar el selector de tema, quitar `<ThemeToggle />` de `components/navbar.tsx`.
- Colores de la barra del navegador móvil: `viewport.themeColor` en `layout.tsx`.

---

## 8. Validaciones y estado del proyecto

### Pruebas ejecutadas ✅

| Prueba | Método | Resultado |
|---|---|---|
| Verificación de tipos | `npx tsc --noEmit` | ✅ Sin errores |
| Compilación de producción | `npm run build` | ✅ 9 rutas estáticas generadas en `out/` (~2.9 MB incluidas las imágenes) |
| Build limpio reproducible (simulación de Netlify) | Copia sin `node_modules` → `npm ci` → `npm run build` con `NETLIFY_NEXT_PLUGIN_SKIP=true` | ✅ Correcto |
| Rutas absolutas locales | Búsqueda de `/home/...` en `out/` | ✅ Ninguna |
| Funcionamiento local | `npm start` + `curl` | ✅ `/`, `/blog/`, ambos artículos, `/sitemap.xml`, `/robots.txt` e imágenes → 200; ruta inexistente → 404 |
| Inspección visual | Chromium sin interfaz (capturas de página completa) | ✅ Escritorio 1440 px y móvil 390 px, en tema claro y oscuro; página de artículo |
| Desbordamiento horizontal | `scrollWidth === innerWidth` en 390 px y 1440 px | ✅ Sin desbordamiento |
| Menú móvil | Automatización vía DevTools Protocol | ✅ Abre (`aria-expanded=true`, 7 enlaces, scroll del fondo bloqueado); Escape lo cierra y devuelve el foco al botón |
| Tema claro y oscuro | Clic en el botón + recarga | ✅ Cambia, se guarda en `localStorage` y se mantiene tras recargar |
| Navegación por teclado | Secuencia de Tab | ✅ Orden lógico: saltar al contenido → logo → menú → tema → CTA → hero…; foco visible |
| Movimiento reducido | Emulación de `prefers-reduced-motion: reduce` | ✅ Contenido visible y sin animaciones |
| Imágenes | `naturalWidth` de todas las imágenes tras recorrer la página | ✅ Ninguna rota; todas con `alt` |
| Enlaces internos (anclas) | Comparación de `href="#…"` con los `id` existentes | ✅ Todos tienen destino |
| Consola del navegador | Captura de errores y advertencias | ✅ Sin errores |
| Estructura semántica | Conteo de `h1` | ✅ Un `h1` por página |
| Contraste | Cálculo WCAG de los pares de color | ✅ ≥ 5.5:1 en ambos temas |
| SEO | Inspección del HTML generado | ✅ `title`, `description`, canónica, Open Graph, Twitter, JSON-LD, sitemap y robots |
| Configuración de Netlify | Revisión según la documentación oficial (sitios Next.js estáticos: publicar `out` y `NETLIFY_NEXT_PLUGIN_SKIP=true`) | ✅ Configurado |

### Pruebas no realizadas ⚠️

| Prueba | Motivo |
|---|---|
| Despliegue real en Netlify | Requiere acceso a la cuenta de Netlify o GitHub (pendiente de autorización y acción del propietario). |
| Redirecciones y encabezados de `netlify.toml` | Solo se aplican en Netlify; deben comprobarse tras el primer despliegue. |
| Lighthouse / PageSpeed | No se instaló Lighthouse; se recomienda ejecutarlo sobre la URL publicada. |
| Navegadores Firefox y Safari en dispositivos reales | Solo se probó con Chromium. Las tecnologías usadas (CSS Grid, variables, `mask`, `color-mix`, `dvh`) son compatibles con las versiones actuales de los navegadores principales. |
| Enlaces externos (certificados, Shiny Apps, RPubs) | Se conservaron tal como estaban en el sitio original; no se verificó que sigan activos. |
| Lector de pantalla | No se probó con NVDA o VoiceOver; se aplicaron buenas prácticas (ARIA, semántica, textos `sr-only`). |

### Problemas conocidos y pendientes

- **Sin JavaScript**, los elementos con animación de aparición se quedan ocultos (opacidad inicial 0). Esto no afecta a los buscadores modernos, que ejecutan JavaScript.
- **Contacto**: no hay correo ni LinkedIn porque el sitio original no tenía datos válidos (el correo del bloque comentado pertenecía al autor de la plantilla). Se puede agregar siguiendo la sección 7.
- **Foto de perfil**: el sitio original no tenía una; el hero usa un monograma "CR" animado. Se puede reemplazar por una foto en `OrbitVisual` (`hero.tsx`).
- Se corrigieron erratas menores del contenido original: "Inovación" → "Innovación", "Kubernets" → "Kubernetes", "cuestonario" → "cuestionario" y "Eduación 4.0" → "Educación 4.0" en la descripción del artículo. El texto de los artículos se mantuvo sin cambios.
- La sección **Experiencia** presenta los roles de liderazgo y apoyo que el sitio original registraba como actividades extracurriculares. No se encontró experiencia laboral formal adicional.
