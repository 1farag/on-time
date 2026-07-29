"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export type WalletTopUpPayload = {
  amount: number;
  currency: string;
};

/** POST /wallet/topup */
export function useWalletTopUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: WalletTopUpPayload) => {
      const { data } = await axiosInstance.post<unknown>(
        "/wallet/topup",
        payload
      );
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["wallet"] });
      void queryClient.invalidateQueries({ queryKey: ["wallet", "transactions"] });
    },
  });
}
