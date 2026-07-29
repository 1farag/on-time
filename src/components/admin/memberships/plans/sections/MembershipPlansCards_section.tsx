"use client";
import { Button, Row, Col, Tag } from "antd";
import { useRouter } from "next/navigation";
import { FiCheck } from "react-icons/fi";
import { useDeleteMembershipPlan } from "../add-edit-plan/hooks/useAddEditDeleteMembershipPlan";
import DeleteModal from "@/components/tools/modal/DeleteModal";

interface MembershipPlan {
  displayNameAr: string;
  _id: string;
  name: string;
  price: number;
  duration: string; // e.g., "شهري" or "سنوي"
  features: string[];
  status: "active" | "inactive";
  isActive: boolean;
  currency: string;
  benefits?: { key: string; value: string }[];
}

interface MembershipPlansCardsProps {
  plans?: { tiers: MembershipPlan[] };
  onEdit?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

export const MembershipPlansCards = ({
  plans,
  onEdit,
  onToggleStatus,
}: MembershipPlansCardsProps) => {
  const router = useRouter();
  const { deleteMembershipPlanPlanMutation, deleteMembershipPlanPlanLoading } =
    useDeleteMembershipPlan();

  return (
    <Row gutter={[24, 24]}>
      {plans?.tiers.map((plan) => (
        <Col key={plan._id} xs={24} sm={12} lg={8}>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-md transition-shadow h-full flex flex-col">
            <div className="w-full flex items-center justify-between mb-3">
              <div className="w-full flex items-center justify-end">
                {/* Plan Name */}
                <h3 className="flex-1 text-2xl font-bold text-gray-900 text-center">
                  {plan.displayNameAr}
                </h3>
                {plan.isActive ? (
                  <Tag className="!m-0 bg-[#D0FAE5] text-[#007A55] !px-3 !rounded-xl">
                    نشط
                  </Tag>
                ) : (
                  <Tag color="red" className="!m-0 !px-3 !rounded-xl">
                    غير نشط
                  </Tag>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-primary">
                  {plan.price}
                </span>
                <span className="text-sm text-[##6A7282]">
                  {plan.duration} / {plan.currency}
                </span>
              </div>
            </div>

            {/* Features List */}
            <div className="flex-1 mb-6 border-t border-[#F3F4F6] pt-6">
              <ul className="space-y-3 ">
                {plan?.benefits?.map((benfit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FiCheck className="text-green-600 text-lg mt-0.5 flex-shrink-0" />
                    <span className="text-[#4A5565] text-right flex-1">
                      {benfit.key} {benfit.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 border-t border-[#F3F4F6] pt-6">
              <Button
                size="large"
                block
                onClick={() =>
                  router.push(`/admin/memberships/plans/${plan._id}/edit`)
                }
              >
                تعديل
              </Button>
              <DeleteModal
                deleteLoading={deleteMembershipPlanPlanLoading}
                handleDelete={() =>
                  deleteMembershipPlanPlanMutation(plan._id).then(() => {})
                }
                heading={`هل أنت متأكد من حذف خطة ${plan.name}؟`}
                description={`سيتم حذف خطة ${plan.name} وجميع المشتركين المرتبطين بها. لا يمكن التراجع عن هذا الإجراء.`}
              >
                <Button
                  size="large"
                  block
                  // onClick={() => handleToggleStatus(plan._id)}
                >
                  {/* {plan.isActive ? "إيقاف" : "تفعيل"} */}
                  حدف
                </Button>
              </DeleteModal>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
