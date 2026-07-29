import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

const SEAT_CREDITS_ME_PATH = "/privileges/seat-credits/me";

export type SeatCreditsMeData = {
  walletId: string;
  availableSeats: number;
  usableEnabled: boolean;
};

function normalizeSeatCreditsMe(payload: unknown): SeatCreditsMeData {
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
    throw new Error("Unexpected /privileges/seat-credits/me response shape");
  }

  const walletId =
    typeof inner.walletId === "string" && inner.walletId.trim()
      ? inner.walletId
      : "unknown";

  const availableSeatsRaw = inner.availableSeats;
  const availableSeats =
    typeof availableSeatsRaw === "number"
      ? availableSeatsRaw
      : Number(availableSeatsRaw ?? 0) || 0;

  const usableEnabled = Boolean(inner.usableEnabled);

  return { walletId, availableSeats, usableEnabled };
}

export const useGetSeatCreditsMe = () =>
  useQuery({
    queryKey: ["privileges", "seat-credits", "me"],
    queryFn: async () => {
      const response = await axiosInstance.get<unknown>(SEAT_CREDITS_ME_PATH);
      return normalizeSeatCreditsMe(response.data);
    },
  });
