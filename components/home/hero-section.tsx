import { siteConfig } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="px-6 py-20 text-center sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {siteConfig.tagline}
        </p>
      </div>
    </section>
  );
}
