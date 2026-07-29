import axiosInstance from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CouponParams {
    page?: number;
    limit?: number;
    search?: string;
}

export const useGetAllCoupons = (params?: CouponParams) => {
    return useQuery({
        queryKey: ["admin", "coupons", params],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append("page", params.page.toString());
            if (params?.limit) queryParams.append("limit", params.limit.toString());
            if (params?.search) queryParams.append("search", params.search);

            const response = await axiosInstance.get(`/admin/coupons?${queryParams.toString()}`);
            return response.data.data;
        },
    });
};

export const useGetCouponById = (id: string) => {
    return useQuery({
        queryKey: ["admin", "coupons", id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/admin/coupons/${id}`);
            return response.data.data;
        },
        enabled: !!id,
    });
};

export const useCreateCoupon = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await axiosInstance.post("/admin/coupons", data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("تم إنشاء الكوبون بنجاح");
            queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء إنشاء الكوبون");
        },
    });
};

export const useUpdateCoupon = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const response = await axiosInstance.patch(`/admin/coupons/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("تم تحديث الكوبون بنجاح");
            queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء تحديث الكوبون");
        },
    });
};

export const useDeleteCoupon = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axiosInstance.delete(`/admin/coupons/${id}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("تم حذف الكوبون بنجاح");
            queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف الكوبون");
        },
    });
};

export const useGetCouponStats = (id: string | null) => {
    return useQuery({
        queryKey: ["admin", "coupons", "stats", id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/admin/coupons/${id}/stats`);
            return response.data.data;
        },
        enabled: !!id,
    });
};
