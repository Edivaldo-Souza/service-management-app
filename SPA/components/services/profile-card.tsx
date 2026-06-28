export function ProfileCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-xl font-semibold text-accent">
          U
        </div>
        <div>
          <h3 className="text-lg font-medium text-foreground">Welcome back</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Manage your services and track requests below.
          </p>
        </div>
      </div>
    </div>
  );
}
