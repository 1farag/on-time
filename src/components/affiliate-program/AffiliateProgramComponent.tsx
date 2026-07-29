import React from "react";
import style from "./styles/affiliateProgram.module.scss";
import { AffiliateProgramBanner_section } from "./sections/AffiliateProgramBanner_section";
import { HowAffiliateProgramWorks_section } from "./sections/HowAffiliateProgramWorks_section";
import { StartYourJourny_section } from "./sections/StartYourJourny_section";
import { AffiliateProgramFeatures_section } from "./sections/AffiliateProgramFeatures_section";

export const AffiliateProgramComponent = () => {
  return (
    <main className={style.affiliateProgram}>
      <AffiliateProgramBanner_section />
      <HowAffiliateProgramWorks_section />
      <AffiliateProgramFeatures_section />
      <div className="container py-14">
        <h2 className=" text-center mb-10 text-secondary font-bold text-3xl">
          شروط البرنامج
        </h2>
        <p className="text-black mb-3">
          <span> - </span>
          يجب أن تكون جميع عمليات الترويج متوافقة مع قوانين المملكة العربية
          السعودية ومعايير أخلاقيات الإعلان.
        </p>
        <p className="text-black mb-3">
          <span> - </span>
          لا يُسمح باستخدام روابط غير رسمية أو التلاعب في نظام التتبع للحصول على
          عمولات غير مستحقة.{" "}
        </p>
        <p className="text-black mb-3">
          <span> - </span>
          يحتفظ المتجر بحق إنهاء عضوية أي شريك أفلييت يخرق الشروط أو يحاول
          التلاعب بالنظام.{" "}
        </p>
        <p className="text-black mb-3">
          <span> - </span>
          العمولة تُحسب فقط على الطلبات الصالحة وغير الملغاة.{" "}
        </p>
      </div>
      <StartYourJourny_section />
    </main>
  );
};
