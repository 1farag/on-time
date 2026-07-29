import axiosInstance from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetWithdrawalLimit = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "affiliate-settings", "withdrawal-limit"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/admin/affiliate-settings/withdrawal-limit"
      );
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export const useSetWithdrawalLimit = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { amount: number }) => {
      const response = await axiosInstance.post(
        "/admin/affiliate-settings/withdrawal-limit",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("تم تعيين الحد الأدنى للسحب بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["admin", "affiliate-settings", "withdrawal-limit"],
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء تعيين الحد الأدنى"
      );
    },
  });

  return mutation;
};

export const useUpdateWithdrawalLimit = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { amount: number }) => {
      const response = await axiosInstance.patch(
        "/admin/affiliate-settings/withdrawal-limit",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("تم تحديث الحد الأدنى للسحب بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["admin", "affiliate-settings", "withdrawal-limit"],
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء تحديث الحد الأدنى"
      );
    },
  });

  return mutation;
};
