import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

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
      const url = queryString
        ? `/admin/affiliates?${queryString}`
        : `/admin/affiliates`;

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetAdminAffiliatePartner = () => {
  const { partnerId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["partners",  partnerId],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/admin/affiliates/${partnerId}`,  )
        .then((response) => response.data);

      return response;
    },
  });
  return { data, isLoading, error };
};
