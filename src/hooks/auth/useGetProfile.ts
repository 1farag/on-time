"use client";

import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "../useQueryWithRefresh";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AUTH_LOGIN_SUCCESS_EVENT } from "./useAuth";

function hasUserSessionCookie(): boolean {
  return (
    !!getCookie("UserToken") || !!getCookie("UserRefreshToken")
  );
}

export const getUserProfileAPI = async () => {
  const { data } = await axiosInstance.get("/users/me");
  return data ?? null;
};

export const updateUserProfileAPI = async (data: unknown) => {
  const response = await axiosInstance.patch("/users/me", data);
  return response.data;
};

export const updateUserPersonalProfileAPI = async (data: unknown) => {
  const response = await axiosInstance.patch("/users/me/profile", data);
  return response.data;
};

export const requestUserEmailChangeAPI = async (data: { newEmail: string }) => {
  const response = await axiosInstance.post("/users/me/email/change/request", data);
  return response.data;
};

export const confirmUserEmailChangeAPI = async (data: {
  newEmail: string;
  code: string;
}) => {
  const response = await axiosInstance.post("/users/me/email/change/confirm", data);
  return response.data;
};

export const requestUserPhoneChangeAPI = async (data: { newPhone: string }) => {
  const response = await axiosInstance.post("/users/me/phone/change/request", data);
  return response.data;
};

export const confirmUserPhoneChangeAPI = async (data: {
  newPhone: string;
  code: string;
}) => {
  const response = await axiosInstance.post("/users/me/phone/change/confirm", data);
  return response.data;
};

export const changeUserPasswordAPI = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const response = await axiosInstance.post("/users/me/password/change", data);
  return response.data;
};

export const useGetUserProfile = () => {
  const [mounted, setMounted] = useState(false);
  const [, bump] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onAuthChange = () => bump((n) => n + 1);
    window.addEventListener(AUTH_LOGIN_SUCCESS_EVENT, onAuthChange);
    window.addEventListener("storage", onAuthChange);
    return () => {
      window.removeEventListener(AUTH_LOGIN_SUCCESS_EVENT, onAuthChange);
      window.removeEventListener("storage", onAuthChange);
    };
  }, []);

  const canFetch = mounted && hasUserSessionCookie();

  const {
    data: userData,
    isLoading: queryLoading,
    error,
    refetch,
  } = useQueryWithRefresh({
    queryKey: ["userProfile"],
    queryFn: getUserProfileAPI,
    enabled: canFetch,
    staleTime: 1000 * 60 * 5,
    retry: false,
    tokenType: "user",
  });

  const isLoading = !mounted || (canFetch && queryLoading);

  return {
    user: userData ?? undefined,
    isLoading,
    error,
    refetch,
    isAuthenticated: canFetch && !!userData,
  };
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: unknown) => updateUserProfileAPI(data),
    onSuccess: () => {
      toast.success("Changes saved successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast.error(
        (typeof msg === "string" && msg) ||
          "An error occurred while saving changes, please try again"
      );
    },
  });
};

export const useUpdateUserPersonalProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: unknown) => updateUserPersonalProfileAPI(data),
    onSuccess: () => {
      toast.success("Changes saved successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast.error(
        (typeof msg === "string" && msg) ||
          "An error occurred while saving changes, please try again"
      );
    },
  });
};

export const useRequestUserEmailChange = () => {
  return useMutation({
    mutationFn: (data: { newEmail: string }) => requestUserEmailChangeAPI(data),
    onSuccess: () => {
      toast.success("OTP sent to your new email");
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast.error(
        (typeof msg === "string" && msg) ||
          "Failed to send verification code, please try again"
      );
    },
  });
};

export const useConfirmUserEmailChange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { newEmail: string; code: string }) =>
      confirmUserEmailChangeAPI(data),
    onSuccess: () => {
      toast.success("Email updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast.error(
        (typeof msg === "string" && msg) ||
          "Failed to confirm code, please try again"
      );
    },
  });
};

export const useRequestUserPhoneChange = () => {
  return useMutation({
    mutationFn: (data: { newPhone: string }) => requestUserPhoneChangeAPI(data),
    onSuccess: () => {
      toast.success("OTP sent to your new phone number");
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast.error(
        (typeof msg === "string" && msg) ||
          "Failed to send verification code, please try again"
      );
    },
  });
};

export const useConfirmUserPhoneChange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { newPhone: string; code: string }) =>
      confirmUserPhoneChangeAPI(data),
    onSuccess: () => {
      toast.success("Phone number updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast.error(
        (typeof msg === "string" && msg) ||
          "Failed to confirm code, please try again"
      );
    },
  });
};

export const useChangeUserPassword = () => {
  return useMutation({
    mutationFn: (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => changeUserPasswordAPI(data),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast.error(
        (typeof msg === "string" && msg) ||
          "Failed to change password, please try again"
      );
    },
  });
};
