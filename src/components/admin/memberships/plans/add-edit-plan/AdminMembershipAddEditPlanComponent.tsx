"use client";

import { useParams } from "next/navigation";
import { AddEditMembershipPlanForm } from "./forms/AddEditMembershipPlan_form";
import { useGetAdminMembershipPlan } from "../hooks/useGetAllPlans";

export const AdminMembershipAddEditPlanComponent = () => {
  const { planId } = useParams();
  const { data: adminMembership } = useGetAdminMembershipPlan();
  console.log(adminMembership?.tier);
  return (
    <main>
      <h1 className="mb-12 text-3xl font-bold text-[#111113] ">
        {planId ? "تعديل خطة" : " اضافة خطة جديد"}
      </h1>

      <AddEditMembershipPlanForm planData={adminMembership?.tier} />
    </main>
  );
};
