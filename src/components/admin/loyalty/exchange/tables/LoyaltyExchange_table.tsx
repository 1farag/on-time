"use client";

import { TableProps } from "antd";
import { FaCheck, FaTimes } from "react-icons/fa";
import { TableS2 } from "@/components/tools/tables/TableS2";
import { useGetRedemptionRequests } from "../hooks/useGetRedemptionRequests";
import { useSearchParams } from "next/navigation";
import {
  useAcceptRequest,
  useRejectRequest,
} from "../hooks/useAcceptDenayRequest";

export const LoyaltyExchange_table = () => {
  const searchParams = useSearchParams();
  const { acceptRequestMutation, acceptRequestLoading } = useAcceptRequest();
  const { rejectRequestMutation, rejectRequestLoading } = useRejectRequest();
  const page = parseInt(searchParams.get("page") || "1", 10);

  // Replace with your actual hook
  const { data: requests, isLoading } = useGetRedemptionRequests({
    page,
    limit: 10,
  });

  // Mock data - replace with actual data
  // const requests = {
  //   items: [
  //     {
  //       _id: "1",
  //       userName: "محمد علي",
  //       rewardName: "خصم 10%",
  //       points: 500,
  //       date: "2023-11-20",
  //       status: "pending",
  //     },
  //     {
  //       _id: "2",
  //       userName: "سارة أحمد",
  //       rewardName: "شحن مجاني",
  //       points: 1000,
  //       date: "2023-11-19",
  //       status: "approved",
  //     },
  //     {
  //       _id: "3",
  //       userName: "محمد علي",
  //       rewardName: "خصم 10%",
  //       points: 500,
  //       date: "2023-11-20",
  //       status: "pending",
  //     },
  //     {
  //       _id: "4",
  //       userName: "سارة أحمد",
  //       rewardName: "شحن مجاني",
  //       points: 1000,
  //       date: "2023-11-19",
  //       status: "approved",
  //     },
  //   ],
  //   total: 4,
  // };

  // Replace with your actual mutation hook
  // const { updateRequestMutation, updateLoading } = useUpdateRedemptionRequest();

  const handleApprove = async (id: string) => {
    console.log("Approve request:", id);
    acceptRequestMutation(id);
    // Add your API call here
    // await updateRequestMutation({ id, status: 'approved' });
  };

  const handleReject = async (id: string) => {
    console.log("Reject request:", id);
    rejectRequestMutation(id);
    // Add your API call here
    // await updateRequestMutation({ id, status: 'rejected' });
  };

  const columns: TableProps["columns"] = [
    {
      title: "المستخدم",
      dataIndex: "userName",
      key: "userName",
      width: 200,
      render: (_, record) => (
        <span className="font-medium">
          {record?.user?.firstName} {record?.user?.lastName}
        </span>
      ),
    },

    {
      title: "المكافأة",
      dataIndex: "rewardName",
      key: "rewardName",
      width: 200,
      render: (_, record) => (
        <span className="text-gray-700">{record?.reward?.name}</span>
      ),
    },

    {
      title: "النقاط",
      dataIndex: "points",
      key: "points",
      width: 120,
      align: "center",
      render: (points) => (
        <span className="font-semibold text-gray-900">{points}</span>
      ),
    },

    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      width: 150,
      render: (_, record) => (
        <span className="text-gray-600">{record?.createdAt}</span>
      ),
    },

    {
      title: "الحالة",
      key: "status",
      width: 150,
      align: "center",
      render: (_, record: any) => {
        const statusConfig: Record<
          string,
          { bg: string; text: string; label: string }
        > = {
          pending: {
            bg: "bg-orange-100",
            text: "text-orange-600",
            label: "قيد الانتظار",
          },
          approved: {
            bg: "bg-[#ECFDF5]",
            text: "text-[#007A55]",
            label: "مقبول",
          },
          rejected: {
            bg: "bg-red-100",
            text: "text-red-600",
            label: "مرفوض",
          },
        };

        const config = statusConfig[record.status] || statusConfig.pending;

        return (
          <span
            className={`px-3 py-1 text-xs rounded-full ${config.bg} ${config.text}`}
          >
            {config.label}
          </span>
        );
      },
    },

    {
      title: "إجراءات",
      key: "actions",
      align: "center",
      width: 120,
      render: (_, record: any) => {
        if (record.status === "pending") {
          return (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handleApprove(record._id)}
                className="p-2 rounded hover:bg-green-50 transition text-green-600"
                title="قبول"
              >
                <FaCheck size={16} />
              </button>
              <button
                onClick={() => handleReject(record._id)}
                className="p-2 rounded hover:bg-red-50 transition text-red-600"
                title="رفض"
              >
                <FaTimes size={16} />
              </button>
            </div>
          );
        }

        // For approved/rejected requests, show the icons without action
        return (
          <div className="flex items-center justify-center gap-2">
            {record.status === "approved" && (
              <span className="text-green-600">
                <FaCheck size={16} />
              </span>
            )}
            {record.status === "rejected" && (
              <span className="text-red-600">
                <FaTimes size={16} />
              </span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <TableS2
      columns={columns}
      data={requests?.items || []}
      isLoading={isLoading}
      // totalItems={requests?.total || 0}
    />
  );
};
