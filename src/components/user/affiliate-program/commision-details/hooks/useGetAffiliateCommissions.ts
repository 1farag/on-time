import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAffiliateCommissions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["affiliate", "commissions"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/affiliates/me/commissions`)
        .then((response) => response.data);

      return response.data;
    },
  });
  return { data, isLoading, error };
};
