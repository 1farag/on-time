"use client";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export type MembershipUpgradeMode = "NEW_TERM" | "REMAINING_PERIOD";

export type MembershipInitiateUpgradePayload = {
  targetTier: string;
  upgradeMode: MembershipUpgradeMode;
};

/** POST /privileges/membership/initiate-upgrade */
export function useMembershipInitiateUpgrade() {
  return useMutation({
    mutationFn: async (payload: MembershipInitiateUpgradePayload) => {
      const { data } = await axiosInstance.post<unknown>(
        "/privileges/membership/initiate-upgrade",
        payload
      );
      return data;
    },
  });
}
