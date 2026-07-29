"use client";

import { Select, TableProps } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useGetAllOrders } from "../hooks/useGetAllOrders";
import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";
import dayjs from "dayjs";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";
import { record } from "zod";

const STATUS_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  pending: {
    bg: "#FEF9C3",
    text: "#A16207",
    border: "#FACC15",
  },
  paid: {
    bg: "#DBEAFE",
    text: "#1D4ED8",
    border: "#3B82F6",
  },
  shipped: {
    bg: "#E0E7FF",
    text: "#4338CA",
    border: "#6366F1",
  },
  delivered: {
    bg: "#DCFCE7",
    text: "#15803D",
    border: "#22C55E",
  },
  cancelled: {
    bg: "#E5E7EB",
    text: "#374151",
    border: "#9CA3AF",
  },
  refunded: {
    bg: "#F3E8FF",
    text: "#7E22CE",
    border: "#A855F7",
  },
  failed: {
    bg: "#FEE2E2",
    text: "#B91C1C",
    border: "#EF4444",
  },
};

export const AllOrders_table = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: users, isLoading } = useGetAllOrders({
    search,
    page,
    limit: 6,
  });

  const { updateOrderStatusMutation, updateOrderStatusLoading } =
    useUpdateOrderStatus({
      search,
      page,
      limit: 6,
    });

  const ORDER_STATUS_OPTIONS = [
    { value: "pending", label: "قيد المراجعة" },
    { value: "paid", label: "مدفوع" },
    { value: "shipped", label: "تم الشحن" },
    { value: "delivered", label: "تم التوصيل" },
    { value: "cancelled", label: "ملغي" },
    { value: "refunded", label: "تم الاسترجاع" },
    { value: "failed", label: "فشل الدفع" },
  ];

  //   const { deleteUserMutation, deleteUserLoading } = useRejectOrder();
  //   const { deleteUserMutation, deleteUserLoading } = useAcceptOrder();

  const columns: TableProps["columns"] = [
    {
      title: "المنتج",
      dataIndex: "orderNumber",
      key: "orderNumber",
      width: 200,
      render: (ـ, record) => (
        <div className="flex flex-col">
          <span className="text-gray-600 font-medium">
            {record?.orderNumber}
          </span>
        </div>
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
      render: (_, record) => (
        <CurrencyFormatter
          amount={`${record?.total} `}
          currency={record.currency}
          amountClassName="text-lg font-bold text-gray-700 "
          iconSize={18}
        />
      ),
    },

    {
      title: "طريقة الدفع",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 150,
      render: (value) => (
        <span className="text-gray-800 font-medium">{value}</span>
      ),
    },
    {
      title: "العنوان الوطني",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 200,
      render: (_, record) => (
        <span className="text-gray-800 font-medium">
          {record?.shipping?.address?.shortAddress}
        </span>
      ),
    },

    // {
    //   title: "الحالة",
    //   dataIndex: "status",
    //   key: "status",
    //   width: 150,
    //   render: (status: string) => {
    //     const statusMap: Record<
    //       string,
    //       { label: string; bg: string; text: string }
    //     > = {
    //       pending: {
    //         label: "قيد المراجعة",
    //         bg: "bg-yellow-100",
    //         text: "text-yellow-700",
    //       },
    //       paid: {
    //         label: "مدفوع",
    //         bg: "bg-blue-100",
    //         text: "text-blue-700",
    //       },
    //       shipped: {
    //         label: "تم الشحن",
    //         bg: "bg-indigo-100",
    //         text: "text-indigo-700",
    //       },
    //       delivered: {
    //         label: "تم التوصيل",
    //         bg: "bg-green-100",
    //         text: "text-green-700",
    //       },
    //       cancelled: {
    //         label: "ملغي",
    //         bg: "bg-gray-200",
    //         text: "text-gray-700",
    //       },
    //       refunded: {
    //         label: "تم الاسترجاع",
    //         bg: "bg-purple-100",
    //         text: "text-purple-700",
    //       },
    //       failed: {
    //         label: "فشل الدفع",
    //         bg: "bg-red-100",
    //         text: "text-red-700",
    //       },
    //     };

    //     const current = statusMap[status] || {
    //       label: status,
    //       bg: "bg-gray-100",
    //       text: "text-gray-600",
    //     };

    //     return (
    //       <span
    //         className={`px-3 py-1 text-xs rounded-full font-medium ${current.bg} ${current.text}`}
    //       >
    //         {current.label}
    //       </span>
    //     );
    //   },
    // },
    {
      title: "التاريخ",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 210,
      render: (value) => {
        const date = new Date(value);
        return (
          <span className="text-gray-600 text-left">
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
      width: 150,
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
              padding: "10px 12px",
              minWidth: "100%",
            }}
            disabled={updateOrderStatusLoading}
            dropdownStyle={{ borderRadius: 12 }}
            onChange={async (newStatus) => {
              await updateOrderStatusMutation({
                id: record._id,
                values: { status: newStatus },
              });
            }}
            options={ORDER_STATUS_OPTIONS}
          />
        );
      },
    },
    {
      title: "إجراءات",
      key: "actions",
      align: "center",
      width: 120,
      render: (_, record: any) => (
        <button
          onClick={() => router.push(`/admin/orders/${record._id}`)}
          className="p-2 rounded hover:bg-gray-100 transition text-gray-600 hover:text-primary"
          title="عرض التفاصيل"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      ),
    },
  ];

  return (
    <TableServerPagination
      columns={columns}
      data={users?.orders || []}
      isLoading={isLoading}
      exportedName="users"
      totalItems={users?.pagination?.total || 0}
    />
  );
};
