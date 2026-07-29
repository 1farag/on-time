import { Col, Row } from "antd";
import { PiShoppingBagBold } from "react-icons/pi";
import { FiCheckCircle, FiGift } from "react-icons/fi";
import { MdOutlineLoyalty } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";

export const AffiliateProgramFeatures_section = () => {
  return (
    <section className="affiliate-program-features">
      <div className="container">
        <Row gutter={[32, 32]}>
          <Col span={24} lg={8}>
            <div className="cardS1">
              <div className="icon">
                <FaArrowTrendUp />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                عمولات تنافسية
              </h5>
              <p className="text-[#B0B0B3]">
                احصل على عمولة تصل إلى 15% على كل عملية بيع{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="cardS1">
              <div className="icon">
                <FiGift />{" "}
              </div>
              <h5 className="text-secondary font-bold text-xl">
                مكافآت إضافية
              </h5>
              <p className="text-[#B0B0B3]">
                مكافآت خاصة عند تحقيق أهداف المبيعات الشهرية{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="cardS1">
              <div className="icon">
                <FiCheckCircle />
              </div>
              <h5 className="text-secondary font-bold text-xl">سحب سريع </h5>
              <p className="text-[#B0B0B3]">
                اسحب أرباحك بسهولة خلال 3-5 أيام عمل{" "}
              </p>
            </div>
          </Col>{" "}
        </Row>
      </div>
    </section>
  );
};
