import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useGetAdminMembershipPlans = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "membership", "plans"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/admin/memberships/tiers`);
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};
export const useGetAdminMembershipPlan = () => {
  const { planId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "membership", "plans", planId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/memberships/tiers/${planId}`
      );
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};
