import { AdminLoyaltyExchangeComponent } from "@/components/admin/loyalty/exchange/AdminLoyaltyExchangeComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "طلبات الاستبدال",
};
const AdminLoyaltyExchangePage = () => {
  return <AdminLoyaltyExchangeComponent />;
};

export default AdminLoyaltyExchangePage;
