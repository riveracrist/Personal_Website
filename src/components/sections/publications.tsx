import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import { SectionHeading } from "../section-heading";
import { Reveal, RevealGroup, RevealItem } from "../reveal";
import { PostCard } from "../post-card";

export function Publications({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;
  return (
    <section id="publicaciones" aria-labelledby="publicaciones-title" className="theme-fade relative border-y border-border bg-surface/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Publicaciones"
          title={<span id="publicaciones-title">Artículos y escritos</span>}
          description="Reflexiones y guías sobre educación, tecnología y datos."
        />
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {posts.slice(0, 4).map((p) => (
            <RevealItem key={p.slug} className="h-full">
              <PostCard post={p} />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-10">
          <Link href="/blog/" className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">
            Ver todas las publicaciones
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
