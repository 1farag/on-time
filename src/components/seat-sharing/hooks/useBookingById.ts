"use client";

import { getBookingByIdAPI } from "@/apiCalls/bookings/getBookingById";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";

export function useBookingById(bookingId: string | null) {
  const id = bookingId?.trim() ?? "";

  const query = useQueryWithRefresh({
    queryKey: ["bookings", "detail", id],
    queryFn: () => getBookingByIdAPI(id),
    enabled: !!id,
    staleTime: 60_000,
    retry: 1,
    tokenType: "user",
  });

  return {
    booking: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
