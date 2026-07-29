import axiosInstance from "@/lib/axios";
import type { SeatSharingFlightDetail } from "@/types/seatSharingFlight";

/** GET /bookings/search/:flightId — client-side (TanStack Query) */
export async function getBookingSearchFlightAPI(
  flightId: string,
): Promise<SeatSharingFlightDetail | null> {
  if (!flightId) return null;
  try {
    const { data } = await axiosInstance.get<SeatSharingFlightDetail>(
      `/bookings/search/${flightId}`,
    );
    return data ?? null;
  } catch {
    return null;
  }
}
