"use client";
import React, { useState } from "react";
import { Table, Button, Image, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  useGetAdminSliders,
  useDeleteAdminSlider,
  useReorderAdminSliders,
} from "../hooks/useAdminSliders";

export const SlidersTable = () => {
  const router = useRouter();
  const { data: slidersData, isLoading } = useGetAdminSliders();
  const { mutateAsync: deleteSlider, isPending: isDeleting } =
    useDeleteAdminSlider();
  const { mutateAsync: reorderSliders, isPending: isReordering } =
    useReorderAdminSliders();

  const sliders = slidersData?.data?.sliders || [];

  console.log("Sliders data:", slidersData, sliders);

  const handleDelete = async (id: string) => {
    try {
      await deleteSlider(id);
    } catch (error) {
      // Error handled in hook toast
    }
  };

  const columns = [
    {
      title: "الصورة",
      dataIndex: "images",
      key: "images",
      render: (
        _: any,
        record: {
          images: { desktop: { ar: any; en: any }; mobile: { en: any } };
        }
      ) => (
        <Image
          src={
            record?.images?.desktop?.ar ||
            record?.images?.desktop?.en ||
            record?.images?.mobile?.en ||
            ""
          }
          alt="Banner"
          width={80}
          height={40}
          className="object-cover rounded"
        />
      ),
    },

    {
      title: "نوع الإجراء",
      dataIndex: "action",
      key: "actionType",
      render: (action: any) => action?.type || "-",
    },
    {
      title: "Reference ID",
      dataIndex: "action",
      key: "referenceId",
      render: (action: any) => action?.referenceId || "-",
    },
    {
      title: "الإجراءات",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => router.push(`/admin/sliders/edit/${record._id}`)}
          />
          <Popconfirm
            title="هل أنت متأكد من حذف هذا البانر؟"
            onConfirm={() => handleDelete(record._id)}
            okText="نعم"
            cancelText="لا"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              loading={isDeleting}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#DCE3E5] overflow-hidden">
      <Table
        dataSource={sliders}
        columns={columns}
        rowKey="_id"
        loading={isLoading || isReordering}
        pagination={false}
      />
    </div>
  );
};
