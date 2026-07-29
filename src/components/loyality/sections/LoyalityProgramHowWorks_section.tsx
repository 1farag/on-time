import { Col, Row } from "antd";
import { PiShoppingBagBold } from "react-icons/pi";
import { FiGift } from "react-icons/fi";
import { MdOutlineLoyalty } from "react-icons/md";

export const LoyalityProgramHowWorks_section = () => {
  return (
    <section className="loyality-program-how-works py-20">
      <div className="container">
        <h3 className="text-center text-secondary text-2xl font-bold">
          كيف يعمل البرنامج؟
        </h3>
        <p className="text-center text-lg text-[#9D9DA1] mt-4 mb-10">
          ثلاث خطوات بسيطة للاستمتاع بالمكافآت
        </p>
        <Row gutter={[32, 32]}>
          <Col span={24} lg={8}>
            <div className="how-works-card">
              <div className="flex items-center justify-center rounded-full font-bold text-lg absolute top-[-15px] right-12 w-8 h-8 bg-secondary text-white">
                1
              </div>
              <div className="icon">
                <PiShoppingBagBold />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                التسجيل في البرنامج
              </h5>
              <p className="text-primary text-center">
                عند إنشاء حساب في المتجر، يمكنك الانضمام تلقائيًا إلى برنامج
                الولاء أو تفعيله من خلال إعدادات الحساب.{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="how-works-card">
              <div className="flex items-center justify-center rounded-full font-bold text-lg absolute top-[-15px] right-12 w-8 h-8 bg-secondary text-white">
                2
              </div>
              <div className="icon">
                <MdOutlineLoyalty />{" "}
              </div>
              <h5 className="text-secondary font-bold text-xl">كسب النقاط</h5>
              <p className="text-primary text-center">
                تحصل على نقاط لكل عملية شراء تقوم بها، حيث تختلف عدد النقاط حسب
                قيمة الطلب. بعض العروض الخاصة قد تمنحك نقاطًا إضافية على
                المنتجات المختارة.
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="how-works-card">
              <div className="flex items-center justify-center rounded-full font-bold text-lg absolute top-[-15px] right-12 w-8 h-8 bg-secondary text-white">
                3
              </div>
              <div className="icon">
                <FiGift />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                استبدال النقاط بالمكافآت
              </h5>
              <p className="text-primary text-center">
                يمكن استبدال النقاط التي جمعتها بخصومات على الطلبات المستقبلية
                أو منتجات حصرية من المتجر. سيتم توضيح قيمة النقاط مقابل المكافآت
                في حسابك الشخصي.
              </p>
            </div>
          </Col>{" "}
        </Row>
      </div>
    </section>
  );
};
