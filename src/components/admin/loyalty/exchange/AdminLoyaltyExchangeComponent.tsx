"use client";

import { LoyaltyExchange_table } from "./tables/LoyaltyExchange_table";

export const AdminLoyaltyExchangeComponent = () => {
  return (
    <main>
      <div className=" mb-12">
        <h1 className="mb-5 text-3xl font-bold text-[#111113]">
          طلبات الاستبدال
        </h1>
        <p className="text-lg text-primary">إدارة طلبات استبدال النقاط </p>
      </div>

      <LoyaltyExchange_table />
    </main>
  );
};
