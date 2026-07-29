"use client";

import { TableProps } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";

import { useSearchParams } from "next/navigation";

import { useGetMembershipSubscribers } from "../hooks/useGetMembershipSubscribers";
import { record } from "zod";
import Link from "next/link";
import dayjs from "dayjs";

export const MembershipSubscribers_table = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: subscribers, isLoading } = useGetMembershipSubscribers({
    search,
    page,
    limit: 10,
  });
  console.log(subscribers);
  const columns: TableProps["columns"] = [
    {
      title: "المشترك",
      dataIndex: "user",
      key: "user",
      width: 200,
      render: (_, record: any) => (
        <div className="flex flex-col gap-2">
          <span>
            {record.user?.firstName} {record?.user?.lastName}
          </span>
          <span>{record?.user?.email}</span>
        </div>
      ),
    },
    {
      title: "الخطة",
      dataIndex: "tier",
      key: "tier",
      width: 120,
    },
    {
      title: "تاريخ البداية",
      dataIndex: "startDate",
      key: "startDate",
      width: 120,
      render: (value: string) =>
        value ? <span>{dayjs(value).format("YYYY-MM-DD")}</span> : "-",
    },
    {
      title: "تاريخ الانتهاء",
      dataIndex: "expireDate",
      key: "expireDate",
      width: 120,
      render: (value: string) =>
        value ? <span>{dayjs(value).format("YYYY-MM-DD")}</span> : "-",
    },
    {
      title: "طريقة الدفع",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 120,
    },
    {
      title: "الحالة",
      key: "status",
      width: 120,
      align: "center",
      render: (_, record: any) =>
        record.status === "active" ? (
          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
            نشط
          </span>
        ) : record.status === "pending" ? (
          <span className="px-3 py-1 text-xs rounded-full bg-red-50 text-primary">
            معلق
          </span>
        ) : (
          <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
            معطل
          </span>
        ),
    },
    {
      title: "إجراءات",
      dataIndex: "notes",
      key: "notes",
      width: 120,
      render: (_, record) => (
        <Link
          href={`/admin/memberships/subscribers/${record?.user?._id}`}
          className="text-[#155DFC]"
        >
          التفاصيل
        </Link>
      ),
    },
  ];

  return (
    <TableServerPagination
      columns={columns}
      data={subscribers?.subscribers || []}
      isLoading={isLoading}
      exportedName="Products"
      totalItems={subscribers?.pagination?.total || 0}
    />
  );
};
