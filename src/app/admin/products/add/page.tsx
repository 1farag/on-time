import { AdminAddEditProductComponent } from "@/components/admin/products/addEditProduct/AdminAddEditProductComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إضافة منتج جديد ",
};

const AddNewProduct: React.FC = (): JSX.Element => {
  return <AdminAddEditProductComponent />;
};

export default AddNewProduct;
