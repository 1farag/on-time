import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface UseGetAdminPointsHistoryParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const useGetAdminLoyaltyPointsHistory = (
  params?: UseGetAdminPointsHistoryParams
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "loyalty", "points", "history", params],
    queryFn: async () => {
      // Build query string
      const queryParams = new URLSearchParams();

      if (params?.search) {
        queryParams.append("search", params.search);
      }
      if (params?.page) {
        queryParams.append("page", params.page.toString());
      }
      if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
      }

      const queryString = queryParams.toString();
      const url = queryString
        ? `/admin/loyalty/transactions?${queryString}`
        : `/admin/loyalty/transactions`;

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};
