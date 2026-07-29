import axiosInstance from "@/lib/axios";
import type { BookingConfirmPayload } from "@/types/bookingConfirm";

/** POST /bookings/hold-auto */
export async function postBookingHoldAuto(payload: BookingConfirmPayload) {
  const { data } = await axiosInstance.post<unknown>(
    "/bookings/hold-auto",
    payload,
  );
  return data;
}
