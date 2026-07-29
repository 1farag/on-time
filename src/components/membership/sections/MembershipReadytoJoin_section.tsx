import Link from "next/link";

export const MembershipReadytoJoin_section = () => {
  return (
    <section className="loyality-program-not-member container">
      <h5 className="font-bold text-3xl">جاهز للانضمام؟</h5>
      <p className="">
        اختر العضوية المناسبة لك وابدأ رحلتك مع نادي الطائي اليوم
      </p>

      <div className="flex items-center gap-4 flex-col md:flex-row">
        <Link
          href="/membership/price-plans"
          className="w-fit flex items-center justify-center bg-[#4A4A4F]  text-white hover:text-white border-2 border-[#4A4A4F] px-12 py-4 rounded-lg text-md font-medium"
        >
          عرض خطط العضوية{" "}
        </Link>
        <Link
          href="/loyality-program"
          className="w-fit flex items-center justify-center bg-transparent  text-white hover:text-white border-2 border-white px-12 py-4 rounded-lg text-md font-medium"
        >
          تعرف على نظام النقاط{" "}
        </Link>
      </div>
    </section>
  );
};
