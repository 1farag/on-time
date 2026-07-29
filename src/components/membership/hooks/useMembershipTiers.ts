"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export type MembershipTier = {
  id: string;
  code: string;
  name: string;
  annualPrice: string;
  monthlyPrice: string;
  currency: string;
  benefits: string[];
  badge: string | null;
  isHighlighted: boolean;
  priority: number;
  isDefault: boolean;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  version?: number;
};

const MEMBERSHIP_TIERS_PATH = "/privileges/membership/tiers";

function normalizeTiersResponse(payload: unknown): MembershipTier[] {
  if (Array.isArray(payload)) {
    return payload as MembershipTier[];
  }
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray((payload as { data: unknown }).data)
  ) {
    return (payload as { data: MembershipTier[] }).data;
  }
  return [];
}

export function useMembershipTiers() {
  return useQuery({
    queryKey: ["privileges", "membership", "tiers"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<unknown>(MEMBERSHIP_TIERS_PATH);
      const list = normalizeTiersResponse(data);
      return list.filter((t) => t.active !== false);
    },
  });
}
