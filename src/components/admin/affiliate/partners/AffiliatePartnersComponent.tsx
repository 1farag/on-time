import React from "react";
import { AffiliatePartners_table } from "./tables/AffiliatePartners_table";
import style from "./styles/affiliatePartners.module.scss";

export const AffiliatePartnersComponent = () => {
  return (
    <main className={style.partners}>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">المسوّقين </h1>
          <p className="text-lg text-primary">إدارة برنامج الأفلييت </p>
        </div>
      </div>

      <AffiliatePartners_table />
      {/* <LoyaltyPoints_table /> */}
    </main>
  );
};
