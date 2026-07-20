"use client";

import { useEffect, useState } from "react";
import styles from "./customers-list.module.css";
import AddCustomerModal from "./add-customer-modal";
import CustomerDto from "@/types/customer-dto";
import axios from "axios";
import toast from "react-hot-toast";
import api from "@/lib/api";
import AddServiceModal from "../services/add-service-modal";

export default function CustomersList(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(null)
    const [customerDtoList,setCustomerDtoList] = useState<CustomerDto[]>([])

    const getCustomers = async () =>{
        try{
            const response = await api.get("/v1/customer/user")
            if(response.status === 200){
                setCustomerDtoList(response.data.data)
                console.log(response.data.data)
            }
        } catch(error){
          if(axios.isAxiosError(error)){
            toast.error(`${error.response?.data.error}`)
          }      
        }
    }

    useEffect(()=>{
        getCustomers()
    },[])

    return (
        <div className={`w-full flex flex-col h-full ${styles.container}`}>
            <div className="flex justify-center p-3">
                <input
                    placeholder="Pesquisar"
                    className="rounded-xl border px-4 py-2 w-full max-w-xs text-center"
                />
            </div>

            {/* Scrollable customer list */}
            <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-16">
                <ul className="w-full p-2">
                    {customerDtoList.map((customer)=>(
                        <li key={customer.id} className="p-0.5">
                            <div className="rounded-xl border flex w-full items-center gap-2 p-2">
                                <img alt="Profile picture" className="w-8 h-8 rounded-full"/>
                                <label className="flex-1">{customer.name}</label>
                                <button 
                                    onClick={() => {
                                        setSelectedCustomer(customer);
                                        setIsServiceModalOpen(true);
                                    }}
                                    className="cursor-pointer rounded-full bg-emerald-600 w-6 h-6 text-white text-sm flex items-center justify-center">
                                        +
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.bottomBar}>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 font-bold rounded-xl text-white px-6 py-2 w-full cursor-pointer hover:bg-emerald-700 transition-colors"
                >
                    Adicionar novo cliente
                </button>
            </div>

            <AddCustomerModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />

            <AddServiceModal 
                isOpen={isServiceModalOpen}
                onClose={() => {
                    setIsServiceModalOpen(false);
                    setSelectedCustomer(null);
                }}
                customer={selectedCustomer}
            />
        </div>
    )
}