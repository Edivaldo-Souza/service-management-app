import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { ServiceList } from "@/components/dashboard/service-list";
import { dashboard, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${dashboard.title} | ${siteConfig.name}`,
};

const services = [
  { id: 1, costumer: "Lucas", price: 200.0 },
  { id: 2, costumer: "Pedro", price: 100.0 },
  { id: 3, costumer: "Simone", price: 340.0 },
];

export default function Dashboard() {
  const totalSpent = services.reduce((sum, s) => sum + s.price, 0);

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <div className="px-6 py-20">
          <div className="mx-auto max-w-6xl space-y-8">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {dashboard.title}
              </h1>
            </div>
            <ProfileCard />
            <StatsOverview
              totalServices={services.length}
              totalSpent={totalSpent}
            />
            <ServiceList services={services} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}