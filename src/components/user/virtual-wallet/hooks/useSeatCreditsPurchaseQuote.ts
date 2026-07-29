import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

const SEAT_CREDITS_PURCHASE_QUOTE_PATH = "/privileges/seat-credits/purchase-quote";

export type SeatCreditsPurchaseQuote = {
  seatCount: number;
  unitPrice: number;
  total: number;
  currency: string;
};

function normalizePurchaseQuote(payload: unknown): SeatCreditsPurchaseQuote {
  const payloadObj =
    payload && typeof payload === "object" ? (payload as Record<string, unknown>) : null;

  const inner =
    payloadObj &&
    "data" in payloadObj &&
    payloadObj.data !== null &&
    typeof payloadObj.data === "object"
      ? (payloadObj.data as Record<string, unknown>)
      : payloadObj;

  if (!inner || typeof inner !== "object") {
    throw new Error("Unexpected /privileges/seat-credits/purchase-quote response shape");
  }

  return {
    seatCount: Math.max(1, Number(inner.seatCount ?? 1) || 1),
    unitPrice: Number(inner.unitPrice ?? 0) || 0,
    total: Number(inner.total ?? 0) || 0,
    currency: typeof inner.currency === "string" ? inner.currency : "USD",
  };
}

export const useSeatCreditsPurchaseQuote = (seatCount: number, enabled = true) =>
  useQuery({
    queryKey: ["privileges", "seat-credits", "purchase-quote", seatCount],
    queryFn: async () => {
      const response = await axiosInstance.get<unknown>(SEAT_CREDITS_PURCHASE_QUOTE_PATH, {
        params: { seatCount },
      });
      return normalizePurchaseQuote(response.data);
    },
    enabled: enabled && seatCount > 0,
  });
