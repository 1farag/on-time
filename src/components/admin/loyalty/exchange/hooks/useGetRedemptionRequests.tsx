import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface useGetRedemptionRequestsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const useGetRedemptionRequests = (
  params?: useGetRedemptionRequestsParams
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "loyalty", "redemptions"],
    queryFn: async () => {
      // Build query string

      const url = "/admin/loyalty/redemptions";

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};
