"use client";

import { Button, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaPhone, FaXTwitter } from "react-icons/fa6";
import { BiLogoLinkedin } from "react-icons/bi";
import { FiFacebook } from "react-icons/fi";
import { formatContactPhone } from "@/apiCalls/appContent/getContactUsContent";
import { useContactUsContent } from "@/hooks/useContactUsContent";
import { LuMapPin } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { useState } from "react";
import { ContactModal } from "./modal/ContactUsModal";

export const Footer = () => {
  const [openContact, setOpenContact] = useState(false);

  const socialLinks = [
    {
      href: "https://www.instagram.com/ontime_groups/",
      icon: <FaInstagram size={14} />,
      label: "Instagram",
    },
    {
      href: "https://x.com/ontime_groups",
      icon: <FaXTwitter size={13} />,
      label: "X",
    },

    {
      href: "https://www.facebook.com/profile.php?id=61556352401874&is_tour_completed=true",
      icon: <FiFacebook size={14} />,
      label: "Facebook",
    },
    {
      href: "https://www.linkedin.com/company/ontime-holding/",
      icon: <BiLogoLinkedin size={13} />,
      label: "LinkedIn",
    },
  ];

  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/images/footer-bg.png')",
      }}
      id="contact"
    >
      <div className="container relative z-10">
        {/* CTA */}
        <div className="py-28 text-center">
          <h2 className="text-5xl md:text-5xl font-bold max-w-3xl mx-auto">
            <span className="text-white">Let's Build Something </span>
            <span className="text-primary">Exceptional Together</span>
          </h2>

          <Button
            type="primary"
            className="!rounded-full !h-14 !px-10 mt-10"

            onClick={() => setOpenContact(true)}
          >
            Contact Us
          </Button>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Footer Content */}
        <div className="py-20">
          <Row gutter={[48, 48]}>
            {/* Logo */}
            <Col xs={24} lg={8}>
              <Image
                src="/images/logo.svg"
                width={180}
                height={70}
                alt="On Time Group"
              />

              <p className="mt-8 text-white/60 leading-8 max-w-sm">
                As a Saudi company, we look forward to benefiting from this
                environment created by our leaders. Therefore, we believe that
                this is the time for action.
              </p>

              <div className="flex gap-4 mt-8">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    className="w-11 h-11 rounded-full border !text-primary border-white/10 flex items-center justify-center hover:border-primary transition"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </Col>

            {/* Quick Links */}
            <Col xs={12} md={6} lg={4}>
              <h4 className="text-primary font-semibold mb-6">Quick Links</h4>

              <div className="flex flex-col gap-4">
                <a
                  href="#about"
                  className="text-[#969aa0] hover:text-primary transition"
                >
                  About Us
                </a>
                <a
                  href="#services"
                  className="text-[#969aa0] hover:text-primary transition"
                >
                  Services
                </a>
              </div>
            </Col>

            {/* Quick Links 2 */}
            <Col xs={12} md={6} lg={4}>
              <h4 className="text-primary font-semibold mb-6 opacity-0">.</h4>

              <div className="flex flex-col gap-4">
                <a
                  href="#clients"
                  className="text-[#969aa0] hover:text-primary transition"
                >
                  Clients
                </a>
                <a
                  href="#projects"
                  className="text-[#969aa0] hover:text-primary transition"
                >
                  Projects
                </a>
              </div>
            </Col>

            {/* Contact */}
            <Col xs={24} md={12} lg={8}>
              <h4 className="text-primary font-semibold mb-6">Contact</h4>

              <div className="space-y-5 text-white/70">
                <p className="flex items-center gap-2 text-[#969aa0]">
                  <LuMapPin className="text-primary" />
                  KSA, Riyadh, Saudi Arabia
                </p>
                <p className="flex items-center gap-2 text-[#969aa0]">
                  <FaPhone className="text-primary" />
                  +966 54 449 9774
                </p>
                <p className="flex items-center gap-2 text-[#969aa0]">
                  <MdMailOutline className="text-primary" />
                  contact@on-time.group
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="border-t border-white/10" />

        <div className="py-8 text-center text-white/50 text-sm">
          © 2026 <span className="text-primary">On Time Group.</span> All rights
          reserved.
        </div>
      </div>
      <ContactModal open={openContact} onClose={() => setOpenContact(false)} />
    </footer>
  );
};
