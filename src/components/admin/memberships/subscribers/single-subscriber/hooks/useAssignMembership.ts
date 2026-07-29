import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useAssignMembership = () => {
    const queryClient = useQueryClient();
    const { userId } = useParams();

    const { mutateAsync: assignMembership, isPending: isAssigning } = useMutation({
        mutationFn: (tierId: string) =>
            axiosInstance.post(`/admin/memberships/users/${userId}/assign`, { tierId }),
        onSuccess: () => {
            toast.success("تم تعيين خطة العضوية بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["admin", "membership", "subscribers", userId],
            });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء تعيين الخطة");
        },
    });

    return { assignMembership, isAssigning };
};
