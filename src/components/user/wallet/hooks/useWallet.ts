"use client";

import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";

const WALLET_PATH = "/wallet";

export type WalletData = {
  id: string;
  balance: string;
  currency: string;
  status: string;
};

function unwrapPayload(payload: unknown): Record<string, unknown> | null {
  const o =
    payload != null && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : null;
  if (!o) return null;

  const inner =
    "data" in o &&
    o.data !== null &&
    typeof o.data === "object" &&
    !Array.isArray(o.data)
      ? (o.data as Record<string, unknown>)
      : o;

  return inner ?? null;
}

function normalizeWallet(payload: unknown): WalletData | null {
  const inner = unwrapPayload(payload);
  if (!inner) return null;

  const id = typeof inner.id === "string" ? inner.id : "";
  const balance =
    typeof inner.balance === "string"
      ? inner.balance
      : inner.balance !== undefined && inner.balance !== null
        ? String(inner.balance)
        : "";
  const currency = typeof inner.currency === "string" ? inner.currency : "SAR";
  const status = typeof inner.status === "string" ? inner.status : "";

  if (!id && !balance) return null;

  return {
    id: id || "unknown",
    balance: balance || "0.00",
    currency,
    status,
  };
}

async function fetchWallet(): Promise<WalletData | null> {
  const { data } = await axiosInstance.get<unknown>(WALLET_PATH);
  return normalizeWallet(data);
}

export function useWallet() {
  const query = useQueryWithRefresh<WalletData | null>({
    queryKey: ["wallet"],
    queryFn: fetchWallet,
    tokenType: "user",
    staleTime: 30_000,
  });

  return {
    wallet: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
}
