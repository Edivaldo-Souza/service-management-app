"use client"

import { signup } from "@/lib/site";
import { useState } from "react";
import api from "@/lib/api";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const inputClassName =
  "w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-zinc-800 dark:bg-zinc-950";

const labelClassName = "block text-sm font-medium text-foreground";

interface CreateUserFormData{
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

export function SignUpForm() {

  const [createUserFormData,setCreateUserFormData] = useState<CreateUserFormData>({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const [loading,setLoading] = useState<boolean>(false)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target
      setCreateUserFormData((prev)=>({
        ...prev, 
        [name]:value
      }))
  }

  const validateFields = () => {
    if(createUserFormData.password!==createUserFormData.confirmPassword){
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if(validateFields()){
      try{
        const response = await api.post("/v1/user",createUserFormData)
    
        setCreateUserFormData({name:'', email:'', password:'', confirmPassword:''})
      } catch(error){
        if(axios.isAxiosError(error)){
          toast.error(`${error.response?.data.error}\n 
            ${error.response?.data.validationFields}`)
        }
      } finally{
        setLoading(false)
      }
    }
    else{
      toast.error("passwords don't match")
    }
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-950">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            onChange={handleChange}
            className={`mt-1.5 ${inputClassName}`}
          />
        </div>
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
        <div>
          <label htmlFor="confirm-password" className={labelClassName}>
            Confirm password
          </label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            className={`mt-1.5 ${inputClassName}`}
          />
        </div>
        <button
          type="submit"
          className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          {loading ? 'Loading...' : signup.submitLabel}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        {signup.signInPrompt}{" "}
        <Link href="/signin"  className="font-medium text-accent">{signup.signInLabel}</Link>
      </p>
    </div>
  );
}
