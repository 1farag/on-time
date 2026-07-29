import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useGetMyMembershipCard = () => {
    return useQuery({
        queryKey: ["memberships", "my", "card"],
        queryFn: async () => {
            const response = await axiosInstance.get("/memberships/my/card");
            return response.data?.data;
        },
    });
};
