import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { CiShare2 } from "react-icons/ci";
import { FaI } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { PiShoppingBagBold } from "react-icons/pi";

export const HowToEarnPointsAdvices_section = () => {
  return (
    <section className="how-earn-points-advices container mb-24">
      <h3 className="text-center mb-8 text-2xl font-bold">
        نصائح لكسب المزيد من النقاط{" "}
      </h3>
      <Row gutter={[50, 24]}>
        <Col lg={12}>
          <div className="flex items-center gap-4">
            <span className="number">1</span>
            <div>
              <h5 className="mb-1 font-bold">تسوق بانتظام</h5>
              <p className="text-sm">كلما تسوقت أكثر، كلما كسبت نقاط أكثر</p>
            </div>
          </div>
        </Col>
        <Col lg={12}>
          <div className="flex items-center gap-4">
            <span className="number">2</span>
            <div>
              <h5 className="mb-1 font-bold">اشترك في العضوية</h5>
              <p className="text-sm">
                احصل على مضاعف نقاط أعلى مع العضويات المميزة
              </p>
            </div>
          </div>
        </Col>
        <Col lg={12}>
          <div className="flex items-center gap-4">
            <span className="number">3</span>
            <div>
              <h5 className="mb-1 font-bold">راقب العروض الموسمية</h5>
              <p className="text-sm">نقاط مضاعفة في المناسبات والعطلات</p>
            </div>
          </div>
        </Col>
        <Col lg={12}>
          <div className="flex items-center gap-4">
            <span className="number">4</span>
            <div>
              <h5 className="mb-1 font-bold">ادعُ أصدقاءك</h5>
              <p className="text-sm">اكسب نقاط إضافية عندما يشتري أصدقاؤك</p>
            </div>
          </div>
        </Col>
      </Row>
      <div className="mt-10 flex items-center justify-center">
        <Link
          href="/products"
          className="w-fit flex items-center justify-center bg-white  text-primary hover:text-primary px-12 py-2 rounded-lg text-md font-medium"
        >
          ابدأ التسوق الآن{" "}
        </Link>
      </div>
    </section>
  );
};
