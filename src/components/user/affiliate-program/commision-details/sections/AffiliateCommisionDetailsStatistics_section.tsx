import { Col, Row, Skeleton } from "antd";
import { FaDollarSign } from "react-icons/fa6";
import { MdPercent } from "react-icons/md";

interface AffiliateCommissionDetailsData {
  currency?: string;
  balance?: {
    totalEarned?: number;
  };
  performance?: {
    commissionRate?: number;
  };
  commissionStats?: {
    confirmed?: {
      total?: number;
    };
    pending?: {
      total?: number;
    };
  };
}

interface AffiliateCommisionDetailsStatisticsProps {
  data: AffiliateCommissionDetailsData;
  loading: boolean;
}

export const AffiliateCommisionDetailsStatistics_section = ({
  data,
  loading,
}: AffiliateCommisionDetailsStatisticsProps) => {
  const currency = data?.currency || "SAR";

  const stats = [
    {
      title: "إجمالي العمولات",
      value: data?.balance?.totalEarned ?? 0,
      icon: <FaDollarSign />,
      type: "secondary",
      isPercent: false,
      key: "totalEarned",
      dataKey: data?.balance?.totalEarned ?? 0,
    },
    {
      title: "متوسط نسبة العمولة",
      value: data?.performance?.commissionRate ?? 0,
      icon: <MdPercent />,
      type: "primary",
      isPercent: true,
      key: "commissionRate",
      dataKey: data?.performance?.commissionRate ?? 0,
    },
    {
      title: "العمولات المكتملة",
      value: data?.commissionStats?.confirmed?.total ?? 0,
      icon: <FaDollarSign />,
      type: "secondary",
      isPercent: false,
      key: "confirmed",
      dataKey: data?.commissionStats?.confirmed?.total ?? 0,
    },
    {
      title: "قيد المعالجة",
      value: data?.commissionStats?.pending?.total ?? 0,
      icon: <FaDollarSign />,
      type: "primary",
      isPercent: false,
      key: "pending",
      dataKey: data?.commissionStats?.pending?.total ?? 0,
    },
  ];

  return (
    <section className="mt-24">
      <Row gutter={[32, 32]}>
        {stats.map((stat) => (
          <Col span={24} lg={6} key={stat.key}>
            <div className="cardS1">
              <div className={`icon ${stat.type}`}>{stat.icon}</div>
              <span className="text-[#B0B0B3]">{stat.title}</span>
              {loading ? (
                <Skeleton.Input
                  active
                  size="default"
                  style={{ width: "120px", marginTop: 8 }}
                />
              ) : (
                <p className="text-secondary font-bold text-2xl mt-2">
                  {stat.isPercent
                    ? `${stat.value}%`
                    : `${stat.value.toFixed(2)} ${currency}`}
                </p>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};
