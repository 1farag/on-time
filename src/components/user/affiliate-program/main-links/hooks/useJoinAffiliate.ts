import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

export const useJoinAffiliate = () => {
  const pathname = usePathname();
  const router = useRouter();

  const {
    mutateAsync: joinAffiliateMutation,
    isPending: joinAffiliateLoading,
    error,
  } = useMutation({
    mutationFn: (values) => axiosInstance.post("/affiliates/register", values),
    onSuccess: ({ data }) => {
      console.log(data);
      toast.success(data?.message || "تم الانضمام إلى برنامج الأفلييت بنجاح!");
    },
    onError: (error: { response: { data: { error: string } } }) => {
      toast.error(
        error?.response?.data?.error ||
          "حدث خطأ أثناء الانضمام إلى برنامج الأفلييت. الرجاء المحاولة مرة أخرى."
      );
    },
  });

  return {
    joinAffiliateMutation,
    joinAffiliateLoading,
    error,
  };
};
