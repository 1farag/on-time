import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface UseGetAdminAffiliateRulesParams {
    search?: string;
    page?: number;
    limit?: number;
}

export const useGetAdminAffiliateRules = (
    params?: UseGetAdminAffiliateRulesParams
) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["admin", "affiliate", "commission-rules", params],
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
                ? `/admin/affiliate-rules?${queryString}`
                : `/admin/affiliate-rules`;

            const response = await axiosInstance.get(url);
            return response.data; // adjust based on actual API response structure
        },
    });

    return { data: data?.data || [], pagination: data?.pagination || {}, isLoading, error };
};
