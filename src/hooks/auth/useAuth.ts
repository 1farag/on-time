import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

/** Dispatch this after setting auth cookies so useAuth re-checks immediately */
export const AUTH_LOGIN_SUCCESS_EVENT = "auth-login-success";

type TokenType = "user" | "admin";

export const useAuth = (tokenType: TokenType = "user") => {
  const pathname = usePathname();
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  const [isAuthenticated, setIsAuthenticated] = useState(isLogged);
  const [isLoading, setIsLoading] = useState(true);

  const accessTokenName = tokenType === "admin" ? "AdminToken" : "UserToken";
  const refreshTokenName =
    tokenType === "admin" ? "AdminRefreshToken" : "UserRefreshToken";

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = getCookie(accessTokenName);
      const refreshToken = getCookie(refreshTokenName);

      // Use Redux state as primary source for HttpOnly support
      setIsAuthenticated(isLogged || !!(accessToken || refreshToken));
      setIsLoading(false);
    };

    checkAuth();
  }, [isLogged, tokenType, pathname, accessTokenName, refreshTokenName]);

  useEffect(() => {
    const handleRecheck = () => {
      const accessToken = getCookie(accessTokenName);
      const refreshToken = getCookie(refreshTokenName);
      setIsAuthenticated(isLogged || !!(accessToken || refreshToken));
    };

    window.addEventListener(AUTH_LOGIN_SUCCESS_EVENT, handleRecheck);
    window.addEventListener("storage", handleRecheck);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handleRecheck();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener(AUTH_LOGIN_SUCCESS_EVENT, handleRecheck);
      window.removeEventListener("storage", handleRecheck);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isLogged, accessTokenName, refreshTokenName]);

  return { isAuthenticated, isLoading };
};
