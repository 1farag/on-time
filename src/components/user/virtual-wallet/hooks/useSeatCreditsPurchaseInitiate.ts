import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export type SeatCreditsPurchaseInitiatePayload = {
  seatCount: number;
};

/** POST /privileges/seat-credits/purchase/initiate */
export function useSeatCreditsPurchaseInitiate() {
  return useMutation({
    mutationFn: async (payload: SeatCreditsPurchaseInitiatePayload) => {
      const { data } = await axiosInstance.post<unknown>(
        "/privileges/seat-credits/purchase/initiate",
        payload
      );
      return data;
    },
  });
}
