import { AdminLoyaltyPointsComponent } from "@/components/admin/loyalty/points/AdminLoyaltyPointsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "قواعد النقاط",
};

const AdminLoyaltyPointsPage = () => {
  return <AdminLoyaltyPointsComponent />;
};

export default AdminLoyaltyPointsPage;
