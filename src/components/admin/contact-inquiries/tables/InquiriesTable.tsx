"use client";

import { TableProps } from "antd";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { useSearchParams } from "next/navigation";
import { useGetContactInquiries } from "../hooks/useGetContactInquiries";
import dayjs from "dayjs";

export const InquiriesTable = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, isLoading } = useGetContactInquiries();

  const columns: TableProps<any>["columns"] = [
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (name) => (
        <span className="font-medium text-[#111113]">{name}</span>
      ),
    },
    {
      title: "البريد الإلكتروني",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "رقم الجوال",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      render: (phone) => <span dir="ltr">{phone}</span>,
    },
    // {
    //   title: "العنوان",
    //   dataIndex: "address",
    //   key: "address",
    //   width: 150,
    // },
    {
      title: "الرسالة",
      dataIndex: "message",
      key: "message",
      width: 300,
      render: (message) => (
        <p className="max-w-[300px] whitespace-pre-wrap">{message}</p>
      ),
    },
    {
      title: "التاريخ",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      align: "center",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
  ];

  // Assuming the API returns a structure like { data: inquiries[], pagination: { total } }
  // If not, we fall back to searching for inquiries in the response data.
  const inquiries =
    data?.data || data?.inquiries || (Array.isArray(data) ? data : []);
  const total = data?.pagination?.total || inquiries.length;

  console.log("Inquiries data:", data);
  return (
    <TableServerPagination
      columns={columns}
      data={data?.inquiries}
      isLoading={isLoading}
      exportedName="Contact Inquiries"
      totalItems={data?.pagination?.total}
      noSearch
    />
  );
};
