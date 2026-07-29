import { AdminUsersComponent } from "@/components/admin/users/AdminUsersComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة المستخدمين",
};

const AdminUserspage = () => {
  return <AdminUsersComponent />;
};

export default AdminUserspage;
