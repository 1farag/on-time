import axiosInstance from "@/lib/axios";
import { MembershipPlan } from "@/types/types";

export const getMembershipPricePlansData = async () => {
  try {
    const response = await axiosInstance.get("/memberships");

    return response.data;
  } catch (error) {
    return { data: [], total: 0 };
  }
};

interface MembershipPlanReturnedData {
  data: {
    tier: MembershipPlan;
  };
}

export const getSingleMembershipPricePlanData = async (
  id: number | string
): Promise<MembershipPlanReturnedData> => {
  try {
    const response = await axiosInstance.get<MembershipPlanReturnedData>(
      `/memberships/${id}`
    );
    return response.data;
  } catch (error) {
    return { data: { tier: {} as MembershipPlan } };
  }
};
