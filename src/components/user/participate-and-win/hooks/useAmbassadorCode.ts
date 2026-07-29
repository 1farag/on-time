"use client";

import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";

type AmbassadorCodeResponse = {
  id: string;
  ownerUserId: string;
  code: string;
  status: string;
  generatedAt: string;
  expiresAt: string | null;
  lastUsedAt: string | null;
  usageCount: number;
};

const AMBASSADOR_CODE_PATH = "/ambassador/me/code";

function normalize(payload: unknown): AmbassadorCodeResponse | null {
  const o =
    payload && typeof payload === "object" ? (payload as Record<string, unknown>) : null;
  if (!o) return null;

  const inner =
    "data" in o && o.data && typeof o.data === "object"
      ? (o.data as Record<string, unknown>)
      : o;

  const code = typeof inner.code === "string" ? inner.code : "";
  if (!code) return null;

  return {
    id: typeof inner.id === "string" ? inner.id : "",
    ownerUserId: typeof inner.ownerUserId === "string" ? inner.ownerUserId : "",
    code,
    status: typeof inner.status === "string" ? inner.status : "",
    generatedAt: typeof inner.generatedAt === "string" ? inner.generatedAt : "",
    expiresAt: typeof inner.expiresAt === "string" ? inner.expiresAt : null,
    lastUsedAt: typeof inner.lastUsedAt === "string" ? inner.lastUsedAt : null,
    usageCount:
      typeof inner.usageCount === "number"
        ? inner.usageCount
        : Number(inner.usageCount ?? 0) || 0,
  };
}

export function useAmbassadorCode() {
  const query = useQueryWithRefresh<AmbassadorCodeResponse | null>({
    queryKey: ["ambassador", "me", "code"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<unknown>(AMBASSADOR_CODE_PATH);
      return normalize(data);
    },
    tokenType: "user",
    staleTime: 60_000,
    retry: false,
  });

  return {
    ambassadorCode: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
