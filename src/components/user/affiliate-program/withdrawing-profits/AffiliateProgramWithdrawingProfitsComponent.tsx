"use client";
import { BiDollarCircle } from "react-icons/bi";
import style from "./styles/withdrawingProfits.module.scss";
import { AffiliateWithdrawingStatistics_section } from "./sections/AffiliateWithdrawingStatistics_section";
import { AffiliateWithdrawingRequest_section } from "./sections/AffiliateWithdrawingRequest_section";
import Link from "next/link";
import {
  useGetAffiliateWithdrawals,
  useGetAffiliateWithdrawalsDetails,
} from "./hooks/useGetAffiliateWithdrawals";

export const AffiliateProgramWithdrawingProfitsComponent = () => {
  const { data, isLoading } = useGetAffiliateWithdrawals();

  console.log(data);

  return (
    <main className={style.withdrawingProfits}>
      <div className="container">
        <div className="text-center mb-10">
          <div className="w-fit mx-auto flex items-center justify-center gap-2 bg-[#F1F1F1] text-primary px-4 py-2 rounded-[9999px]">
            <BiDollarCircle className="text-lg" /> سحب الارباح
          </div>
          <h1 className="text-[#111113] text-6xl font-bold my-4">
            طلب سحب الارباح{" "}
          </h1>
          <p className="text-[#B0B0B3] text-xl">
            اسحب أرباحك المتاحة إلى حسابك البنكي بسهولة
          </p>
        </div>

        <div className="w-[70%] !mx-auto md:w-full">
          <AffiliateWithdrawingStatistics_section
            details={data?.summary}
            loading={isLoading}
          />
          <AffiliateWithdrawingRequest_section />

          <div className="cardS1">
            <div className="flex items-center justify-center flex-col gap-4 text-center">
              <p className="text-[#B0B0B3] text-lg">
                هل تريد مراجعة سجل السحبات السابقة؟
              </p>
              <Link
                type="default"
                href="/user/affiliate-program/commision-details"
                className="w-fit flex items-center justify-center border border-primary   text-primary hover:text-primary px-12 py-2 rounded-lg text-md font-medium"
              >
                عرض سجل السحوبات{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
