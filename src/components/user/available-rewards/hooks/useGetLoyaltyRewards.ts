import axiosInstance from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface LoyaltyReward {
  id: string; // or _id
  _id?: string;
  name: string;
  type: string;
  valueType: string;
  pointsRequired: number;
  value: number;
  minOrderValue: number;
  description: string;
  isActive: boolean;
  validityDays: number;
}

export const useGetLoyaltyRewards = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["loyalty", "rewards"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/loyalty/rewards`);
      return response.data?.data?.rewards as LoyaltyReward[];
    },
  });

  return { data, isLoading, error };
};

export const useGetLoyaltyRewardById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["loyalty", "rewards", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await axiosInstance.get(`/loyalty/rewards/${id}`);
      return response.data?.data?.reward as LoyaltyReward;
    },
    enabled: !!id,
  });

  return { data, isLoading, error };
};

export const useRedeemLoyaltyReward = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: { rewardId: string; orderAmount: number }) => {
      const response = await axiosInstance.post(`/loyalty/rewards/redeem`, data);
      return response.data?.data;
    },
    onSuccess: () => {
      // Invalidate queries that might need to be refreshed
      queryClient.invalidateQueries({ queryKey: ["loyalty"] });
      // Invalidate general user queries here if needed
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء استبدال المكافأة"
      );
    },
  });

  return { redeemRewardMutation: mutateAsync, isPending };
};
