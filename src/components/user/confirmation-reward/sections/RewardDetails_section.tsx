"use client";
import { Button, Skeleton, Modal, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiGift, FiPercent, FiTruck, FiCopy } from "react-icons/fi";
import { GoSquareFill } from "react-icons/go";
import { LuInfo } from "react-icons/lu";
import { useParams } from "next/navigation";
import {
  useGetLoyaltyRewardById,
  useRedeemLoyaltyReward,
} from "../../available-rewards/hooks/useGetLoyaltyRewards";
import { IoShirtOutline } from "react-icons/io5";
import { RootState } from "@/store/appStore";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

export const RewardDetails_section = () => {
  const params = useParams();
  const rewardId = params?.rewardId as string;
  const queryClient = useQueryClient();

  const user = useSelector((state: RootState) => state.auth.user);

  const { data: reward, isLoading } = useGetLoyaltyRewardById(rewardId);
  const { redeemRewardMutation, isPending } = useRedeemLoyaltyReward();

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

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
    if (!reward) return "";
    if (reward.type === "free_shipping") return "مجاني";
    if (reward.type === "product") return "منتج";
    if (reward.valueType === "percentage") return `${reward.value}%`;
    return `${reward.value || 0} ر.س`;
  };

  const handleConfirmRedeem = async () => {
    try {
      // Sending 0 for orderAmount as it's not specified by user input
      const result = await redeemRewardMutation({ rewardId, orderAmount: 0 });
      if (result) {
        setSuccessData(result);
        setIsConfirmModalVisible(false);
        setIsSuccessModalVisible(true);
        // Explicitly invalidate the single reward query as requested
        queryClient.invalidateQueries({
          queryKey: ["loyalty", "rewards", rewardId],
        });
      }
    } catch (error) {
      console.error(error);
      setIsConfirmModalVisible(false);
    }
  };

  const copyToClipboard = () => {
    if (successData?.couponCode) {
      navigator.clipboard.writeText(successData.couponCode);
      message.success("تم نسخ الكود بنجاح!");
    }
  };

  if (isLoading) {
    return (
      <section className="reward-details">
        <div className="container">
          <div className="reward-card">
            <Skeleton active title paragraph={{ rows: 6 }} />
          </div>
        </div>
      </section>
    );
  }

  if (!reward) {
    return (
      <section className="reward-details">
        <div className="container">
          <div className="reward-card text-center py-10">
            <h2 className="text-xl font-bold">
              عذراً، لم يتم العثور على المكافأة
            </h2>
            <Link
              href="/user/loyalty-program/available-rewards"
              className="text-primary mt-4 inline-block"
            >
              العودة إلى المكافآت المتوفرة
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // When redeemed, we use the new balance from the API response. Otherwise, fall back to user's loyaltyPoints
  const currentPoints =
    successData?.newBalance !== undefined
      ? successData.newBalance
      : user?.loyaltyPoints || 0;
  const newPoints = Math.max(0, currentPoints - reward.pointsRequired);

  return (
    <section className="reward-details">
      <div className="container">
        <div className="reward-card">
          <div className="top">
            <div className="icon">{getRewardIcon(reward.type)}</div>
            <div>
              <h2 className="text-white font-bold text-3xl mb-2">
                {reward.name}
              </h2>
              <p className="text-white/90 text-lg">{reward.description}</p>
            </div>
            <div className="amount">
              <span className="text-white/90 text-sm"> قيمة المكافأة</span>
              <span className="text-2xl font-bold">
                {getRewardValueText(reward)}
              </span>
            </div>
          </div>
          <div className="body">
            <ul className="current-point flex flex-col gap-4">
              <li>
                <span className="text-[#B0B0B3] text-md">رصيدك الحالي</span>
                <span className="text-[#111113] font-bold text-xl">
                  {currentPoints.toLocaleString()} نقطة
                </span>
              </li>
              <li>
                <span className="text-[#B0B0B3] text-md">النقاط المطلوبة</span>
                <span className="text-[#3A5762] font-bold text-xl">
                  -{reward.pointsRequired.toLocaleString()} نقطة
                </span>
              </li>
              <li>
                <span className="text-[#111113] font-bold">
                  الرصيد بعد الاستبدال
                </span>
                <span className="text-[#58BC52] font-bold text-3xl sm:text-xl">
                  {newPoints.toLocaleString()} نقطة
                </span>
              </li>
            </ul>
            <div className="information">
              <LuInfo className="text-2xl mt-1 min-w-[24px]" />
              <div>
                <h5 className="font-bold text-lg text-[#111113] mb-3">
                  معلومات مهمة:
                </h5>
                <ul className="flex flex-col gap-2">
                  <li>
                    <GoSquareFill className="text-sm mt-1" />
                    عملية الاستبدال نهائية ولا يمكن التراجع عنها
                  </li>
                  {reward.validityDays > 0 && (
                    <li>
                      <GoSquareFill className="text-sm mt-1" />
                      القسيمة صالحة لمدة {reward.validityDays} يوم من تاريخ
                      الاستبدال
                    </li>
                  )}
                  {reward.minOrderValue > 0 && (
                    <li>
                      <GoSquareFill className="text-sm mt-1" />
                      الحد الأدنى للطلب هو {reward.minOrderValue} ر.س لاستخدام
                      هذه المكافأة
                    </li>
                  )}
                  <li>
                    <GoSquareFill className="text-sm mt-1" />
                    يمكن استخدامها في أي عملية شراء (ما لم ينص على غير ذلك)
                  </li>
                </ul>{" "}
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                type="primary"
                className="flex flex-1 !px-12  primary"
                size="large"
                onClick={() => setIsConfirmModalVisible(true)}
              >
                <FaRegCircleCheck />
                تأكيد الاستبدال{" "}
              </Button>
              <Link
                href="/user/loyalty-program/available-rewards"
                className="flex flex-1 items-center justify-center text-[#B0B0B3] border border-[#B0B0B3] hover:text-[#B0B0B3] px-12 py-2 rounded-md text-md font-medium hover:bg-gray-50 transition-colors"
              >
                إلغاء{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="تأكيد الاستبدال"
        open={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        footer={null}
        centered
      >
        <div className="py-6 text-center text-lg">
          <p className="mb-4 text-gray-700">
            هل أنت متأكد من رغبتك في استبدال{" "}
            <strong>{reward?.pointsRequired}</strong> نقطة للحصول على{" "}
            <strong>{reward?.name}</strong>؟
          </p>
          <p className="text-sm text-primary mb-8">
            تنبيه: عملية الاستبدال نهائية ولا يمكن التراجع عنها.
          </p>
          <div className="flex gap-4">
            <Button
              type="primary"
              className="flex-1 !bg-primary"
              size="large"
              loading={isPending}
              onClick={handleConfirmRedeem}
            >
              نعم، تأكيد الاستبدال
            </Button>
            <Button
              className="flex-1"
              size="large"
              onClick={() => setIsConfirmModalVisible(false)}
            >
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title={null}
        open={isSuccessModalVisible}
        onCancel={() => setIsSuccessModalVisible(false)}
        footer={null}
        centered
        closable={false}
      >
        <div className="py-8 px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <FaRegCircleCheck className="text-4xl text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تهانينا!</h2>
          <p className="text-gray-600 mb-8">
            {successData?.message ||
              "تم تأكيد الاستبدال وحصلت على القسيمة بنجاح."}
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-500 mb-2">كود الخصم الخاص بك:</p>
            <div className="flex items-center justify-center gap-3 bg-white p-3 rounded border border-dashed border-gray-300">
              <span className="text-xl font-bold tracking-wider text-primary">
                {successData?.couponCode || "-------"}
              </span>
              <Button
                type="text"
                icon={<FiCopy className="text-gray-500" />}
                onClick={copyToClipboard}
                title="نسخ الكود"
              />
            </div>
          </div>

          <Button
            type="primary"
            className="w-full !bg-primary"
            size="large"
            onClick={() => setIsSuccessModalVisible(false)}
          >
            حسناً، شكراً
          </Button>
        </div>
      </Modal>
    </section>
  );
};
