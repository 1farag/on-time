"use client";

import { InquiriesTable } from "./tables/InquiriesTable";

export const InquiriesListComponent = () => {
  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            استفسارات التواصل
          </h1>
          <p className="text-lg text-primary">
            إدارة رسائل واستفسارات المستخدمين
          </p>
        </div>
      </div>

      <InquiriesTable />
    </main>
  );
};
