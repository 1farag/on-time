import { AdminMembershipAddEditPlanComponent } from "@/components/admin/memberships/plans/add-edit-plan/AdminMembershipAddEditPlanComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تعديل الخطة",
};

const AdminMembershipEditPlanPage = () => {
  return <AdminMembershipAddEditPlanComponent />;
};

export default AdminMembershipEditPlanPage;
