import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface Zone {
    id: number;
    name: string;
    nameAr: string;
}

export const useGetZones = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["shippingZones"],
        queryFn: async () => {
            const response = await axiosInstance.get(`/shipping/zones`);
            return response.data;
        },
    });

    return {
        zones: data?.data as Zone[] | undefined,
        isLoadingZones: isLoading,
        error,
    };
};
