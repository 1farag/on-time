import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// Define the type for UseGetAdminUsersParams
interface UseGetOrdersParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const useGetAllOrders = (params?: UseGetOrdersParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "orders", params],
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
        ? `/admin/orders?${queryString}`
        : `/admin/orders`;

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};
