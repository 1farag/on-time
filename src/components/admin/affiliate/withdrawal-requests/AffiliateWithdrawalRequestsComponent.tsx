"use client";

import { useState } from "react";
import { AffiliateWithdrawalRequests_table } from "./tables/AffiliateWithdrawalRequests_table";
import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { WithdrawalLimitModal } from "./modals/WithdrawalLimitModal";

export const AffiliateWithdrawalRequestsComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            طلبات السحب{" "}
          </h1>
          <p className="text-lg text-primary">إدارة برنامج الأفلييت </p>
        </div>

        <Button
          type="primary"
          icon={<SettingOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          تغيير الحد الأدنى للسحب
        </Button>
      </div>

      <AffiliateWithdrawalRequests_table />

      <WithdrawalLimitModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};
