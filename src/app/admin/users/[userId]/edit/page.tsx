import { AdminAddEditUserComponent } from "@/components/admin/users/addEditUser/AdminAddEditUserComponent";
import { AdminUserProfileComponent } from "@/components/admin/users/userProfile/AdminUserProfileComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الملف الشخصي للمستخدم ",
};

const AdminUserProfileEditPage: React.FC = (): JSX.Element => {
  return <AdminAddEditUserComponent />;
};

export default AdminUserProfileEditPage;
