import React from "react";
import style from "./styles/howToEarnPoints.module.scss";
import { HowToEarnPointsBanner_section } from "./sections/HowToEarnPointsBanner_section";
import { HowToEarnPoints_section } from "./sections/HowToEarnPoints_section";
import { HowToEarnPointsAdditionalPoints_section } from "./sections/HowToEarnPointsAdditionalPoints_section";
import { HowToEarnPointsExample_section } from "./sections/HowToEarnPointsExample_section";
import { HowToEarnPointsAdvices_section } from "./sections/HowToEarnPointsAdvices_section";

export const HowToEarnPointsComponent = () => {
  return (
    <main className={style.howToEarnPoints}>
      <HowToEarnPointsBanner_section />
      <section className="bg-primary text-white py-24 text-center">
        <p className="text-3xl font-bold mb-4">عضويتك تمنحك 1.5x نقاط</p>
        <p className="text-lg">
          جميع النقاط أدناه مضروبة في 1.5 بفضل عضويتك النشطة
        </p>
      </section>
      <HowToEarnPoints_section />
      <HowToEarnPointsAdditionalPoints_section />
      {/* <HowToEarnPointsExample_section /> */}
      <HowToEarnPointsAdvices_section />
    </main>
  );
};
