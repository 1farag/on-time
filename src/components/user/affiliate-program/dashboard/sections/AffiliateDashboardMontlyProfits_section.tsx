"use client";

import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { Skeleton } from "antd";

interface AffiliateDashboardMontlyProfitsProps {
  monthlyStats: {
    commissionChart: { month: number; value: number; monthName: string; year: number }[];
    salesChart: { month: number; value: number; monthName: string; year: number }[];
  } | null;
  loading: boolean;
  currency: string;
}

export const AffiliateDashboardMontlyProfits_section: React.FC<
  AffiliateDashboardMontlyProfitsProps
> = ({ monthlyStats, loading, currency }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (loading) return; // don't render chart while loading
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const monthsArabic = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];

    const profitData = Array(12).fill(0);

    if (monthlyStats?.commissionChart?.length) {
      monthlyStats.commissionChart.forEach((item) => {
        const monthIndex = item.month - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          profitData[monthIndex] = item.value;
        }
      });
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: monthsArabic,
        datasets: [
          {
            label: "الأرباح",
            data: profitData,
            borderColor: "#374151",
            backgroundColor: "rgba(55,65,81,0.05)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointBackgroundColor: "#374151",
            pointBorderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw} ${currency}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return `${value} ${currency}`;
              },
            },
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, [monthlyStats, loading]);

  return (
    <div className="cardS1 my-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-right mb-2">
            الأرباح الشهرية
          </h2>
          <p className="text-[#B0B0B3] text-sm md:text-base text-right">
            تتبع أرباحك على مدار الأشهر
          </p>
        </div>
      </div>

      <div
        className="w-full"
        style={{
          minHeight: "320px",
          height: "40vh",
          position: "relative",
        }}
      >
        {loading ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : (
          <canvas ref={chartRef} />
        )}
      </div>
    </div>
  );
};
