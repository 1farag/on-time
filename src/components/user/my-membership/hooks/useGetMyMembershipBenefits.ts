import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useGetMyMembershipBenefits = () => {
    return useQuery({
        queryKey: ["memberships", "my", "benefits"],
        queryFn: async () => {
            const response = await axiosInstance.get("/memberships/my/benefits");
            return response.data?.data;
        },
    });
};
