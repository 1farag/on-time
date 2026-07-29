import { AdminLoyaltyPointsHistoryComponent } from "@/components/admin/loyalty/points-history/AdminLoyaltyPointsHistoryComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سجل النقاط",
};

const AdminLoyaltyPointsHistoryPage = () => {
  return <AdminLoyaltyPointsHistoryComponent />;
};

export default AdminLoyaltyPointsHistoryPage;
