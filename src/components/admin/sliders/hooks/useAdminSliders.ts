import axiosInstance from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAdminSliders = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["admin", "sliders"],
        queryFn: async () => {
            const response = await axiosInstance.get("/admin/sliders");
            return response.data;
        },
    });

    return { data, isLoading, error };
};

export const useGetAdminSlider = (id: string | undefined) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["admin", "sliders", id],
        queryFn: async () => {
            if (!id) return null;
            const response = await axiosInstance.get(`/admin/sliders/${id}`);
            return response.data;
        },
        enabled: !!id,
    });

    return { data, isLoading, error };
};

export const useCreateAdminSlider = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (sliderData: any) => {
            const response = await axiosInstance.post("/admin/sliders", sliderData);
            return response.data;
        },
        onSuccess: () => {
            toast.success("تم إضافة البانر بنجاح");
            queryClient.invalidateQueries({ queryKey: ["admin", "sliders"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء إضافة البانر");
        },
    });

    return mutation;
};

export const useUpdateAdminSlider = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const response = await axiosInstance.patch(`/admin/sliders/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("تم تعديل البانر بنجاح");
            queryClient.invalidateQueries({ queryKey: ["admin", "sliders"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء تعديل البانر");
        },
    });

    return mutation;
};

export const useDeleteAdminSlider = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await axiosInstance.delete(`/admin/sliders/${id}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("تم حذف البانر بنجاح");
            queryClient.invalidateQueries({ queryKey: ["admin", "sliders"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف البانر");
        },
    });

    return mutation;
};

export const useReorderAdminSliders = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (sliderIds: string[]) => {
            const response = await axiosInstance.patch("/admin/sliders/reorder", {
                sliderIds,
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("تم إعادة ترتيب البانرات بنجاح");
            queryClient.invalidateQueries({ queryKey: ["admin", "sliders"] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "حدث خطأ أثناء إعادة الترتيب"
            );
        },
    });

    return mutation;
};
