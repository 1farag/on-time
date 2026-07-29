"use client";
import { Button } from "antd";
import { FiPlus } from "react-icons/fi";
import { AddEditLoyaltyReward_modal } from "./modal/AddEditLoyaltyReward_modal";
import { LoyaltyRewardsCards } from "./sections/LoyaltyRewardsCards_section";
import { useGetAdminLoyaltyRewards } from "./hooks/useGetAdminLoyaltyRewards";
import { useAddEditLoyaltyReward } from "./hooks/useAddEditLoyaltyReward";

export const AdminLoyaltyRewardsComponent = () => {
  const { data, isLoading } = useGetAdminLoyaltyRewards();

  const handleAddRule = async (values: any) => {
    console.log("New rule values:", values);
  };

  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            قواعد النقاط
          </h1>
          <p className="text-lg text-primary">إدارة مكافآت نظام الولاء</p>
        </div>

        <AddEditLoyaltyReward_modal>
          <Button type="primary">
            <FiPlus />
            إضافة مكافأة جديدة
          </Button>
        </AddEditLoyaltyReward_modal>
      </div>

      <LoyaltyRewardsCards rewards={data?.rewards || []} loading={isLoading} />
    </main>
  );
};
