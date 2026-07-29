// hooks/auth/useUserLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { AUTH_LOGIN_SUCCESS_EVENT } from "@/hooks/auth/useAuth";

function accessTokenMaxAgeSeconds(expiresIn: string | undefined): number {
  if (!expiresIn?.trim()) return 15 * 60;
  const m = expiresIn.trim().match(/^(\d+)\s*(m|h|d)$/i);
  if (!m) return 15 * 60;
  const n = parseInt(m[1], 10);
  const u = m[2].toLowerCase();
  if (u === "m") return n * 60;
  if (u === "h") return n * 3600;
  if (u === "d") return n * 86400;
  return 15 * 60;
}

function tokensFromLoginData(data: unknown) {
  if (!data || typeof data !== "object") return {};
  const root = data as Record<string, unknown>;
  const b =
    root.data != null && typeof root.data === "object"
      ? (root.data as Record<string, unknown>)
      : root;
  const accessToken =
    typeof b.accessToken === "string"
      ? b.accessToken
      : typeof b.access_token === "string"
        ? b.access_token
        : undefined;
  const refreshToken =
    typeof b.refreshToken === "string"
      ? b.refreshToken
      : typeof b.refresh_token === "string"
        ? b.refresh_token
        : undefined;
  const expiresIn =
    typeof b.expiresIn === "string"
      ? b.expiresIn
      : typeof b.expires_in === "string"
        ? b.expires_in
        : undefined;
  return { accessToken, refreshToken, expiresIn };
}

export const useUserLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const {
    mutateAsync: loginMutation,
    isPending: loginLoading,
    error,
  } = useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      axiosInstance.post("/auth/login", values),
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken, expiresIn } = tokensFromLoginData(data);

      if (!accessToken) {
        toast.error("لم يتم استلام رمز الوصول");
        return;
      }

      const accessMaxAge = accessTokenMaxAgeSeconds(expiresIn);

      // Store access token (from API expiresIn when present, else 15m)
      setCookie("UserToken", accessToken, {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: accessMaxAge,
      });

      // Store refresh token (30 days)
      if (refreshToken) {
        setCookie("UserRefreshToken", refreshToken, {
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 24 * 60 * 60,
        });
      }

      // IMPORTANT: Update axios default headers immediately
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // Invalidate cart queries to fetch fresh data
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      // Notify useAuth to re-check so header/layout show logged-in state immediately
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(AUTH_LOGIN_SUCCESS_EVENT));
      }

      toast.success("Logged in successfully.");

      // Get redirect URL from query params or default to home
      const redirectUrl = searchParams.get("redirect") || "/";
      router.push(redirectUrl);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ. حاول مرة أخرى.");
    },
  });

  return {
    loginMutation,
    loginLoading,
    error,
  };
};
