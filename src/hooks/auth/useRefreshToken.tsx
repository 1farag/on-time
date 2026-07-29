import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import axiosInstance from "@/lib/axios";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { runSingleRefresh } from "@/lib/runSingleRefresh";

type TokenType = "user" | "admin";

/** Same shapes as `/auth/login` — tokens on root or under `data`. */
function tokensFromAuthBody(body: unknown) {
  if (!body || typeof body !== "object") return {};
  const root = body as Record<string, unknown>;
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

function accessMaxAgeSeconds(expiresIn: string | undefined): number {
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

export const useRefreshToken = (tokenType: TokenType = "user") => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const accessTokenName = tokenType === "admin" ? "AdminToken" : "UserToken";
  const refreshTokenName =
    tokenType === "admin" ? "AdminRefreshToken" : "UserRefreshToken";
  const refreshEndpoint = "/auth/refresh";
  const loginPath = tokenType === "admin" ? "admin/login" : "user/login";

  const mutation = useMutation({
    mutationFn: async () => {
      const currentRefreshToken = getCookie(refreshTokenName);
      if (!currentRefreshToken) throw new Error("No refresh token");

      console.log(`🔄 Refreshing ${tokenType} token...`);

      const response = await axiosInstance.post(
        refreshEndpoint,
        {
          refreshToken: currentRefreshToken,
        },
        {
          headers: {
            Authorization: undefined,
          },
        }
      );

      return response.data;
    },

    onSuccess: (data) => {
      const {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn,
      } = tokensFromAuthBody(data);

      if (!accessToken) throw new Error("No access token");

      setCookie(accessTokenName, accessToken, {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: accessMaxAgeSeconds(expiresIn),
      });

      if (newRefreshToken) {
        setCookie(refreshTokenName, newRefreshToken, {
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 24 * 60 * 60,
        });
      }

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      queryClient.invalidateQueries();
    },

    onError: (err) => {
      console.error(`❌ ${tokenType} refresh failed`, err);

      deleteCookie(accessTokenName);
      deleteCookie(refreshTokenName);
      delete axiosInstance.defaults.headers.common.Authorization;

      queryClient.removeQueries();

      const errorMessage =
        tokenType === "admin"
          ? "انتهت جلستك كمسؤول. يرجى تسجيل الدخول مرة أخرى"
          : "انتهت جلستك. يرجى تسجيل الدخول مرة أخرى";

      toast.error(errorMessage);

      if (!pathname.includes(`/${loginPath}`)) {
        const target = `/${loginPath}`.replace(/\/+/g, "/");
        router.push(`${target}?redirect=${encodeURIComponent(pathname)}`);
      }
    },
  });

  const refreshToken = () => runSingleRefresh(() => mutation.mutateAsync());

  return {
    refreshToken,
    refreshTokenSync: mutation.mutate,
    isRefreshing: mutation.isPending,
    error: mutation.error,
  };
};
