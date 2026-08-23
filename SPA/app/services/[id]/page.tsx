import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site";
import DemandGroupDetailPage from "@/components/services/demand-group-detail-page";

export const metadata: Metadata = {
  title: `Detalhes do Serviço | ${siteConfig.name}`,
};

export default async function DemandGroupPage(props: PageProps<'/services/[id]'>) {
  const { id } = await props.params;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <DemandGroupDetailPage demandGroupId={Number(id)} />
      </main>
      <SiteFooter />
    </>
  );
}
