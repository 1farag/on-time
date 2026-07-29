"use client";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

/** Request body as defined by the API. */
export type RegisterAgentPayload = {
  companyOrAgentName: string;
  contactPersonName: string;
  website: string;
  position: string;
  country: string;
  city: string;
  phoneNumber: string;
  email: string;
  whatsappNumber: string;
};

const AGENT_REGISTER_PATH = "/b2b-leads/agent";

/** API `message`: string or string[] (e.g. validation messages). */
function formatMessage(message: unknown): string | undefined {
  if (typeof message === "string" && message.trim()) return message.trim();
  if (Array.isArray(message)) {
    const texts = message.filter((m): m is string => typeof m === "string");
    return texts.length ? texts.join(" ") : undefined;
  }
  return undefined;
}

export function useRegisterAgent() {
  const mutation = useMutation({
    mutationFn: (payload: RegisterAgentPayload) =>
      axiosInstance.post(AGENT_REGISTER_PATH, payload),
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
    registerAgent: mutation.mutateAsync,
    isRegistering: mutation.isPending,
  };
}
