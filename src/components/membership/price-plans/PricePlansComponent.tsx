import React from "react";
import { PricePlansBanner_section } from "./sections/PricePlansBanner_section";
import style from "./styles/pricePlans.module.scss";
import { PricePlans_section } from "./sections/PricePlans_section";
import { CompareFeatures_section } from "./sections/CompareFeatures_section";
import { getMembershipPricePlansData } from "@/apiCalls/membersip/getMembershipPricePlansData";

export const PricePlansComponent = async () => {
  const [membershipPlans] = await Promise.all([
    getMembershipPricePlansData(),
    // getAllCategoriesData(),
  ]);
  console.log(membershipPlans);

  return (
    <main className={style.pricePlans}>
      <PricePlansBanner_section />
      <PricePlans_section membershipPlans={membershipPlans?.data?.tiers} />
      <CompareFeatures_section
        membershipPlans={membershipPlans?.data?.tiers}
        featureTranslations={membershipPlans?.data?.featureTranslations}
      />
    </main>
  );
};
