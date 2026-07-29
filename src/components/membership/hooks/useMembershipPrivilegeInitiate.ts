"use client";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export type MembershipPrivilegeInitiatePayload = {
  tierId: string;
};

export function useMembershipPrivilegeInitiate() {
  return useMutation({
    mutationFn: async (payload: MembershipPrivilegeInitiatePayload) => {
      const { data } = await axiosInstance.post<unknown>(
        "/privileges/membership/initiate",
        payload,
      );
      return data;
    },
  });
}
