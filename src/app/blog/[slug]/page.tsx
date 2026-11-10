import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";
import { site } from "@/data/profile";
import { Reveal } from "@/components/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post.title,
    description: post.description || site.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author || site.name],
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: { card: "summary_large_image", title: post.title, images: post.image ? [post.image] : undefined },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author || site.name, url: site.url },
    image: post.image ? `${site.url}${post.image}` : undefined,
    keywords: post.tags.join(", "),
  };

  return (
    <article className="relative pb-24 pt-28 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-grid absolute inset-x-0 top-0 -z-10 h-[30rem]" aria-hidden />

      <header className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Link href="/blog/" className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-fg">
            <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-1" /> Publicaciones
          </Link>
          <ul className="mb-5 flex flex-wrap gap-2" aria-label="Etiquetas">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
                #{t}
              </li>
            ))}
          </ul>
          <h1 className="max-w-4xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">{post.title}</h1>
          {post.description ? <p className="mt-5 max-w-3xl text-lg text-muted sm:text-xl">{post.description}</p> : null}
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-muted">
            <span className="text-fg">{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock aria-hidden className="size-3.5" /> {post.readingMinutes} min de lectura
            </span>
          </p>
        </Reveal>
      </header>

      {post.image ? (
        <Reveal className="mx-auto mt-10 max-w-6xl px-5 sm:px-8" delay={0.1}>
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-border bg-surface-2">
            <Image src={post.image} alt="" fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
          </div>
        </Reveal>
      ) : null}

      <div className="mx-auto mt-14 grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_16rem] lg:gap-16">
        <div className="min-w-0 lg:order-2">
          {post.toc.length ? (
            <nav aria-label="Tabla de contenido" className="lg:sticky lg:top-28">
              <details className="card group p-5 lg:border-0 lg:bg-transparent lg:p-0" open>
                <summary className="cursor-pointer list-none font-mono text-xs uppercase tracking-[0.18em] text-muted marker:hidden">
                  Tabla de contenido
                </summary>
                <ol className="mt-4 space-y-2 border-l border-border text-sm">
                  {post.toc.map((t) => (
                    <li key={t.id} className={t.level === 3 ? "pl-7" : "pl-4"}>
                      <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-0 text-muted transition-colors hover:text-accent">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </nav>
          ) : null}
        </div>
        <div className="prose-article min-w-0 lg:order-1" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <Link
          href="/blog/"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-1" /> Ver todas las publicaciones
        </Link>
      </div>
    </article>
  );
}
