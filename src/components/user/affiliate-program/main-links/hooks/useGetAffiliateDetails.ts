import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAffiliateDetails = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["affiliate", "details"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/affiliates/me`)
        .then((response) => response.data);

      return response.data;
    },
  });
  return { data, isLoading, error };
};
