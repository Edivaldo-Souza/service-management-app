
import {Toaster} from "react-hot-toast"
import { signin } from "@/lib/site"
import SignInForm from "@/components/signin/signin-form"

export default function SignIn(){

    return(
    <main className="flex flex-1 flex-col">
      <Toaster position="bottom-right" />
      <section className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {signin.title}
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              {signin.description}
            </p>
          </div>
          <SignInForm />
        </div>
      </section>
    </main>
    )

}