import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center px-5 pt-16 text-center">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <div>
        <p className="text-gradient font-display text-8xl font-bold sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">Página no encontrada</h1>
        <p className="mt-3 text-muted">La página que buscas no existe o fue movida.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-accent-solid px-6 py-3 text-sm font-semibold text-accent-fg transition hover:-translate-y-0.5">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
