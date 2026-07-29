import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

/** POST /privileges/membership/cancel */
export function useMembershipCancel() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete<unknown>(
        "/privileges/membership/cancel"
      );
      return data;
    },
  });
}
