"use client";

import React from "react";
import { Table, ConfigProvider, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAffiliateLatestCommissions } from "../hooks/useGetAffiliateDashboard";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import dayjs from "dayjs";

interface OrderRecord {
  products: any;
  key: React.Key;
  orderId: string;
  customer: string;
  amount: number;
  commission: number;
  currency?: string;
  status: "مكتمل" | "قيد المعالجة" | "ملغى";
  date: string;
}

export const AffiliateDashboardLatestOrders_section = () => {
  const { data: commissions, isLoading: commissionsLoading } =
    useGetAffiliateLatestCommissions();

  const tableData =
    commissions?.commissions?.map((item: any) => ({
      key: item._id,
      orderId: item.orderId?.orderNumber,
      customer: item?.customerName, // API does not provide customer
      products: item?.orderId?.items, // From new API structure
      amount: item.orderTotal,
      commission: item.commissionAmount,
      status: item.status === "confirmed" ? "مكتمل" : "قيد المعالجة",
      date: dayjs(item.createdAt).format("DD/MM/YYYY") || "-",
      currency: item.currency || "ر.س",
    })) || [];

  const columns: ColumnsType<OrderRecord> = [
    {
      title: "رقم الطلب",
      dataIndex: "orderId",
      key: "orderId",
      width: 200,
      render: (text) => <span className="font-bold text-gray-900">{text}</span>,
    },
    {
      title: "العميل",
      dataIndex: "customer",
      key: "customer",
      width: 150,
      render: (text) => (
        <span className="text-gray-800 font-medium">{text || "-"}</span>
      ),
    },
    {
      title: "المنتج",
      dataIndex: "products",
      key: "products",
      width: 200,
      render: (_, record) => (
        <div>
          {record?.products?.length > 0
            ? record.products?.map(
              (prod: any, index: React.Key | null | undefined) => (
                <div key={index} className="text-gray-700">
                  {prod.productName}
                </div>
              )
            )
            : "-"}
        </div>
      ),
    },
    {
      title: "المبلغ",
      dataIndex: "amount",
      key: "amount",
      width: 130,
      render: (_, record) => (
        <span>
          {record?.amount} {record?.currency}
        </span>
      ),
    },
    {
      title: "العمولة",
      dataIndex: "commission",
      key: "commission",
      width: 120,
      render: (_, record) => (
        <span className="text-green-600 font-semibold">
          {record?.commission} {record?.currency}
        </span>
      ),
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => {
        let bg = "#EAF7EA";
        let text = "#2E7D32";

        if (status === "قيد المعالجة") {
          bg = "#E7F3F8";
          text = "#4A6F7C";
        }

        if (status === "ملغى") {
          bg = "#FDEAEA";
          text = "#C62828";
        }

        return (
          <Tag
            className="!border-0 !rounded-full !px-4 !py-1 text-sm font-medium"
            style={{
              backgroundColor: bg,
              color: text,
            }}
          >
            {status}
          </Tag>
        );
      },
    },

    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      width: 100,
      render: (text) => <span className="text-gray-600 text-sm">{text}</span>,
    },
  ];

  return (
    <div className="cardS1">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-right text-gray-900 mb-8">
        آخر الإحالات{" "}
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <TableServerPagination
          columns={columns}
          data={tableData}
          isLoading={commissionsLoading}
          totalItems={commissions?.pagination?.total || 0}
          noSearch
        />
      </div>
    </div>
  );
};
