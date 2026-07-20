"use client"

import React , {useState} from "react";
import axios from "axios"
import api from "@/lib/api";
import toast from "react-hot-toast";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerForm {
  name: string,
  phone: string
}

export default function AddCustomerModal({ isOpen, onClose }: AddCustomerModalProps) {
  const [customerFormData,setCustomerFormData] = useState<CustomerForm>({name:"",phone:""})
  const [loading,setLoading] = useState<boolean>()

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target
      setCustomerFormData((prev)=>({
        ...prev, 
        [name]:value
      }))
  }

  const validateForm = () =>{
    if(customerFormData.name === ""){
      return false;
    }
    return true
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault

    setLoading(true)
    if(validateForm()){
      try{
        const response = await api.post("/v1/customer",customerFormData)
        if(response.status === 204){
          toast.success("Cliente adicionado!")
        }
        setCustomerFormData({name:"",phone:""})
      } catch(error){
        if(axios.isAxiosError(error)){
          toast.error(`${error.response?.data.error}`)
        }
      } finally{
        setLoading(false)
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Novo Cliente</h2>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
        
        <form 
          className="space-y-5" 
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              name="name"
              required
              onChange={handleChange}
              placeholder="Digite o nome do cliente"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-700 placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block" htmlFor="phone">
              Telefone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-700 placeholder:text-gray-400"
            />
          </div>
          
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
            >
              {loading ? "Carregando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
