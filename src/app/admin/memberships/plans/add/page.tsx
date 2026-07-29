import { AdminMembershipAddEditPlanComponent } from "@/components/admin/memberships/plans/add-edit-plan/AdminMembershipAddEditPlanComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اضافة خطة جديد ",
};

const AdminMembershipAddPlanPage = () => {
  return <AdminMembershipAddEditPlanComponent />;
};

export default AdminMembershipAddPlanPage;
