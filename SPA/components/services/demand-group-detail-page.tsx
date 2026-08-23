"use client"

import api from "@/lib/api";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SingleValue } from "react-select";
import SingleSelectInput from "../forms/singIe-select-input";
import { SingleSelectedOption } from "@/types/selectables";
import DemandGroupDto from "@/types/demand-group-dto";
import ProductTypeDto from "@/types/product-type-dto";
import DecreaseValueModal from "./decrease-value-modal";
import Link from "next/link";
import AddServiceModal from "./add-service-modal";

interface Demand {
  id: number;
  productTypeDto: ProductTypeDto;
  meterValue: number,
  description: string;
  amount: number;
  productLength: number;
  productHeight: number;
  value: number;
  created: string;
  updated: string;
}

interface DemandGroupDetailPageProps {
  demandGroupId: number;
}

export default function DemandGroupDetailPage({
  demandGroupId,
}: DemandGroupDetailPageProps) {
  const [demandGroup, setDemandGroup] = useState<DemandGroupDto | null>(null);
  const [demands, setDemands] = useState<Demand[]>([]);
  const [productType, setProductType] =
    useState<SingleSelectedOption | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Demand>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAddDemandModalOpen, setIsAddDemandModalOpen] = useState(false);
  const [isDecreaseModalOpen, setIsDecreaseModalOpen] = useState(false);

  const fetchDemandGroup = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`v1/demand-group/${demandGroupId}`);
      const data = response.data.data;
      setDemandGroup({
        id: data.id,
        customer: data.customer,
        value: data.value,
        reducedValue: data.reducedValue,
        created: data.created,
      });
      setDemands(data.demands);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data.error}`);
      }
    } finally {
      setLoading(false);
    }
  }, [demandGroupId]);

  useEffect(() => {
    fetchDemandGroup();
  }, [fetchDemandGroup]);

  const currentTotalValue = 
    !editData.meterValue || editData.meterValue <=0 ?
      productType ? 
        (editData.amount || 0) *
        (editData.productLength || 0) *
        (editData.productHeight || 0) *
        (Number(productType?.label.match(/[\d.]+/)) || 0): 0
      :
        (editData.amount || 0) *
        (editData.productLength || 0) *
        (editData.productHeight || 0) *
        (editData.meterValue || 0)

  const startEditing = (demand: Demand) => {
    setEditingId(demand.id);
    setProductType({
      label: `${demand.productTypeDto.name} (R$ ${demand.productTypeDto.price})`,
      value: demand.productTypeDto.id,
    });
    setEditData({
      id:demand.id,
      description: demand.description,
      meterValue: demand.meterValue,
      amount: demand.amount,
      productLength: demand.productLength,
      productHeight: demand.productHeight,
      value: demand.value,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDownload = async () => {
    try {
      const response = await api.get(
        `v1/invoice?id=${demandGroupId}`,
        { responseType: "blob" }
      );
      if (response.status === 200) {
        const fileUrl = URL.createObjectURL(response.data);
        const element = document.createElement("a");
        element.href = fileUrl;
        element.download = `Nota de serviço (${demandGroup?.customer.name}).pdf`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        URL.revokeObjectURL(fileUrl);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data.error}`);
      }
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleProductTypeChange = (
    newProductType: SingleValue<SingleSelectedOption>
  ) => {
    setProductType(newProductType);
  };

  const saveEdit = async () => {
    setSaving(true);

    const demandToUpdate = {
      id:editData.id,
      productTypeId:productType?.value,
      description:editData.description,
      meterValue:editData.meterValue,
      amount:editData.amount,
      productHeight:editData.productHeight,
      productLength:editData.productLength,
      value: currentTotalValue
    }

    try {
      const response = await api.put(`v1/demand`, demandToUpdate);
      if(response.status==200){
        toast.success("Serviço atualizado");
      }
      setEditingId(null);
      setEditData({});
      fetchDemandGroup();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data.error}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
      </div>
    );
  }

  if (!demandGroup) {
    return (
      <div className="text-center py-24 text-gray-400">
        <p className="text-lg">Grupo de serviço não encontrado</p>
        <Link
          href="/services"
          className="mt-4 inline-block text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
          ← Voltar para serviços
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Back button */}
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar para serviços
      </Link>

      {/* Header */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-800 truncate">
              {demandGroup.customer.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                R${
                    demandGroup.reducedValue ?
                    (demandGroup.value - demandGroup.reducedValue).toFixed(2) : demandGroup.value.toFixed(2)
                  }
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Criado em {formatDate(demandGroup.created)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsDecreaseModalOpen(true)}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors shadow-sm"
            >
              Abater valor
            </button>
            <button
              onClick={handleDownload}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Baixar nota
            </button>
          </div>
        </div>
      </div>

      {/* Demand list header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Serviços ({demands.length})
        </h2>
        <button
          onClick={() => setIsAddDemandModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Adicionar serviço
        </button>
      </div>

      {/* Demand list */}
      {demands.length === 0 ? (
        <div className="text-center py-12 text-gray-400 rounded-2xl bg-white border border-gray-200">
          <p className="text-lg">Nenhum serviço encontrado</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {demands.map((demand) => (
            <li
              key={demand.id}
              className="rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300"
            >
              {editingId === demand.id ? (
                /* Editing mode */
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Descrição
                      </label>
                      <input
                        name="description"
                        value={editData.description ?? ""}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Tipo do material
                      </label>
                      <div className="text-gray-700">
                        <SingleSelectInput
                          value={productType}
                          onChange={handleProductTypeChange}
                          url="v1/product-type?isOutsourced=true"
                          typeMetaData="Tipo de material"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Valor do m²
                      </label>
                      <input
                        name="meterValue"
                        value={editData.meterValue ?? 0}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Quantidade
                      </label>
                      <input
                        name="amount"
                        type="number"
                        value={editData.amount ?? 0}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Largura
                      </label>
                      <input
                        name="productLength"
                        type="number"
                        step="any"
                        value={editData.productLength ?? 0}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Altura
                      </label>
                      <input
                        name="productHeight"
                        type="number"
                        step="any"
                        value={editData.productHeight ?? 0}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Valor (R$)
                      </label>
                      <input
                        name="value"
                        type="number"
                        step="any"
                        value={currentTotalValue}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Read-only dates while editing */}
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-1 border-t border-gray-200">
                    <span>Criado: {formatDate(demand.created)}</span>
                    <span>Atualizado: {formatDate(demand.updated)}</span>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={()=>saveEdit()}
                      disabled={saving}
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                    >
                      {saving ? "Salvando..." : "Salvar"}
                    </button>
                  </div>
                </div>
              ) : (
                /* View mode */
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => startEditing(demand)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {demand.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span>
                          Material:{" "}
                          <span className="font-medium text-gray-700">
                            {`${demand.productTypeDto.name} (R$ ${demand.productTypeDto.price})`}
                          </span>
                        </span>
                        <span>
                          Qtd:{" "}
                          <span className="font-medium text-gray-700">
                            {demand.amount}
                          </span>
                        </span>
                        <span>
                          Larg:{" "}
                          <span className="font-medium text-gray-700">
                            {demand.productLength}
                          </span>
                        </span>
                        <span>
                          Alt:{" "}
                          <span className="font-medium text-gray-700">
                            {demand.productHeight}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-1">
                      <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-sm font-semibold text-emerald-700">
                        R${demand.value.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(demand);
                        }}
                        className="p-1 text-gray-400 hover:text-emerald-600 transition-colors"
                        aria-label="Editar serviço"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400 border-t border-gray-100 pt-2">
                    <span>Criado: {formatDate(demand.created)}</span>
                    <span>Atualizado: {formatDate(demand.updated)}</span>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Add Demand Modal */}
      <AddServiceModal
        isOpen={isAddDemandModalOpen}
        onClose={() => {
          setIsAddDemandModalOpen(false);
          fetchDemandGroup();
        }}
        customer={demandGroup.customer}
      />

      {/* Decrease Value Modal */}
      <DecreaseValueModal
        isOpen={isDecreaseModalOpen}
        onClose={() => setIsDecreaseModalOpen(false)}
        demandGroupId={demandGroupId}
        currentValue={demandGroup.value-demandGroup.reducedValue}
        onSuccess={fetchDemandGroup}
      />
    </div>
  );
}
