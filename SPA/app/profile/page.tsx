import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Editar perfil",
};

export default function ProfilePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Toaster position="bottom-right" />
        <section className="flex flex-1 items-center justify-center px-6 py-20">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Editar perfil
              </h1>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Atualize seus dados cadastrais
              </p>
            </div>
            <EditProfileForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
