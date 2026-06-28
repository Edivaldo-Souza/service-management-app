import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-zinc-500 dark:text-zinc-400">
        <p>
          &copy; {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
