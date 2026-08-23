import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { dashboard, siteConfig } from "@/lib/site";
import ServicesDashboard from "@/components/services/services-dashboard";

export const metadata: Metadata = {
  title: `${dashboard.title} | ${siteConfig.name}`,
};

export default function Dashboard() {

  return (
    <>
      <ServicesDashboard />
    </>
  );
}