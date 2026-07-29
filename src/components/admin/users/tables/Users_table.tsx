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
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useGetAdminUsers } from "../hooks/useGetUsers";
import { FaUser } from "react-icons/fa6";

export const Users_table = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: users, isLoading } = useGetAdminUsers({
    search,
    page,
    limit: 10,
  });

  const { deleteUserMutation, deleteUserLoading } = useDeleteUser();

  const handleDelete = (id: string) => {
    deleteUserMutation(id);
  };

  const columns: TableProps["columns"] = [
    {
      title: "المستخدم",
      key: "user",
      width: 200,
      render: (_, record: any) => (
        <div className="flex items-center !justify-start gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
            {record.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex flex-col">
            <p className="font-medium text-gray-900">
              {record.firstName} {record?.lastName}
            </p>
            <p className="text-sm text-gray-500">{record.email}</p>
          </div>
        </div>
      ),
    },

    {
      title: "الدور",
      key: "role",
      width: 150,
      render: (_, record: any) => {
        const roleColors: Record<string, { bg: string; text: string }> = {
          admin: { bg: "bg-blue-100", text: "text-blue-600" },
          moderator: { bg: "bg-cyan-100", text: "text-cyan-600" },
          user: { bg: "bg-gray-100", text: "text-gray-600" },
          manager: { bg: "bg-green-100", text: "text-green-600" },
        };

        const roleLabels: Record<string, string> = {
          admin: "مدير",
          moderator: "مشرف",
          user: "مستخدم",
          manager: "مسوق",
        };

        const colors = roleColors[record.role] || roleColors.user;
        const label = roleLabels[record.role] || record.role;

        return (
          <span
            className={`px-3 py-1 text-xs rounded-full ${colors.bg} ${colors.text} inline-block`}
          >
            {label}
          </span>
        );
      },
    },

    {
      title: "تاريخ الانضمام",
      key: "joinDate",
      width: 150,
      render: (_, record: any) => (
        <p className="text-gray-600">
          {record.createdAt
            ? new Date(record.createdAt).toLocaleDateString("ar-EG")
            : "غير متوفر"}
        </p>
      ),
    },

    {
      title: "إجراءات",
      key: "actions",
      align: "center",
      width: 80,
      render: (_, record: any) => {
        const items = [
          {
            key: "show",
            label: (
              <Link
                href={`/admin/users/${record._id}`}
                className="flex items-center gap-2"
              >
                <FaUser />
                فتح الحساب
              </Link>
            ),
          },
          {
            key: "edit",
            label: (
              <Link
                href={`/admin/users/${record._id}/edit`}
                className="flex items-center gap-2"
              >
                <FaRegEdit />
                تعديل
              </Link>
            ),
          },
          {
            key: "delete",
            label: (
              <DeleteModal
                heading="حذف مستخدم"
                description="هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء."
                handleDelete={async () => handleDelete(record._id)}
                deleteLoading={deleteUserLoading}
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
      data={users?.users || []}
      isLoading={isLoading}
      exportedName="users"
      totalItems={users?.total || 0}
    />
  );
};
