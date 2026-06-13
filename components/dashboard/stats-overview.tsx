interface StatsOverviewProps {
  totalServices: number;
  totalSpent: number;
}

export function StatsOverview({ totalServices, totalSpent }: StatsOverviewProps) {
  const stats = [
    { label: "Active services", value: totalServices.toString() },
    { label: "Total spent", value: `R$${totalSpent.toFixed(2)}` },
    { label: "Avg. per service", value: totalServices > 0 ? `R$${(totalSpent / totalServices).toFixed(2)}` : "R$0.00" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {stat.label}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
