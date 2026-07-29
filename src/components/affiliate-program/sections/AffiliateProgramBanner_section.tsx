"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { MdAddTask } from "react-icons/md";

export const AffiliateProgramBanner_section = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAffiliate = !!user?.isAffiliate;

  return (
    <section className="affiliate-program-banner ">
      <div className="container">
        <div className="flex items-center gap-8 justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-2 bg-white/20 text-white px-4 py-2 rounded-[9999px]">
            <MdAddTask /> برنامج الشركاء{" "}
          </div>
          <h1 className="text-white text-5xl font-bold">
            انضم الي برنامج الافيلييت{" "}
          </h1>
          <p className="text-white/90 text-xl">
            يتيح لك متجر نادي الطائي فرصة كسب عمولات من خلال الترويج للمنتجات
            والخدمات. انضم إلى برنامج الأفلييت وشارك المتجر مع جمهورك لتحصل على
            مكافآت مالية مقابل كل عملية شراء تتم من خلال رابطك المخصص.{" "}
          </p>
          <div className="flex gap-4 sm:flex-col mb-6 max-w-[500px]">
            {isAffiliate ? (
              <Link
                href="/user/affiliate-program/dashboard"
                className="flex flex-1 items-center gap-4 justify-center bg-[#4A4A4F] hover:bg-transparent border-[#4A4A4F] border-2 hover:text-white text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
              >
                إدارة حساب الأفلييت
              </Link>
            ) : (
              <Link
                href="/user/affiliate-program/join-now"
                className="flex flex-1 items-center gap-4 justify-center bg-[#4A4A4F] hover:bg-transparent border-[#4A4A4F] border-2 hover:text-white text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
              >
                اشترك الآن{" "}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
