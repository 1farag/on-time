import { AffiliatePartnersComponent } from "@/components/admin/affiliate/partners/AffiliatePartnersComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المسوّقين",
};

const AffiliatePartnersPage = () => {
  return <AffiliatePartnersComponent />;
};

export default AffiliatePartnersPage;
