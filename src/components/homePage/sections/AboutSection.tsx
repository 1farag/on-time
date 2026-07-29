"use client";

import { Col, Row } from "antd";
import { LuLightbulb } from "react-icons/lu";

export const AboutSection = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/about-bg.png')",
      }}
      id="about"
    >
      <div className="container relative z-10">
        <Row gutter={[80, 40]} align="top">
          {/* Left */}
          <Col xs={24} lg={8}>
            <div className="sticky top-24">
              <h2 className="text-primary text-5xl font-bold mb-4">About Us</h2>

              <p className="text-white text-2xl leading-relaxed max-w-sm">
                Where technology meets creative vision.
              </p>
            </div>
          </Col>

          {/* Right */}
          <Col xs={24} lg={16}>
            <div className="flex flex-col gap-8">
              <p className="text-white/90 text-xl leading-[2]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since 1966, when designers at Letraset and James
                Mosley,
              </p>

              <p className="text-primary text-xl leading-[2]">
                the librarian at St Bride Printing Library, took a 1914 Cicero
                translation and scrambled it to make dummy text for
                Letraset&apos;s Body Type sheets. It has survived not only many
                decades, but also the leap into electronic typesetting,
                remaining essentially unchanged.
              </p>

              <div className="flex flex-wrap gap-x-12 gap-y-6 pt-6">
                <Feature title="Deep Insights" />
                <Feature title="Creative Strategy" />
                <Feature title="Seamless Execution" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

const Feature = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-3">
      <LuLightbulb className="text-white text-3xl" />
      <span className="text-primary text-2xl font-semibold">{title}</span>
    </div>
  );
};
