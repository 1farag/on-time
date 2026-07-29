import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetUserCoupons = () => {
    return useQuery({
        queryKey: ["user", "coupons"],
        queryFn: async () => {
            const response = await axiosInstance.get("/users/coupons");
            return response.data.data;
        },
    });
};
