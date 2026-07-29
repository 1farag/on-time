import { Col, Row } from "antd";
import { BsFillPeopleFill } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { FaPercent, FaRegHeart, FaRegStar } from "react-icons/fa6";
import { FiGift } from "react-icons/fi";
import { GoPersonAdd } from "react-icons/go";
import { LuBadgeCheck } from "react-icons/lu";
import { MdOutlineShare } from "react-icons/md";
import { PiShoppingBagBold } from "react-icons/pi";

export const HowToEarnPointsAdditionalPoints_section = () => {
  return (
    <section className="additional-points py-20">
      <div className="container">
        <h3 className="text-center text-secondary mb-8 text-2xl font-bold">
          فرص النقاط الإضافية{" "}
        </h3>

        <Row gutter={[24, 24]}>
          <Col span={24} lg={8}>
            <div className="additional-points-card">
              <div className=" text-4xl">
                <LuBadgeCheck />
              </div>
              <p className="font-bold text-4xl ">2x</p>

              <h5 className="font-bold text-xl">مكافأة الولاء </h5>
              <p className="">نقاط إضافية عند الوصول لعدد معين من المشتريات</p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="additional-points-card">
              <div className=" text-4xl">
                <BsFillPeopleFill />
              </div>
              <p className="font-bold text-4xl ">100</p>

              <h5 className="font-bold text-xl">برنامج الإحالة </h5>
              <p className="">احصل على نقاط عندما يشتري أصدقاؤك</p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="additional-points-card">
              <div className=" text-4xl">
                <FaRegHeart />
              </div>
              <p className="font-bold text-4xl ">3x</p>

              <h5 className="font-bold text-xl">المناسبات الخاصة </h5>
              <p className="">نقاط مضاعفة في المناسبات والأعياد</p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
