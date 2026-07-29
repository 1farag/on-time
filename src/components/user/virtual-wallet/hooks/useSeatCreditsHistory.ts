"use client";

import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";

const SEAT_CREDITS_HISTORY_PATH = "/privileges/seat-credits/me/history";

export type SeatCreditHistoryItem = {
  id: string;
  createdAt: string;
  entryType?: string | null;
  reasonCode?: string | null;
  title?: string | null;
  seatsDelta: number;
  balanceAfterSeats?: number | null;
  displayAmount?: string | null;
  currency?: string | null;
  expiresAt?: string | null;
  bookingId?: string | null;
};

export type SeatCreditsHistoryResponse = {
  items: SeatCreditHistoryItem[];
  total: number;
  limit: number;
  offset: number;
};

const fallbackHistoryResponse = (
  limit: number,
  offset: number
): SeatCreditsHistoryResponse => ({
  items: [],
  total: 0,
  limit,
  offset,
});

const toNumber = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const getSeatCreditsHistoryAPI = async (
  limit: number,
  offset: number
): Promise<SeatCreditsHistoryResponse> => {
  try {
    const { data } = await axiosInstance.get<unknown>(SEAT_CREDITS_HISTORY_PATH, {
      params: { limit, offset },
    });

    const payload =
      data && typeof data === "object" ? (data as Record<string, unknown>) : null;
    const wrappedData =
      payload &&
      payload.data &&
      typeof payload.data === "object" &&
      !Array.isArray(payload.data)
        ? (payload.data as Record<string, unknown>)
        : payload;

    if (!wrappedData || typeof wrappedData !== "object") {
      return fallbackHistoryResponse(limit, offset);
    }

    const rawItems = Array.isArray(wrappedData.items) ? wrappedData.items : [];
    const items: SeatCreditHistoryItem[] = rawItems
      .map((raw) => {
        if (!raw || typeof raw !== "object") return null;
        const item = raw as Record<string, unknown>;
        const id = typeof item.id === "string" ? item.id : "";
        if (!id) return null;

        return {
          id,
          createdAt: typeof item.createdAt === "string" ? item.createdAt : "",
          entryType: typeof item.entryType === "string" ? item.entryType : null,
          reasonCode: typeof item.reasonCode === "string" ? item.reasonCode : null,
          title: typeof item.title === "string" ? item.title : null,
          seatsDelta: toNumber(item.seatsDelta, 0),
          balanceAfterSeats: toNumber(item.balanceAfterSeats, 0),
          displayAmount:
            typeof item.displayAmount === "string" ? item.displayAmount : null,
          currency: typeof item.currency === "string" ? item.currency : null,
          expiresAt: typeof item.expiresAt === "string" ? item.expiresAt : null,
          bookingId: typeof item.bookingId === "string" ? item.bookingId : null,
        };
      })
      .filter(Boolean) as SeatCreditHistoryItem[];

    return {
      items,
      total: toNumber(wrappedData.total, 0),
      limit: toNumber(wrappedData.limit, limit),
      offset: toNumber(wrappedData.offset, offset),
    };
  } catch {
    return fallbackHistoryResponse(limit, offset);
  }
};

export const useSeatCreditsHistory = (
  page: number,
  limit: number,
  options?: { enabled?: boolean }
) => {
  const safePage = Math.max(1, page || 1);
  const safeLimit = Math.max(1, limit || 1);
  const offset = (safePage - 1) * safeLimit;
  const enabled = options?.enabled !== false;

  const query = useQueryWithRefresh<SeatCreditsHistoryResponse>({
    queryKey: ["privileges", "seat-credits", "history", safePage, safeLimit],
    queryFn: () => getSeatCreditsHistoryAPI(safeLimit, offset),
    tokenType: "user",
    staleTime: 30_000,
    enabled,
    retry: false,
  });

  return {
    items: query.data?.items ?? [],
    pagination: {
      page: safePage,
      limit: query.data?.limit ?? safeLimit,
      total: query.data?.total ?? 0,
      offset: query.data?.offset ?? offset,
    },
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
};
