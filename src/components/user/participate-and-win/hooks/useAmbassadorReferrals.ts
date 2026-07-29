"use client";

import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";

export type AmbassadorReferralItem = {
  id: string;
  referralCodeId: string;
  referrerUserId: string;
  referredUserId: string;
  bookingId: string | null;
  attributionType: string;
  status: string;
  qualifiedAt: string | null;
  successfulAt: string | null;
  rewardedAt: string | null;
  voidedAt: string | null;
  voidReason: string | null;
  createdAt: string;
  referee: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
};

export type AmbassadorReferralsResponse = {
  items: AmbassadorReferralItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const AMBASSADOR_REFERRALS_PATH = "/ambassador/me/referrals";

function normalizeItem(raw: unknown): AmbassadorReferralItem | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id : "";
  if (!id) return null;

  return {
    id,
    referralCodeId: typeof o.referralCodeId === "string" ? o.referralCodeId : "",
    referrerUserId: typeof o.referrerUserId === "string" ? o.referrerUserId : "",
    referredUserId: typeof o.referredUserId === "string" ? o.referredUserId : "",
    bookingId: typeof o.bookingId === "string" ? o.bookingId : null,
    attributionType:
      typeof o.attributionType === "string" ? o.attributionType : "UNKNOWN",
    status: typeof o.status === "string" ? o.status : "PENDING",
    qualifiedAt: typeof o.qualifiedAt === "string" ? o.qualifiedAt : null,
    successfulAt: typeof o.successfulAt === "string" ? o.successfulAt : null,
    rewardedAt: typeof o.rewardedAt === "string" ? o.rewardedAt : null,
    voidedAt: typeof o.voidedAt === "string" ? o.voidedAt : null,
    voidReason: typeof o.voidReason === "string" ? o.voidReason : null,
    createdAt: typeof o.createdAt === "string" ? o.createdAt : "",
    referee:
      o.referee && typeof o.referee === "object"
        ? {
            firstName:
              typeof (o.referee as Record<string, unknown>).firstName === "string"
                ? ((o.referee as Record<string, unknown>).firstName as string)
                : "",
            lastName:
              typeof (o.referee as Record<string, unknown>).lastName === "string"
                ? ((o.referee as Record<string, unknown>).lastName as string)
                : "",
            email:
              typeof (o.referee as Record<string, unknown>).email === "string"
                ? ((o.referee as Record<string, unknown>).email as string)
                : "",
          }
        : null,
  };
}

function normalize(
  payload: unknown,
  fallbackPage: number,
  fallbackLimit: number
): AmbassadorReferralsResponse {
  const o =
    payload && typeof payload === "object" ? (payload as Record<string, unknown>) : null;

  const source =
    o &&
    "data" in o &&
    o.data &&
    typeof o.data === "object" &&
    !Array.isArray(o.data)
      ? (o.data as Record<string, unknown>)
      : o;

  const itemsRaw =
    source && Array.isArray(source.items)
      ? source.items
      : Array.isArray(payload)
        ? payload
        : [];

  const items = itemsRaw.map(normalizeItem).filter(Boolean) as AmbassadorReferralItem[];

  const paginationObj =
    source &&
    source.pagination &&
    typeof source.pagination === "object" &&
    !Array.isArray(source.pagination)
      ? (source.pagination as Record<string, unknown>)
      : source;

  const page =
    typeof paginationObj?.page === "number"
      ? paginationObj.page
      : Number(paginationObj?.page ?? fallbackPage) || fallbackPage;
  const limit =
    typeof paginationObj?.limit === "number"
      ? paginationObj.limit
      : Number(paginationObj?.limit ?? fallbackLimit) || fallbackLimit;
  const total =
    typeof paginationObj?.total === "number"
      ? paginationObj.total
      : Number(paginationObj?.total ?? items.length) || items.length;
  const totalPages =
    typeof paginationObj?.totalPages === "number"
      ? paginationObj.totalPages
      : Math.max(1, Math.ceil(total / Math.max(1, limit)));

  return {
    items,
    pagination: { page, limit, total, totalPages },
  };
}

export function useAmbassadorReferrals(page: number, limit: number) {
  const query = useQueryWithRefresh<AmbassadorReferralsResponse>({
    queryKey: ["ambassador", "me", "referrals", page, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get<unknown>(AMBASSADOR_REFERRALS_PATH, {
        params: { page, limit },
      });
      return normalize(data, page, limit);
    },
    tokenType: "user",
    staleTime: 60_000,
    retry: false,
  });

  return {
    referrals: query.data?.items ?? [],
    pagination:
      query.data?.pagination ?? ({
        page,
        limit,
        total: 0,
        totalPages: 1,
      } satisfies AmbassadorReferralsResponse["pagination"]),
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}
