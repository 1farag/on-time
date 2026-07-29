"use client";

import { TableProps, Dropdown, Menu, Popconfirm } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";

import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

import DeleteModal from "@/components/tools/modal/DeleteModal";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { FaRegFolder } from "react-icons/fa6";

export const Categories_table = () => {
  const { deleteCategoryMutation, deleteCategoryLoading } = useDeleteCategory();

  const handleDelete = (id: string) => {
    // call delete API here
    deleteCategoryMutation(id);
  };

  const columns: TableProps["columns"] = [
    {
      title: "المنتج",
      key: "product",
      width: 220,
      render: (_, record: any) => (
        <div className="flex items-center !justify-start gap-4">
          <FaRegFolder className="text-xl" />
          <p>{record.name}</p>
        </div>
      ),
    },

    {
      title: "الوصف",
      dataIndex: "description",
      key: "description",
      width: 220,
    },

    {
      title: "عدد المنتجات",
      key: "price",
      width: 150,
      render: (_, record: any) => (
        <p>{/* {record.price} {record.currency} */}</p>
      ),
    },

    {
      title: "الحالة",
      key: "status",
      width: 200,

      render: (_, record: any) => (
        <>
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
            نشط
          </span>
          {/* {record.status === "active" ? (
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
              نشط
            </span>
          ) : (
            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
              غير نشط
            </span>
          )} */}
        </>
      ),
    },

    {
      title: "إجراءات",
      key: "actions",
      align: "center",
      width: 200,
      render: (_, record: any) => {
        const items = [
          {
            key: "edit",
            label: (
              <Link
                href={`/admin/categories/${record._id}/edit`}
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
                heading="حذف منتج "
                description="هل أنت متأكد من حذف هذا المنتج ؟ لا يمكن التراجع عن هذا الإجراء."
                handleDelete={async () => handleDelete(record._id)}
                deleteLoading={deleteCategoryLoading}
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
      data={[]}
      exportedName="Products"
      isLoading={false}
      totalItems={0}
    />
  );
};
