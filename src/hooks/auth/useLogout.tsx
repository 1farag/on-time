// hooks/auth/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useRouter, usePathname } from "next/navigation";
import { logoutAPI } from "@/apiCalls/auth/authApi";
import toast from "react-hot-toast";
import { logout as logoutAction } from "@/store/slices/auth/authSlice";
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies([
    "UserToken",
    "UserRefreshToken",
    "AdminToken",
    "AdminRefreshToken",
  ]);

  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const clearAuth = () => {
    removeCookie("UserToken", { path: "/" });
    removeCookie("UserRefreshToken", { path: "/" });
    removeCookie("AdminToken", { path: "/" });
    removeCookie("AdminRefreshToken", { path: "/" });

    dispatch(logoutAction());
    queryClient.clear();
  };

  const {
    mutate: logout,
    mutateAsync: logoutAsync,
    isPending: isLoggingOut,
  } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      clearAuth();

      if (pathname.startsWith(`/admin`)) {
        router.push(`/admin/login`);
      } else {
        router.push(`/user/login`);
      }

      toast.success("تم تسجيل الخروج بنجاح");
    },

    onError: () => {
      clearAuth();

      if (pathname.startsWith(`/admin`)) {
        router.push(`/admin/login`);
      } else {
        router.push(`/user/login`);
      }
    },
  });

  return { logout, logoutAsync, isLoggingOut };
};
