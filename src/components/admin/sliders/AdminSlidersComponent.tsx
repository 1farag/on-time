"use client";
import { Button } from "antd";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { SlidersTable } from "./tables/SlidersTable";

export const AdminSlidersComponent = () => {
  const router = useRouter();

  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            إدارة البانرات (Sliders)
          </h1>
          <p className="text-lg text-primary">
            إضافة وتعديل وإدارة جميع البانرات
          </p>
        </div>
        <Button
          type="primary"
          onClick={() => router.push("/admin/sliders/add")}
        >
          <FiPlus />
          إضافة بانر جديد
        </Button>
      </div>

      <SlidersTable />
    </main>
  );
};
