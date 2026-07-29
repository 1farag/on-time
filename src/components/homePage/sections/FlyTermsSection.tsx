"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";

type FlyTermsSectionProps = {
  backgroundImage?: string;
  onRequest?: () => void;
  href?: string;
};

export const FlyTermsSection = ({
  backgroundImage = "/images/fly-terms.png",
  href = "/private-jet",
}: FlyTermsSectionProps) => {
  const router = useRouter();
  return (
    <div
      className="relative w-full flex items-center overflow-hidden min-h-[410px]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-white">Fly on your</span>
          <span className="text-primary">Terms</span>
        </h2>

        <p className="text-third text-sm md:text-base leading-relaxed mb-8">
          Request a private jet that's completely tailored to your needs. Choose
          the date, destination, <br /> and aircraft type. Our team will take
          care of all the details.
        </p>

        <Button
          type="primary"
          className="!px-6 !py-4"
          onClick={() => router.push("/private-jet")}
        >
          Request a private jet
        </Button>
      </div>
    </div>
  );
};
