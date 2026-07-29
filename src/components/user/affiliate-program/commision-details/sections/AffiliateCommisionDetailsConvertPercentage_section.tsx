import { Col, Row } from "antd";
import React from "react";
import { MdPercent } from "react-icons/md";

export const AffiliateCommisionDetailsConvertPercentage_section = () => {
  return (
    <section className="convert-percentage my-10">
      <h3 className="font-bold text-xl text-white mb-6">نسب العمولات</h3>

      <Row gutter={[24, 24]}>
        <Col span={24} lg={8}>
          <div className="bg-white/10 text-white rounded-2xl flex items-center justify-center flex-col gap-3 p-6">
            <MdPercent className="text-3xl" />
            <span className="text-white/80">ملابس وإكسسوارات</span>
            <span className="font-bold text-3xl">10-15%</span>
          </div>
        </Col>
        <Col span={24} lg={8}>
          <div className="bg-white/10 text-white rounded-2xl flex items-center justify-center flex-col gap-3 p-6">
            <MdPercent className="text-3xl" />
            <span className="text-white/80">بطاقات العضوية</span>
            <span className="font-bold text-3xl">15%</span>
          </div>
        </Col>
        <Col span={24} lg={8}>
          <div className="bg-white/10 text-white rounded-2xl flex items-center justify-center flex-col gap-3 p-6">
            <MdPercent className="text-3xl" />
            <span className="text-white/80">منتجات خاصة</span>
            <span className="font-bold text-3xl">12%</span>
          </div>
        </Col>
      </Row>
    </section>
  );
};
