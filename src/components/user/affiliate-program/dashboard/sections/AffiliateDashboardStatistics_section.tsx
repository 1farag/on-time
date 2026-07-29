import { Col, Row, Skeleton } from "antd";
import React from "react";
import { FaDollarSign } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { GoPeople } from "react-icons/go";

interface AffiliateDashboardStatisticsProps {
  performance: {
    totalSales: number;
    conversionRate: number;
    commissionRate: number;
    totalOrders: number;
  };
  balance: {
    available: number;
    totalEarned: number;
  };
  currency: string;
  loading: boolean;
}

export const AffiliateDashboardStatistics_section: React.FC<
  AffiliateDashboardStatisticsProps
> = ({ performance, balance, currency, loading }) => {
  return (
    <section className="my-24">
      <Row gutter={[32, 32]}>
        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon secondary">
              <FaDollarSign />
            </div>
            <span className="text-[#B0B0B3]">إجمالي الأرباح</span>

            {loading ? (
              <Skeleton.Input active size="small" style={{ width: 80 }} />
            ) : (
              <p className="text-secondary font-bold text-2xl">
                {balance?.totalEarned || 0} {currency}
              </p>
            )}
          </div>
        </Col>

        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon primary">
              <GoPeople />
            </div>
            <span className="text-[#B0B0B3]">إجمالي المبيعات</span>

            {loading ? (
              <Skeleton.Input active size="small" style={{ width: 80 }} />
            ) : (
              <p className="text-secondary font-bold text-2xl">
                {performance?.totalSales || 0} {currency}
              </p>
            )}
          </div>
        </Col>

        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon secondary">
              <FaDollarSign />
            </div>
            <span className="text-[#B0B0B3]">الرصيد المتاح</span>

            {loading ? (
              <Skeleton.Input active size="small" style={{ width: 100 }} />
            ) : (
              <p className="text-secondary font-bold text-2xl">
                {balance?.available || 0} {currency}
              </p>
            )}
          </div>
        </Col>

        <Col span={24} lg={6}>
          <div className="cardS1">
            <div className="icon primary">
              <FiShoppingCart />
            </div>
            <span className="text-[#B0B0B3]">الطلبات المكتملة</span>

            {loading ? (
              <Skeleton.Input active size="small" style={{ width: 80 }} />
            ) : (
              <p className="text-secondary font-bold text-2xl">
                {performance?.totalOrders || 0}
              </p>
            )}
          </div>
        </Col>
      </Row>
    </section>
  );
};
