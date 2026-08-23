import type { Metadata } from "next";
import  {SignUpForm}  from "@/components/signup/signup-form";
import { signup, siteConfig } from "@/lib/site";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: `Sign up | ${siteConfig.name}`,
};

export default function SignUp() {

  return (
    <main className="flex flex-1 flex-col">
      <Toaster position="bottom-right" />
      <section className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Crie sua conta
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Junta-se a plataforma e gerencie os pagamentos de seus clientes
            </p>
          </div>
          <SignUpForm />
        </div>
      </section>
    </main>
  );
}
