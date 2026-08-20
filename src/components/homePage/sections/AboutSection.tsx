"use client";

import { Col, Row } from "antd";
import { motion } from "framer-motion";
import { LuLightbulb } from "react-icons/lu";
import { easeOutExpo, FadeIn } from "../motion";

const features = ["Deep Insights", "Creative Strategy", "Seamless Execution"];

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
          <Col xs={24} lg={8}>
            <FadeIn className="sticky top-24" y={28}>
              <h2 className="text-primary text-5xl font-bold mb-4">About Us</h2>

              <p className="text-white text-2xl leading-relaxed max-w-sm">
                Where technology meets creative vision.
              </p>
            </FadeIn>
          </Col>

          <Col xs={24} lg={16}>
            <div className="flex flex-col gap-8">
              <FadeIn delay={0.1}>
                <p className="text-white/90 text-xl leading-[2]">
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since 1966, when designers at Letraset and James
                  Mosley,
                </p>
              </FadeIn>

              <FadeIn delay={0.22}>
                <p className="text-primary text-xl leading-[2]">
                  the librarian at St Bride Printing Library, took a 1914 Cicero
                  translation and scrambled it to make dummy text for
                  Letraset&apos;s Body Type sheets. It has survived not only many
                  decades, but also the leap into electronic typesetting,
                  remaining essentially unchanged.
                </p>
              </FadeIn>

              <div className="flex flex-wrap gap-x-12 gap-y-6 pt-6">
                {features.map((title, index) => (
                  <Feature key={title} title={title} delay={0.32 + index * 0.12} />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

const Feature = ({ title, delay }: { title: string; delay: number }) => {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay, ease: easeOutExpo }}
      whileHover={{ x: 4 }}
    >
      <motion.span
        initial={{ rotate: -20, scale: 0.8 }}
        whileInView={{ rotate: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.05, ease: easeOutExpo }}
      >
        <LuLightbulb className="text-white text-3xl" />
      </motion.span>
      <span className="text-primary text-2xl font-semibold">{title}</span>
    </motion.div>
  );
};
