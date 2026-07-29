"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export const CTASection = () => {
  const router = useRouter();
  return (
    <section className="bg-[#161b27] py-16 px-6">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3F0]">
          Start Your Journey with <span className="text-primary">On Time </span>
        </h2>

        <p className="text-[#F5F3F0] text-2xl leading-relaxed">
          Discover how On Time can transform your travel experience or elevate
          your charter business today.
        </p>

        <div className="flex items-center gap-4 mt-2">
          <Button
            type="primary"
            onClick={() => router.push("/seat-sharing")}
            className="!px-10 !py-4"
          >
            Get Started
          </Button>
          {/* <Button type="default" 
            onClick={() => router.push("/seat-sharing")}
            className="!px-10 !py-4 ">
            Learn More
          </Button> */}
        </div>
      </div>
    </section>
  );
};
