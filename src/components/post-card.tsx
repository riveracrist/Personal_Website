import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/posts";

export function PostCard({ post, headingLevel = "h3" }: { post: PostMeta; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="card card-glow group relative flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/10">
      {post.image ? (
        <div className="relative aspect-[16/8] overflow-hidden border-b border-border bg-surface-2">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden className="size-3.5" /> {post.readingMinutes} min de lectura
          </span>
        </p>
        <H className="font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
          <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </H>
        {post.description ? <p className="text-sm leading-relaxed text-muted sm:text-[15px]">{post.description}</p> : null}
        <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Etiquetas">
          {post.tags.slice(0, 4).map((t) => (
            <li key={t} className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted">
              #{t}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-accent">
          Leer artículo
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
