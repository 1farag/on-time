import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useAddEditCategory = () => {
  const queryClient = useQueryClient();
  const { categoryId } = useParams();

  const {
    mutateAsync: addEditCategoryMutation,
    isPending: addEditCategoryLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (values: FormData) =>
      categoryId
        ? axiosInstance.put(`/categories/${categoryId}`, values)
        : axiosInstance.post(`/categories`, values),
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });

      return data.data;
    },
  });

  return {
    addEditCategoryMutation,
    addEditCategoryLoading,
    errors: error,
    data,
  };
};
