"use client";

import { Col, Row } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import { easeOutExpo, FadeIn } from "../motion";

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

export const ClientsSection = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/images/clients-bg.png')",
      }}
      id="clients"
    >
      <div className="container relative z-10">
        <Row gutter={[64, 48]} className="mb-20">
          <Col xs={24} lg={24}>
            <FadeIn>
              <h2 className="text-primary text-5xl font-bold mb-5">
                Our Clients
              </h2>

              <p className="text-white text-2xl leading-relaxed">
                Where brands turn vision into reality
              </p>
            </FadeIn>
          </Col>
        </Row>

        <Row gutter={[48, 56]} align="middle">
          {clients.map((logo, index) => (
            <Col xs={12} md={8} lg={4} key={index}>
              <motion.div
                className="flex items-center justify-center h-20"
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                whileInView={{ opacity: 0.8, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                  ease: easeOutExpo,
                }}
                whileHover={{ opacity: 1, scale: 1.08 }}
              >
                <Image
                  src={logo}
                  alt={`Client ${index + 1}`}
                  width={170}
                  height={60}
                  className="object-contain w-auto h-14"
                />
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};
