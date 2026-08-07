"use client"

import { SingleSelectedOption } from "@/types/selectables";
import React, { useState } from "react";
import CustomerDto from "@/types/customer-dto";
import SingleSelectInput from "../forms/singIe-select-input";
import { SingleValue } from "react-select";
import api from "@/lib/api";
import axios from "axios";
import toast from "react-hot-toast";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: CustomerDto | null;
}

interface ServiceData{
  demandGroupId:number,
  customerId?: number
  productTypeId?: number
  description:string,
  amount: number
  productLength: number
  productHeight: number
  value: number
}

export default function AddServiceModal({isOpen,onClose, customer}:AddServiceModalProps){
  const [serviceData,setServiceData] = useState<ServiceData>({
    demandGroupId:0,
    customerId:0,
    productTypeId: 0,
    description:"",
    amount: 0,
    productLength: 0,
    productHeight: 0,
    value: 0
  })
  const [productType,setProductType] = useState<SingleSelectedOption | null>(null);
  const [loading,setLoading] = useState<boolean>(false); 

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setServiceData((prev)=>({
          ...prev, 
          [name]:value
    }))
  }

  const totalValue = productType ?
    (serviceData.amount || 0) * 
    (serviceData.productLength || 0) * 
    (serviceData.productHeight || 0) *
    (Number(productType.label.match(/[\d.]+/))) || 0 : 0

  const clearServiceData = () =>{
    setServiceData({
      demandGroupId:0,
      customerId:0,
      productTypeId: 0,
      description:"",
      amount: 0,
      productLength: 0,
      productHeight: 0,
      value: 0
    })
  }

  const handleProductTypeChange = (newProductType: SingleValue<SingleSelectedOption>) => {
    setProductType(newProductType)
  }

  const validateForm = () => {
    return true;
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setLoading(true)

    const postPayload = {
          ...serviceData, 
          ["value"]:totalValue,
          ["productTypeId"]:productType?.value,
          ["customerId"]:customer?.id
    }
    
    if(validateForm()){
      try{
        const response = await api.post("v1/demand",postPayload)
        if(response.status === 201){
          toast.success("Serviço adicionado")
        }

        clearServiceData();
        onClose();
      }
      catch(error){
        if(axios.isAxiosError(error)){
          toast.error(`${error.response?.data.error}`)
        }
        console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    
  }

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{"Novo Serviço de "+ customer?.name}</h2>
          <button 
            onClick={() => {
              clearServiceData()
              onClose()
            }} 
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
            <label className="text-sm font-semibold text-gray-700 block" htmlFor="description">
              Descrição
            </label>
            <input
              id="description"
              name="description"
              required
              onChange={handleChange}
              placeholder="Descrição"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-700 placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block" htmlFor="amount">
              Quantidade
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              required
              onChange={handleChange}
              placeholder="Quantidade"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-700 placeholder:text-gray-400"
            />
          </div>

          <div className="text-gray-800 space-y-2">
            <label className="text-sm font-semibold text-gray-700 block" htmlFor="productType">
              Tipo do material
            </label>
            <SingleSelectInput 
              value={productType}
              onChange={handleProductTypeChange}
              url="v1/product-type?isOutsourced=true"
              typeMetaData="Tipo de material" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block" htmlFor="productLength">
              Largura do material
            </label>
            <input
              id="productLength"
              name="productLength"
              type="number"
              step="any"
              onChange={handleChange}
              placeholder="0.0m"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-700 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block" htmlFor="productHeight">
              Altura do material
            </label>
            <input
              id="productHeight"
              name="productHeight"
              type="number"
              step="any"
              onChange={handleChange}
              placeholder="0.0m"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-700 placeholder:text-gray-400"
            />
          </div>
          
          <div className="text-gray-800">
            <h3>Valor total</h3>
            <h1>{totalValue}</h1>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => {
              clearServiceData()
              onClose()
            }}
              className="flex-1 rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
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