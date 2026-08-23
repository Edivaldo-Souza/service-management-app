"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

interface EditProfileFormData {
  id: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string
}

export function EditProfileForm() {
  const [formData, setFormData] = useState<EditProfileFormData>({
    id: 0,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submittedFile, setSubmittedFile] = useState<File | null>(null)

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true)
    try{
      const response = await api.get("v1/user")
      const data = response.data.data;
      setFormData({
        id:data.id,
        name:data.name,
        email:data.email,
        password:"",
        confirmPassword:"",
      })
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data.error}`);
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])

  const validateFields = () => {
    if(formData.password!==formData.confirmPassword){
      return false
    }
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setSubmittedFile(file)
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if(validateFields()){
      const multiPartRequest = new FormData()
      multiPartRequest.append("data",new Blob([JSON.stringify(formData)],{type:"application/json"}))
      if(submittedFile){
        multiPartRequest.append("invoice",submittedFile)
      }

      try {
        const response = await api.put("v1/user", multiPartRequest);
        if (response.status === 200) {
          toast.success("Dados atualizados com sucesso");
          router.push("/services");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            `${error.response?.data?.error ?? "Erro ao atualizar dados"}\n ${
              error.response?.data?.validationFields ?? ""
            }`
          );
        }
      } finally {
        setLoading(false);
      }
    }else{
      toast.error("As senhas não estão iguais")
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-950">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
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
            value={formData.email}
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
              value={formData.password}
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

        <div>
          <label htmlFor="confirmPassword" className={labelClassName}>
            Confirmar senha
          </label>
          <div className="relative mt-1.5">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`pr-10 ${inputClassName}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="invoice" className={labelClassName}>
            Nota fiscal
          </label>
          <input
            id="invoice"
            name="invoice"
            type="file"
            onChange={handleFileChange}
            className={`mt-1.5 ${inputClassName}`}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-sm font-medium text-foreground transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
