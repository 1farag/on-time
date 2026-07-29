import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useRefreshToken } from "@/hooks/auth/useRefreshToken";
import { getCookie } from "cookies-next";
import { useEffect, useRef } from "react";

type TokenType = "user" | "admin";

export function useQueryWithRefresh<TData = unknown, TError = unknown>(
  options: UseQueryOptions<TData, TError> & {
    queryKey: any[];
    queryFn: () => Promise<TData>;
    tokenType?: TokenType;
  }
) {
  const { tokenType = "user", ...queryOptions } = options;
  const { refreshToken, isRefreshing } = useRefreshToken(tokenType);
  const isHandling = useRef(false);

  const query = useQuery<TData, TError>(queryOptions);

  useEffect(() => {
    const err: any = query.error;

    const is401 = err?.response?.status === 401;
    const refreshCookieName =
      tokenType === "admin" ? "AdminRefreshToken" : "UserRefreshToken";
    const hasRefreshToken = !!getCookie(refreshCookieName);

    if (
      !query.isError ||
      !is401 ||
      !hasRefreshToken ||
      isHandling.current ||
      isRefreshing
    ) {
      return;
    }

    isHandling.current = true;

    (async () => {
      try {
        await refreshToken();
      } catch (refreshError) {
        console.error(`❌ [${tokenType}] Token refresh failed:`, refreshError);
      } finally {
        isHandling.current = false;
      }
    })();
  }, [query.error]);

  useEffect(() => {
    if (query.isSuccess) {
      isHandling.current = false;
    }
  }, [query.isSuccess]);

  return query;
}
