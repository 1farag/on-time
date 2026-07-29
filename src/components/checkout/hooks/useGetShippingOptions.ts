import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface ShippingOption {
    type: "delivery" | "pickup";
    label: string;
}

export const useGetShippingOptions = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["shippingOptions"],
        queryFn: async () => {
            const response = await axiosInstance.get(`/shipping/options`);
            return response.data;
        },
    });

    return {
        shippingOptions: data?.data as ShippingOption[] | undefined,
        isLoadingShippingOptions: isLoading,
        error,
    };
};
