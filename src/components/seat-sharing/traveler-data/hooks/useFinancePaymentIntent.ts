"use client";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import type {
  FinancePaymentIntentPayload,
  FinancePaymentIntentResponse,
} from "@/types/financePaymentIntent";

function redirectUrlFromObject(o: Record<string, unknown>): string {
  const fromUrl =
    typeof o.paymentUrl === "string" ? o.paymentUrl.trim() : "";
  if (fromUrl) return fromUrl;
  const legacy =
    typeof o.paymentLink === "string" ? o.paymentLink.trim() : "";
  return legacy;
}

function normalizePaymentIntentResponse(
  body: unknown,
): FinancePaymentIntentResponse {
  const o = body as Record<string, unknown> | null;
  const redirect = o ? redirectUrlFromObject(o) : "";

  const inner =
    o?.data && typeof o.data === "object"
      ? (o.data as Record<string, unknown>)
      : null;
  const nestedRedirect =
    inner && !redirect ? redirectUrlFromObject(inner) : redirect;

  if (!nestedRedirect) {
    throw new Error(
      "Missing paymentUrl (or paymentLink) in payment-intents response",
    );
  }

  const source = inner ?? o ?? {};
  const paymentId =
    typeof source.paymentId === "string" ? source.paymentId : "";
  const externalPaymentId =
    typeof source.externalPaymentId === "string"
      ? source.externalPaymentId
      : "";

  return {
    paymentId,
    paymentUrl: nestedRedirect,
    externalPaymentId,
  };
}

export function useFinancePaymentIntent() {
  const mutation = useMutation({
    mutationFn: async (
      payload: FinancePaymentIntentPayload,
    ): Promise<FinancePaymentIntentResponse> => {
      const { data } = await axiosInstance.post<unknown>(
        `/finance/payment-intents`,
        payload,
      );
      return normalizePaymentIntentResponse(data);
    },
  });

  return {
    createPaymentIntent: mutation.mutateAsync,
    isCreatingPaymentIntent: mutation.isPending,
  };
}
