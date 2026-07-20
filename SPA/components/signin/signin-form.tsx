"use client"

import { useState } from "react"
import api from "@/lib/api"
import axios from "axios"
import toast from "react-hot-toast"
import { signin } from "@/lib/site"

const inputClassName =
  "w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-zinc-800 dark:bg-zinc-950";

const labelClassName = "block text-sm font-medium text-foreground";

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
          toast.success("User authenticated")
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
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                    className={`mt-1.5 ${inputClassName}`}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  {loading ? 'Loading...' : signin.submitLabel}
                </button>
              </form>
            </div>
    )
}