"use client";
import style from "./styles/affiliateDashboard.module.scss";
import { FaRegEdit } from "react-icons/fa";
import { AffiliateDashboardStatistics_section } from "./sections/AffiliateDashboardStatistics_section";
import { AffiliateDashboardKnownData_section } from "./sections/AffiliateDashboardKnownData_section";
import { AffiliateDashboardMontlyProfits_section } from "./sections/AffiliateDashboardMontlyProfits_section";
import { AffiliateDashboardLatestOrders_section } from "./sections/AffiliateDashboardLatestOrders_section";
import { useGetAffiliateDashboard } from "./hooks/useGetAffiliateDashboard";

export const AffiliateProgramDashboardComponent = () => {
  const { data, isLoading } = useGetAffiliateDashboard();

  return (
    <main className={style.affiliateDashboard}>
      <div className="container">
        <div className="text-center mb-10">
          <div className="w-fit mx-auto flex items-center justify-center gap-2 bg-[#F1F1F1] text-primary px-4 py-2 rounded-[9999px]">
            <FaRegEdit className="text-lg" /> لوحة التحكم
          </div>
          <h1 className="text-[#111113] text-6xl font-bold my-4">
            لوحة تحكم الافلييت{" "}
          </h1>
          <p className="text-[#B0B0B3] text-xl">
            املأ النموذج أدناه للانضمام إلى برنامج الأفلييت وابدأ في كسب
            العمولات
          </p>
        </div>
        <AffiliateDashboardStatistics_section
          performance={data?.performance}
          balance={data?.balance}
          currency={data?.currency}
          loading={isLoading}
        />
        <AffiliateDashboardMontlyProfits_section
          monthlyStats={data?.monthlyStats}
          loading={isLoading}
          currency={data?.currency}
        />
        <AffiliateDashboardKnownData_section />
        <AffiliateDashboardLatestOrders_section />
      </div>
    </main>
  );
};
