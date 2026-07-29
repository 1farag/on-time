import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface LoyaltyStats {
    currentBalance: number;
    totalEarned: number;
    totalRedeemed: number;
    multiplier: number;
    membershipName: string;
}

export const useGetLoyaltyStats = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["loyalty", "stats"],
        queryFn: async () => {
            const response = await axiosInstance.get(`/loyalty/stats`);
            return response.data?.data as LoyaltyStats;
        },
    });

    return { data, isLoading, error };
};
