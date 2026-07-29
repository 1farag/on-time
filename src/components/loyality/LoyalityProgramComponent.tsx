import { LoyalityProgramBanner_section } from "./sections/LoyalityProgramBanner_section";
import { LoyalityProgramFeatures_section } from "./sections/LoyalityProgramFeatures_section";
import { LoyalityProgramHowWorks_section } from "./sections/LoyalityProgramHowWorks_section";
import { LoyalityProgramNotMember_section } from "./sections/LoyalityProgramNotMember_section";

import style from "./styles/loyalityProgram.module.scss";

export const LoyalityProgramComponent = () => {
  return (
    <main className={style.loyalityProgram}>
      <LoyalityProgramBanner_section />
      <LoyalityProgramHowWorks_section />
      <LoyalityProgramFeatures_section />
      <div className="container py-14">
        <h2 className=" text-center mb-10 text-secondary font-bold text-3xl">
          شروط البرنامج
        </h2>
        <p className="text-black mb-3">
          <span> - </span>
          النقاط صالحة للاستخدام لمدة 12 شهرًا من تاريخ إضافتها، إلا إذا تم
          الإعلان عن فترة أطول ضمن عروض خاصة.
        </p>
        <p className="text-black mb-3">
          <span> - </span>
          لا يمكن تحويل النقاط بين الحسابات أو استبدالها نقدًا إلا وفق سياسة
          المتجر.
        </p>
        <p className="text-black mb-3">
          <span> - </span>
          يحتفظ المتجر بالحق في تعديل برنامج الولاء أو شروطه مع إشعار الأعضاء
          عبر البريد الإلكتروني أو التطبيق.
        </p>
      </div>
      <LoyalityProgramNotMember_section />
    </main>
  );
};
