import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface useGetAdminLoyaltyOverviewParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const useGetAdminLoyaltyOverview = (
  params?: useGetAdminLoyaltyOverviewParams
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "loyalty", "overview"],
    queryFn: async () => {
      // Build query string

      const url = "/admin/loyalty/dashboard";

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetAdminLoyaltyOverviewActiveRules = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "loyalty", "overview", "activeRules"],
    queryFn: async () => {
      // Build query string

      const url = "/admin/loyalty/rules?isActive=true&page=1 ";

      const response = await axiosInstance.get(url);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};
