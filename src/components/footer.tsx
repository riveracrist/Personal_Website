import Link from "next/link";
import { nav, site, social } from "@/data/profile";
import { SocialIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-fade relative border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-display text-xl font-bold tracking-tight">
            {site.name}
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{site.intro}</p>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">Navegación</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.id}>
                <Link href={`/#${n.id}`} className="link-underline text-fg/80 hover:text-fg">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog/" className="link-underline text-fg/80 hover:text-fg">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">Redes</p>
          <ul className="flex gap-3">
            {social.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (${s.handle})`}
                  className="grid size-11 place-items-center rounded-full border border-border text-fg/80 transition hover:-translate-y-1 hover:border-accent hover:text-accent"
                >
                  <SocialIcon name={s.icon} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-muted sm:px-8">
          © {year} {site.name} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
