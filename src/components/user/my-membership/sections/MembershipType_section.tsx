import { Col, Row } from "antd";
import React from "react";
import type { MembershipTier } from "@/components/membership/hooks/useMembershipTiers";
import type { MembershipMeSubscription } from "../hooks/useGetMyMembership";
import dayjs from "dayjs";

/**
 * Matches :global `.single-plan-*` selectors in `myMemberShip.module.scss`
 * (legacy slugs); privileges API uses tier `code`.
 */
function singlePlanClassSuffix(
  tier: MembershipTier,
  membership: MembershipMeSubscription | null
): string | undefined {
  const code = tier.code?.toUpperCase();
  const byPrivilegeCode: Record<string, string> = {
    EXPLORER: "basic_membership",
    ELITE: "al_tai_membership",
    SOVEREIGN: "al_hatimi_membership",
  };
  if (code && byPrivilegeCode[code]) {
    return byPrivilegeCode[code];
  }

  const nested =
    membership?.tierId && typeof membership.tierId === "object"
      ? membership.tierId.name
      : undefined;
  const label = nested ?? tier.name;
  return typeof label === "string" ? label.toLowerCase() : undefined;
}

function cleanMembershipText(text: string | undefined): string {
  if (!text) return "";
  const cleaned = text.replace(/pinnacle/gi, "").replace(/\s{2,}/g, " ").trim();
  return cleaned || "Membership";
}

export const MembershipType_section = ({
  membership,
  tier,
}: {
  membership: MembershipMeSubscription | null;
  tier: MembershipTier;
}) => {
  const planSlug = singlePlanClassSuffix(tier, membership);

  const rawDisplayTitle =
    (membership?.tierId &&
    typeof membership.tierId === "object" &&
    (membership.tierId.displayNameAr || membership.tierId.name)) ||
    tier.name;
  const displayTitle = cleanMembershipText(rawDisplayTitle);

  const startLabel =
    membership?.startsAt != null &&
    membership.startsAt !== "" &&
    dayjs(membership.startsAt).isValid()
      ? dayjs(membership.startsAt).format("D-MM-YYYY")
      : membership?.startDate != null &&
          membership.startDate !== "" &&
          dayjs(membership.startDate).isValid()
        ? dayjs(membership.startDate).format("D-MM-YYYY")
      : "—";
  const expireLabel =
    membership?.endsAt != null &&
    membership.endsAt !== "" &&
    dayjs(membership.endsAt).isValid()
      ? dayjs(membership.endsAt).format("D-MM-YYYY")
      : membership?.expireDate != null &&
          membership.expireDate !== "" &&
          dayjs(membership.expireDate).isValid()
        ? dayjs(membership.expireDate).format("D-MM-YYYY")
        : membership?.endDate != null &&
            membership.endDate !== "" &&
            dayjs(membership.endDate).isValid()
          ? dayjs(membership.endDate).format("D-MM-YYYY")
      : "—";

  return (
    <section className={`single-plan single-plan-${planSlug ?? ""}`}>
      <div className={`top rounded-2xl p-8 text-white`}>
        <div className=" flex justify-between items-start gap-4 mb-8">
          <div className="flex-1">
            <h4 className="text-primary">نادي الطائي</h4>
            <h2 className="text-3xl font-bold my-2 text-secondary">{displayTitle}</h2>
          </div>
        </div>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-primary mb-2">رقم العضوية</div>
              <div className="text-xl font-bold text-secondary">
                {membership?.membershipNumber ?? "—"}
              </div>
            </div>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-primary mb-2">تاريخ البدء</div>
              <div className="text-xl font-bold text-secondary">{startLabel}</div>
            </div>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-primary mb-2">تاريخ الانتهاء</div>
              <div className="text-xl font-bold text-secondary">{expireLabel}</div>
            </div>
          </Col>
          {/* <Col xs={24} md={12} lg={6}>
            <div>
              <div className="text-primary mb-2">الحالة</div>
              <div className="flex items-center gap-2 text-xl font-bold text-white">
                <span className={`w-2 h-2 block rounded-full ${membership?.status === 'active' && !membership?.isExpired ? 'bg-[#22C55E]' : 'bg-red-500'}`} />
                {membership?.status === 'active' && !membership?.isExpired ? 'نشطة' : 'منتهية'}
              </div>
            </div>
          </Col> */}
        </Row>
      </div>
    </section>
  );
};
