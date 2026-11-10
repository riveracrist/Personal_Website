import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Publications } from "@/components/sections/publications";
import { Contact } from "@/components/sections/contact";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Experience />
      <Publications posts={posts} />
      <Contact />
    </>
  );
}
