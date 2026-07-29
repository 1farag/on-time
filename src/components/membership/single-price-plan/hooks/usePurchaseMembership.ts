import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface PurchaseMembershipPayload {
  tierId: string;
}

export const usePurchaseMembership = () => {
  return useMutation({
    mutationFn: async (payload: PurchaseMembershipPayload) => {
      const response = await axiosInstance.post(
        "/memberships/purchase",
        payload
      );
      return response.data;
    },
  });
};
