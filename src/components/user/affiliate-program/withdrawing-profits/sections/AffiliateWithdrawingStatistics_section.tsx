import { Col, Row, Skeleton } from "antd";
import React from "react";
import { FaDollarSign } from "react-icons/fa6";

interface AffiliateWithdrawingStatisticsProps {
  details: {
    totalWithdrawn: string;
    minimumWithdrawalAmount: any;
    availableCommission?: string;
    minimumWithdraw?: string;
    availableBalance: string;
    currency: string;
  };
  loading: boolean;
}

export const AffiliateWithdrawingStatistics_section: React.FC<
  AffiliateWithdrawingStatisticsProps
> = ({ details, loading }) => {
  const currency = "ر.س"; // You can also get it from details.currency if provided

  const stats = [
    {
      title: "الرصيد المتاح للسحب",
      value: details?.availableBalance ?? 0,
      icon: <FaDollarSign />,
      type: "secondary",
      key: "available",
    },
    {
      title: "الحد الأدنى للسحب",
      value: details?.minimumWithdrawalAmount, // If this comes from API, replace with details.minimumWithdraw ?? 0
      icon: <FaDollarSign />,
      type: "primary",
      key: "minimum",
    },
    {
      title: "إجمالي المسحوبات",
      value: details?.totalWithdrawn ?? 0,
      icon: <FaDollarSign />,
      type: "secondary",
      key: "withdrawn",
    },
  ];

  return (
    <section className="mt-24">
      <Row gutter={[32, 32]}>
        {stats.map((stat) => (
          <Col span={24} lg={8} key={stat.key}>
            <div className="cardS1">
              <div className={`icon ${stat.type}`}>{stat.icon}</div>
              <span className="text-[#B0B0B3]">{stat.title}</span>
              {loading ? (
                <Skeleton.Input
                  active
                  size="default"
                  style={{ width: 120, marginTop: 8 }}
                />
              ) : (
                <p className="text-secondary font-bold text-2xl mt-2">
                  {stat.value.toLocaleString()} {details.currency}
                </p>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};
