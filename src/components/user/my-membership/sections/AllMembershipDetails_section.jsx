import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { FaArrowTrendUp, FaChevronLeft, FaRegClock } from "react-icons/fa6";
import { GiftOutlined } from "@ant-design/icons";
import PointsItem from "./PointsItems";
import { useGetLoyaltyHistory } from "../hooks/useGetLoyaltyHistory";

/**
 * @param {{
 *   membership: import("../hooks/useGetMyMembership").MyMembershipData["membership"];
 *   benefits: string[] | Array<{ key?: string; value?: unknown }>;
 *   loyaltyHistoryPlaceholder?: import("../hooks/useGetLoyaltyHistory").LoyaltyHistoryItem[];
 * }} props
 */
export const AllMembershipDetails_section = ({
  membership,
  benefits,
  loyaltyHistoryPlaceholder,
}) => {
  const useRemoteLoyalty = loyaltyHistoryPlaceholder === undefined;
  const { data: loyaltyHistoryData, isLoading: isLoadingLoyalty } =
    useGetLoyaltyHistory({ limit: 3, enabled: useRemoteLoyalty });
  const recentLoyalty = useRemoteLoyalty
    ? loyaltyHistoryData?.data?.history || []
    : loyaltyHistoryPlaceholder;

  return (
    <section className="all-membership-details">
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <div className="cardS1 h-full flex flex-col justify-between">
            <div className="mb-5 flex items-center gap-3">
              <div className="w-14 h-14 flex items-center justify-center bg-primary rounded-xl text-white text-2xl">
                <FaArrowTrendUp />
              </div>
              <div className="flex flex-col">
                <span className="text-[#B0B0B3]">إجمالي الإنفاق</span>
                <span className="font-bold text-3xl">
                  {membership?.totalSpend || 0}
                </span>
              </div>
            </div>
            <Link
              href="/user/loyalty-program"
              className="w-full flex items-center justify-center bg-transparent  text-primary hover:text-primary border-2 border-primary px-12 py-4 rounded-lg text-lg font-bold"
            >
              عرض نظام النقاط
            </Link>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="cardS1 h-full flex flex-col justify-center">
            <div className="mb-5 flex items-center gap-3">
              <div className="w-14 h-14 flex items-center justify-center bg-primary rounded-xl text-white text-2xl">
                <FaRegClock />
              </div>
              <div className="flex flex-col">
                <span className="text-primary">المدة المتبقية</span>
                <span className="font-bold text-3xl">
                  {membership != null ? membership?.daysRemaining ?? 0 : "—"}
                </span>
              </div>
            </div>
            <p className="font-bold text-primary">
              {membership != null ? "يوم حتى التجديد" : "الباقة الافتراضية — لا اشتراك مدفوع"}
            </p>
          </div>
        </Col>
        <Col xs={24}>
          <div className="additional-benefits cardS1">
            <h3 className="text-lg font-bold mb-6 text-primary">
              مزاياك الحالية
            </h3>
            <Row gutter={[24, 24]}>
              {benefits?.map((benefit, idx) => (
                <Col key={idx} xs={24} sm={12}>
                  <div className=" flex items-center gap-4">
                    <div
                      className={`bg-primary text-white rounded-xl p-3 flex items-center justify-center text-xl`}
                    >
                      <GiftOutlined />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-primary">
                        {typeof benefit === "string"
                          ? benefit
                          : [benefit?.key, benefit?.value].filter(Boolean).join(" ") ||
                            ""}
                      </h4>
                    </div>
                  </div>
                </Col>
              ))}
              {!benefits?.length && (
                <Col xs={24}>
                  <p className="text-gray-500">لا توجد مزايا متاحة حاليا</p>
                </Col>
              )}
            </Row>
          </div>
        </Col>

        <Col xs={24}>
          <div className="cardS1">
            <div className="mb-6 flex items-center justify-between">
              <h5 className="font-bold text-xl text-[#111113]">
                النشاط الأخير
              </h5>
              <Link
                href={"/user/loyalty-program/points-history"}
                className="flex items-center gap-2 text-primary hover:text-primary font-bold"
              >
                عرض الكل
                <FaChevronLeft />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {isLoadingLoyalty ? (
                <div className="text-center py-4 text-gray-400">
                  جاري التحميل...
                </div>
              ) : recentLoyalty.length > 0 ? (
                recentLoyalty.map((item) => (
                  <PointsItem
                    key={item._id}
                    date={new Date(item.createdAt).toLocaleDateString("ar-EG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    title={item.type === "earned" ? "كسب نقاط" : "استبدال نقاط"}
                    subtitle={item.description || item.source}
                    points={item.points}
                    type={item.type === "earned" ? "earn" : "redeem"}
                  />
                ))
              ) : (
                <div className="text-center py-6 text-gray-400 text-sm">
                  لا توجد نشاطات حديثة
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};
