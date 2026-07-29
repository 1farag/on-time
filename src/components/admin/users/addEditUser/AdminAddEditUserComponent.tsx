"use client";
import { useParams } from "next/navigation";
import { AdminAddEditUserForm } from "./forms/AdminAddEditUserForm";

export const AdminAddEditUserComponent = () => {
  const { userId } = useParams();
  return (
    <main>
      <h1 className="mb-8 font-bold text-2xl">
        {userId ? "تعديل المستخدم " : "إضافة مستخدم جديد"}
      </h1>

      <AdminAddEditUserForm />
    </main>
  );
};
