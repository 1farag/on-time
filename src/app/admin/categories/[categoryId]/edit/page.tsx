import { AdminAddEditCategoryComponent } from "@/components/admin/categories/add-edit-category/AdminAddEditCategoryComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تعديل الصنف",
};

const PagesPage: React.FC = (): JSX.Element => {
  return <AdminAddEditCategoryComponent />;
};

export default PagesPage;
