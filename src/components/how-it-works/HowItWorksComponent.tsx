"use client";
import { MainBanner } from "../tools/sections/MainBanner";
import { CTASection } from "../tools/sections/CTASection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { GradientText } from "../tools/GradientText";

export const HowItWorksComponent: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <main>
      <MainBanner backgroundImage="/images/bannerbg.png">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight md:leading-relaxed mb-10">
          Discover How <GradientText>Rich Style</GradientText>
          <br />
          Simplifies Private Travel
        </h1>

        {/* <div className="flex items-center flex-col md:flex-row gap-4">
          <Button type="default" className="!px-10 !py-4 ">
            Learn More
          </Button>
          {!isLoading && !isAuthenticated ? (
            <Button
              type="primary"
              className="!px-14 !py-4 "
              onClick={() => router.push("/user/register")}
            >
              Sign Up
            </Button>
          ) : null}
        </div> */}
      </MainBanner>{" "}
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
};
