import { MembershipPlan } from "@/types/types";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  GiftOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Card, Row, Col, Button } from "antd";
import Image from "next/image";
import { FaCheck, FaRegStar } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";

export const SinglePricePlanDetails_section = ({
  membership,
}: {
  membership: MembershipPlan;
}) => {
  console.log(membership);
  return (
    <section className="single-plan-details">
      <div className={`single-plan `}>
        {/* Header Section */}
        {/* <div
          className={`top rounded-t-2xl p-8 text-white`}
          style={{ background: membership?.color }}
        >
          <div className=" flex justify-between items-start gap-4 mb-8">
            <div className="icon">
              {membership.name === "golden" ? (
                <LuCrown />
              ) : membership.name === "silver" ? (
                <FaRegStar />
              ) : (
                <IoDiamondOutline />
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-1 text-white">
                {membership.displayNameAr}
              </h2>
              <p className="text-sm opacity-90">{membership.displayName}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-5xl font-bold">{membership.price}</span>
            <span className="text-white/80 mr-3">
              / {membership.period} {membership.currency}
            </span>
          </div>
        </div> */}

        <div className="p-8">
          {/* Metrics Section */}
          <Row gutter={[24, 24]} justify="space-around">
            <Col xs={24} sm={12}>
              <div className="text-center bg-[#F8FAFC] rounded-xl py-4">
                <div
                  className={`text-4xl font-bold text-secondary flex items-center justify-center mb-2`}
                >
                  <CurrencyFormatter
                    amount={membership.price}
                    currency={membership?.currency}
                    amountClassName="text-4xl font-bold text-secondary"
                    iconSize={32}
                  />
                </div>
                <div className="text-sm text-gray-500">السعر</div>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="text-center bg-[#F8FAFC] rounded-xl py-4">
                <div className={`text-4xl font-bold text-primary mb-2`}>
                  {membership.discountRate}%
                </div>
                <div className="text-sm text-gray-500">خصم دائم</div>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="text-center bg-[#F8FAFC] rounded-xl py-4">
                <div className={`text-4xl font-bold text-primary mb-2`}>
                  {membership.pointsMultiplier}x
                </div>
                <div className="text-sm text-gray-500">مضاعف النقاط </div>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="text-center bg-[#F8FAFC] rounded-xl py-4">
                <div className={`text-4xl font-bold text-primary mb-2`}>
                  {membership.periodType}
                </div>
                <div className="text-sm text-gray-500">المده </div>
              </div>
            </Col>
          </Row>

          {/* Benefits Section */}
          <div className="!border-0 rounded-none">
            <h3 className="text-right text-lg font-bold my-6 text-primary">
              المزايا المتخصصة:
            </h3>
            <div className="space-y-3">
              {membership?.benefits?.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <FaCheck className="text-[#4BA246] text-lg" />
                  <span className="text-[#B0B0B3]">
                    {benefit.key} {benefit?.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Benefits Section */}
      {/* <div className="additional-benefits">
        <h3 className="text-lg font-bold mb-6 text-primary">
          مزايا إضافية عند الاشتراك:
        </h3>
        <Row gutter={[24, 24]}>
          {membership?.extraBenefits.map((benefit, idx) => (
            <Col key={idx} xs={24} sm={12}>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white rounded-xl p-3 flex items-center justify-center text-xl flex-shrink-0">
                  <FaCheck className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary">
                    {benefit.key}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{benefit.value}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div> */}

      {/* Points System Section */}
      {/* <div className={`points-system`}>
        <h3 className="font-bold mb-4 flex items-center gap-2 text-white text-xl">
          <StarOutlined />
          {membership?.pointsSection.title}
        </h3>
        <p className=" mb-4 text-white/90">
          {membership?.pointsSection.description}
        </p>
        <div className="bg-white/10 p-4 rounded-xl">
          <p className="mb-2">مثال:</p>
          <p className="font-bold">{membership?.pointsSection.example}</p>
        </div>
      </div> */}
    </section>
  );
};
