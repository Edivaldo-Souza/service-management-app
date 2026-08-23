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
  onServiceCreated?: () => void;
}

interface ServiceData{
  demandGroupId:number,
  customerId?: number
  productTypeId?: number,
  meterValue: number,
  description:string,
  amount: number
  productLength: number
  productHeight: number
  value: number
}

export default function AddServiceModal({isOpen,onClose, customer, onServiceCreated}:AddServiceModalProps){
  const [serviceData,setServiceData] = useState<ServiceData>({
    demandGroupId:0,
    customerId:0,
    productTypeId: 0,
    meterValue: 0,
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

  /*const totalValue: number = productType ?
    (serviceData.amount || 0) * 
    (serviceData.productLength || 0) * 
    (serviceData.productHeight || 0) *
    (Number(productType.label.match(/[\d.]+/))) || 0 : 0
  */
 
    const totalValue: number = 
    !serviceData.meterValue || serviceData.meterValue <=0 ?
      productType ?
        (serviceData.amount || 0) * 
        (serviceData.productLength || 0) * 
        (serviceData.productHeight || 0) *
        (Number(productType.label.match(/[\d.]+/))) || 0 : 0
      : 
      (serviceData.amount || 0) * 
        (serviceData.productLength || 0) * 
        (serviceData.productHeight || 0) *
        (serviceData.meterValue || 0)

  const clearServiceData = () =>{
    setServiceData({
      demandGroupId:0,
      customerId:0,
      productTypeId: 0,
      meterValue: 0,
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
          onServiceCreated?.();
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
      <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
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
          className="flex flex-col md:flex-row gap-8" 
          onSubmit={handleSubmit}
        >

          {/* Right section: Inputs */}
          <div className="flex-1 space-y-5">
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
            <label className="text-sm font-semibold text-gray-700 block" htmlFor="meterValue">
              Valor do m²
            </label>
            <input
              id="meterValue"
              name="meterValue"
              type="number"
              step="any"
              onChange={handleChange}
              placeholder="0.0m"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-700 placeholder:text-gray-400"
            />
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
          </div>

           {/* Left section: Total value */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-8 rounded-2xl border border-emerald-100 flex flex-col justify-center items-center shadow-inner relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl"></div>
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-300/30 rounded-full blur-2xl"></div>
            
            <h3 className="text-emerald-800 font-bold mb-4 text-sm uppercase tracking-widest relative z-10">Valor Total</h3>
            <div className="flex items-baseline gap-1 relative z-10">
              <span className="text-xl font-semibold text-emerald-700">R$</span>
              <h1 className="text-5xl font-black text-emerald-600 tracking-tight">{totalValue.toFixed(2)}</h1>
            </div>
            <p className="text-emerald-700/60 text-xs mt-6 text-center font-medium max-w-[200px] relative z-10">
              Valor calculado com base nas medidas e quantidade informadas
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}