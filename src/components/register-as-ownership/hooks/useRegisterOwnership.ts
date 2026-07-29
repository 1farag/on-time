"use client";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

/** Request body as defined by the API. */
export type RegisterOwnershipPayload = {
  phoneNumber: string;
  // referralCode: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  aircraftType: string;
  passengerCapacity: number;
  zipCode: string;
  email: string;
  language: string;
  currency: string;
  address: string;
};

const OWNERSHIP_REGISTER_PATH = "/b2b-leads/ownership";

function formatMessage(message: unknown): string | undefined {
  if (typeof message === "string" && message.trim()) return message.trim();
  if (Array.isArray(message)) {
    const texts = message.filter((m): m is string => typeof m === "string");
    return texts.length ? texts.join(" ") : undefined;
  }
  return undefined;
}

export function useRegisterOwnership() {
  const mutation = useMutation({
    mutationFn: (payload: RegisterOwnershipPayload) =>
      axiosInstance.post(OWNERSHIP_REGISTER_PATH, payload),
    onSuccess: ({ data: body }) => {
      const msg =
        body != null && typeof body === "object"
          ? formatMessage((body as Record<string, unknown>).message)
          : undefined;
      toast.success(
        msg ?? "Your registration has been submitted successfully."
      );
    },
    onError: (error: unknown) => {
      const data = (error as { response?: { data?: unknown } }).response?.data;
      const typed =
        data && typeof data === "object"
          ? (data as { message?: unknown; error?: unknown })
          : undefined;
      const msg =
        formatMessage(typed?.message) ??
        (typeof typed?.error === "string" && typed.error.trim()
          ? typed.error.trim()
          : undefined);
      toast.error(msg ?? "Something went wrong. Please try again.");
    },
  });

  return {
    registerOwnership: mutation.mutateAsync,
    isRegistering: mutation.isPending,
  };
}
