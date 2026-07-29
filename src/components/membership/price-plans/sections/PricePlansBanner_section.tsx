"use client";
import { RootState } from "@/store/appStore";
import Link from "next/link";
import { useSelector } from "react-redux";

export const PricePlansBanner_section = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(user);

  return (
    <section className="price-plans-banner">
      <div className="container">
        <div className="flex items-center gap-8 justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-2 bg-white/20 text-white px-4 py-2 rounded-[9999px]">
            اختر الخطة التي تناسبك{" "}
          </div>
          <h1 className="text-white text-5xl font-bold">خطط العضوية </h1>
          <p className="text-white/90 text-xl">
            اختر العضوية التي تناسبك واستمتع بمزايا حصرية{" "}
          </p>
          {user?.membership && (
            <div className="flex gap-4 sm:flex-col mb-6 max-w-[500px]">
              <Link
                href="/user/my-membership"
                className="flex flex-1 items-center gap-4 justify-center bg-[#4A4A4F] hover:bg-transparent border-[#4A4A4F] border-2 hover:text-white text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
              >
                عضويتي
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
