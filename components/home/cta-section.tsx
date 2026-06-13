import Link from "next/link";
import { cta } from "@/lib/site";

export function CtaSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {cta.heading}
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          {cta.description}
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          {cta.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
