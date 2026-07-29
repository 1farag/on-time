"use client";

import React from "react";
import { TableProps, Dropdown, Tag } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { FaRegEdit, FaTrashAlt, FaChartBar } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { useDeleteCoupon } from "../hooks/useCoupons";
import DeleteModal from "@/components/tools/modal/DeleteModal";

interface CouponsTableProps {
  coupons: any[];
  isLoading: boolean;
  onViewStats: (coupon: any) => void;
  totalItems?: number;
}

const CouponsTable: React.FC<CouponsTableProps> = ({
  coupons,
  isLoading,
  onViewStats,
  totalItems,
}) => {
  const { mutate: deleteCoupon, isPending: deleteLoading } = useDeleteCoupon();

  const columns: TableProps["columns"] = [
    {
      title: "الكود",
      dataIndex: "code",
      key: "code",
      render: (text) => (
        <span className="font-bold text-[#385B66]">{text}</span>
      ),
    },
    {
      title: "النوع",
      dataIndex: "type",
      key: "type",
      width: 150,

      render: (type) => (
        <span>
          {type === "percentage"
            ? "نسبة مئوية"
            : type === "fixed"
              ? "مبلغ ثابت"
              : "شحن مجاني"}
        </span>
      ),
    },
    {
      title: "القيمة",
      key: "amount",
      width: 130,

      render: (_, record) => (
        <span>
          {record.amount} {record.type === "percentage" ? "%" : "ر.س"}
        </span>
      ),
    },
    {
      title: "الحد الأدنى للطلب",
      dataIndex: "minOrderAmount",
      key: "minOrderAmount",
      width: 200,
      render: (amount) => (amount ? `${amount} ر.س` : "-"),
    },
    {
      title: "الاستخدام",
      key: "usage",
      width: 140,

      render: (_, record) => (
        <span>
          {record.usageCount} / {record.usageLimit}
        </span>
      ),
    },
    {
      title: "تاريخ الانتهاء",
      dataIndex: "endDate",
      key: "endDate",
      width: 150,

      render: (date) => new Date(date).toLocaleDateString("ar-SA"),
    },
    {
      title: "الحالة",
      dataIndex: "isActive",
      key: "isActive",
      width: 150,

      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "نشط" : "معطل"}
        </Tag>
      ),
    },
    {
      title: "إجراءات",
      key: "actions",
      align: "center",
      width: 120,

      render: (_, record: any) => {
        const items = [
          {
            key: "edit",
            label: (
              <Link
                href={`/admin/coupons/${record._id}/edit`}
                className="flex items-center gap-2"
              >
                <FaRegEdit />
                تعديل
              </Link>
            ),
          },
          {
            key: "stats",
            label: (
              <div
                onClick={() => onViewStats(record)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FaChartBar />
                الإحصائيات
              </div>
            ),
          },
          {
            key: "delete",
            label: (
              <DeleteModal
                heading="حذف كوبون"
                description={`هل أنت متأكد من حذف الكوبون "${record.code}"؟`}
                handleDelete={async () => deleteCoupon(record._id)}
                deleteLoading={deleteLoading}
              >
                <div className="flex items-center gap-2 text-red-600 cursor-pointer">
                  <FaTrashAlt />
                  حذف
                </div>
              </DeleteModal>
            ),
          },
        ];
        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <button className="p-2 rounded hover:bg-gray-100 transition">
              <BsThreeDotsVertical size={18} />
            </button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <TableServerPagination
      columns={columns}
      data={coupons}
      isLoading={isLoading}
      totalItems={totalItems}
      exportedName="Coupons"
    />
  );
};

export default CouponsTable;
