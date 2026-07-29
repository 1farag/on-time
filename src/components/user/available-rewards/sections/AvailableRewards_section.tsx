"use client";
import { Col, Row, Skeleton } from "antd";
import Link from "next/link";
import { FiGift, FiPercent, FiTruck } from "react-icons/fi";
import { IoShirtOutline } from "react-icons/io5";
import { useGetLoyaltyRewards } from "../hooks/useGetLoyaltyRewards";

export const AvailableRewards_section = () => {
  const { data, isLoading } = useGetLoyaltyRewards();

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <FiPercent />;
      case "free_shipping":
        return <FiTruck />;
      case "product":
        return <IoShirtOutline />;
      default:
        return <FiGift />;
    }
  };

  const getRewardValueText = (reward: any) => {
    if (reward.type === "free_shipping") return "مجاني";
    if (reward.type === "product") return "منتج";
    if (reward.valueType === "percentage") return `${reward.value}%`;
    return `${reward.value || 0} ر.س`;
  };

  return (
    <section className="available-rewards py-20">
      <div className="container">
        <Row gutter={[24, 24]}>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Col span={24} lg={8} key={index}>
                <Skeleton active paragraph={{ rows: 3 }} />
              </Col>
            ))
          ) : data && data.length > 0 ? (
            data.map((reward, index) => (
              <Col span={24} lg={8} key={reward.id || reward._id || index}>
                <div className="available-rewards-card">
                  <div className="top">
                    <div className="icon">{getRewardIcon(reward.type)}</div>
                    <span className="font-bold text-4xl">
                      {reward.pointsRequired}
                    </span>
                    <span>نقطة</span>
                  </div>
                  <div className="body flex flex-col items-start w-full">
                    <h5 className="text-secondary font-bold text-xl mb-2">
                      {reward.name}
                    </h5>

                    <p className="text-[#B0B0B3] mb-2 h-[48px] overflow-hidden">
                      {reward.description}
                    </p>
                    <div className="w-full flex items-center justify-between mb-4">
                      <span className="text-[#B0B0B3]">القيمة</span>
                      <span className="font-bold">
                        {" "}
                        {getRewardValueText(reward)}
                      </span>{" "}
                    </div>
                    <Link
                      href={`/user/loyalty-program/available-rewards/${
                        reward.id || reward._id || 1
                      }`}
                      className="w-full flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
                    >
                      استبدل الان{" "}
                    </Link>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <div className="w-full text-center text-gray-500 py-10">
              لا توجد مكافآت متاحة حالياً.
            </div>
          )}
        </Row>
      </div>
    </section>
  );
};
