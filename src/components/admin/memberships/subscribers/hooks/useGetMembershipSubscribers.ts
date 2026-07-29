import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface UseGetAdminMembershipSubscribers {
  search?: string;
  page?: number;
  limit?: number;
}

export const useGetMembershipSubscribers = (
  params?: UseGetAdminMembershipSubscribers
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "membership", "subscribers", params],
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
        ? `/admin/memberships/subscribers?${queryString}`
        : `/admin/memberships/subscribers`;

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetMembershipSubscriber = () => {
  const { userId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "membership", "subscribers", userId],
    queryFn: async () => {
      // Build query string

      const response = await axiosInstance.get(
        `/admin/memberships/subscribers/${userId}`
      );
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};
