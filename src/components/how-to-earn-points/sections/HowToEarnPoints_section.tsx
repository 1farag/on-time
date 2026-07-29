"use client";
import { Col, Row, Skeleton } from "antd";
import { FiGift } from "react-icons/fi";
import { useGetEarnMethods } from "../hooks/useGetEarnMethods";

export const HowToEarnPoints_section = () => {
  const { data, isLoading } = useGetEarnMethods();

  return (
    <section className="how-earn-points py-20">
      <div className="container">
        <h3 className="text-center text-secondary mb-8 text-2xl font-bold">
          طرق كسب النقاط الرئيسية{" "}
        </h3>

        <Row gutter={[24, 24]}>
          {isLoading ? (
            // Render some skeleton cards while loading
            Array.from({ length: 3 }).map((_, index) => (
              <Col span={24} lg={8} key={index}>
                <Skeleton active paragraph={{ rows: 3 }} />
              </Col>
            ))
          ) : data?.methods && data.methods.length > 0 ? (
            data.methods.map((method, index) => {
              return (
                <Col span={24} lg={8} key={index}>
                  <div className="how-earn-points-card">
                    <div className="icon primary">
                      <FiGift />
                    </div>
                    <h5 className="text-secondary font-bold text-xl">
                      {method.description}
                    </h5>
                    <p className="font-bold text-primary">
                      <span className="text-4xl text-secondary">
                        {method.pointsPerAction || "متغير"}
                      </span>
                      نقطة
                    </p>
                    {/* <p className=" text-primary">{method.description}</p> */}
                    {/* {method.timesCompleted !== undefined && (
                      <p className="bg-[#F8FAFC] rounded-lg p-4 flex flex-col">
                        <span className="text-[#B0B0B3]">مرات الإكمال:</span>
                        <span>{method.timesCompleted} مرات</span>{" "}
                      </p>
                    )} */}
                  </div>
                </Col>
              );
            })
          ) : (
            <div className="w-full text-center text-primary py-10">
              لا توجد طرق كسب نقاط متاحة حالياً.
            </div>
          )}
        </Row>
      </div>
    </section>
  );
};
