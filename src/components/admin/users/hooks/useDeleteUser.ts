import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteUserMutation,
    isPending: deleteUserLoading,
    error,
  } = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/admin/users/${id}`),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم حذف المستخدم بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "حدث خطأ أثناء حذف المستخدم.";
      toast.error(message);
    },
  });

  return {
    deleteUserMutation,
    deleteUserLoading,
    errors: error,
  };
};

export const useBlockOrUnBlockUser = () => {
  const queryClient = useQueryClient();
  const { userId } = useParams();

  const {
    mutateAsync: blockOrUnBlockUserMutation,
    isPending: blockOrUnBlockUserLoading,
    error,
  } = useMutation({
    mutationFn: (data: { block: boolean }) =>
      axiosInstance.patch(`/admin/users/${userId}/block`, data),

    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم تحديث حالة المستخدم بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "users", userId] });
    },
  });

  return {
    blockOrUnBlockUserMutation,
    blockOrUnBlockUserLoading,
    errors: error,
  };
};
