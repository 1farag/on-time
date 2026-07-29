import { AdminAddEditUserComponent } from "@/components/admin/users/addEditUser/AdminAddEditUserComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إضافة مستخدم جديد ",
};

const AddNewUser: React.FC = (): JSX.Element => {
  return <AdminAddEditUserComponent />;
};

export default AddNewUser;
