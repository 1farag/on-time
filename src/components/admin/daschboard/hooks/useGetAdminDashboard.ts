import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/admin/dashboard/summary`)
        .then((response) => response.data);

      return response;
    },
  });
  return { data, isLoading, error };
};

export const useGetTopProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", "top-products"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/admin/dashboard/top-products`)
        .then((response) => response.data);

      return response;
    },
  });
  return { data, isLoading, error };
};

export const useGetDashboardSalesAnalytics = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", "sales-analytics"],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/admin/dashboard/sales-analytics`)
        .then((response) => response.data);

      return response;
    },
  });
  return { data, isLoading, error };
};
