"use client";

import { Col, Row } from "antd";
import { useState } from "react";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { ComingSoonModal } from "@/components/tools/modal/coming-soon-modal/ComingSoon_modal";
import { useMembershipTiers } from "../hooks/useMembershipTiers";
import { isFreeMembershipTier } from "../utils/isFreeMembershipTier";
import { tierToCardPlan } from "../utils/tierToCardPlan";
import { MembershipCard } from "./MemberShipCard";

type MembershipTiersGridProps = {
  rowAlign?: "top" | "middle" | "bottom" | "stretch";
};

export function MembershipTiersGrid({
  rowAlign = "stretch",
}: MembershipTiersGridProps) {
  const { data, isLoading, isError } = useMembershipTiers();
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const getLink = useLocalizedLink();

  const handlePaidJoin = () => {
    setIsComingSoonOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <LoaderS1 />
      </div>
    );
  }

  if (isError || !data?.length) {
    return (
      <p className="text-center text-third py-12">
        Unable to load memberships. Please try again later.
      </p>
    );
  }

  const sorted = [...data].sort((a, b) => a.priority - b.priority);

  return (
    <>
      <Row gutter={[24, 24]}>
        {sorted.map((tier) => {
          const cardPlan = tierToCardPlan(tier);
          const isFree = isFreeMembershipTier(tier);

          return (
            <Col key={tier.id} xs={24} md={6}>
              <MembershipCard
                plan={{
                  ...cardPlan,
                  ...(isFree
                    ? { joinHref: getLink("/user/register") }
                    : { onJoin: handlePaidJoin }),
                }}
              />
            </Col>
          );
        })}
      </Row>
      <ComingSoonModal
        open={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        message={
          <>
            Membership signup will be available shortly.{" "}
            <span>Thank you for your patience.</span>
          </>
        }
      />
    </>
  );
}
