//

import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useUpdateOrderStatus = (params: {
  search: string;
  page: number;
  limit: number;
}) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateOrderStatusMutation,
    isPending: updateOrderStatusLoading,
    error,
    data,
  } = useMutation({
    mutationFn: ({ id, values }: { id: string; values: { status: string } }) =>
      axiosInstance.patch(`/orders/${id}/status`, values),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "orders", params],
      });
      toast.success("تم تحديث حالة الطلب بنجاح");

      return data.data;
    },
  });

  return {
    updateOrderStatusMutation,
    updateOrderStatusLoading,
    errors: error,
    data,
  };
};
