"use client";

import { TableProps, Popconfirm } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { useSearchParams } from "next/navigation";
import {
  useGetAdminAffiliateWithdrawalRequests,
  useApproveWithdrawalRequest,
  useRejectWithdrawalRequest,
  usePayWithdrawalRequest,
} from "../hooks/useGetAdminAffiliatePartners";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const AffiliateWithdrawalRequests_table = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const queryClient = useQueryClient();

  const { data, isLoading } = useGetAdminAffiliateWithdrawalRequests({
    search,
    page,
    limit: 10,
  });

  const { mutate: approveRequest, isPending: isApproving } =
    useApproveWithdrawalRequest();
  const { mutate: rejectRequest, isPending: isRejecting } =
    useRejectWithdrawalRequest();
  const { mutate: payRequest, isPending: isPaying } = usePayWithdrawalRequest();

  const handleApprove = (id: string) => {
    approveRequest(id, {
      onSuccess: () => {
        toast.success("تمت الموافقة على الطلب بنجاح");
        queryClient.invalidateQueries({
          queryKey: ["admin", "affiliate", "withdrawal-requests"],
        });
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "حدث خطأ أثناء الموافقة على الطلب"
        );
      },
    });
  };

  const handleReject = (id: string) => {
    rejectRequest(id, {
      onSuccess: () => {
        toast.success("تم رفض الطلب بنجاح");
        queryClient.invalidateQueries({
          queryKey: ["admin", "affiliate", "withdrawal-requests"],
        });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "حدث خطأ أثناء رفض الطلب");
      },
    });
  };

  const handlePay = (id: string) => {
    payRequest(id, {
      onSuccess: () => {
        toast.success("تم تأكيد دفع الطلب بنجاح");
        queryClient.invalidateQueries({
          queryKey: ["admin", "affiliate", "withdrawal-requests"],
        });
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "حدث خطأ أثناء تأكيد الدفع"
        );
      },
    });
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "المسوق",
      key: "affiliate",
      width: 240,
      render: (_, record) => (
        <div className="flex flex-col items-start">
          <span className="font-medium">{record?.affiliateId?.name}</span>
          <span className="text-sm text-[#6A7282]">
            {record?.affiliateId?.email}
          </span>
        </div>
      ),
    },

    {
      title: "المبلغ",
      dataIndex: "amount",
      key: "amount",
      width: 140,
      align: "center",
      render: (amount, record) => (
        <span className="font-bold text-[#111113]">
          {amount} {record.currency}
        </span>
      ),
    },

    {
      title: "طريقة الدفع",
      dataIndex: "withdrawalMethod",
      key: "withdrawalMethod",
      width: 160,
      align: "center",
    },

    {
      title: "تاريخ الطلب",
      dataIndex: "requestedAt",
      key: "requestedAt",
      width: 160,
      align: "center",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },

    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 180,
      align: "center",
      render: (status) => {
        if (status === "pending") {
          return (
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
              قيد المراجعة
            </span>
          );
        }

        if (status === "approved") {
          return (
            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
              تمت الموافقة
            </span>
          );
        }

        if (status === "paid") {
          return (
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
              تم الدفع
            </span>
          );
        }

        return (
          <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
            مرفوض
          </span>
        );
      },
    },

    {
      title: "إجراءات",
      key: "actions",
      align: "center",
      width: 160,
      render: (_, record) => {
        if (record.status === "pending") {
          return (
            <div className="flex items-center justify-center gap-2">
              <Popconfirm
                title="تأكيد الموافقة"
                description="هل أنت متأكد من الموافقة على هذا الطلب؟"
                onConfirm={() => handleApprove(record._id)}
                okText="نعم"
                cancelText="لا"
              >
                <button
                  className=" cursor-pointer text-[#21C45D] bg-[#F7F7F7] border border-[#E1E7EF] p-3 rounded-lg text-lg hover:bg-green-50 transition-colors disabled:opacity-50"
                  title="موافقة"
                  disabled={isApproving}
                >
                  <FaCheck />
                </button>
              </Popconfirm>
              <Popconfirm
                title="تأكيد الرفض"
                description="هل أنت متأكد من رفض هذا الطلب؟"
                onConfirm={() => handleReject(record._id)}
                okText="نعم"
                cancelText="لا"
              >
                <button
                  className=" cursor-pointer text-[#EF4343] bg-[#F7F7F7] border border-[#E1E7EF] p-3 rounded-lg text-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                  title="رفض"
                  disabled={isRejecting}
                >
                  <IoCloseSharp />
                </button>
              </Popconfirm>
            </div>
          );
        }

        if (record.status === "approved") {
          return (
            <div className="flex items-center justify-center gap-2">
              <Popconfirm
                title="تأكيد الدفع"
                description="هل أنت متأكد من انه تم الدفع لهذا الطلب؟"
                onConfirm={() => handlePay(record._id)}
                okText="نعم"
                cancelText="لا"
              >
                <button
                  className="text-[#3B82F6] bg-[#F7F7F7] border border-[#E1E7EF] p-2 px-3 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-50 transition-colors disabled:opacity-50"
                  title="تم الدفع"
                  disabled={isPaying}
                >
                  <FaRegMoneyBillAlt className="text-lg" />
                  دفع
                </button>
              </Popconfirm>
            </div>
          );
        }

        return <span className="text-sm text-gray-400">—</span>;
      },
    },
  ];

  return (
    <TableServerPagination
      columns={columns}
      data={data?.withdrawals || []}
      isLoading={isLoading}
      exportedName="Affiliate Withdrawal Requests"
      totalItems={data?.pagination?.total || 0}
    />
  );
};
