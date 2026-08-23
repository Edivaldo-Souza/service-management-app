"use client"

import api from "@/lib/api";
import { dashboard } from "@/lib/site";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import MinDemandGroupDto from "@/types/min-demand-group-dto";
import SearchBar from "@/components/search-bar";

interface ServiceListProps {
  refreshKey?: number;
}

export function ServiceList({ refreshKey }: ServiceListProps) {
  const [demandGroupList,setDemandGroupList] = useState<MinDemandGroupDto[]>([])
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDemandGroups = useMemo(() => {
    if (!searchQuery.trim()) return demandGroupList;
    const q = searchQuery.toLowerCase();
    return demandGroupList.filter((dg) => dg.customerName.toLowerCase().includes(q));
  }, [demandGroupList, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

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
  },[refreshKey])
  
  return (
    <div className="w-full flex flex-col flex-1 min-h-0">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Serviços ativos
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {dashboard.subtitle}
      </p>

      <SearchBar placeholder="Buscar serviço por cliente..." onSearch={handleSearch} />

      <ul className="mt-4 flex-1 min-h-0 overflow-y-auto gap-4">
        {filteredDemandGroups.map((demandGroup) => (
          <li
            key={demandGroup.id}
            className="mt-2 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 transition-colors hover:bg-zinc-700">
            <Link
              href={`/services/${demandGroup.id}`}
              className="block p-6"
            >
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
                  R${
                    demandGroup.reducedValue ?
                    (demandGroup.value - demandGroup.reducedValue).toFixed(2) : demandGroup.value.toFixed(2)
                  }
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
