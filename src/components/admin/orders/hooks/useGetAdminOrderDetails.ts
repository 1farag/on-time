import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminOrderDetails = (orderId: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["admin", "orders", orderId],
        queryFn: async () => {
            if (!orderId) return null;
            const response = await axiosInstance.get(`/admin/orders/${orderId}`);
            return response.data;
        },
        enabled: !!orderId,
    });

    return { data, isLoading, error };
};
