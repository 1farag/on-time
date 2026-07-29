import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface UseGetAdminProductsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const useGetAdminAffiliatePartners = (
  params?: UseGetAdminProductsParams
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "affiliate", "partners", params],
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
      const url = queryString ? `/products?${queryString}` : `/products`;

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};
