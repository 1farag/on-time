"use client";
import { useParams } from "next/navigation";
import { AddEditCategoryForm } from "./forms/AddEditCategoryForm";

export const AdminAddEditCategoryComponent = () => {
  const { productId } = useParams();
  return (
    <main>
      <h1 className="mb-8 font-bold text-2xl">
        {productId ? "تعديل الصنف " : "اضافة صنف جديد "}
      </h1>

      <AddEditCategoryForm />
    </main>
  );
};
