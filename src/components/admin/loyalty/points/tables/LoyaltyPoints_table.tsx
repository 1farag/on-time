"use client";

import { TableProps, Dropdown } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import DeleteModal from "@/components/tools/modal/DeleteModal";
import { useGetAdminLoyaltyPoints } from "../hooks/useGetAdminLoyaltyPoints";
import { useDeleteLoyaltyPoint } from "../hooks/useAddEditDeleteLoyaltyPoints";
import { FiStar } from "react-icons/fi";
import { AddEditLoyaltyPoint_modal } from "../modal/AddEditLoyaltyPoint_modal";

export const LoyaltyPoints_table = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: loyaltyPoints, isLoading } = useGetAdminLoyaltyPoints({
    search,
    page,
    limit: 10,
  });

  const { deleteLoyaltyPointMutation, deleteLoyaltyPointLoading } =
    useDeleteLoyaltyPoint();

  const handleDelete = (id: string) => {
    deleteLoyaltyPointMutation(id);
  };

  const handleEditRule = async (values: any) => {
    console.log("Edited rule values:", values);
    // Add your API call here to update the loyalty rule
    // Example:
    // await updateLoyaltyRule(values);
  };

  const columns: TableProps["columns"] = [
    {
      title: "القاعدة",
      key: "rule",
      width: 200,
      render: (_, record: any) => (
        <div className="flex items-center !justify-start gap-2">
          <FiStar className="text-[#385B66]" />
          <span className="font-medium">{record?.displayName}</span>
        </div>
      ),
    },

    {
      title: "النقاط",
      dataIndex: "pointsPerAction",
      key: "pointsPerAction",
      width: 120,
      align: "center",
      render: (_, record) => (
        <span className="font-semibold text-[#385B66]">
          {record?.pointsPerAction}
        </span>
      ),
    },

    {
      title: "الشرط",
      dataIndex: "conditionText",
      key: "conditionText",
      width: 200,
      render: (text) => <span className="text-gray-700">{text}</span>,
    },

    {
      title: "الحالة",
      key: "status",
      width: 120,
      align: "center",
      render: (_, record: any) =>
        record.isActive ? (
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
              <AddEditLoyaltyPoint_modal
                onSubmit={handleEditRule}
                record={record}
                isEdit={true}
              >
                <button className="flex items-center gap-2">
                  <FaRegEdit />
                  تعديل
                </button>
              </AddEditLoyaltyPoint_modal>
            ),
          },
          // {
          //   key: "delete",
          //   label: (
          //     <DeleteModal
          //       heading="حذف القاعدة"
          //       description="هل أنت متأكد من حذف القاعدة؟ لا يمكن التراجع عن هذا الإجراء."
          //       handleDelete={async () => handleDelete(record._id)}
          //       deleteLoading={deleteLoyaltyPointLoading}
          //     >
          //       <div className="flex items-center gap-2 text-red-600 cursor-pointer">
          //         <FaTrashAlt />
          //         حذف
          //       </div>
          //     </DeleteModal>
          //   ),
          // },
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
      data={loyaltyPoints?.rules || []}
      isLoading={isLoading}
      exportedName="Products"
      totalItems={loyaltyPoints?.pagination?.total || 0}
    />
  );
};
