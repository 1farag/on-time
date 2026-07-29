import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAffiliateWithdrawals = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["affiliate", "withdrawals"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/affiliates/me/withdrawals`)
        .then((response) => response.data);

      return response.data;
    },
  });
  return { data, isLoading, error };
};

export const useGetAffiliateWithdrawalsDetails = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["affiliate", "withdrawals", "details"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/affiliates/me`)
        .then((response) => response.data);

      return response.data;
    },
  });
  return { data, isLoading, error };
};
