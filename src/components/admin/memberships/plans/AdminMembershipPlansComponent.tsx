"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { MembershipPlansCards } from "./sections/MembershipPlansCards_section";
import { useGetAdminMembershipPlans } from "./hooks/useGetAllPlans";

export const AdminMembershipPlansComponent = () => {
  const { data: plans } = useGetAdminMembershipPlans();
  const router = useRouter();
  console.log(plans);
  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-[#111113]">
            خطط العضويات{" "}
          </h1>
          <p className="text-lg text-primary">إدارة خطط الاشتراك </p>
        </div>

        <Button
          type="primary"
          onClick={() => router.push("/admin/memberships/plans/add")}
        >
          <FiPlus />
          إضافة خطة جديد{" "}
        </Button>
      </div>

      <MembershipPlansCards plans={plans} />
    </main>
  );
};
