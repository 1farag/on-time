"use client";

import { TableProps, Dropdown } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSearchParams } from "next/navigation";
import DeleteModal from "@/components/tools/modal/DeleteModal";
import { useGetAdminAffiliateRules } from "../hooks/useGetAdminAffiliateRules";
import { useDeleteAffiliateRule } from "../hooks/useAddEditDeleteAffiliateRules";
import { FiPercent } from "react-icons/fi";
import { AddEditCommissionRule_modal } from "../modal/AddEditCommissionRule_modal";

export const CommissionRules_table = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, isLoading, pagination } = useGetAdminAffiliateRules({
    search,
    page,
    limit: 10,
  });

  const { deleteRuleMutation, isPending: deleteLoading } =
    useDeleteAffiliateRule();

  const handleDelete = (id: string) => {
    deleteRuleMutation(id);
  };

  const columns: TableProps["columns"] = [
    {
      title: "القاعدة",
      key: "rule",
      width: 200,
      render: (_, record: any) => (
        <div className="flex items-center !justify-start gap-2">
          <FiPercent className="text-[#385B66]" />
          <span className="font-medium">{record?.name}</span>
        </div>
      ),
    },
    {
      title: "النسبة",
      dataIndex: "commissionRate",
      key: "commissionRate",
      width: 120,
      align: "center",
      render: (percentage) => (
        <span className="font-semibold text-[#385B66]">{percentage}%</span>
      ),
    },
    {
      title: "الحد الأدنى للطلب",
      dataIndex: "minOrderAmount",
      key: "minOrderAmount",
      width: 200,
      align: "center",
      render: (amount) => <span className="text-gray-700">{amount} ر.س</span>,
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
        ) : (
          <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
            معطل
          </span>
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
              <AddEditCommissionRule_modal record={record} isEdit={true}>
                <button className="flex items-center gap-2">
                  <FaRegEdit />
                  تعديل
                </button>
              </AddEditCommissionRule_modal>
            ),
          },
          {
            key: "delete",
            label: (
              <DeleteModal
                heading="حذف القاعدة"
                description="هل أنت متأكد من حذف القاعدة؟ لا يمكن التراجع عن هذا الإجراء."
                handleDelete={async () => handleDelete(record._id)}
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
            <button className="p-2 rounded hover:bg-gray-100 transition cursor-pointer text-gray-700">
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
      data={data?.rules}
      isLoading={isLoading}
      exportedName="Affiliate Rules"
      totalItems={pagination?.pagination?.total || 0}
    />
  );
};
