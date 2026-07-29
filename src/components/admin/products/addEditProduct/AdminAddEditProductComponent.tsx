"use client";
import { useParams } from "next/navigation";
import { AdminAddEditProductForm } from "./forms/AddEditProduct_form";

export const AdminAddEditProductComponent = () => {
  const { productId } = useParams();
  return (
    <main>
      <h1 className="mb-8 font-bold text-2xl">
        {productId ? "تعديل المنتج " : "إضافة منتج جديد"}
      </h1>

      <AdminAddEditProductForm />
    </main>
  );
};
