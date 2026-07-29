import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface UseGetAdminUsersParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const useGetAdminUsers = (params?: UseGetAdminUsersParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "users", params],
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
      const url = queryString ? `/admin/users?${queryString}` : `/admin/users`;

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetAdminUser = () => {
  const { userId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "users", userId],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/admin/users/${userId}`)
        .then((response) => response.data);

      return response.data;
    },
    enabled: !!userId,
  });
  return { userData: data, isLoading, error };
};
