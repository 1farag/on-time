"use client";

import style from "./styles/singlePricePlan.module.scss";
import { Col, Row, Skeleton } from "antd";
import { OrderPlanSummary_section } from "./sections/OrderPlanSummary_section";
import { SinglePricePlanDetails_section } from "./sections/SinglePricePlanDetails_section";
import { useGetSingleMembershipPlan } from "./hooks/useGetSingleMembershipPlan";
import Image from "next/image";

interface SinglePricePlanProps {
  id: string;
}

export const SinglePricePlanComponent: React.FC<SinglePricePlanProps> = ({
  id,
}) => {
  const { data, isLoading, error } = useGetSingleMembershipPlan(id);

  if (isLoading) {
    return (
      <main className={style.singlePricePlan}>
        <div className="container">
          <Skeleton active paragraph={{ rows: 10 }} />
        </div>
      </main>
    );
  }

  if (error || !data?.tier) {
    return (
      <main className={style.singlePricePlan}>
        <div className="container text-center py-10 text-xl font-bold text-gray-500">
          لم يتم العثور على الباقة المطلوبة
        </div>
      </main>
    );
  }

  const membership = data.tier;

  return (
    <main className={style.singlePricePlan}>
      <div className="container">
        <div className="relative h-[200px] md:h-[350px] mb-20">
          <Image
            src={
              membership.name === "basic_membership"
                ? "/membership/basic_membership_bg.png"
                : membership.name === "al_tai_membership"
                  ? "/membership/al_tai_membership_bg.png"
                  : membership.name === "al_hatimi_membership"
                    ? "/membership/al_hatimi_membership_bg.png"
                    : membership.name === "grey_membership"
                      ? "/membership/grey_membership_bg.png"
                      : ""
            }
            alt={`${membership.name} plan`}
            fill
            objectFit="cover"
          />
        </div>
        <Row gutter={[32, 32]}>
          <Col span={24} lg={16}>
            <SinglePricePlanDetails_section membership={membership} />
          </Col>
          <Col span={24} lg={8}>
            <OrderPlanSummary_section details={membership as any} />
          </Col>
        </Row>
      </div>
    </main>
  );
};
