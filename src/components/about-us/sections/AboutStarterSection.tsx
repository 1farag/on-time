"use client";
import { useEffect, useRef } from "react";
import PartnerWithUsModal from "@/components/tools/modal/partner-with-us-modal/PartnerWithUsModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AboutStarterSectionProps {
  // data: {
  //   about_hero_title_en: string;
  //   about_hero_title_ar: string;
  //   about_hero_description_en: string;
  //   about_hero_description_ar: string;
  // };
}

export const AboutStarterSection = ({}: AboutStarterSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        opacity: 0,
        y: 60,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".about-description", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".about-button", {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-starter-section container">
      <h1>لماذا تختار نادي الطائي</h1>
    </section>
  );
};
