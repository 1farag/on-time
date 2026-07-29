import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useApplyCoupon = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: applyCouponMutation,
        isPending: applyCouponLoading,
        error,
        data,
    } = useMutation({
        mutationFn: (values: { code: string }) =>
            axiosInstance.post(`/coupons/apply`, values),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["checkoutDetails"],
            });
            toast.success("تم تطبيق الكوبون بنجاح");
        },
        onError: (err: any) => {
            toast.error(
                err.response?.data?.message || "الكوبون غير صالح أو منتهي الصلاحية"
            );
        },
    });

    return {
        applyCouponMutation,
        applyCouponLoading,
        errors: error,
        data,
    };
};

export const useRemoveCoupon = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: removeCouponMutation,
        isPending: removeCouponLoading,
    } = useMutation({
        mutationFn: () => axiosInstance.delete(`/coupons/applied`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["checkoutDetails"],
            });
            toast.success("تم إزالة الكوبون بنجاح");
        },
        onError: (err: any) => {
            toast.error(
                err.response?.data?.message || "حدث خطأ أثناء إزالة الكوبون"
            );
        },
    });

    return {
        removeCouponMutation,
        removeCouponLoading,
    };
};
