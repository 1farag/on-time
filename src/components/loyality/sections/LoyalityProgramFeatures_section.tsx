import { Col, Row } from "antd";
import { PiShoppingBagBold } from "react-icons/pi";
import { FiGift } from "react-icons/fi";
import { FaPercent } from "react-icons/fa6";
import { RxLightningBolt } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";

export const LoyalityProgramFeatures_section = () => {
  return (
    <section className="loyality-program-features py-20">
      <div className="container">
        <h3 className="text-center text-secondary text-2xl font-bold">
          مميزات برنامج الولاء{" "}
        </h3>
        <p className="text-center text-lg text-[#9D9DA1] mt-4 mb-10">
          استمتع بمزايا حصرية كعضو في برنامج الولاء{" "}
        </p>
        <Row gutter={[32, 32]}>
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon">
                <FaPercent />
              </div>
              <h5 className="text-secondary font-bold text-xl">عروض حصرية</h5>
              <p className="text-[#B0B0B3]">
                عروض حصرية ومبكرة على المنتجات الجديدة.{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon">
                <RxLightningBolt />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                دعوات لمناسبات واحتفالات
              </h5>
              <p className="text-[#B0B0B3]">
                دعوات لمناسبات واحتفالات خاصة بالنادي.
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon">
                <BsBoxSeam />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                هدايا ومكافآت
              </h5>
              <p className="text-[#B0B0B3]">
                هدايا ومكافآت إضافية في المناسبات الخاصة مثل أعياد الميلاد
                والعضويات السنوية.{" "}
              </p>
            </div>
          </Col>{" "}
        </Row>
      </div>
    </section>
  );
};
