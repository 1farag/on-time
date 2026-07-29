"use client";

import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";
import type { MyBookingsResponse } from "@/types/myBookings";

/** GET /bookings?page=&limit= — client-side user bookings list */
const BOOKINGS_ME_PATH = "/bookings";

export const getMyBookingsAPI = async (
  page: number,
  limit: number,
): Promise<MyBookingsResponse> => {
  const fallback: MyBookingsResponse = {
    items: [],
    pagination: { page, limit, total: 0, totalPages: 0 },
  };

  try {
    const { data } = await axiosInstance.get<MyBookingsResponse>(
      BOOKINGS_ME_PATH,
      { params: { page, limit } },
    );
    return {
      items: data.items ?? [],
      pagination: {
        page: data.pagination?.page ?? page,
        limit: data.pagination?.limit ?? limit,
        total: data.pagination?.total ?? 0,
        totalPages: data.pagination?.totalPages ?? 0,
      },
    };
  } catch {
    return fallback;
  }
};

type UseMyBookingsOptions = {
  enabled?: boolean;
};

export const useMyBookings = (
  page: number,
  limit: number,
  options?: UseMyBookingsOptions,
) => {
  const enabled = options?.enabled !== false;

  const query = useQueryWithRefresh<MyBookingsResponse>({
    queryKey: ["bookings", "my", page, limit],
    queryFn: () => getMyBookingsAPI(page, limit),
    tokenType: "user",
    staleTime: 60_000,
    enabled,
    retry: false,
  });

  return {
    items: query.data?.items ?? [],
    pagination:
      query.data?.pagination ?? ({
        page,
        limit,
        total: 0,
        totalPages: 0,
      } satisfies MyBookingsResponse["pagination"]),
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
};
