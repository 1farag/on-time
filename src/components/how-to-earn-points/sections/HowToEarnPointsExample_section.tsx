import React from "react";
import { CiShare2 } from "react-icons/ci";
import { FaI } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { PiShoppingBagBold } from "react-icons/pi";

export const HowToEarnPointsExample_section = () => {
  return (
    <section className="how-earn-points-example container mb-24">
      <h3 className="text-center text-secondary mb-8 text-2xl font-bold">
        فرص النقاط الإضافية{" "}
      </h3>
      <ul className="flex flex-col gap-6 mb-6 pb-6 border-b border-secondary">
        <li className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl text-[#111113]">
          <span className="flex items-center gap-3">
            <PiShoppingBagBold />
            شراء تيشيرت بقيمة 200 ريال
          </span>
          <span className="text-[#22C55E] font-bold">+300 نقطة</span>
        </li>
        <li className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl text-[#111113]">
          <span className="flex items-center gap-3">
            <IoStarOutline />
            كتابة تقييم للمنتج{" "}
          </span>
          <span className="text-[#22C55E] font-bold">+30 نقطة</span>
        </li>
        <li className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl text-[#111113]">
          <span className="flex items-center gap-3">
            <CiShare2 />
            دعوة صديق (عند أول شراء له){" "}
          </span>
          <span className="text-[#22C55E] font-bold">+150 نقطة</span>
        </li>
      </ul>
      <div className="flex items-center justify-between">
        <span className="text-secondary text-xl font-bold">الإجمالي:</span>
        <span className="text-[#22C55E] font-bold text-xl">480 نقطة</span>
      </div>
      <p className="mt-6 text-[#B0B0B3] text-center">
        القيمة التقريبية: 4.80 ريال
      </p>
    </section>
  );
};
