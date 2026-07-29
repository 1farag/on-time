"use client";

import { FailedCheckouts_table } from "./tables/FailedCheckouts_table";

export const FailedCheckoutsComponent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-titlesColor mb-1">
          محاولات الدفع الفاشلة
        </h1>
        <p className="text-primary text-sm">
          عرض وإدارة محاولات الدفع التي لم تكتمل بنجاح
        </p>
      </div>

      <FailedCheckouts_table />
    </div>
  );
};
