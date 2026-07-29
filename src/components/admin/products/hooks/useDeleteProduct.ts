import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteProductMutation,
    isPending: deleteProductLoading,
    error,
  } = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/products/${id}`),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم حذف المنتج بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });

  return {
    deleteProductMutation,
    deleteProductLoading,
    errors: error,
  };
};
