"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { getCookie, setCookie } from "cookies-next";

// Simple helper to generate or reuse a guest "IMEI" identifier
const GUEST_IMEI_COOKIE = "GuestIMEI";

export const getOrCreateGuestImei = () => {
  if (typeof window === "undefined") return null;

  let imei = getCookie(GUEST_IMEI_COOKIE) as string | undefined;
  if (!imei) {
    imei = crypto.randomUUID();
    setCookie(GUEST_IMEI_COOKIE, imei, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60,
    });
  }
  return imei;
};

// API helpers
export const getUserWishlistAPI = async () => {
  const response = await axiosInstance.get("/wishlist");
  return response.data;
};

export const clearUserWishlistAPI = async () => {
  const response = await axiosInstance.delete("/wishlist");
  return response.data;
};

export const addToUserWishlistAPI = async (productId: string) => {
  const response = await axiosInstance.post("/wishlist/items", { productId });
  return response.data;
};

export const removeFromUserWishlistAPI = async (productId: string) => {
  const response = await axiosInstance.delete(`/wishlist/items/${productId}`);
  return response.data;
};

export const addToGuestWishlistAPI = async (
  productId: string,
  imei: string
) => {
  const response = await axiosInstance.post("/wishlist/guest/items", {
    productId,
    imei,
  });
  return response.data;
};

export const getGuestWishlistAPI = async (imei: string) => {
  const response = await axiosInstance.get(`/wishlist/guest/${imei}`);
  return response.data;
};

export const clearGuestWishlistAPI = async (imei: string) => {
  const response = await axiosInstance.delete(`/wishlist/guest/${imei}`);
  return response.data;
};

export const removeFromGuestWishlistAPI = async (
  productId: string,
  imei: string
) => {
  const response = await axiosInstance.delete(
    `/wishlist/guest/${imei}/items/${productId}`
  );
  return response.data;
};

type WishlistItem = {
  _id: string;
  productId: string;
  productName: string;
  itemImage: string;
  productPrice: number;
  isAvailable: boolean;
};

// Hooks
export const useGetWishlist = () => {
  const userToken = getCookie("UserToken");
  const refreshToken = getCookie("UserRefreshToken");
  const isAuthenticated = !!(userToken || refreshToken);
  const guestImei =
    typeof window !== "undefined" ? getOrCreateGuestImei() : null;

  const {
    data: userWishlistData,
    isLoading: isLoadingUserWishlist,
    error: userError,
  } = useQuery({
    queryKey: ["wishlist", "user"],
    queryFn: getUserWishlistAPI,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: guestWishlistData,
    isLoading: isLoadingGuestWishlist,
    error: guestError,
  } = useQuery({
    queryKey: ["wishlist", "guest", guestImei],
    queryFn: () => getGuestWishlistAPI(guestImei as string),
    enabled: !isAuthenticated && !!guestImei,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = isLoadingUserWishlist || isLoadingGuestWishlist;
  const error = userError || guestError;

  const wishlistRaw = isAuthenticated
    ? userWishlistData?.data
    : guestWishlistData?.data;

  const items: WishlistItem[] = wishlistRaw?.items || [];

  return {
    wishlist: { items },
    isLoading,
    error,
    isAuthenticated,
    guestImei,
  };
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addToWishlist,
    isPending: isAddingToWishlist,
    error,
  } = useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      const userToken = getCookie("UserToken");
      const refreshToken = getCookie("UserRefreshToken");
      const isAuthenticated = !!(userToken || refreshToken);

      if (isAuthenticated) {
        return addToUserWishlistAPI(productId);
      }

      const imei = getOrCreateGuestImei();
      if (!imei) throw new Error("No guest identifier");
      return addToGuestWishlistAPI(productId, imei);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist", "user"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist", "guest"] });
      toast.success("تمت إضافة المنتج إلى المفضلة");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء إضافة المنتج للمفضلة"
      );
    },
  });

  return {
    addToWishlist,
    isAddingToWishlist,
    error,
  };
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  const {
    mutate: removeFromWishlist,
    isPending: isRemovingFromWishlist,
    error,
  } = useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      const userToken = getCookie("UserToken");
      const refreshToken = getCookie("UserRefreshToken");
      const isAuthenticated = !!(userToken || refreshToken);

      if (isAuthenticated) {
        return removeFromUserWishlistAPI(productId);
      }

      const imei = getOrCreateGuestImei();
      if (!imei) throw new Error("No guest identifier");
      return removeFromGuestWishlistAPI(productId, imei);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist", "user"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist", "guest"] });
      toast.success("تم حذف المنتج من المفضلة");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء حذف المنتج من المفضلة"
      );
    },
  });

  return {
    removeFromWishlist,
    isRemovingFromWishlist,
    error,
  };
};
