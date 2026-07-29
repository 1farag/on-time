import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useAddEditProduct = () => {
  const queryClient = useQueryClient();
  const { productId } = useParams();

  const {
    mutateAsync: addEditPostMutation,
    isPending: addEditPostLoading,
    error,
    data,
  } = useMutation({
    mutationFn: (values: FormData) =>
      productId
        ? axiosInstance.patch(`/products/${productId}`, values)
        : axiosInstance.post(`/products`, values),
    onSuccess: ({ data }) => {
      toast.success(
        productId ? "تم تحديث المنتج بنجاح!" : "تم إضافة المنتج بنجاح!"
      );
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });

      return data.data;
    },
  });

  return {
    addEditPostMutation,
    addEditPostLoading,
    errors: error,
    data,
  };
};
