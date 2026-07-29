import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAffiliateDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["affiliate", "dashboard"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/affiliates/me/dashboard`)
        .then((response) => response.data);

      return response.data;
    },
  });
  return { data, isLoading, error };
};

export const useGetAffiliateLatestCommissions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["affiliate", "dashboard", "commissions"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/affiliates/me/commissions`)
        .then((response) => response.data);

      return response.data;
    },
  });
  return { data, isLoading, error };
};
