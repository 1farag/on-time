"use client";
import { useEffect, useRef } from "react";
import { Col, Row } from "antd";
import { IoIosArrowRoundForward } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface OurMissionSectionProps {
  data: {
    about_our_mission_title_desc_en: string;
    about_our_mission_title_desc_ar: string;
    about_our_mission_description_desc_en: string;
    about_our_mission_description_desc_ar: string;
  };
}

export const OurMissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".our-mission-title", {
        opacity: 0,
        y: 60,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".our-mission-content", {
        opacity: 0,
        y: 40,
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
    <section ref={sectionRef} className="our-mission-section container">
      <Row gutter={[70, 70]}>
        <Col span={24} lg={6}>
          <h5 className="title our-mission-title !text-black">Our Mission</h5>
        </Col>
        <Col span={24} lg={18}>
          <div className="content our-mission-content flex">
            <div className="flex-1">
              <p>
                Our mission at Al-Tai Club Store is to provide a comprehensive shopping experience for fans, combining official products, exclusive offers, and excellent customer service. We aim to enhance the fans&apos; affiliation with the club by providing products carrying the North Knight&apos;s identity and logo with the highest quality.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};
