"use client";

import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";

export type AmbassadorStats = {
  successfulInvitations: number;
  totalPoints: number;
  rewardsReceived: number;
};

const AMBASSADOR_STATS_PATH = "/ambassador/me/stats";

function normalize(payload: unknown): AmbassadorStats {
  const o =
    payload && typeof payload === "object" ? (payload as Record<string, unknown>) : null;
  const inner =
    o && o.data && typeof o.data === "object" ? (o.data as Record<string, unknown>) : o;

  return {
    successfulInvitations:
      typeof inner?.successfulInvitations === "number"
        ? inner.successfulInvitations
        : Number(inner?.successfulInvitations ?? 0) || 0,
    totalPoints:
      typeof inner?.totalPoints === "number"
        ? inner.totalPoints
        : Number(inner?.totalPoints ?? 0) || 0,
    rewardsReceived:
      typeof inner?.rewardsReceived === "number"
        ? inner.rewardsReceived
        : Number(inner?.rewardsReceived ?? 0) || 0,
  };
}

export function useAmbassadorStats() {
  const query = useQueryWithRefresh<AmbassadorStats>({
    queryKey: ["ambassador", "me", "stats"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<unknown>(AMBASSADOR_STATS_PATH);
      return normalize(data);
    },
    tokenType: "user",
    staleTime: 60_000,
    retry: false,
  });

  return {
    stats: query.data ?? {
      successfulInvitations: 0,
      totalPoints: 0,
      rewardsReceived: 0,
    },
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
