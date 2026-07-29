import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export const useChangePassword = () => {
  // 1. Request Password Reset (Request OTP)
  const {
    mutateAsync: forgotPasswordMutation,
    isPending: forgotPasswordLoading,
  } = useMutation({
    mutationFn: (values: { email: string }) =>
      axiosInstance.post("/auth/password/forgot/request", values),
    onSuccess: () => {
      toast.success("Verification code sent successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong, please try again"
      );
    },
  });

  // 2. Verify OTP
  const { mutateAsync: verifyOtpMutation, isPending: verifyOtpLoading } =
    useMutation({
      mutationFn: (values: {
        emailOrPhone: string;
        purpose: "RESET";
        code: string;
      }) => axiosInstance.post("/auth/otp/verify", values),
      onSuccess: () => {
        toast.success("Code verified successfully");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Invalid verification code"
        );
      },
    });

  // 3. Reset Password
  const {
    mutateAsync: resetPasswordMutation,
    isPending: resetPasswordLoading,
  } = useMutation({
    mutationFn: (values: {
      email: string;
      code: string;
      newPassword: string;
    }) => axiosInstance.post("/auth/password/reset", values),
    onSuccess: () => {
      toast.success("Password reset successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    },
  });

  return {
    forgotPasswordMutation,
    forgotPasswordLoading,
    verifyOtpMutation,
    verifyOtpLoading,
    resetPasswordMutation,
    resetPasswordLoading,
  };
};
