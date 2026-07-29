import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateAdminPage = (id: string, slug: string) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: editPageMutation,
    isPending: editPageLoading,
    error,
  } = useMutation({
    mutationFn: (values: FormData) =>
      axiosInstance.post(`/pages/${id}`, values),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "Page Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "pages", slug] });
    },
  });

  return {
    editPageMutation,
    editPageLoading,
    errors: error,
  };
};
