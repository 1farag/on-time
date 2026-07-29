"use client";
import { FiLink } from "react-icons/fi";
import style from "./styles/mainLinks.module.scss";
import { AffiliateMainLink_section } from "./sections/AffiliateMainLink_section";
import { AffiliateProductLinks_section } from "./sections/AffiliateProductLinks_section";
import { FaCheck } from "react-icons/fa6";
import { CreateCustomLink_section } from "./sections/AffiliateCustomeLink_section";
import { useGetAffiliateDetails } from "./hooks/useGetAffiliateDetails";

export const AffiliateProgramMainLinksComponent = () => {
  const { data, isLoading } = useGetAffiliateDetails();
  const notes = [
    "شارك الروابط على منصات التواصل الاجتماعي الخاصة بك",
    "استخدم وصفاً جذاباً عند مشاركة المنتجات",
    "ركز على المنتجات الأكثر مبيعاً لزيادة التحويلات",
  ];
  console.log(data);
  return (
    <main className={style.mainLinks}>
      <div className="container">
        <div className="text-center mb-10">
          <div className="w-fit mx-auto flex items-center justify-center gap-2 bg-[#F1F1F1] text-primary px-4 py-2 rounded-[9999px]">
            <FiLink className="text-lg" /> روابط الاحاله
          </div>
          <h1 className="text-[#111113] text-6xl font-bold my-4">
            روابط الافيلييت الخاصه بك{" "}
          </h1>
          <p className="text-[#B0B0B3] text-xl">
            استخدم هذه الروابط للترويج لمنتجات نادي الطائي وكسب العمولات
          </p>
        </div>

        <AffiliateMainLink_section data={data} />
        <CreateCustomLink_section trackingCode={data?.trackingCode} />
        {/* <AffiliateProductLinks_section /> */}

        <div className="important-notes mb-8">
          <h3 className="text-[#111113] font-bold text-xl mb-4">
            💡 نصائح لزيادة التحويلات{" "}
          </h3>
          <ul className="flex flex-col gap-3">
            {notes.map((note, index) => (
              <li key={index} className="text-[#B0B0B3]">
                <FaCheck className="text-[#4BA246]" />

                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};
