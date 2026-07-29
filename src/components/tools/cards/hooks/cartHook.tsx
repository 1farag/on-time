// hooks/cart/useAddToCart.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import axiosInstance from "@/lib/axios";
import { useCookies } from "react-cookie";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";
import { getCookie } from "cookies-next";

interface AddToCartParams {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface UpdateCartItemParams {
  itemId: string;
  quantity: number;
}
interface DeleteCartItemParams {
  itemId: string;
  size: string;
}

export const addToCartAPI = async (data: AddToCartParams) => {
  const response = await axiosInstance.post("/cart/items", data);
  return response.data;
};

export const getCartAPI = async () => {
  const response = await axiosInstance.get("/cart");
  return response.data;
};
export const removeFromCartAPI = async (data: DeleteCartItemParams) => {
  const response = await axiosInstance.delete(`/cart/items/${data.itemId}`, {
    data: {
      size: data.size,
    },
  });

  return response.data;
};

export const updateCartItemAPI = async (data: UpdateCartItemParams) => {
  const response = await axiosInstance.patch(`/cart/items/${data.itemId}`, {
    quantity: data.quantity,
  });
  return response.data;
};

export const clearCartAPI = async () => {
  const response = await axiosInstance.delete("/cart/clear");
  return response.data;
};

export const useGetCart = () => {
  const userToken = getCookie("UserToken");
  const refreshToken = getCookie("UserRefreshToken");
  const isAuthenticated = !!(userToken || refreshToken);

  const {
    data: cartData,
    isLoading: isLoadingCart,
    error,
    refetch: refetchCart,
  } = useQueryWithRefresh({
    queryKey: ["cart"],
    queryFn: getCartAPI,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, // Don't retry, let our refresh logic handle it
  });

  return {
    cart: cartData?.data || { items: [], total: 0 },
    isLoadingCart,
    error,
    refetchCart,
    isAuthenticated,
  };
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addToCart,
    mutateAsync: addToCartAsync,
    isPending: isAddingToCart,
    error,
  } = useMutation({
    mutationFn: addToCartAPI,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("تمت إضافة المنتج إلى السلة");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء إضافة المنتج"
      );
    },
  });

  return {
    addToCart,
    addToCartAsync,
    isAddingToCart,
    error,
  };
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  const {
    mutate: removeFromCart,
    mutateAsync: removeFromCartAsync,
    isPending: isRemovingFromCart,
    error,
  } = useMutation({
    mutationFn: removeFromCartAPI,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("تم حذف المنتج من السلة");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف المنتج");
    },
  });

  return {
    removeFromCart,
    removeFromCartAsync,
    isRemovingFromCart,
    error,
  };
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateCartItem,
    mutateAsync: updateCartItemAsync,
    isPending: isUpdatingCartItem,
    error,
  } = useMutation({
    mutationFn: updateCartItemAPI,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("تم تحديث المنتج");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء تحديث المنتج"
      );
    },
  });

  return {
    updateCartItem,
    updateCartItemAsync,
    isUpdatingCartItem,
    error,
  };
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  const {
    mutate: clearCart,
    mutateAsync: clearCartAsync,
    isPending: isClearingCart,
    error,
  } = useMutation({
    mutationFn: clearCartAPI,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("تم إفراغ السلة");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء إفراغ السلة"
      );
    },
  });

  return {
    clearCart,
    clearCartAsync,
    isClearingCart,
    error,
  };
};
