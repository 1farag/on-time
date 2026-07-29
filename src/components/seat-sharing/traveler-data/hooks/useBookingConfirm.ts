"use client";

import { useMutation } from "@tanstack/react-query";
import { postBookingHoldAuto } from "@/apiCalls/bookings/postBookingHoldAuto";
import type { BookingConfirmPayload } from "@/types/bookingConfirm";
import toast from "react-hot-toast";

function formatMessage(message: unknown): string | undefined {
  if (typeof message === "string" && message.trim()) return message.trim();
  if (Array.isArray(message)) {
    const texts = message.filter((m): m is string => typeof m === "string");
    return texts.length ? texts.join(" ") : undefined;
  }
  return undefined;
}

type UseBookingConfirmOptions = {
  /** Default true. Set false when chaining (e.g. redirect to payment). */
  showSuccessToast?: boolean;
};

export function useBookingConfirm(
  options: UseBookingConfirmOptions = {},
) {
  const { showSuccessToast = true } = options;

  const mutation = useMutation({
    mutationFn: (payload: BookingConfirmPayload) =>
      postBookingHoldAuto(payload),
    onSuccess: (body) => {
      if (!showSuccessToast) return;
      const msg =
        body != null && typeof body === "object"
          ? formatMessage((body as Record<string, unknown>).message)
          : undefined;
      toast.success(msg ?? "Booking confirmed successfully.");
    },
    onError: (error: unknown) => {
      const data = (error as { response?: { data?: unknown } }).response
        ?.data;
      const errBody =
        data && typeof data === "object"
          ? (data as { message?: unknown; error?: unknown })
          : undefined;
      const msg =
        formatMessage(errBody?.message) ??
        (typeof errBody?.error === "string" && errBody.error.trim()
          ? errBody.error.trim()
          : undefined);
      toast.error(msg ?? "Something went wrong. Please try again.");
    },
  });

  return {
    confirmBooking: mutation.mutateAsync,
    isConfirming: mutation.isPending,
  };
}
