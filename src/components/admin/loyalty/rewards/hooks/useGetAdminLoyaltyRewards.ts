import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface UseGetAdminProductsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const useGetAdminLoyaltyRewards = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "loyalty", "rewards"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/admin/loyalty/rewards`);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetAdminLoyaltyReward = (rewardId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "loyalty", "rewards", rewardId],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/admin/loyalty/rewards/${rewardId}`)
        .then((response) => response.data);

      return response.data;
    },
    enabled: !!rewardId,
  });
  return { productData: data, isLoading, error };
};
