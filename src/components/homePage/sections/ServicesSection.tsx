"use client";

import { Col, Row } from "antd";
import { RiBuilding2Line } from "react-icons/ri";

const services = [
  {
    id: "01",
    title: "Software Development.",
    description:
      "Creating innovative web, mobile, and cloud-based solutions from concept to launch.",
  },
  {
    id: "02",
    title: "Software Development.",
    description:
      "Creating innovative web, mobile, and cloud-based solutions from concept to launch.",
  },
  {
    id: "03",
    title: "Software Development.",
    description:
      "Creating innovative web, mobile, and cloud-based solutions from concept to launch.",
  },
];

export const ServicesSection = () => {
  return (
    <section
      className="relative py-32 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/about-bg.png')",
      }}
      id="services"
    >
      <div className="container relative z-10">
        {/* Header */}
        <Row gutter={[64, 40]} className="mb-20">
          <Col xs={24} lg={10}>
            <h2 className="text-primary text-5xl font-bold mb-5">
              Our Services
            </h2>

            <p className="text-white text-2xl leading-relaxed max-w-md">
              Strategic foundations driving our vision forward.
            </p>
          </Col>

          <Col xs={24} lg={14}>
            <p className="text-white text-3xl leading-[1.7] max-w-4xl">
              We combine creativity, technology, and strategic thinking to build
              digital solutions that empower brands and create lasting impact.
            </p>
          </Col>
        </Row>

        {/* Cards */}
        <Row gutter={[24, 24]}>
          {services.map((service) => (
            <Col xs={24} md={12} xl={8} key={service.id}>
              <ServiceCard {...service} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

type CardProps = {
  id: string;
  title: string;
  description: string;
};

const ServiceCard = ({ id, title, description }: CardProps) => {
  return (
    <div className="group h-full rounded-[28px] border border-white/40 bg-white/[0.02] backdrop-blur-sm p-9 transition-all duration-300 hover:border-primary hover:bg-white/[0.04]">
      <div className="w-16 h-16 rounded-2xl bg-[#3B3429] border border-white/10 flex items-center justify-center mb-8">
        <RiBuilding2Line className="text-primary text-3xl" />
      </div>

      <span className="text-primary text-sm tracking-[0.3em]">{id}</span>

      <h3 className="text-white text-3xl font-semibold mt-4 mb-5">{title}</h3>

      <p className="text-white/60 text-lg leading-8">{description}</p>
    </div>
  );
};
