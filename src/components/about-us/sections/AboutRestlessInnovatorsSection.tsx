"use client";
import { useEffect, useRef } from "react";
import { Col, Row } from "antd";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AboutRestlessInnovatorsSectionProps {
  data: {
    about_restless_title_en: string;
    about_restless_title_ar?: string;
    about_restless_description_en: string;
    about_restless_description_ar?: string;
  };
  imageUrl: string;
}

export const AboutRestlessInnovatorsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".restless-image", {
        opacity: 0,
        scale: 0.95,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".restless-content", {
        opacity: 0,
        y: 60,
        duration: 1.4,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="restless-section">
      <div className="container">
        <Row align="middle" gutter={[0, 20]}>
          <Col xs={24} md={12}>
            <div className="images-container restless-image relative h-[400px] md:h-full">
              <Image
                src={"/images/logo.svg"}
                fill
                objectFit="cover"
                alt="A place for restless innovators"
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="content restless-content">
              <h3>A place for restless ambitious beginners</h3>

              <p>
                Whether you are a new fan or an old member, the store provides space for all club lovers to acquire their favorite products easily. We care that every buyer is able to discover their special collections and experience original club products without trouble.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
