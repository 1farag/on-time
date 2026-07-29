import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useAddEditMembershipPlan = () => {
  const queryClient = useQueryClient();
  const { planId } = useParams();

  const {
    mutateAsync: addEditMembershipPlanMutation,
    isPending: addEditMembershipPlanLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (values: { action: string; reason: string }) =>
      planId
        ? axiosInstance.put(`/admin/memberships/tiers/${planId}`, values)
        : axiosInstance.post(`/admin/memberships/tiers`, values),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "membership", "plans"],
      });
      toast.success("تم تحديث خطة العضوية بنجاح");

      return data.data;
    },
  });

  return {
    addEditMembershipPlanMutation,
    addEditMembershipPlanLoading,
    errors: error,
    data,
  };
};

export const useDeleteMembershipPlan = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteMembershipPlanPlanMutation,
    isPending: deleteMembershipPlanPlanLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (planId: string) =>
      axiosInstance.delete(`/admin/memberships/tiers/${planId}`),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "membership", "plans"],
      });
      toast.success("تم حذف خطة العضوية بنجاح");

      return data.data;
    },
  });

  return {
    deleteMembershipPlanPlanMutation,
    deleteMembershipPlanPlanLoading,
    errors: error,
    data,
  };
};
