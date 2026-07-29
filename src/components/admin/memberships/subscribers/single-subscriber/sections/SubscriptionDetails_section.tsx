"use client";
import { Button, Tag, Row, Col, Modal, Radio } from "antd";
import { FiCreditCard } from "react-icons/fi";
import { MdUpgrade } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useGetMembershipSubscriber } from "../../hooks/useGetMembershipSubscribers";
import dayjs from "dayjs";
import { useManageSubscriber } from "../hooks/useManageSubscriber";
import { useAssignMembership } from "../hooks/useAssignMembership";
import { useGetAdminMembershipPlans } from "../../../plans/hooks/useGetAllPlans";
import { useState } from "react";

interface SubscriptionDetailsProps {
  subscription?: {
    _id: string;
    subscriptionNumber: string;
    customer: {
      name: string;
      email: string;
      phone: string;
    };
    plan: {
      name: string;
      duration: string;
    };
    startDate: string;
    renewalDate: string;
    status: "active" | "inactive" | "cancelled";
    paymentMethod: string;
  };
}

export const SubscriptionDetailsComponent = ({
  subscription,
}: SubscriptionDetailsProps) => {
  const { data: subscriptionData } = useGetMembershipSubscriber();
  const { manageSubscriberMutation, manageSubscriberLoading } =
    useManageSubscriber();
  const { assignMembership, isAssigning } = useAssignMembership();
  const { data: allPlans, isLoading: plansLoading } =
    useGetAdminMembershipPlans();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string>("");
  const router = useRouter();

  console.log(subscriptionData);
  // Mock data - replace with actual subscription data
  // const subscriptionData = subscription || {
  //   _id: "1",
  //   subscriptionNumber: "#3",
  //   customer: {
  //     name: "محمد العتيبي",
  //     email: "customer@example.com",
  //     phone: "0551234567",
  //   },
  //   plan: {
  //     name: "الذهبية",
  //     duration: "شهري",
  //   },
  //   startDate: "10-11-2023",
  //   renewalDate: "10-12-2023",
  //   status: "active" as const,
  //   paymentMethod: "Apple Pay",
  // };

  const handleRenewSubscription = () => {
    console.log("Renew subscription:", subscriptionData?._id);
    // Add your renewal logic here
    manageSubscriberMutation({
      action: "extend",
      reason: "تجديد الاشتراك من قبل المسؤول",
    }).then(() => {
      router.back();
    });
  };

  const handleCancelSubscription = () => {
    console.log("Cancel subscription:", subscriptionData?._id);
    // Add your cancellation logic here
    manageSubscriberMutation({
      action: "cancel",
      reason: "إلغاء الاشتراك من قبل المسؤول",
    }).then(() => {
      router.back();
    });
  };

  const getStatusTag = (status: string) => {
    const statusConfig: Record<
      string,
      { bg: string; color: string; label: string }
    > = {
      active: { bg: "#ECFDF5", color: "#007A55", label: "نشط" },
      inactive: { bg: "#FFF4ED", color: "#FF8C42", label: "غير نشط" },
      cancelled: { bg: "#FEE2E2", color: "#DC2626", label: "ملغي" },
      pending: { bg: "#FEE2E2", color: "#FF8C42", label: "معلق" },
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <Tag
        style={{
          backgroundColor: config.bg,
          color: config.color,
          border: "none",
        }}
        className="!px-6 !py-2 !rounded-xl"
      >
        {config.label}
      </Tag>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 md:w-[80%] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#F3F4F6]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#101828]">
              تفاصيل الاشتراك {subscriptionData?.subscriptionNumber}
            </h1>
          </div>
          <p className="text-[#6A7282]">
            مشترك منذ{" "}
            {dayjs(subscriptionData?.startDate).format("YYYY-MM-DD | hh:mm A")}
          </p>
        </div>
        {getStatusTag(subscriptionData?.status)}
      </div>

      {/* Main Content */}
      <Row gutter={[48, 48]}>
        {/* Right Column - Customer Information */}
        <Col xs={24} lg={12}>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-right">
              معلومات العميل
            </h2>
            <div className="space-y-4">
              <div className="flex items-center py-2 gap-1">
                <span className="text-gray-600">الاسم:</span>

                <span className="text-gray-900 font-medium">
                  {subscriptionData?.user.firstName}{" "}
                  {subscriptionData?.user.lastName}
                </span>
              </div>
              <div className="flex items-center py-2 gap-1">
                <span className="text-gray-600">البريد:</span>

                <span className="text-gray-900 font-medium">
                  {subscriptionData?.user.email}
                </span>
              </div>
              <div className="flex items-center py-2 gap-1">
                <span className="text-gray-600">الجوال:</span>

                <span className="text-gray-900 font-medium">
                  {subscriptionData?.user.phone}
                </span>
              </div>
            </div>
          </div>
        </Col>

        {/* Left Column - Plan Information */}
        <Col xs={24} lg={12}>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-right">
              معلومات الخطة
            </h2>
            <div className="space-y-4">
              <div className="flex items-center py-2 gap-1">
                <span className="text-gray-900 font-medium">
                  الخطة الحالية: {subscriptionData?.tier?.displayName}
                </span>
                <span className="text-gray-600"></span>
              </div>

              <div className="flex items-center py-2 gap-1">
                <span className="text-gray-600">التجديد القادم:</span>

                <span className="text-gray-900 font-medium">
                  {dayjs(subscriptionData?.endDate).format("YYYY-MM-DD")}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Payment and Invoice Section */}
      <div className="mt-12 bg-[#F9FAFB] rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-right">
          الدفع والفوترة
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">طريقة الدفع</span>

          <div className="flex items-center gap-3">
            <FiCreditCard className="text-2xl text-gray-600" />
            <span className="text-gray-900 font-medium">
              {subscriptionData?.paymentMethod}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex items-center gap-4">
        <Button
          type="primary"
          size="large"
          icon={<MdUpgrade />}
          onClick={() => {
            setSelectedTierId("");
            setIsUpgradeModalOpen(true);
          }}
          className="w-full"
        >
          ترقية خطة العضوية
        </Button>
        <Button
          type="default"
          size="large"
          onClick={handleCancelSubscription}
          className="w-full"
          disabled={
            manageSubscriberLoading || subscriptionData?.status === "cancelled"
          }
        >
          إلغاء الاشتراك
        </Button>
      </div>

      {/* Assign Membership Modal */}
      <Modal
        title="اختر خطة العضوية"
        open={isUpgradeModalOpen}
        onCancel={() => setIsUpgradeModalOpen(false)}
        confirmLoading={isAssigning}
        okText="تعيين الخطة"
        cancelText="إلغاء"
        centered
        okButtonProps={{ disabled: !selectedTierId }}
        onOk={async () => {
          if (!selectedTierId) return;
          await assignMembership(selectedTierId);
          setIsUpgradeModalOpen(false);
        }}
      >
        {plansLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#385B66]" />
          </div>
        ) : (
          <Radio.Group
            value={selectedTierId}
            onChange={(e) => setSelectedTierId(e.target.value)}
            className="w-full"
          >
            <div className="space-y-3 py-4">
              {allPlans?.tiers?.map((plan: any) => (
                <div
                  key={plan._id}
                  onClick={() => setSelectedTierId(plan._id)}
                  className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition-all ${
                    selectedTierId === plan._id
                      ? "border-[#385B66] bg-[#385B66]/5"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <div>
                    <p className="text-sm text-primary mt-0.5">
                      {plan.displayNameAr}
                    </p>
                  </div>
                  <Radio value={plan._id} />
                </div>
              ))}
            </div>
          </Radio.Group>
        )}
      </Modal>
    </div>
  );
};
