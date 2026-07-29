import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetPartnerPopupContent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pages", "partner-with-us"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/pages/partner-with-us`)
        .then((response) => response.data);

      return response;
    },
  });
  return { data, isLoading, error };
};
