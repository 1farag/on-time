import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

export const useAskWithdrawal = () => {
  const router = useRouter();

  const {
    mutateAsync: askWithdrawalMutation,
    isPending: askWithdrawalLoading,
    error,
  } = useMutation({
    mutationFn: (values) =>
      axiosInstance.post("/affiliates/me/withdrawals", values),
    onSuccess: ({ data }) => {
      console.log(data);
      toast.success(data?.message || "تم تقديم طلب سحب الأرباح بنجاح.");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log(error?.response?.data?.message);
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء تقديم طلب سحب الأرباح. يرجى المحاولة مرة أخرى."
      );
    },
  });

  return {
    askWithdrawalMutation,
    askWithdrawalLoading,
    error,
  };
};
