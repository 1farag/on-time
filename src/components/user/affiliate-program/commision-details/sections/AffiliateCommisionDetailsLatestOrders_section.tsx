"use client";

import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAffiliateCommissions } from "../hooks/useGetAffiliateCommissions";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import dayjs from "dayjs";

interface OrderRecord {
  key: string;
  orderId: string;
  product: string;
  category: string;
  orderAmount: number;
  commissionRate: number;
  commissionValue: number;
  status: "مكتمل" | "قيد المعالجة" | "ملغى";
  date: string;
  customer: string;
  currency: string;
}

export const AffiliateCommisionDetailsLatestOrders_section = () => {
  const { data, isLoading } = useGetAffiliateCommissions();

  // Map API data into table format
  const tableData: OrderRecord[] =
    data?.commissions?.map((item: any) => ({
      key: item._id,
      orderId: item.orderId?.orderNumber,
      product: item.products?.map((p: any) => p.name).join(", ") || "-",
      category: item.products?.[0]?.type || "-",
      orderAmount: item.orderTotal,
      commissionRate: item.commissionRate,
      commissionValue: item.commissionAmount,
      status: item.status === "confirmed" ? "مكتمل" : "قيد المعالجة",
      date: dayjs(item.orderId?.createdAt).format("DD/MM/YYYY") || "-",
      customer: item.customerName || "-",
      currency: item.currency || "ر.س",
    })) || [];

  const columns: ColumnsType<OrderRecord> = [
    {
      title: "رقم الطلب",
      dataIndex: "orderId",
      key: "orderId",
      width: 120,
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "العميل",
      dataIndex: "customer",
      key: "customer",
      width: 150,
    },
    {
      title: "المنتجات",
      dataIndex: "product",
      key: "product",
      width: 220,
    },
    // {
    //   title: "التصنيف",
    //   dataIndex: "category",
    //   key: "category",
    //   width: 150,
    //   render: (text) => <span className="text-[#B0B0B3]">{text}</span>,
    // },
    {
      title: "مبلغ الطلب",
      dataIndex: "orderAmount",
      key: "orderAmount",
      width: 130,
      render: (_, record) => (
        <span>
          {record.orderAmount} {record.currency}
        </span>
      ),
    },
    {
      title: "نسبة العمولة",
      dataIndex: "commissionRate",
      key: "commissionRate",
      width: 130,
      render: (rate) => <span>{rate}%</span>,
    },
    {
      title: "قيمة العمولة",
      dataIndex: "commissionValue",
      key: "commissionValue",
      width: 140,
      render: (_, record) => (
        <span className="text-green-600 font-semibold">
          {record.commissionValue.toFixed(2)} {record.currency}
        </span>
      ),
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status) => {
        let bg = "#EAF7EA";
        let text = "#2E7D32";

        if (status === "قيد المعالجة") {
          bg = "#ebeeef";
          text = "#3A5762";
        }

        if (status === "ملغى") {
          bg = "#FDEAEA";
          text = "#C62828";
        }

        return (
          <Tag
            className="!border-0 !rounded-full !px-4 !py-1 text-sm font-medium"
            style={{ backgroundColor: bg, color: text }}
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
      width: 120,
      render: (text) => <span className="text-[#B0B0B3] text-sm">{text}</span>,
    },
  ];

  return (
    <div className="cardS1 my-10">
      <h2 className="text-2xl md:text-3xl font-bold text-right text-gray-900 mb-8">
        سجل العمولات
      </h2>

      <div className="overflow-x-auto">
        <TableServerPagination
          columns={columns}
          data={tableData}
          isLoading={isLoading}
          totalItems={data?.pagination?.total || 0}
          noSearch
        />
      </div>
    </div>
  );
};
