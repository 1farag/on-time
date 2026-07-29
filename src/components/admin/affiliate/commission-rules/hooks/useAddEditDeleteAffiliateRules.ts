import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface RuleData {
  name: string;
  commissionPercentage: number;
  minOrderTotal: number;
  isActive: boolean;
}

export const useAddEditAffiliateRule = (id?: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RuleData) => {
      if (id) {
        // Assuming PATCH /admin/affiliate-rules/:id exists for edit
        const response = await axiosInstance.put(
          `/admin/affiliate-rules/${id}`,
          data
        );
        return response.data;
      }
      const response = await axiosInstance.post(`/admin/affiliate-rules`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success(
        id ? "تم تعديل القاعدة بنجاح!" : "تمت إضافة القاعدة بنجاح!"
      );
      queryClient.invalidateQueries({
        queryKey: ["admin", "affiliate", "commission-rules"],
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء حفظ القاعدة");
    },
  });

  return { addEditRuleMutation: mutate, isPending };
};

export const useDeleteAffiliateRule = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      // Assuming DELETE /admin/affiliate-rules/:id exists for delete
      const response = await axiosInstance.delete(
        `/admin/affiliate-rules/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("تم حذف القاعدة بنجاح!");
      queryClient.invalidateQueries({
        queryKey: ["admin", "affiliate", "commission-rules"],
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء حذف القاعدة");
    },
  });

  return { deleteRuleMutation: mutate, isPending };
};
