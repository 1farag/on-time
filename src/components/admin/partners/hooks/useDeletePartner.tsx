import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeletePartner = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deletePartnerMutation,
    isPending: deletePartnerLoading,
    error,
  } = useMutation({
    mutationFn: (values: number[]) =>
      axiosInstance.delete(`/partners`, { data: { ids: values } }),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "Lead deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });

  return {
    deletePartnerMutation,
    deletePartnerLoading,
    errors: error,
  };
};
