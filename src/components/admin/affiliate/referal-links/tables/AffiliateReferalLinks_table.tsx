"use client";

import { TableProps } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";

import { useSearchParams } from "next/navigation";

import { useGetAdminAffiliatePartners } from "../hooks/useGetAdminAffiliatePartners";
import Link from "next/link";
import { MdContentCopy } from "react-icons/md";

export const AffiliateReferalLinks_table = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: loyaltyPoints, isLoading } = useGetAdminAffiliatePartners({
    search,
    page,
    limit: 10,
  });

  const columns: TableProps["columns"] = [
    {
      title: "المسوق",
      dataIndex: "partner",
      key: "partner",
      width: 200,
      render: (_, record: any) => (
        <div className="flex items-center !justify-start gap-2">
          <span className="font-medium">{record.name}</span>
        </div>
      ),
    },

    {
      title: "الكود",
      key: "code",
      width: 140,
      render: (_, record: any) => (
        <div className="bg-[#F3F5F7] text-[#111113] rounded-lg text-center w-fit">
          <span className="font-medium">{record.items[0].sku}</span>
        </div>
      ),
    },

    {
      title: "النقرات",
      dataIndex: "points",
      key: "points",
      width: 120,
      align: "center",
    },
    {
      title: "التحويلات",
      dataIndex: "points",
      key: "points",
      width: 120,
      align: "center",
    },
    {
      title: "معدل التحويل",
      dataIndex: "earning",
      key: "earning",
      width: 120,
      align: "center",

      render: (_, record: any) => (
        <div className=" text-[#00A63E] rounded-lg text-center w-fit">
          <span className="font-medium">{record.earning} ر.س</span>
        </div>
      ),
    },

    {
      title: "إجراءات",
      key: "actions",
      align: "center",
      width: 170,
      render: (_, record: any) => {
        return (
          <button className="text-[#111113] bg-[#F7F7F7] border border-[#E1E7EF] p-3 rounded-lg">
            <MdContentCopy />
          </button>
        );
      },
    },
  ];

  return (
    <TableServerPagination
      columns={columns}
      data={loyaltyPoints?.items || []}
      isLoading={isLoading}
      exportedName="Products"
      totalItems={loyaltyPoints?.total || 0}
    />
  );
};
