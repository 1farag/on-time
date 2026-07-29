import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface UseGetFailedCheckoutsParams {
    search?: string;
    page?: number;
    limit?: number;
}

export const useGetFailedCheckouts = (params?: UseGetFailedCheckoutsParams) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["admin", "failed-checkouts", params],
        queryFn: async () => {
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
                ? `/admin/failed-checkouts?${queryString}`
                : `/admin/failed-checkouts`;

            const response = await axiosInstance.get(url);
            return response.data.data;
        },
    });

    return { data, isLoading, error };
};
