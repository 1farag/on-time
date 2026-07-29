import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAcceptRequest = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: acceptRequestMutation,
    isPending: acceptRequestLoading,
    error,
  } = useMutation({
    mutationFn: (id: string) =>
      axiosInstance.patch(`/admin/loyalty/redemptions/${id}/approve`),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم قبول الطلب بنجاح!");
      queryClient.invalidateQueries({
        queryKey: ["admin", "loyalty", "redemptions"],
      });
    },
  });

  return {
    acceptRequestMutation,
    acceptRequestLoading,
    errors: error,
  };
};

export const useRejectRequest = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: rejectRequestMutation,
    isPending: rejectRequestLoading,
    error,
  } = useMutation({
    mutationFn: (id: string) =>
      axiosInstance.patch(`/admin/loyalty/redemptions/${id}/reject`),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم رفض الطلب بنجاح!");
      queryClient.invalidateQueries({
        queryKey: ["admin", "loyalty", "redemptions"],
      });
    },
  });

  return {
    rejectRequestMutation,
    rejectRequestLoading,
    errors: error,
  };
};
