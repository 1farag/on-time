"use client";
import { Tag, Button } from "antd";
import { BsDownload } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { FiGift } from "react-icons/fi";
import { ColumnsType } from "antd/es/table";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useGetRedemptions } from "../hooks/useGetRedemptions";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { LuFilter } from "react-icons/lu";
import { ExportExcel } from "@/components/tools/exports/ExportExcel";

const columns: ColumnsType<any> = [
  {
    title: "التاريخ",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "right",
    width: 200,

    render: (date: string) => (
      <span className="text-[#111113] flex items-center gap-2">
        <CiCalendar className="text-[#B0B0B3]" />
        {new Date(date).toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    title: "الوصف",
    key: "description",
    width: 200,

    render: (_: any, record: any) => (
      <span className="text-gray-700 flex items-center gap-2">
        <FiGift className="text-primary" />
        {`استبدال مكافأة: ${
          record?.rewardId?.name || record?.couponType || "مكافأة"
        }`}
      </span>
    ),
  },
  {
    title: "الكوبون",
    key: "couponCode",
    width: 150,
    render: (_: any, record: any) =>
      record?.couponCode ? (
        <Tag className="rounded-full px-3 py-1 !text-gray-900 !bg-[#F1F1F1] !border-0">
          {record.couponCode}
        </Tag>
      ) : (
        <span className="text-gray-900">-</span>
      ),
  },
  {
    title: "النقاط",
    dataIndex: "pointsUsed",
    key: "pointsUsed",
    width: 150,

    render: (points: number) => (
      <span className="font-bold text-lg text-gray-700">{points}</span>
    ),
  },
  {
    title: "حالة الاستبدال",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (status: string) => {
      let color = "blue";
      let label = "قيد المعالجة";

      switch (status) {
        case "approved":
          color = "green";
          label = "تم";
          break;
        case "rejected":
          color = "red";
          label = "مرفوض";
          break;
        case "used":
          color = "purple";
          label = "مستخدم";
          break;
        case "expired":
          color = "gray";
          label = "منتهي";
          break;
        case "pending":
          color = "orange";
          label = "قيد المراجعة";
          break;
      }

      return (
        <Tag color={color} className="rounded-full">
          {label}
        </Tag>
      );
    },
  },
];

export const PointsHistoryData_section = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const statusFilter = searchParams.get("status") || "all";
  const limit = 10;

  const { data, isLoading } = useGetRedemptions(page, limit, statusFilter);

  const handleFilterClick = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Reset to page 1 on filter change

    if (newStatus === "all") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="points-history-data my-24 w-full">
      <div className="container">
        <div className="top flex flex-wrap lg:flex-nowrap items-center justify-between mb-4 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <LuFilter className="text-lg text-[#B0B0B3]" />
            <button
              className={statusFilter === "all" ? "active" : ""}
              onClick={() => handleFilterClick("all")}
            >
              الكل
            </button>
            <button
              className={`exchange ${statusFilter === "approved" ? "active" : ""}`}
              onClick={() => handleFilterClick("approved")}
            >
              مقبول
            </button>
            <button
              className={statusFilter === "pending" ? "active" : ""}
              onClick={() => handleFilterClick("pending")}
            >
              قيد المراجعة
            </button>
            <button
              className={statusFilter === "used" ? "active" : ""}
              onClick={() => handleFilterClick("used")}
            >
              مستخدم
            </button>
            <button
              className={statusFilter === "expired" ? "active" : ""}
              onClick={() => handleFilterClick("expired")}
            >
              منتهي
            </button>
            <button
              className={`exchange ${statusFilter === "rejected" ? "active" : ""}`}
              onClick={() => handleFilterClick("rejected")}
            >
              مرفوض
            </button>
          </div>

          <ExportExcel
            data={data?.redemptions || []}
            fileName={`سجل-النقاط-${new Date().toLocaleDateString("ar-EG")}.csv`}
            columns={columns}
            disabled={isLoading || !data?.redemptions?.length}
          >
            <button className="flex items-center gap-2">
              <BsDownload />
              تصدير اكسل
            </button>
          </ExportExcel>
        </div>

        {/* Table Integration */}
        <TableServerPagination
          columns={columns}
          data={data?.redemptions || []}
          totalItems={data?.pagination?.total || 0}
          isLoading={isLoading}
          noSearch={true}
        />
      </div>
    </section>
  );
};
