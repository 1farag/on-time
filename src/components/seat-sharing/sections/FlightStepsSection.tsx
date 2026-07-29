"use client";
import { Steps } from "antd";

export const FlightStepsSection = ({
  currentStep,
}: {
  currentStep: number;
}) => {
  const items = [
    { title: "Seats" },
    { title: "Traveler data" },
    { title: "Payment" },
  ];
  return (
    <div className="w-full md:w-[75%] mx-auto pb-16">
      {" "}
      {/* الخلفية الغامقة */}
      <Steps
        current={currentStep}
        items={items.map((item, index) => ({
          title: (
            <span
              className={`text-sm font-bold ${currentStep >= index ? "text-[#E8D595]" : "text-gray-500"}`}
            >
              {item.title}
            </span>
          ),
          icon: (
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors
          ${
            currentStep >= index
              ? "bg-[#E8D595] text-[#0B0E14]" // اللون الذهبي للخطوات المكتملة
              : "bg-[#1E222D] text-gray-500" // اللون الغامق للخطوات القادمة
          }`}
            >
              {index + 1}
            </div>
          ),
        }))}
      />
      {/* الخط اللي تحت - Progress Bar مخصص */}
      <div className="relative mt-4 h-[2px] w-full bg-[#1E222D]">
        <div
          className="absolute h-full bg-[#E8D595] transition-all duration-500"
          style={{ width: `${((currentStep + 1) / items.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
