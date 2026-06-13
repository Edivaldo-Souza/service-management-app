import { dashboard } from "@/lib/site";

interface Service {
  id: number;
  costumer: string;
  price: number;
}

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Active Services
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {dashboard.subtitle}
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li
            key={service.id}
            className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {service.costumer}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Service #{service.id}
                </p>
              </div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                R${service.price.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full border border-zinc-200 text-sm font-medium text-foreground transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              {dashboard.seeMoreLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
