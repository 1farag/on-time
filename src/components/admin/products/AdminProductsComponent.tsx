"use client";
import { Button } from "antd";
import { Products_table } from "./tables/Products_table";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

export const AdminProductsComponent = () => {
  const router = useRouter();
  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            إدارة المنتجات{" "}
          </h1>
          <p className="text-lg text-primary">
            إضافة وتعديل وإدارة جميع المنتجات{" "}
          </p>
        </div>
        <Button
          type="primary"
          onClick={() => router.push("/admin/products/add")}
        >
          <FiPlus />
          إضافة منتج جديد
        </Button>
      </div>

      <Products_table />
    </main>
  );
};
