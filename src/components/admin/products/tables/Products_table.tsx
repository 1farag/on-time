"use client";

import { TableProps, Dropdown } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useGetAdminProducts } from "../hooks/useGetAdminProducts";
import DeleteModal from "@/components/tools/modal/DeleteModal";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { AdminProductReviewsModal } from "../modals/AdminProductReviewsModal";
import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";

export const Products_table = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: products, isLoading } = useGetAdminProducts({
    search,
    page,
    limit: 10,
  });

  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const openReviewsModal = (product: any) => {
    setSelectedProduct(product);
    setIsReviewsModalOpen(true);
  };

  const { deleteProductMutation, deleteProductLoading } = useDeleteProduct();

  const handleDelete = (id: string) => {
    deleteProductMutation(id);
  };

  const columns: TableProps["columns"] = [
    {
      title: "المنتج",
      key: "product",
      width: 300,
      render: (_, record: any) => (
        <div className="flex items-center !justify-start gap-4">
          <Image
            src={record.thumbnail}
            alt={record.name}
            width={48}
            height={48}
            className="rounded object-cover"
          />
          <p>{record.name}</p>
        </div>
      ),
    },

    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      width: 240,
      render: (_, record) => (
        <div className="space-y-0.5">
          {record.skus?.map((item: any) => (
            <div
              key={item._id}
              // className="grid grid-cols-[40px_1fr_40px] gap-2 items-center px-2 py-1.5 rounded hover:bg-gray-50 transition"
              className="items-center px-2 py-1.5 rounded hover:bg-gray-50 transition"
            >
              <span className="text-xs font-bold text-center px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded block">
                {item}
              </span>
              {/* <span className="text-xs text-gray-700 font-mono truncate">
                {item}
              </span> */}
              {/* <span className="text-xs text-gray-500 text-right">
                ×{item.stock}
              </span> */}
            </div>
          ))}
        </div>
      ),
    },

    {
      title: "السعر",
      key: "price",
      width: 120,
      render: (_, record: any) => (
        <p>
          {record.price} {record.currency}
        </p>
      ),
    },

    {
      title: "المخزون",
      dataIndex: "totalStock",
      key: "totalStock",
      width: 120,
    },

    {
      title: "المبيعات",
      dataIndex: "totalSales",
      key: "totalSales",
      width: 120,
    },
    {
      title: "متوسط التقييم",
      dataIndex: "averageRating",
      key: "averageRating",
      width: 160,
    },

    {
      title: "الحالة",
      key: "isActive",
      width: 120,
      render: (_, record: any) => (
        <>
          {record.isActive ? (
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
              نشط
            </span>
          ) : (
            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
              غير نشط
            </span>
          )}
        </>
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
              <Link
                href={`/admin/products/${record._id}/edit`}
                className="flex items-center gap-2"
              >
                <FaRegEdit />
                تعديل
              </Link>
            ),
          },
          {
            key: "reviews",
            label: (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => openReviewsModal(record)}
              >
                <FaRegCommentDots />
                التقييمات
              </div>
            ),
          },
          {
            key: "delete",
            label: (
              <DeleteModal
                heading="حذف منتج"
                description="هل أنت متأكد من حذف هذا المنتج ؟ لا يمكن التراجع عن هذا الإجراء."
                handleDelete={async () => handleDelete(record._id)}
                deleteLoading={deleteProductLoading}
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

  console.log(products);
  return (
    <>
      <TableServerPagination
        columns={columns}
        data={products?.products || []}
        isLoading={isLoading}
        exportedName="Products"
        totalItems={products?.pagination?.total || 0}
      />

      {selectedProduct && (
        <AdminProductReviewsModal
          isOpen={isReviewsModalOpen}
          onClose={() => setIsReviewsModalOpen(false)}
          productId={selectedProduct._id}
          productName={selectedProduct.name}
        />
      )}
    </>
  );
};
