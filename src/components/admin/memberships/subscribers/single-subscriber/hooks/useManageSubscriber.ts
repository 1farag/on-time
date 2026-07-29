import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useManageSubscriber = () => {
  const queryClient = useQueryClient();
  const { userId } = useParams();

  const {
    mutateAsync: manageSubscriberMutation,
    isPending: manageSubscriberLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (values: { action: string; reason: string }) =>
      axiosInstance.patch(`/admin/memberships/subscribers/${userId}`, values),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "membership", "subscribers", userId],
      });
      toast.success("تم تحديث بيانات المشترك بنجاح");

      return data.data;
    },
  });

  return {
    manageSubscriberMutation,
    manageSubscriberLoading,
    errors: error,
    data,
  };
};
