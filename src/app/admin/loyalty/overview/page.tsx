import { AdminLoyaltyComponent } from "@/components/admin/loyalty/AdminLoyaltyComponent";
import { AdminUsersComponent } from "@/components/admin/users/AdminUsersComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "برنامج الولاء",
};

const AdminLoyaltyPage = () => {
  return <AdminLoyaltyComponent />;
};

export default AdminLoyaltyPage;
