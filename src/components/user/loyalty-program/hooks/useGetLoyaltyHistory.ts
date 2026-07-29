"use client";

import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";

const LOYALTY_HISTORY_PATH = "/privileges/loyalty/history";

export type LoyaltyHistoryItem = {
  id: string;
  createdAt: string;
  entryType: string;
  reasonCode: string;
  title: string;
  pointsDelta: number;
  pointsDisplay: number;
  equivalentAmount: string;
  equivalentCurrency: string;
  equivalentSign: string;
  bookingId: string | null;
};

export type LoyaltyHistoryResponse = {
  items: LoyaltyHistoryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

function normalizeItem(raw: unknown): LoyaltyHistoryItem | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id : "";
  if (!id) return null;

  return {
    id,
    createdAt: typeof o.createdAt === "string" ? o.createdAt : "",
    entryType: typeof o.entryType === "string" ? o.entryType : "UNKNOWN",
    reasonCode: typeof o.reasonCode === "string" ? o.reasonCode : "UNKNOWN",
    title: typeof o.title === "string" ? o.title : "Loyalty activity",
    pointsDelta:
      typeof o.pointsDelta === "number" ? o.pointsDelta : Number(o.pointsDelta ?? 0) || 0,
    pointsDisplay:
      typeof o.pointsDisplay === "number"
        ? o.pointsDisplay
        : Number(o.pointsDisplay ?? 0) || 0,
    equivalentAmount:
      typeof o.equivalentAmount === "string"
        ? o.equivalentAmount
        : String(o.equivalentAmount ?? "0.00"),
    equivalentCurrency:
      typeof o.equivalentCurrency === "string" ? o.equivalentCurrency : "SAR",
    equivalentSign: typeof o.equivalentSign === "string" ? o.equivalentSign : "credit",
    bookingId: typeof o.bookingId === "string" ? o.bookingId : null,
  };
}

function normalize(
  payload: unknown,
  fallbackPage: number,
  fallbackLimit: number
): LoyaltyHistoryResponse {
  const o =
    payload && typeof payload === "object" ? (payload as Record<string, unknown>) : null;

  const source =
    o && "data" in o && o.data && typeof o.data === "object" && !Array.isArray(o.data)
      ? (o.data as Record<string, unknown>)
      : o;

  const itemsRaw =
    source && Array.isArray(source.items)
      ? source.items
      : Array.isArray(payload)
        ? payload
        : [];
  const items = itemsRaw.map(normalizeItem).filter(Boolean) as LoyaltyHistoryItem[];

  const pg =
    source &&
    source.pagination &&
    typeof source.pagination === "object" &&
    !Array.isArray(source.pagination)
      ? (source.pagination as Record<string, unknown>)
      : source;

  const page =
    typeof pg?.page === "number" ? pg.page : Number(pg?.page ?? fallbackPage) || fallbackPage;
  const limit =
    typeof pg?.limit === "number"
      ? pg.limit
      : Number(pg?.limit ?? fallbackLimit) || fallbackLimit;
  const total =
    typeof pg?.total === "number" ? pg.total : Number(pg?.total ?? items.length) || items.length;
  const totalPages =
    typeof pg?.totalPages === "number"
      ? pg.totalPages
      : Math.max(1, Math.ceil(total / Math.max(1, limit)));

  return { items, pagination: { page, limit, total, totalPages } };
}

export function useGetLoyaltyHistory(page: number, limit: number) {
  const query = useQueryWithRefresh<LoyaltyHistoryResponse>({
    queryKey: ["privileges", "loyalty", "history", page, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get<unknown>(LOYALTY_HISTORY_PATH, {
        params: { page, limit },
      });
      return normalize(data, page, limit);
    },
    tokenType: "user",
    staleTime: 30_000,
    retry: false,
  });

  return {
    items: query.data?.items ?? [],
    pagination:
      query.data?.pagination ?? ({
        page,
        limit,
        total: 0,
        totalPages: 1,
      } satisfies LoyaltyHistoryResponse["pagination"]),
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
  };
}
