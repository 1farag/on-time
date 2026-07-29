import { AffiliateReferalLinks_table } from "./tables/AffiliateReferalLinks_table";

export const AffiliateReferalLinksComponent = () => {
  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            روابط الاحالة{" "}
          </h1>
          <p className="text-lg text-primary">إدارة برنامج الأفلييت </p>
        </div>
      </div>

      <AffiliateReferalLinks_table />
      {/* <LoyaltyPoints_table /> */}
    </main>
  );
};
