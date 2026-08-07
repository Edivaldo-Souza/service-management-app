"use client"

import api from "@/lib/api";
import { dashboard } from "@/lib/site";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DemandGroupDetailModal from "./demand-group-detail-modal";
import DemandGroupDto from "@/types/demand-group-dto";

export function ServiceList() {
  const [demandGroupList,setDemandGroupList] = useState<DemandGroupDto[]>([])
  const [selectedDemandGroup, setSelectedDemandGroup] = useState<DemandGroupDto | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const getDemandGroups = async () =>{
    try{
      const response = await api.get("v1/demand-group")
      setDemandGroupList(response.data.data)
    } catch(error){
      if(axios.isAxiosError(error)){
        toast.error(`${error.response?.data.error}`)
      }
    }
  }

  useEffect(()=>{
    getDemandGroups()
  },[])
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Serviços ativos
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {dashboard.subtitle}
      </p>
      <ul className="mt-8 gap-4">
        {demandGroupList.map((demandGroup) => (
          <li
            key={demandGroup.id}
            onClick={() => {
              setSelectedDemandGroup(demandGroup);
              setIsDetailModalOpen(true);
            }}
            className="mt-2 cursor-pointer rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 transition-colors hover:bg-zinc-700">
            <div className="flex items-start justify-between ">
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {demandGroup.customerName}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Serviço #{demandGroup.id}
                </p>
              </div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                R${demandGroup.value.toFixed(2)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <DemandGroupDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDemandGroup(null);
        }}
        demandGroup={selectedDemandGroup}
      />
    </div>
  );
}
