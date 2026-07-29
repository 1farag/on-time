import { AdminProductsComponent } from "@/components/admin/products/AdminProductsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة المنتجات ",
};

const PagesPage: React.FC = (): JSX.Element => {
  return <AdminProductsComponent />;
};

export default PagesPage;
