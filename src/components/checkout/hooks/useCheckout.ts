import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: checkoutMutation,
    isPending: checkoutLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (values: { action: string; reason: string }) =>
      axiosInstance.post(`/orders`, values),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["checkoutDetails"],
      });
      toast.success("تم إنشاء الطلب بنجاح");

      return data.data;
    },
  });

  return {
    checkoutMutation,
    checkoutLoading,
    errors: error,
    data,
  };
};
