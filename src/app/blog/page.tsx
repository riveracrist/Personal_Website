import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos de Cristian Rivera G. sobre educación, tecnología, programación y datos.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="bg-grid absolute inset-x-0 top-0 -z-10 h-[28rem]" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-14 max-w-3xl">
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">Blog</p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">Publicaciones</h1>
          <p className="mt-5 text-lg text-muted">Reflexiones y guías sobre educación, tecnología y datos.</p>
        </Reveal>
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <RevealItem key={p.slug} className="h-full">
              <PostCard post={p} headingLevel="h2" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
