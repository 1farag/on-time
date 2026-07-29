import { AdminCategoriesComponent } from "@/components/admin/categories/AdminCategoriesComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التصنيفات ",
};

const PagesPage: React.FC = (): JSX.Element => {
  return <AdminCategoriesComponent />;
};

export default PagesPage;
