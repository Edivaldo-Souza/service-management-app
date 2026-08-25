"use client"

import { useState } from "react"
import api from "@/lib/api"
import axios from "axios"
import toast from "react-hot-toast"
import { signin } from "@/lib/site"
import { useRouter } from "next/navigation"

const inputClassName =
  "w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-zinc-800 dark:bg-zinc-950";

const labelClassName = "block text-sm font-medium text-foreground";

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  )
}

interface loginForm{
    email:string,
    password: string
}

export default function SignInForm(){

    const [loginFormData,setloginFormData] = useState<loginForm>({
    email:'',
    password:''
  })

  const [loading,setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const router = useRouter();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target
      setloginFormData((prev)=>({
        ...prev, 
        [name]:value
      }))
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

      try{
        const response = await api.post("/v1/auth",loginFormData)
        if(response.status === 200){
          toast.success("Usuário autenticado")
        }
        setloginFormData({email:'', password:''})

        window.location.href = "/services";
      } catch(error){
        if(axios.isAxiosError(error)){
          toast.error(`${error.response?.data.error}\n 
            ${error.response?.data.validationFields}`)
        }
      } finally{
        setLoading(false)
      }
    }

    return(
        <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-950">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className={labelClassName}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleChange}
                    className={`mt-1.5 ${inputClassName}`}
                  />
                </div>
                <div>
                  <label htmlFor="password" className={labelClassName}>
                    Senha
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      onChange={handleChange}
                      className={`pr-10 ${inputClassName}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  {loading ? 'Carregando...' : "Entrar"}
                </button>

              </form>
              <button
                  onClick={()=>{router.back()}}
                  className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-sm font-medium text-foreground transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                >
                  Voltar
              </button>
            </div>
    )
}