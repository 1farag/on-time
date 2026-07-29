import { AdminMembershipPlansComponent } from "@/components/admin/memberships/plans/AdminMembershipPlansComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خطط العضويات",
};

const AdminMembershipPlansPage = () => {
  return <AdminMembershipPlansComponent />;
};

export default AdminMembershipPlansPage;
