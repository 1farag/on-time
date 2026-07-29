"use client";
import DeleteModal from "@/components/tools/modal/DeleteModal";
import { Button, Row, Col, Tag, Card, Skeleton } from "antd";
import { FiGift } from "react-icons/fi";
import { useDeleteLoyaltyReward } from "../hooks/useDeleteLoyaltyReward";
import { AddEditLoyaltyReward_modal } from "../modal/AddEditLoyaltyReward_modal";

interface Reward {
  _id: string;
  title: string;
  description: string;
  points: number;
  status: "active" | "inactive";
  name: string;
  type: string;
  pointsRequired: number;
  value: number;
  isActive: boolean;
  validityDays: number;
  maxRedemptionsPerUser: number;
}

interface LoyaltyRewardsCardsProps {
  rewards?: Reward[];
  loading?: boolean;
}

export const LoyaltyRewardsCards = ({
  rewards,
  loading,
}: LoyaltyRewardsCardsProps) => {
  // Mock data - replace with actual rewards data

  const { deleteLoyaltyRewardMutation, deleteLoyaltyRewardLoading } =
    useDeleteLoyaltyReward();

  const rewardsList = rewards;

  const handleActivation = (id: string) => {
    deleteLoyaltyRewardMutation(id);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <Skeleton active />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Row gutter={[24, 24]}>
      {rewardsList?.map((reward) => (
        <Col key={reward._id} xs={24} sm={12} lg={8}>
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-md transition-shadow">
            {/* Status Badge */}
            <div className="flex justify-end mb-3">
              {reward.isActive ? (
                <Tag className="!m-0 bg-[#D0FAE5] !px-3 !rounded-2xl">نشط</Tag>
              ) : (
                <Tag color="red" className="!m-0  !px-3 !rounded-2xl">
                  متوقف
                </Tag>
              )}
            </div>

            {/* Gift Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                <FiGift className="text-3xl text-orange-500" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {reward.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 text-center mb-4 min-h-[40px]">
              {reward.description}
            </p>

            {/* Points */}
            <div className="text-center mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {reward.pointsRequired}
              </span>
              <span className="text-sm text-gray-600 mr-2">نقطة</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#F3F4F6]">
              <AddEditLoyaltyReward_modal
                rewardId={reward?._id}
                rewardObject={reward}
              >
                <Button
                  size="large"
                  className="!border-[#E5E7EB] text-[#364153]"
                  block
                >
                  تعديل
                </Button>
              </AddEditLoyaltyReward_modal>

              {/* <DeleteModal
                heading="حذف المكافأه "
                description="هل أنت متأكد من حذف المكافأه ؟ لا يمكن التراجع عن هذا الإجراء."
                handleDelete={}
                deleteLoading={deleteLoyaltyRewardLoading}
              > */}
              <Button
                size="large"
                className="!border-[#E5E7EB] text-[#364153]"
                block
                onClick={async () => handleActivation(reward._id)}
                disabled={!reward.isActive}
              >
                ايقاف
              </Button>
              {/* </DeleteModal> */}
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
