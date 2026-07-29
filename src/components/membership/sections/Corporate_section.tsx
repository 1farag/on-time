"use client";
import { GradientText } from "@/components/tools/GradientText";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { LuArrowUpRight, LuCheck } from "react-icons/lu";

const features = [
  "C-Suite Executive Services",
  "VIP Business Experiences",
  "Corporate Prestige Programs",
  "Private Wealth Concierge",
];

export const CorporateSection = () => {
  const router = useRouter();
  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <p className="text-primary text-xs tracking-[0.3em] uppercase flex items-center gap-2">
              <span>—</span> Business
            </p>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl text-white leading-tight">
              Corporate & <GradientText italic>Business</GradientText>
              <br />
              Services
            </h2>

            {/* Description */}
            <p className="text-third text-base leading-relaxed max-w-md">
              Bespoke luxury programs for Business, executive teams and global
              enterprises operating across the GCC and beyond.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border border-[#222] rounded-xl px-4 py-3"
                >
                  <div className="w-6 h-6 rounded-md border border-primary/50 flex items-center justify-center shrink-0">
                    <LuCheck size={12} className="text-primary" />
                  </div>
                  <span className="text-third text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <Button
                type="primary"
                className="!py-5 !px-8 !rounded-xl"
                icon={<LuArrowUpRight size={16} />}
                iconPosition="end"
                onClick={() => router.push("/contact-us")}
              >
                Talk To Sales
              </Button>
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-primary/20">
              <img
                src="/photos/6.png"
                alt="Corporate Business"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(5,5,5,0.80) 0%, rgba(5,5,5,0.00) 50%, rgba(5,5,5,0.00) 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
