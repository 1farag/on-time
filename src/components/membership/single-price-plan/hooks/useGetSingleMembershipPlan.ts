import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { MembershipPlan } from "@/types/types";

export const useGetSingleMembershipPlan = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["membershipPlan", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/memberships/${id}`);
      return response.data?.data as { tier: MembershipPlan };
    },
    enabled: !!id,
  });

  return { data, isLoading, error };
};
