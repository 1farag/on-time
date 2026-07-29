import { AdminLoyaltyRewardsComponent } from "@/components/admin/loyalty/rewards/AdminLoyaltyRewardsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المكافأت",
};

const AdminLoyaltyRewardsPage = () => {
  return <AdminLoyaltyRewardsComponent />;
};

export default AdminLoyaltyRewardsPage;
