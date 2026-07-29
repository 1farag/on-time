import { AdminUserProfileComponent } from "@/components/admin/users/userProfile/AdminUserProfileComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الملف الشخصي للمستخدم ",
};

const AdminUserProfilePage: React.FC = (): JSX.Element => {
  return <AdminUserProfileComponent />;
};

export default AdminUserProfilePage;
