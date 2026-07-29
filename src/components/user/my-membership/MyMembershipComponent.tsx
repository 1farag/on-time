"use client";

import { Col, Row } from "antd";
import Image from "next/image";
import type { MembershipTier } from "@/components/membership/hooks/useMembershipTiers";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import type { MembershipMeSubscription } from "./hooks/useGetMyMembership";
import { useGetMyMembership } from "./hooks/useGetMyMembership";
import { MembershipType_section } from "./sections/MembershipType_section";
import { AllMembershipDetails_section } from "./sections/AllMembershipDetails_section";
import { FastActions_section } from "./sections/FastActions_section";
import { MyMembershipAccountingView } from "./MyMembershipAccountingView";
import style from "./styles/myMemberShip.module.scss";

export type MyMembershipLayout = "accounting" | "embedded";

export type MyMembershipComponentProps = {
  /** `accounting`: standalone page with sidebar. `embedded`: profile tab. Both use `/privileges/membership/me`. */
  layout?: MyMembershipLayout;
};

function legacyTierName(
  membership: MembershipMeSubscription | null
): string | undefined {
  if (!membership?.tierId || typeof membership.tierId !== "object")
    return undefined;
  return membership.tierId.name?.toLowerCase();
}

/** Banner filenames match historical `/memberships/my` slug names; tiers use privileges `code`. */
function resolveMembershipBannerSrc(
  tier: MembershipTier | undefined,
  membership: MembershipMeSubscription | null
): string | undefined {
  const legacy = legacyTierName(membership);
  if (legacy === "basic_membership")
    return "/membership/basic_membership_bg.png";
  if (legacy === "al_tai_membership")
    return "/membership/al_tai_membership_bg.png";
  if (legacy === "al_hatimi_membership")
    return "/membership/al_hatimi_membership_bg.png";
  if (legacy === "grey_membership") return "/membership/grey_membership_bg.png";

  const code = tier?.code?.toUpperCase();
  if (code === "EXPLORER") return "/membership/basic_membership_bg.png";
  if (code === "ELITE") return "/membership/al_tai_membership_bg.png";
  if (code === "SOVEREIGN") return "/membership/al_hatimi_membership_bg.png";

  return undefined;
}

export const MyMembershipComponent = ({
  layout = "embedded",
}: MyMembershipComponentProps) => {
  if (layout === "accounting") {
    return <MyMembershipAccountingView />;
  }

  const { data, isLoading, isError } = useGetMyMembership();

  const tier = data?.tier;
  const membership = data?.membership ?? null;
  const bannerSrc = tier
    ? resolveMembershipBannerSrc(tier, membership)
    : undefined;

  const body = isLoading ? (
    <LoaderS1 />
  ) : isError || !data || !tier ? (
    <p className="text-center text-gray-500 py-12">
      We couldn&apos;t load your membership details. Please refresh the page or
      try again later.
    </p>
  ) : (
    <>
      {bannerSrc ? (
        <div className="relative h-[200px] md:h-[350px] w-full rounded-2xl overflow-hidden">
          <Image
            src={bannerSrc}
            alt={`${tier.name} plan`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : null}

      <MembershipType_section membership={membership} tier={tier} />

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={16}>
          <AllMembershipDetails_section
            benefits={tier.benefits}
            membership={membership}
          />
        </Col>
        <Col xs={24} lg={8}>
          <FastActions_section />
        </Col>
      </Row>
    </>
  );

  return <div className={style.embedded}>{body}</div>;
};
