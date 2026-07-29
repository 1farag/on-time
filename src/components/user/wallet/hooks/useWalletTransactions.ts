"use client";

import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";

const WALLET_TRANSACTIONS_PATH = "/wallet/transactions";

export type WalletTransactionItem = {
  id: string;
  direction: "CREDIT" | "DEBIT" | string;
  amount: string;
  balanceAfter: string;
  referenceType: string;
  referenceId: string | null;
  createdAt: string;
};

export type WalletTransactionsResponse = {
  items: WalletTransactionItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
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

function parseTransaction(raw: unknown): WalletTransactionItem | null {
  if (!raw || typeof raw !== "object") return null;
  const t = raw as Record<string, unknown>;
  const id = typeof t.id === "string" ? t.id : "";
  if (!id) return null;
  return {
    id,
    direction: typeof t.direction === "string" ? t.direction : "CREDIT",
    amount: typeof t.amount === "string" ? t.amount : String(t.amount ?? ""),
    balanceAfter:
      typeof t.balanceAfter === "string"
        ? t.balanceAfter
        : String(t.balanceAfter ?? ""),
    referenceType:
      typeof t.referenceType === "string" ? t.referenceType : "Transaction",
    referenceId: typeof t.referenceId === "string" ? t.referenceId : null,
    createdAt: typeof t.createdAt === "string" ? t.createdAt : "",
  };
}

function normalizeResponse(
  payload: unknown,
  page: number,
  limit: number
): WalletTransactionsResponse {
  const inner = unwrapPayload(payload);
  const itemsRaw = inner && Array.isArray(inner.items) ? inner.items : [];
  const items = itemsRaw.map(parseTransaction).filter(Boolean) as WalletTransactionItem[];

  const total =
    inner && typeof inner.total === "number"
      ? inner.total
      : Number(inner?.total ?? 0) || 0;
  const resPage =
    inner && typeof inner.page === "number"
      ? inner.page
      : Number(inner?.page ?? page) || page;
  const resLimit =
    inner && typeof inner.limit === "number"
      ? inner.limit
      : Number(inner?.limit ?? limit) || limit;
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, resLimit)));

  return {
    items,
    pagination: {
      page: resPage,
      limit: resLimit,
      total,
      totalPages,
    },
  };
}

export async function getWalletTransactionsAPI(
  page: number,
  limit: number
): Promise<WalletTransactionsResponse> {
  const empty: WalletTransactionsResponse = {
    items: [],
    pagination: { page, limit, total: 0, totalPages: 1 },
  };

  try {
    const { data } = await axiosInstance.get<unknown>(WALLET_TRANSACTIONS_PATH, {
      params: { page, limit },
    });
    return normalizeResponse(data, page, limit);
  } catch {
    return empty;
  }
}

type UseWalletTransactionsOptions = {
  enabled?: boolean;
};

export function useWalletTransactions(
  page: number,
  limit: number,
  options?: UseWalletTransactionsOptions
) {
  const enabled = options?.enabled !== false;

  const query = useQueryWithRefresh<WalletTransactionsResponse>({
    queryKey: ["wallet", "transactions", page, limit],
    queryFn: () => getWalletTransactionsAPI(page, limit),
    tokenType: "user",
    staleTime: 30_000,
    enabled,
    retry: false,
  });

  return {
    items: query.data?.items ?? [],
    pagination:
      query.data?.pagination ??
      ({
        page,
        limit,
        total: 0,
        totalPages: 1,
      } satisfies WalletTransactionsResponse["pagination"]),
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
}
