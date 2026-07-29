import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const useGetRedemptions = (
  page: number = 1,
  limit: number = 10,
  status: string | null = null
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["loyalty", "redemptions", page, limit, status],
    queryFn: async () => {
      const params: any = { page, limit };
      if (status && status !== "all") {
        params.status = status;
      }

      const response = await axiosInstance.get(`/loyalty/redemptions`, {
        params,
      });
      return {
        redemptions: response.data?.data?.redemptions || [],
        pagination: response.data?.data?.pagination as Pagination,
      };
    },
  });

  return { data, isLoading, error };
};
