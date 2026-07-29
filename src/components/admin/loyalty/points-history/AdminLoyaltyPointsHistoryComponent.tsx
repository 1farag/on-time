"use client";

import { LoyaltyPointsHistory_table } from "./tables/LoyaltyPointsHistory_table";

export const AdminLoyaltyPointsHistoryComponent = () => {
  return (
    <main>
      <div className=" mb-12">
        <h1 className="mb-5 text-3xl font-bold text-[#111113]">سجل النقاط </h1>
        <p className="text-lg text-primary">جميع حركات النقاط </p>
      </div>

      <LoyaltyPointsHistory_table />
    </main>
  );
};
