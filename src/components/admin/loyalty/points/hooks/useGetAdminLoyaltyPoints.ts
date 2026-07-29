import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface UseGetAdminLoyaltyPointsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const useGetAdminLoyaltyPoints = (
  params?: UseGetAdminLoyaltyPointsParams
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "loyalty", "points", params],
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
        ? `/admin/loyalty/rules?${queryString}`
        : `/admin/loyalty/rules`;

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};
