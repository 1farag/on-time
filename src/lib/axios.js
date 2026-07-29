// lib/axios.js
import axios from "axios";
import Cookies from "js-cookie";
import allUrl from "../configs/allUrl.json";
import { runSingleRefresh } from "@/lib/runSingleRefresh";

/** `/auth/refresh` body: tokens on root or under `data` (same as login). */
function tokensFromAuthBody(body) {
  if (!body || typeof body !== "object") return {};
  const root = body;
  const b =
    root.data != null && typeof root.data === "object" ? root.data : root;
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

/** js-cookie `expires`: fractional days (e.g. 15m ⇒ 15 / (24 * 60)). */
function accessTokenExpiresInDays(expiresIn) {
  if (!expiresIn || typeof expiresIn !== "string") return 15 / (24 * 60);
  const m = expiresIn.trim().match(/^(\d+)\s*(m|h|d)$/i);
  if (!m) return 15 / (24 * 60);
  const n = parseInt(m[1], 10);
  const u = m[2].toLowerCase();
  let sec;
  if (u === "m") sec = n * 60;
  else if (u === "h") sec = n * 3600;
  else if (u === "d") sec = n * 86400;
  else return 15 / (24 * 60);
  return sec / 86400;
}

const axiosInstance = axios.create({
  baseURL: allUrl.apiUrl,
  headers: {
    common: {
      platform: "web",
      lang: Cookies.get("NEXT_LOCALE") || "en",
    },
  },
});

// Request Interceptor - Add token based on current page context
axiosInstance.interceptors.request.use(
  async (config) => {
    // Skip attaching Authorization header for refresh token endpoints
    const url = config.url || "";
    if (url.includes("/auth/refresh") || url.includes("/admin/auth/refresh")) {
      return config;
    }

    const isServer = typeof window === "undefined";
    let token;

    let isAdminContext = false;

    if (!isServer && typeof window !== "undefined") {
      isAdminContext = window.location.pathname.includes("/admin");
    } else {
      isAdminContext = config.headers?.["x-admin-context"] === "true";
    }

    const tokenName = isAdminContext ? "AdminToken" : "UserToken";

    if (isServer) {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        token = cookieStore.get(tokenName)?.value;
      } catch (error) {
        console.error("Error reading server cookies:", error);
      }
    } else {
      token = Cookies.get(tokenName);

      if (!token && axiosInstance.defaults.headers.common.Authorization) {
        const authHeader = axiosInstance.defaults.headers.common.Authorization;
        token = authHeader.replace("Bearer ", "");
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle 401 with token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401s, avoid infinite loops, skip refresh endpoint itself
    if (
      error?.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    // Determine token type from request context
    const isAdminContext =
      typeof window !== "undefined"
        ? window.location.pathname.includes("/admin")
        : originalRequest.headers?.["x-admin-context"] === "true";

    const refreshTokenName = isAdminContext
      ? "AdminRefreshToken"
      : "UserRefreshToken";
    const accessTokenName = isAdminContext ? "AdminToken" : "UserToken";
    // Use a single refresh endpoint for both user and admin
    const refreshEndpoint = "/auth/refresh";

    const currentRefreshToken = Cookies.get(refreshTokenName);

    // No refresh token — nothing we can do
    if (!currentRefreshToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await runSingleRefresh(async () => {
        const response = await axiosInstance.post(
          refreshEndpoint,
          { refreshToken: currentRefreshToken },
          { headers: { Authorization: undefined } }
        );

        const {
          accessToken,
          refreshToken: newRefreshToken,
          expiresIn,
        } = tokensFromAuthBody(response.data);

        if (!accessToken)
          throw new Error("No access token in refresh response");

        // Store new tokens
        Cookies.set(accessTokenName, accessToken, {
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          expires: accessTokenExpiresInDays(expiresIn),
        });

        if (newRefreshToken) {
          Cookies.set(refreshTokenName, newRefreshToken, {
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            expires: 30, // 30 days
          });
        }

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        return accessToken;
      });

      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Refresh failed — clean up and reject
      Cookies.remove(accessTokenName);
      Cookies.remove(refreshTokenName);
      delete axiosInstance.defaults.headers.common.Authorization;

      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
