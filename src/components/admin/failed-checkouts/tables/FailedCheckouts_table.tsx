"use client";

import { TableProps } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { useSearchParams } from "next/navigation";
import { useGetFailedCheckouts } from "../hooks/useGetFailedCheckouts";
import dayjs from "dayjs";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";

export const FailedCheckouts_table = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, isLoading } = useGetFailedCheckouts({
    search,
    page,
    limit: 10,
  });

  const columns: TableProps["columns"] = [
    {
      title: "رقم الطلب / ID",
      dataIndex: "orderNumber",
      key: "orderNumber",
      width: 200,
      render: (value, record: any) => (
        <span className="text-gray-600 font-medium">
          {value || record?._id}
        </span>
      ),
    },
    {
      title: "العميل",
      key: "customer",
      width: 200,
      render: (_, record: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">
            {record?.customerInfo?.firstName} {record?.customerInfo?.lastName}
          </span>
          <span className="text-sm text-gray-500">
            {record?.customerInfo?.phone}
          </span>
        </div>
      ),
    },
    {
      title: "المبلغ",
      dataIndex: "total",
      key: "total",
      width: 150,
      render: (_, record: any) => (
        <CurrencyFormatter
          amount={`${record?.total} `}
          currency={record.currency || "SAR"}
          amountClassName="text-lg font-bold text-gray-700 "
          iconSize={18}
        />
      ),
    },
    {
      title: "التاريخ",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 210,
      render: (value) => {
        const date = new Date(value);
        return (
          <span className="text-gray-600">
            {dayjs(date).locale("ar").format("DD-MM-YYYY")} |
            {dayjs(date).locale("ar").format(" hh:mm A")}
          </span>
        );
      },
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: () => (
        <span className="px-3 py-1 text-xs rounded-full font-medium bg-red-100 text-red-700 border border-red-400">
          فشل الدفع
        </span>
      ),
    },
  ];

  return (
    <TableServerPagination
      columns={columns}
      data={data?.checkouts || []}
      isLoading={isLoading}
      exportedName="Failed-Checkouts"
      totalItems={data?.pagination?.total || 0}
    />
  );
};
