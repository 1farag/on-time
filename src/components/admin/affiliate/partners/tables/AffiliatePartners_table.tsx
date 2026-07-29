"use client";

import { Select, TableProps } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { useSearchParams } from "next/navigation";
import { useGetAdminAffiliatePartners } from "../hooks/useGetAdminAffiliatePartners";
import Link from "next/link";
import { useUpdatePartnerStatus } from "../hooks/useUpdatePartnerStatus";

const STATUS_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  active: {
    bg: "#DCFCE7",
    text: "#15803D",
    border: "#22C55E",
  },
  pending: {
    bg: "#FEF9C3",
    text: "#A16207",
    border: "#FACC15",
  },
  disabled: {
    bg: "#FEE2E2",
    text: "#B91C1C",
    border: "#EF4444",
  },
};

const PARTNER_STATUS_OPTIONS = [
  { value: "active", label: "نشط" },
  { value: "pending", label: "قيد المراجعة" },
  { value: "suspended", label: "معطل" },
];

export const AffiliatePartners_table = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, isLoading } = useGetAdminAffiliatePartners({
    search,
    page,
    limit: 10,
  });

  const { updatePartnerStatusMutation, updatePartnerStatusLoading } =
    useUpdatePartnerStatus();

  const columns: TableProps<any>["columns"] = [
    {
      title: "المسوق",
      key: "partner",
      width: 240,
      render: (_, record) => (
        <div className="flex flex-col items-start">
          <span className="font-medium">
            {record?.user?.firstName} {record?.name}
          </span>
          <span className="text-[#6A7282] text-sm">{record?.email}</span>
        </div>
      ),
    },

    {
      title: "الكود",
      dataIndex: "couponCode",
      key: "couponCode",
      width: 220,
      align: "center",
      render: (code) => (
        <span className="bg-[#EFF6FF] text-[#1447E6] px-3 py-1 rounded-lg font-medium">
          {code}
        </span>
      ),
    },

    {
      title: "نسبة العمولة",
      dataIndex: "commissionRate",
      key: "commissionRate",
      width: 120,
      align: "center",
      render: (rate) => <span>{rate}%</span>,
    },

    {
      title: "الأرباح",
      dataIndex: "totalCommission",
      key: "totalCommission",
      width: 140,
      align: "center",
      render: (value) => (
        <span className="text-[#00A63E] font-medium">{value} ر.س</span>
      ),
    },

    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 200,
      align: "center",
      render: (status: string, record: any) => {
        const currentStyle = STATUS_STYLES[status] || {
          bg: "#F3F4F6",
          text: "#374151",
          border: "#D1D5DB",
        };

        return (
          <Select
            value={status}
            style={{
              backgroundColor: currentStyle.bg,
              borderColor: currentStyle.border,
              color: currentStyle.text,
              borderRadius: 20,
              fontWeight: 500,
              minWidth: "100%",
            }}
            options={PARTNER_STATUS_OPTIONS}
            onChange={(newStatus) => {
              console.log(record._id, newStatus);

              // call your mutation here
              updatePartnerStatusMutation({
                id: record._id,
                values: { status: newStatus },
              });
            }}
          />
        );
      },
    },

    {
      title: "إجراءات",
      key: "actions",
      align: "center",
      width: 160,
      render: (_, record) => (
        <Link
          href={`/admin/affiliate/partners/${record._id}`}
          className="text-[#155DFC] font-medium"
        >
          الملف الشخصي
        </Link>
      ),
    },
  ];

  return (
    <TableServerPagination
      columns={columns}
      data={data?.affiliates || []}
      isLoading={isLoading}
      exportedName="Affiliate Partners"
      totalItems={data?.pagination?.total || 0}
    />
  );
};
