"use client"

import api from "@/lib/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface DecreaseValueModalProps {
  isOpen: boolean;
  onClose: () => void;
  demandGroupId: number;
  currentValue: number;
  onSuccess: () => void;
}

export default function DecreaseValueModal({
  isOpen,
  onClose,
  demandGroupId,
  currentValue,
  onSuccess,
}: DecreaseValueModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Informe um valor válido maior que zero");
      return;
    }

    if (numericAmount > currentValue) {
      toast.error("O valor não pode ser maior que o saldo atual");
      return;
    }

    const isFullPayment = numericAmount === currentValue;

    setLoading(true);
    try {
      await api.post(`v1/demand-group`, {
        id:demandGroupId,
        reducedValue: numericAmount,
      });
      if (isFullPayment) {
        toast.success("Demanda totalmente quitada!");
        setAmount("");
        onClose();
        router.push("/services");
      } else {
        toast.success("Valor atualizado com sucesso");
        setAmount("");
        onSuccess();
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data.error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Abater valor</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4 rounded-xl bg-emerald-50 p-4 text-center">
          <p className="text-sm text-emerald-600 font-medium">Saldo atual</p>
          <p className="text-2xl font-bold text-emerald-700">
            R${currentValue}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-gray-700 block"
              htmlFor="decrease-amount"
            >
              Valor a abater (R$)
            </label>
            <input
              id="decrease-amount"
              type="number"
              step="any"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-700 placeholder:text-gray-400"
            />
          </div>

          {amount && parseFloat(amount) > 0 && (
            <div className="rounded-xl bg-gray-50 p-3 text-center border border-gray-200">
              <p className="text-xs text-gray-500">Novo saldo</p>
              <p className="text-lg font-bold text-gray-800">
                R$
                {Math.max(0, currentValue - (parseFloat(amount) || 0))}
              </p>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setAmount("");
                onClose();
              }}
              className="flex-1 rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Confirmar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
