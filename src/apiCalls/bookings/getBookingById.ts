import axiosInstance from "@/lib/axios";
import type { SeatSharingBookingDetail } from "@/types/bookingDetail";

/** GET /bookings/:bookingId — booking detail after payment redirect */
export async function getBookingByIdAPI(
  bookingId: string,
): Promise<SeatSharingBookingDetail> {
  if (!bookingId?.trim()) {
    throw new Error("Missing booking id");
  }

  const { data } = await axiosInstance.get<SeatSharingBookingDetail>(
    `/bookings/${bookingId.trim()}`,
  );

  if (!data?.id) {
    throw new Error("Invalid booking response");
  }

  return data;
}
