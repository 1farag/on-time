import React from "react";
import { BsGem } from "react-icons/bs";
import Link from "next/link";
import toast from "react-hot-toast";
import { useMembershipActions } from "../hooks/useMembershipActions";

export const FastActions_section: React.FC = () => {
  const { upgradeMembership } = useMembershipActions();

  const handleUpgrade = () => {
    upgradeMembership.mutate(
      { tierId: "diamond" },
      {
        onSuccess: () => toast.success("تمت الترقية بنجاح!"),
        onError: () => toast.error("حدث خطأ أثناء الترقية"),
      }
    );
  };

  return (
    <section className="fast-actions flex flex-col gap-8">
      <div className="upgrade-card ">
        <div className="flex items-center gap-4 mb-4">
          <BsGem className="text-3xl opacity-90" />

          <div>
            <p className="text-sm opacity-90 mb-1">قم بترقيه الاشتراك </p>
          </div>
        </div>

        {/* <ul className="space-y-3 text-sm mb-6">
          <li className="flex items-center gap-2">
            <BsCheckCircle />
            <span>خصم 30% بدلًا من 20%</span>
          </li>
          <li className="flex items-center gap-2">
            <BsCheckCircle />
            <span>نقاط 2x بدلًا من 1.5x</span>
          </li>
          <li className="flex items-center gap-2">
            <BsCheckCircle />
            <span>مزايا إضافية حصرية</span>
          </li>
        </ul> */}

        <Link
          href="/contact-us"
          onClick={handleUpgrade}
          className="flex items-center justify-center w-full bg-white text-primary hover:bg-white hover:text-primary rounded-xl py-3 font-semibold  transition disabled:opacity-75"
        >
          {false ? "جاري الترقية..." : "ترقية الآن"}
        </Link>
      </div>

      <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#F3F4F6]">
        <h3 className="text-lg font-bold text-gray-900 mb-2">تحتاج مساعدة؟</h3>
        <p className="text-gray-400 text-sm mb-4">
          فريق الدعم جاهز لمساعدتك في أي وقت
        </p>

        <Link
          href="/contact-us"
          className="flex items-center justify-center w-full border border-primary hover:text-primary text-slate-700 rounded-xl py-3 font-medium hover:bg-gray-50 transition"
        >
          تواصل معنا
        </Link>
      </div>
    </section>
  );
};
