import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddEditLoyaltyPoint = (id?: string) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: addEditLoyaltyPointMutation,
    isPending: addEditLoyaltyPointLoading,
    error,
  } = useMutation({
    mutationFn: (values) =>
      id
        ? axiosInstance.patch(`/admin/loyalty/rules/${id}`, values)
        : axiosInstance.post(`/admin/loyalty/rules`, values),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم حذف نقاط الولاء بنجاح!");
      queryClient.invalidateQueries({
        queryKey: ["admin", "loyalty", "points"],
      });
    },
  });

  return {
    addEditLoyaltyPointMutation,
    addEditLoyaltyPointLoading,
    errors: error,
  };
};

export const useDeleteLoyaltyPoint = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteLoyaltyPointMutation,
    isPending: deleteLoyaltyPointLoading,
    error,
  } = useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete(`/admin/loyalty/rules/${id}`),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم الحذف بنجاح!");
      queryClient.invalidateQueries({
        queryKey: ["admin", "loyalty", "points"],
      });
    },
  });

  return {
    deleteLoyaltyPointMutation,
    deleteLoyaltyPointLoading,
    errors: error,
  };
};
