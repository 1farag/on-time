import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

const REGISTER_USER_TYPE_B2C = "B2C" as const;

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  referralCode?: string;
};

export const useSignup = () => {
  const router = useRouter();

  const {
    mutateAsync: signupMutation,
    isPending: loginLoading,
    error,
  } = useMutation({
    mutationFn: (values: SignupPayload) =>
      axiosInstance.post("/auth/register", {
        ...values,
        userType: REGISTER_USER_TYPE_B2C,
      }),
    onSuccess: ({ data }) => {
      router.push("/user/login");

      toast.success(data?.data?.message);
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    },
  });

  return {
    signupMutation,
    loginLoading,
    error,
  };
};
