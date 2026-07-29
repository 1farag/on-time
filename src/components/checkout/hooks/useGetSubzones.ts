import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Zone } from "./useGetZones";

export const useGetSubzones = (parentId?: number | null) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["shippingSubzones", parentId],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `/shipping/subzones?parentId=${parentId}`
            );
            return response.data;
        },
        enabled: !!parentId,
    });

    return {
        subzones: data?.data as Zone[] | undefined,
        isLoadingSubzones: isLoading,
        error,
    };
};
