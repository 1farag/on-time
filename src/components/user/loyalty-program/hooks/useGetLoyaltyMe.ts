"use client";

import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "@/hooks/useQueryWithRefresh";

const LOYALTY_ME_PATH = "/privileges/loyalty/me";

export type LoyaltyMeData = {
  id: string;
  userId: string;
  status: string;
  cachedAvailablePoints: number;
  cachedReservedPoints: number;
  estimatedRedemptionValue: {
    amount: string;
    currency: string;
  };
  earningRule: {
    ruleCode: string;
    spendCurrency: string;
    spendAmount: string;
    pointsEarned: number;
    status: string;
  } | null;
  redemptionRule: {
    ruleCode: string;
    points: number;
    monetaryValue: string;
    currency: string;
    minPoints: number;
    maxPoints: number | null;
    status: string;
  } | null;
};

function normalize(payload: unknown): LoyaltyMeData | null {
  const o =
    payload && typeof payload === "object" ? (payload as Record<string, unknown>) : null;
  if (!o) return null;

  const inner =
    "data" in o && o.data && typeof o.data === "object"
      ? (o.data as Record<string, unknown>)
      : o;

  const id = typeof inner.id === "string" ? inner.id : "";
  if (!id) return null;

  const estimated =
    inner.estimatedRedemptionValue &&
    typeof inner.estimatedRedemptionValue === "object"
      ? (inner.estimatedRedemptionValue as Record<string, unknown>)
      : null;

  const earningRule =
    inner.earningRule && typeof inner.earningRule === "object"
      ? (inner.earningRule as Record<string, unknown>)
      : null;
  const redemptionRule =
    inner.redemptionRule && typeof inner.redemptionRule === "object"
      ? (inner.redemptionRule as Record<string, unknown>)
      : null;

  return {
    id,
    userId: typeof inner.userId === "string" ? inner.userId : "",
    status: typeof inner.status === "string" ? inner.status : "UNKNOWN",
    cachedAvailablePoints:
      typeof inner.cachedAvailablePoints === "number"
        ? inner.cachedAvailablePoints
        : Number(inner.cachedAvailablePoints ?? 0) || 0,
    cachedReservedPoints:
      typeof inner.cachedReservedPoints === "number"
        ? inner.cachedReservedPoints
        : Number(inner.cachedReservedPoints ?? 0) || 0,
    estimatedRedemptionValue: {
      amount:
        estimated && typeof estimated.amount === "string" ? estimated.amount : "0.00",
      currency:
        estimated && typeof estimated.currency === "string"
          ? estimated.currency
          : "SAR",
    },
    earningRule: earningRule
      ? {
          ruleCode:
            typeof earningRule.ruleCode === "string" ? earningRule.ruleCode : "",
          spendCurrency:
            typeof earningRule.spendCurrency === "string"
              ? earningRule.spendCurrency
              : "SAR",
          spendAmount:
            typeof earningRule.spendAmount === "string"
              ? earningRule.spendAmount
              : "0.00",
          pointsEarned:
            typeof earningRule.pointsEarned === "number"
              ? earningRule.pointsEarned
              : Number(earningRule.pointsEarned ?? 0) || 0,
          status:
            typeof earningRule.status === "string" ? earningRule.status : "UNKNOWN",
        }
      : null,
    redemptionRule: redemptionRule
      ? {
          ruleCode:
            typeof redemptionRule.ruleCode === "string"
              ? redemptionRule.ruleCode
              : "",
          points:
            typeof redemptionRule.points === "number"
              ? redemptionRule.points
              : Number(redemptionRule.points ?? 0) || 0,
          monetaryValue:
            typeof redemptionRule.monetaryValue === "string"
              ? redemptionRule.monetaryValue
              : "0.00",
          currency:
            typeof redemptionRule.currency === "string"
              ? redemptionRule.currency
              : "SAR",
          minPoints:
            typeof redemptionRule.minPoints === "number"
              ? redemptionRule.minPoints
              : Number(redemptionRule.minPoints ?? 0) || 0,
          maxPoints:
            typeof redemptionRule.maxPoints === "number"
              ? redemptionRule.maxPoints
              : null,
          status:
            typeof redemptionRule.status === "string"
              ? redemptionRule.status
              : "UNKNOWN",
        }
      : null,
  };
}

export function useGetLoyaltyMe() {
  const query = useQueryWithRefresh<LoyaltyMeData | null>({
    queryKey: ["privileges", "loyalty", "me"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<unknown>(LOYALTY_ME_PATH);
      return normalize(data);
    },
    tokenType: "user",
    staleTime: 60_000,
    retry: false,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
