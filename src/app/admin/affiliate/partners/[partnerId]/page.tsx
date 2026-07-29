import { AffiliatePartnerComponent } from "@/components/admin/affiliate/partners/AffiliatePartnerComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المسوّقين",
};

const AffiliatePartnerPage = () => {
  return <AffiliatePartnerComponent />;
};

export default AffiliatePartnerPage;
