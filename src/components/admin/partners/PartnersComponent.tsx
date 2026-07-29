"use client";
import { TableS1 } from "@/components/tools/tables/TableS1";
import { TableProps } from "antd";
import { useSearchParams } from "next/navigation";
import { useGetPartners } from "./hooks/useGetPartners";
import { useDeletePartner } from "./hooks/useDeletePartner";
import { TableServerPagination } from "@/components/tools/tables/TableServerPagination";
import { TableS2 } from "@/components/tools/tables/TableS2";

interface PartnerInterface {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const PartnersComponent = () => {
  const searchParams = useSearchParams();
  const { data: partnersData, isLoading } = useGetPartners();
  const { deletePartnerMutation, deletePartnerLoading } = useDeletePartner();

  const columns: TableProps<PartnerInterface>["columns"] | object[] = [
    {
      title: "Full name",
      dataIndex: "full_name",
      key: "full_name",
      width: 200,
      filteredValue: [searchParams.get("search") || ""],

      onFilter: (value, record: any) => {
        const searchValue = String(value).toLowerCase();

        return Object.keys(record).some((key) => {
          const fieldValue = record[key];
          return (
            fieldValue &&
            fieldValue.toString().toLowerCase().includes(searchValue)
          );
        });
      },
    },
    {
      title: "Company email",
      dataIndex: "company_email",
      key: "company_email",
      width: 200,
    },

    {
      title: "Phone number",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 200,
    },
    {
      title: "Looking to",
      dataIndex: "looking_to",
      key: "looking_to",
      width: 300,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  return (
    <main>
      <h1 className="mb-16 text-3xl font-bold text-secondary">
        All Leads ({partnersData?.length || 0})
      </h1>

      <TableS1
        columns={columns}
        data={partnersData}
        exportedName="leads"
        isLoading={isLoading}
        deleteHeading="Delete lead"
        deleteDescription="Are you sure you want to delete this lead?"
        handleDelete={async (ids) => {
          await deletePartnerMutation(ids);
        }}
      />
    </main>
  );
};
