"use client";

import { useState, useCallback } from "react";
import { ServiceList } from "@/components/services/service-list";
import CustomersList from "@/components/customer/customers-list";
import { ProfileMenu } from "@/components/services/profile-menu";
import { Toaster } from "react-hot-toast";

export default function ServicesDashboard() {
  const [serviceRefreshKey, setServiceRefreshKey] = useState(0);

  const handleServiceCreated = useCallback(() => {
    setServiceRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="flex items-center justify-end px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <ProfileMenu />
      </div>
      <main className="flex flex-1 items-start h-screen min-h-0">
        <div className="w-3/10">
          <CustomersList onServiceCreated={handleServiceCreated} />
        </div>
        <ServiceList refreshKey={serviceRefreshKey} />
      </main>
    </>
  );
}
