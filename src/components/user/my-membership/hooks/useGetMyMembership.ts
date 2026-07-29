import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import type { MembershipTier } from "@/components/membership/hooks/useMembershipTiers";

const MEMBERSHIP_ME_PATH = "/privileges/membership/me";

/** Subscription row when present; shape may grow when backend documents paid plans. */
export type MembershipMeSubscription = {
  _id?: string;
  id?: string;
  membershipNumber?: string;
  startsAt?: string;
  endsAt?: string;
  /** Legacy fallback fields (kept for backward compatibility). */
  startDate?: string;
  expireDate?: string;
  endDate?: string;
  status?: string;
  totalSpend?: number;
  daysRemaining?: number;
  isExpired?: boolean;
  tierId?:
    | string
    | {
        name?: string;
        displayNameAr?: string;
        benefits?: unknown;
      };
};

export interface MyMembershipData {
  membership: MembershipMeSubscription | null;
  tier: MembershipTier;
}

type UseGetMyMembershipOptions = {
  /** When false, skips the request (e.g. placeholder-only accounting page). */
  enabled?: boolean;
};

function normalizeMeResponse(payload: unknown): MyMembershipData {
  const payloadObj =
    payload && typeof payload === "object" ? (payload as Record<string, unknown>) : null;

  const inner =
    payloadObj &&
    "data" in payloadObj &&
    payloadObj.data !== null &&
    typeof payloadObj.data === "object"
      ? (payloadObj.data as Record<string, unknown>)
      : payloadObj;

  if (!inner || typeof inner !== "object") {
    throw new Error("Unexpected /privileges/membership/me response shape");
  }

  const tier = inner.tier as MembershipTier | undefined;
  if (!tier || typeof tier !== "object" || typeof tier.id !== "string") {
    throw new Error("/privileges/membership/me: missing tier");
  }

  const membership =
    inner.membership === null || inner.membership === undefined
      ? null
      : (inner.membership as MembershipMeSubscription);

  return { membership, tier };
}

export const useGetMyMembership = (options?: UseGetMyMembershipOptions) => {
  return useQuery({
    queryKey: ["privileges", "membership", "me"],
    queryFn: async () => {
      const response = await axiosInstance.get<unknown>(MEMBERSHIP_ME_PATH);
      return normalizeMeResponse(response.data);
    },
    enabled: options?.enabled !== false,
  });
};
