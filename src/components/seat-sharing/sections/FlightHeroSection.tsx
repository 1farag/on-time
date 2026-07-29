"use client";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { LuPlane } from "react-icons/lu";
import { GradientText } from "@/components/tools/GradientText";

type FlightHeroProps = {
  aircraftName: string;
  from: string;
  to: string;
  backgroundImage?: string;
};

export const FlightHeroSection = ({
  aircraftName,
  from,
  to,
  backgroundImage = "/images/jet-hero.jpg",
}: FlightHeroProps) => {
  const router = useRouter();
  return (
    <div
      className="relative w-full h-[530px] flex items-end overflow-hidden mb-24"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container relative z-10 pb-10 flex flex-col gap-3">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1 text-[#888888] text-base hover:text-white transition-colors duration-200 w-fit"
        >
          <IoChevronBack size={16} />
          <span>Return to search</span>
        </button>

        <h1 className="text-5xl font-bold">
          <GradientText>{aircraftName}</GradientText>
        </h1>

        <div className="flex items-center gap-2">
          <span className="text-white text-base">{from}</span>
          <LuPlane size={16} className="text-primary" />
          <span className="text-white text-base">{to}</span>
        </div>
      </div>
    </div>
  );
};
