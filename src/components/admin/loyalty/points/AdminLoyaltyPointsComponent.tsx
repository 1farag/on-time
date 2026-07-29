"use client";
import { Button } from "antd";
import { FiPlus } from "react-icons/fi";
import { LoyaltyPoints_table } from "./tables/LoyaltyPoints_table";
import { AddEditLoyaltyPoint_modal } from "./modal/AddEditLoyaltyPoint_modal";

export const AdminLoyaltyPointsComponent = () => {
  const handleAddRule = async (values: any) => {
    console.log("New rule values:", values);
    // Add your API call here to create the new loyalty rule
    // Example:
    // await createLoyaltyRule(values);
  };

  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            قواعد النقاط
          </h1>
          <p className="text-lg text-primary">إدارة قواعد منح النقاط </p>
        </div>

        <AddEditLoyaltyPoint_modal onSubmit={handleAddRule}>
          <Button type="primary">
            <FiPlus />
            إضافة قاعدة جديد
          </Button>
        </AddEditLoyaltyPoint_modal>
      </div>

      <LoyaltyPoints_table />
    </main>
  );
};
