import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";

/**
 * Artículos en Markdown (content/blog/*.md).
 * Se leen únicamente en tiempo de compilación: el resultado es HTML estático.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
  readingMinutes: number;
};

export type TocItem = { id: string; text: string; level: number };

export type Post = PostMeta & { html: string; toc: TocItem[] };

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function readFile(slug: string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  return matter(raw);
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    // Se conserva solo la fecha (AAAA-MM-DD) para evitar desfases de zona horaria.
    date: String(data.date ?? "").slice(0, 10),
    author: String(data.author ?? ""),
    image: data.image ? String(data.image) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data, content } = readFile(slug);
      return { meta: toMeta(slug, data, content), draft: data.draft === true };
    })
    .filter((p) => !p.draft)
    .map((p) => p.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post {
  const { data, content } = readFile(slug);
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();

  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        let id = slugify(token.text) || "seccion";
        const n = seen.get(id) ?? 0;
        seen.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        if (token.depth === 2 || token.depth === 3) {
          toc.push({ id, text: inner.replace(/<[^>]+>/g, ""), level: token.depth });
        }
        return `<h${token.depth} id="${id}">${inner}</h${token.depth}>\n`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Link) {
        const text = this.parser.parseInline(token.tokens);
        const external = /^https?:\/\//.test(token.href);
        const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${token.href}"${attrs}>${text}</a>`;
      },
    },
  });

  const html = marked.parse(content, { async: false }) as string;
  return { ...toMeta(slug, data, content), html, toc };
}

export function formatDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  if (!y) return date;
  return new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1)),
  );
}
