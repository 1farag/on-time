import React from "react";

type BannerProps = {
  children: React.ReactNode;
  backgroundImage?: string;
};

export const MainBanner = ({
  children,
  backgroundImage = "/images/banner-bg.jpg",
}: BannerProps) => {
  return (
    <div
      className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-[#0a1628]/75" /> */}

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center text-center  py-20 w-full">
        {children}
      </div>
    </div>
  );
};
