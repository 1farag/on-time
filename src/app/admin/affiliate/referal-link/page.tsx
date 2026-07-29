import { AffiliateReferalLinksComponent } from "@/components/admin/affiliate/referal-links/AffiliateReferalLinksComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "روابط الاحالة",
};

const AffiliateReferalLinksPage = () => {
  return <AffiliateReferalLinksComponent />;
};

export default AffiliateReferalLinksPage;
