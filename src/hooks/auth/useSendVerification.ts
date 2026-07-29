import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export const useSendVerification = () => {
    return useMutation({
        mutationFn: (type: "email" | "mobile") =>
            axiosInstance.post("/auth/send-verification", { type }),
        onSuccess: (response) => {
            toast.success(response?.data?.message || "تم إرسال رابط التأكيد بنجاح");
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "حدث خطأ أثناء إرسال رابط التأكيد"
            );
        },
    });
};
