"use client";

import { Button, Col, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
  const router = useRouter();

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
      }}
      id="hero"
    >
      <div className="container relative z-10">
        <Row gutter={[32, 32]} align="bottom">
          <Col xs={24} md={12}>
            <div className="flex flex-col items-start gap-8">
              {/* Top Text */}
              <div className="flex items-center gap-4  md:mb-[230px]">
                <span className="w-12 h-px bg-primary" />
                <p className="text-primary uppercase tracking-[0.35em] text-xs">
                  Luxury Development • Trusted Management
                </p>
              </div>

              {/* Description */}
              <p className="text-white text-xl md:text-xl leading-relaxed font-light">
                We are a Saudi Company working on a new Generation of Business.
                <br />
                By keeping up with a new technology and managing working Time.
              </p>

              {/* Button */}
              <Button
                type="primary"
                className="!rounded-full !h-14 !px-10"
                onClick={() => router.push("/projects")}
              >
                Explore Projects
              </Button>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div>
              <Image
                src={"/images/hero-main-image.png"}
                width={495}
                height={368}
                objectFit="cover"
                alt="A place for restless innovators"
              />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
