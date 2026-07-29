import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteCategoryMutation,
    isPending: deleteCategoryLoading,
    error,
  } = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/categories/${id}`),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم حذف التصنيف بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
    },
  });

  return {
    deleteCategoryMutation,
    deleteCategoryLoading,
    errors: error,
  };
};
