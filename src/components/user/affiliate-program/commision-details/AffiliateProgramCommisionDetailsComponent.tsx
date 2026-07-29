"use client";
import React from "react";
import style from "./styles/comisionDetails.module.scss";
import { GoDatabase } from "react-icons/go";
import { AffiliateCommisionDetailsStatistics_section } from "./sections/AffiliateCommisionDetailsStatistics_section";
import { AffiliateCommisionDetailsLatestOrders_section } from "./sections/AffiliateCommisionDetailsLatestOrders_section";
import { FaCheck } from "react-icons/fa6";
import { AffiliateCommisionDetailsConvertPercentage_section } from "./sections/AffiliateCommisionDetailsConvertPercentage_section";
import { useGetAffiliateDashboard } from "../dashboard/hooks/useGetAffiliateDashboard";

export const AffiliateProgramCommisionDetailsComponent = () => {
  const { data, isLoading } = useGetAffiliateDashboard();

  const notes = [
    "يتم احتساب العمولة بعد تأكيد الطلب من العميل",
    'العمولات "قيد المعالجة" يتم تحويلها للرصيد المتاح بعد 7 أيام',
    "في حالة إلغاء الطلب أو استرجاعه، يتم خصم العمولة تلقائياً",
  ];
  return (
    <main className={style.comisionDetails}>
      <div className="container">
        <div className="text-center mb-10">
          <div className="w-fit mx-auto flex items-center justify-center gap-2 bg-[#F1F1F1] text-primary px-4 py-2 rounded-[9999px]">
            <GoDatabase className="text-lg" /> العمولات والارباح
          </div>
          <h1 className="text-[#111113] text-6xl font-bold my-4">
            تفاصيل العمولات{" "}
          </h1>
          <p className="text-[#B0B0B3] text-xl">
            تابع جميع عمولاتك وأرباحك من عمليات البيع
          </p>
        </div>
        <AffiliateCommisionDetailsStatistics_section
          data={data}
          loading={isLoading}
        />
        {/* <AffiliateCommisionDetailsConvertPercentage_section /> */}
        <AffiliateCommisionDetailsLatestOrders_section />

        <div className="important-notes mt-10">
          <h3 className="text-[#111113] font-bold text-xl mb-4">
            معلومات هامة ℹ️
          </h3>
          <ul className="flex flex-col gap-3">
            {notes.map((note, index) => (
              <li key={index} className="text-[#B0B0B3]">
                <FaCheck className="text-[#4BA246]" />

                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};
