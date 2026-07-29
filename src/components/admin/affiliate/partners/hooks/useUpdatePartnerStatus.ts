import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useUpdatePartnerStatus = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updatePartnerStatusMutation,
    isPending: updatePartnerStatusLoading,
    error,
    data,
  } = useMutation({
    mutationFn: ({ id, values }: { id: string; values: { status: string } }) =>
      axiosInstance.patch(`/admin/affiliates/${id}/status`, values),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "affiliate", "partners"],
      });
      toast.success("تم تحديث حالة الشريك بنجاح");

      return data.data;
    },
  });

  return {
    updatePartnerStatusMutation,
    updatePartnerStatusLoading,
    errors: error,
    data,
  };
};
