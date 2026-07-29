"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

export const StartYourJourny_section = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAffiliate = !!user?.isAffiliate;

  return (
    <div className="start-your-journy container  md:text-center">
      <h5 className="font-bold text-3xl mb-4">ابدأ رحلتك معنا اليوم!</h5>
      <p>
        انضم إلى مئات الشركاء الذين يحققون دخلاً إضافياً من خلال الترويج لمنتجات
        نادي الطائي
      </p>

      <div className="flex sm:flex-col sm:items-center gap-4 mt-6">
        {isAffiliate ? (
          <Link
            href="/user/affiliate-program/dashboard"
            className="w-fit flex items-center justify-center bg:white border border-white text-white hover:text-white px-12 py-2 rounded-lg text-md font-medium"
          >
            إدارة حساب الأفلييت{" "}
          </Link>
        ) : (
          <>
            <Link
              href="/user/affiliate-program/join-now"
              className="w-fit flex items-center justify-center bg-white  text-primary hover:text-primary px-12 py-2 rounded-lg text-md font-medium"
            >
              انضم الآن مجاناً{" "}
            </Link>
            
          </>
        )}
      </div>
    </div>
  );
};
