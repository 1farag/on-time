import axiosInstance from "@/lib/axios";
import { useQuery, useMutation } from "@tanstack/react-query";

interface UseGetAdminWithdrawalRequestsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const useGetAdminAffiliateWithdrawalRequests = (
  params?: UseGetAdminWithdrawalRequestsParams
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "affiliate", "withdrawal-requests", params],
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
        ? `/admin/withdrawals?${queryString}`
        : `/admin/withdrawals`;

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};

export const useApproveWithdrawalRequest = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/admin/withdrawals/${id}/approve`);
      return response.data;
    },
  });
};

export const useRejectWithdrawalRequest = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/admin/withdrawals/${id}/reject`);
      return response.data;
    },
  });
};

export const usePayWithdrawalRequest = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/admin/withdrawals/${id}/pay`);
      return response.data;
    },
  });
};
