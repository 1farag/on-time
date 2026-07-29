import { Col, Row } from "antd";
import Link from "next/link";
import { FaChevronLeft, FaDollarSign } from "react-icons/fa6";
import { FiLink, FiPercent, FiShoppingCart } from "react-icons/fi";
import { GoPeople } from "react-icons/go";

export const AffiliateDashboardKnownData_section = () => {
  return (
    <section className="my-24">
      <Row gutter={[32, 32]}>
        <Col span={24} lg={8}>
          <div className="cardS1">
            <div className="icon primary">
              <FiLink />
            </div>
            <h4 className="text-[#111113] font-bold my-4 text-xl">
              روابط الإحالة
            </h4>
            <Link
              href="/user/affiliate-program/main-links"
              className="flex items-center gap-2 text-[#B0B0B3]"
            >
              إدارة روابط الأفلييت الخاصة بك
              <FaChevronLeft />
            </Link>
          </div>
        </Col>
        <Col span={24} lg={8}>
          <div className="cardS1">
            <div className="icon secondary">
              <FiPercent />
            </div>
            <h4 className="text-[#111113] font-bold my-4 text-xl">العمولات </h4>
            <Link
              href="/user/affiliate-program/commision-details"
              className="flex items-center gap-2 text-[#B0B0B3]"
            >
              عرض تفاصيل العمولات والأرباح
              <FaChevronLeft />
            </Link>
          </div>
        </Col>
        <Col span={24} lg={8}>
          <div className="cardS1">
            <div className="icon primary">
              <FaDollarSign />
            </div>
            <h4 className="text-[#111113] font-bold my-4 text-xl">
              سحب الأرباح{" "}
            </h4>
            <Link
              href="/user/affiliate-program/withdrawing-profits"
              className="flex items-center gap-2 text-[#B0B0B3]"
            >
              طلب سحب الأرباح المتاحة
              <FaChevronLeft />
            </Link>
          </div>
        </Col>{" "}
      </Row>
    </section>
  );
};
