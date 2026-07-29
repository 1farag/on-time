import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddEditLoyaltyReward = (id: string) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: addEditLoyaltyRewardMutation,
    isPending: addEditLoyaltyRewardLoading,
    error,
  } = useMutation({
    mutationFn: (values) =>
      id
        ? axiosInstance.patch(`/admin/loyalty/rewards/${id}`, values)
        : axiosInstance.post(`/admin/loyalty/rewards`, values),

    onSuccess: ({ data }) => {
      toast.success(
        data?.message || `تم ${id ? "تعديل" : "إضافة"} المكافأه بنجاح!`
      );
      queryClient.invalidateQueries({
        queryKey: ["admin", "loyalty", "rewards"],
      });
    },
  });

  return {
    addEditLoyaltyRewardMutation,
    addEditLoyaltyRewardLoading,
    errors: error,
  };
};
