import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface EarnMethod {
  action: string;
  description: string;
  pointsPerAction: number;
  timesCompleted: number;
}

interface LoyaltyData {
  methods: EarnMethod[];
  membershipMultiplier: number;
  membershipName: string;
}

export const useGetEarnMethods = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["loyalty", "earn-methods"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/loyalty/earn-methods`);
      return response.data?.data as LoyaltyData;
    },
  });

  return { data, isLoading, error };
};
