"use client";

import { Col, Row } from "antd";
import { motion } from "framer-motion";
import { RiBuilding2Line } from "react-icons/ri";
import { easeOutExpo, FadeIn } from "../motion";

const services = [
  {
    id: "01",
    title: "Venture Development",
    description:
      "We identify opportunities and transform innovative ideas into scalable, market-ready ventures through strategy, technology, and strong partnerships.",
  },
  {
    id: "02",
    title: "Business Operations",
    description:
      "We build and operate businesses with efficient models, smart technologies, and customer-focused solutions designed for sustainable growth.",
  },
  {
    id: "03",
    title: "Partnerships",
    description:
      "We go to promising opportunities & create strategic partnerships that combine capital, expertise, technology, and market access.",
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
        <Row gutter={[64, 40]} className="mb-20">
          <Col xs={24} lg={10}>
            <FadeIn>
              <h2 className="text-primary text-5xl font-bold mb-5">
                Our Services
              </h2>

              <p className="text-white text-2xl leading-relaxed max-w-md">
                We Build. We Operate. We Grow.{" "}
              </p>
            </FadeIn>
          </Col>

          <Col xs={24} lg={14}>
            <FadeIn delay={0.15}>
              <p className="text-white text-3xl leading-[1.7] max-w-4xl">
                From opportunity to execution,{" "}
                <span className="font-bold">On Time Group</span> creates,
                operates, and scales businesses built for the future.
              </p>
            </FadeIn>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          {services.map((service, index) => (
            <Col xs={24} md={12} xl={8} key={service.id}>
              <ServiceCard {...service} index={index} />
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
  index: number;
};

const ServiceCard = ({ id, title, description, index }: CardProps) => {
  return (
    <motion.div
      className="group h-full rounded-[28px] border border-white/40 bg-white/[0.02] backdrop-blur-sm p-9"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: index * 0.14,
        ease: easeOutExpo,
      }}
      whileHover={{
        y: -10,
        borderColor: "rgba(166, 127, 68, 0.9)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      <motion.div
        className="w-16 h-16 rounded-2xl bg-[#3B3429] border border-white/10 flex items-center justify-center mb-8"
        whileHover={{ rotate: -8, scale: 1.06 }}
        transition={{ duration: 0.3 }}
      >
        <RiBuilding2Line className="text-primary text-3xl" />
      </motion.div>

      <span className="text-primary text-sm tracking-[0.3em]">{id}</span>

      <h3 className="text-white text-3xl font-semibold mt-4 mb-5">{title}</h3>

      <p className="text-white/60 text-lg leading-8">{description}</p>
    </motion.div>
  );
};
