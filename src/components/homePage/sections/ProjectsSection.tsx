"use client";

import { Col, Row } from "antd";
import Image from "next/image";

const clients = [
  "/images/clients/client-1.svg",
  "/images/clients/client-2.svg",
  "/images/clients/client-3.svg",
  "/images/clients/client-4.svg",
  "/images/clients/client-5.svg",
  "/images/clients/client-1.svg",
  "/images/clients/client-2.svg",
  "/images/clients/client-3.svg",
  "/images/clients/client-4.svg",
  "/images/clients/client-5.svg",
  "/images/clients/client-3.svg",
  "/images/clients/client-4.svg",
];

export const ProjectsSection = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/images/clients-bg.png')",
      }}
      id="projects"
    >
      <div className="container relative z-10">
        {/* Header */}
        <Row gutter={[64, 48]} className="mb-20">
          <Col xs={24} lg={24}>
            <h2 className="text-primary text-5xl font-bold mb-5">
              Our Projects
            </h2>

            <p className="text-white text-2xl leading-relaxed">
              Where ideas become digital experiences.{" "}
            </p>
          </Col>
        </Row>

        {/* Logos */}
        <Row gutter={[48, 56]} align="middle">
          {clients.map((logo, index) => (
            <Col xs={12} md={8} lg={4} key={index}>
              <div className="flex items-center justify-center h-20 opacity-80 transition-all duration-300 hover:opacity-100 hover:scale-105">
                <Image
                  src={logo}
                  alt={`Client ${index + 1}`}
                  width={170}
                  height={60}
                  className="object-contain w-auto h-14"
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};
