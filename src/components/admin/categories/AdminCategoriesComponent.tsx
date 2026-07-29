"use client";
import { Button } from "antd";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Categories_table } from "./tables/Categories_table";

export const AdminCategoriesComponent = () => {
  const router = useRouter();
  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">التصنيفات </h1>
          <p className="text-lg text-primary">إدارة تصنيفات المنتجات </p>
        </div>
        <Button
          type="primary"
          onClick={() => router.push("/admin/categories/add")}
        >
          <FiPlus />
          إضافة تصنيف جديد{" "}
        </Button>
      </div>

      <Categories_table />
    </main>
  );
};
