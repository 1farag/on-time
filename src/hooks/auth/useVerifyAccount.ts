import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface VerifyPayload {
    type: string;
    token: string;
}

export const useVerifyAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: VerifyPayload) =>
            axiosInstance.post("/auth/verify", payload),
        onSuccess: (response) => {
            toast.success(response?.data?.message || "تم تأكيد الحساب بنجاح");
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "حدث خطأ أثناء تأكيد الحساب"
            );
        },
    });
};
