"use client";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

/** Request body as defined by the API. */
export type RegisterCompanyPayload = {
  organizationName: string;
  commercialRegister: string;
  sector: string;
  website: string;
  country: string;
  city: string;
  position: string;
  employeesNumber: number;
  annualTravelVolume: number;
  communicationsOfficerName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber: string;
};

const ORGANIZATION_REGISTER_PATH = "/b2b-leads/corporate";

/** API `message`: string or string[] (e.g. validation messages). */
function formatMessage(message: unknown): string | undefined {
  if (typeof message === "string" && message.trim()) return message.trim();
  if (Array.isArray(message)) {
    const texts = message.filter((m): m is string => typeof m === "string");
    return texts.length ? texts.join(" ") : undefined;
  }
  return undefined;
}

export function useRegisterCompany() {
  const mutation = useMutation({
    mutationFn: (payload: RegisterCompanyPayload) =>
      axiosInstance.post(ORGANIZATION_REGISTER_PATH, payload),
    onSuccess: ({ data: body }) => {
      const msg =
        body != null && typeof body === "object"
          ? formatMessage((body as Record<string, unknown>).message)
          : undefined;
      toast.success(
        msg ?? "Your registration has been submitted successfully.",
      );
    },
    onError: (error: unknown) => {
      const data = (error as { response?: { data?: unknown } }).response
        ?.data;
      const body =
        data && typeof data === "object"
          ? (data as { message?: unknown; error?: unknown })
          : undefined;
      const msg =
        formatMessage(body?.message) ??
        (typeof body?.error === "string" && body.error.trim()
          ? body.error.trim()
          : undefined);
      toast.error(msg ?? "Something went wrong. Please try again.");
    },
  });

  return {
    registerCompany: mutation.mutateAsync,
    isRegistering: mutation.isPending,
  };
}
