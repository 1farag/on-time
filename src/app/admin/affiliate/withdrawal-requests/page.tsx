import { AffiliateWithdrawalRequestsComponent } from "@/components/admin/affiliate/withdrawal-requests/AffiliateWithdrawalRequestsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "طلبات السحب ",
};

const AffiliateWithdrawalRequestsPage = () => {
  return <AffiliateWithdrawalRequestsComponent />;
};

export default AffiliateWithdrawalRequestsPage;
