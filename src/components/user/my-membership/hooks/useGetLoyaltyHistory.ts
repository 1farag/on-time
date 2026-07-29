import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface LoyaltyHistoryParams {
    page?: number;
    limit?: number;
    /** When false, the query does not run (e.g. placeholder data in UI). */
    enabled?: boolean;
}

export interface LoyaltyHistoryItem {
    _id: string;
    userId: string;
    points: number;
    type: "earned" | "redeemed" | "expired" | string;
    source: string;
    description: string;
    referenceId?: string;
    createdAt: string;
}

export interface LoyaltyHistoryResponse {
    statusCode: number;
    success: boolean;
    data: {
        history: LoyaltyHistoryItem[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
}

export const useGetLoyaltyHistory = (params?: LoyaltyHistoryParams) => {
    return useQuery({
        queryKey: ["loyalty", "history", params?.page, params?.limit],
        queryFn: async () => {
            const response = await axiosInstance.get<LoyaltyHistoryResponse>("/loyalty/history", {
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                },
            });
            return response.data;
        },
        enabled: params?.enabled !== false,
    });
};
