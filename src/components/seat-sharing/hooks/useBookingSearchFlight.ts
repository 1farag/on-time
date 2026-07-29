"use client";

import { getBookingSearchFlightAPI } from "@/apiCalls/bookings/getBookingSearchFlight";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";
import type { SeatSharingFlightDetail } from "@/types/seatSharingFlight";

type UseBookingSearchFlightOptions = {
  enabled?: boolean;
};

/** GET /bookings/search/:id — aligned with hooks like useMyBookings. */
export function useBookingSearchFlight(
  flightId: string,
  options?: UseBookingSearchFlightOptions,
) {
  const enabled =
    !!flightId && (options?.enabled === undefined ? true : options.enabled);

  const query = useQueryWithRefresh<SeatSharingFlightDetail | null>({
    queryKey: ["bookings", "search", flightId],
    queryFn: () => getBookingSearchFlightAPI(flightId),
    tokenType: "user",
    enabled,
    staleTime: 60_000,
    retry: false,
  });

  return {
    flight: query.data ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
