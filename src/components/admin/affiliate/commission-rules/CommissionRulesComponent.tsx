"use client";
import { Button } from "antd";
import { FiPlus } from "react-icons/fi";
import { CommissionRules_table } from "./table/CommissionRules_table";
import { AddEditCommissionRule_modal } from "./modal/AddEditCommissionRule_modal";

export const CommissionRulesComponent = () => {
  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            قواعد العمولة
          </h1>
          <p className="text-lg text-primary">إدارة قواعد العمولة للمسوقين </p>
        </div>

        <AddEditCommissionRule_modal>
          <Button type="primary">
            <FiPlus />
            إضافة قاعدة جديد
          </Button>
        </AddEditCommissionRule_modal>
      </div>

      <CommissionRules_table />
    </main>
  );
};
