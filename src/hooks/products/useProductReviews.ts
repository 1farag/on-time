import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "../useQueryWithRefresh";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface ReviewItem {
    _id: string;
    productId: string;
    orderId: string;
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
}

export interface ProductReviewsResponse {
    items: ReviewItem[];
    page: number;
    limit: number;
    total: number;
}

export interface AddReviewPayload {
    productId: string;
    rating: number;
    comment: string;
}

export const getProductReviewsAPI = async (
    productId: string,
    page: number = 1,
    limit: number = 20
): Promise<ProductReviewsResponse> => {
    const response = await axiosInstance.get(`/products/${productId}/reviews`, {
        params: { page, limit },
    });
    return response.data?.data;
};

export const addProductReviewAPI = async (payload: AddReviewPayload) => {
    const response = await axiosInstance.post("/products/reviews", payload);
    return response.data;
};

export const useGetProductReviews = (
    productId: string,
    page: number = 1,
    limit: number = 20
) => {
    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQueryWithRefresh<ProductReviewsResponse, any>({
        queryKey: ["productReviews", productId, page, limit],
        queryFn: () => getProductReviewsAPI(productId, page, limit),
        tokenType: "user",
        enabled: !!productId,
    });

    return {
        reviews: data?.items || [],
        pagination: {
            page: data?.page || page,
            limit: data?.limit || limit,
            total: data?.total || 0,
        },
        isLoading,
        error,
        refetch,
    };
};

export const useAddProductReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: AddReviewPayload) => addProductReviewAPI(payload),
        onSuccess: (_, variables) => {
            toast.success("تم إضافة التقييم بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["productReviews", variables.productId],
            });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "حدث خطأ أثناء إضافة التقييم"
            );
        },
    });
};
export const deleteProductReviewAPI = async (reviewId: string) => {
    const response = await axiosInstance.delete(`/products/reviews/${reviewId}`);
    return response.data;
};

export const useDeleteProductReview = (productId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewId: string) => deleteProductReviewAPI(reviewId),
        onSuccess: () => {
            toast.success("تم حذف التقييم بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["productReviews", productId],
            });
            // Also invalidate product details if needed
            queryClient.invalidateQueries({
                queryKey: ["adminProductDetails", productId],
            });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "حدث خطأ أثناء حذف التقييم"
            );
        },
    });
};

export const getAdminProductDetailsAPI = async (productId: string) => {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data?.data;
};

export const useGetAdminProductDetails = (productId: string) => {
    return useQueryWithRefresh({
        queryKey: ["adminProductDetails", productId],
        queryFn: () => getAdminProductDetailsAPI(productId),
        tokenType: "admin",
        enabled: !!productId,
    });
};
