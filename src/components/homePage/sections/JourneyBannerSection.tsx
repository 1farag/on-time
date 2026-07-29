import { Button } from "antd";
import Link from "next/link";
import { LuSearch } from "react-icons/lu";
import { TbPlaneDeparture } from "react-icons/tb";

type JourneyBannerProps = {
  searchHref?: string;
  requestHref?: string;
};

export const JourneyBannerSection = ({
  searchHref = "/seat-sharing",
  requestHref = "/private-jet",
}: JourneyBannerProps) => {
  return (
    <section
      className="w-full py-20 px-6 flex items-center justify-center border-b border-[#252B37]"
      style={{
        background: "linear-gradient(180deg, #081021 0%, #0A2143 100%)",
      }}
    >
      <div className="flex flex-col items-center text-center gap-6 max-w-2xl">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          <span className="text-primary">Your journey </span>
          <span className="text-white">begins</span>
        </h2>

        {/* Subtitle */}
        <p className="text-third text-base">
          The world of private aviation awaits you
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
          <Button></Button>
          <Link
            href={searchHref}
            className="flex items-center gap-2 px-8 py-4 bg-primary text-secondary font-bold rounded-xl hover:opacity-90 transition-all duration-300 active:scale-95"
          >
            <LuSearch size={18} />
            Search for flights
          </Link>
          <Link
            href={requestHref}
            className="flex items-center gap-2 px-8 py-4 bg-secondary text-primary font-bold rounded-xl border-b border-[#252B37] hover:bg-primary/10 transition-all duration-300 active:scale-95"
          >
            <TbPlaneDeparture size={18} />
            Request a private plane
          </Link>
        </div>
      </div>
    </section>
  );
};
