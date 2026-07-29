"use client";

import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export type RedeemPointsToWalletPayload = {
  points: number;
};

const REDEEM_TO_WALLET_PATH = "/privileges/loyalty/redeem-to-wallet";

export function useRedeemPointsToWallet() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: RedeemPointsToWalletPayload) => {
      const { data } = await axiosInstance.post<unknown>(
        REDEEM_TO_WALLET_PATH,
        payload,
        {
          headers: {
            "Idempotency-Key": "unique-request-key",
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ambassador", "me", "stats"],
      });
      queryClient.invalidateQueries({ queryKey: ["privileges", "loyalty"] });
      queryClient.invalidateQueries({
        queryKey: ["privileges", "seat-credits"],
      });
      toast.success("Points redeemed to your wallet successfully.");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while redeeming points. Please try again."
      );
    },
  });

  return { redeemPointsMutation: mutateAsync, isPending };
}
