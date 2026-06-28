import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProfileCard } from "@/components/services/profile-card";
import { ServiceList } from "@/components/services/service-list";
import { dashboard, siteConfig } from "@/lib/site";
import CustomersList from "@/components/services/customers-list";

export const metadata: Metadata = {
  title: `${dashboard.title} | ${siteConfig.name}`,
};

const services = [
  { id: 1, costumer: "Lucas", price: 200.0 },
  { id: 2, costumer: "Pedro", price: 100.0 },
  { id: 3, costumer: "Simone", price: 340.0 },
];

export default function Dashboard() {

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-start h-screen">
          <div className="w-3/10">
            <CustomersList /> 
          </div> 
          <ServiceList services={services} /> 
      </main>
      <SiteFooter />
    </>
  );
}