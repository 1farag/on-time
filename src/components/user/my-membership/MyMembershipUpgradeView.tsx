"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { Button, Col, Row } from "antd";
import { FiChevronLeft, FiClock, FiRefreshCw } from "react-icons/fi";
import { LuCrown } from "react-icons/lu";
import toast from "react-hot-toast";
import { AccountingSideMenu } from "../accounting/AccountingSideMenu";
import accountingStyle from "./styles/myMembershipAccounting.module.scss";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { useGetMyMembership } from "./hooks/useGetMyMembership";
import { useMembershipTiers } from "@/components/membership/hooks/useMembershipTiers";
import { MembershipCard } from "@/components/membership/sections/MemberShipCard";
import { tierToCardPlan } from "@/components/membership/utils/tierToCardPlan";
import { membershipInitiatePaymentUrl } from "@/components/membership/utils/membershipInitiatePaymentUrl";
import {
  useMembershipInitiateUpgrade,
  type MembershipUpgradeMode,
} from "./hooks/useMembershipInitiateUpgrade";
import {
  useMembershipUpgradeQuote,
  type UpgradeQuoteLine,
  type UpgradeQuoteLineHighlight,
} from "./hooks/useMembershipUpgradeQuote";

type UpgradeChoice = "new-plan" | "remaining-period";

function rowDdClass(highlight?: UpgradeQuoteLineHighlight): string {
  if (highlight === "credit") return accountingStyle.ddCredit;
  if (highlight === "gold") return accountingStyle.ddGold;
  return "";
}

function cleanUpgradeText(text: string): string {
  return text.replace(/pinnacle/gi, "").replace(/\s{2,}/g, " ").trim();
}

export const MyMembershipUpgradeView = () => {
  const [choice, setChoice] = useState<UpgradeChoice>("new-plan");

  const {
    data: meData,
    isLoading: meLoading,
    isError: meError,
    refetch: refetchMe,
  } = useGetMyMembership();
  const { data: tiers, isLoading: tiersLoading } = useMembershipTiers();
  const { mutateAsync: initiateUpgrade, isPending: isInitiatingUpgrade } =
    useMembershipInitiateUpgrade();

  const currentTierId = meData?.tier?.id;
  const currentTierPrice = Number.parseFloat(
    String(meData?.tier?.annualPrice ?? "0")
  );
  const safeCurrentPrice = Number.isFinite(currentTierPrice)
    ? currentTierPrice
    : 0;

  const higherTiers = useMemo(() => {
    return (tiers ?? [])
      .slice()
      .sort((a, b) => a.priority - b.priority)
      .filter((tier) => {
        const p = Number.parseFloat(String(tier.annualPrice ?? "0"));
        const tierPrice = Number.isFinite(p) ? p : 0;
        return tierPrice > safeCurrentPrice;
      });
  }, [tiers, safeCurrentPrice]);

  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const effectiveSelectedTierId =
    selectedTierId && higherTiers.some((t) => t.id === selectedTierId)
      ? selectedTierId
      : higherTiers[0]?.id ?? null;
  const selectedTargetTierId = effectiveSelectedTierId ?? undefined;

  const {
    data: quote,
    isLoading: quoteLoading,
    isError: quoteError,
    refetch: refetchQuote,
  } = useMembershipUpgradeQuote(selectedTargetTierId, {
    enabled: Boolean(selectedTargetTierId),
  });

  const quoteBody =
    !selectedTargetTierId ? (
      <p className="text-third text-sm text-center py-10">
        Select a higher membership to see upgrade options.
      </p>
    ) : quoteLoading ? (
      <div className="flex justify-center py-16">
        <LoaderS1 />
      </div>
    ) : quoteError ? (
      <div className="text-center py-12 space-y-4 text-third px-4">
        <p>Unable to load upgrade quote. Please try again.</p>
        <button
          type="button"
          className={accountingStyle.saveBtn}
          onClick={() => refetchQuote()}
        >
          Retry
        </button>
      </div>
    ) : quote ? (
      <div
        className={accountingStyle.upgradeOptionsGrid}
        role="radiogroup"
        aria-label="Upgrade options"
      >
        <UpgradeOptionColumn
          choice={choice}
          variant="new-plan"
          option={quote.newPlan}
          icon={<FiRefreshCw size={18} aria-hidden />}
          onSelect={() => setChoice("new-plan")}
          badge
        />
        <UpgradeOptionColumn
          choice={choice}
          variant="remaining-period"
          option={quote.remainingPeriod}
          icon={<FiClock size={18} aria-hidden />}
          onSelect={() => setChoice("remaining-period")}
        />
      </div>
    ) : null;

  const handleInitiateUpgrade = async () => {
    if (!effectiveSelectedTierId) {
      toast.error("Select a membership first.");
      return;
    }
    const upgradeMode: MembershipUpgradeMode =
      choice === "new-plan" ? "NEW_TERM" : "REMAINING_PERIOD";

    try {
      const body = await initiateUpgrade({
        targetTier: effectiveSelectedTierId,
        upgradeMode,
      });
      const paymentUrl = membershipInitiatePaymentUrl(body);
      if (!paymentUrl) {
        toast.error("Could not start payment. Missing payment link.");
        return;
      }
      window.location.assign(paymentUrl);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleSelectTier = (tierId: string) => {
    setSelectedTierId(tierId);
  };

  if (meLoading) {
    return (
      <main className={accountingStyle.membershipFigmaPage}>
        <div className="container py-24 flex justify-center">
          <LoaderS1 />
        </div>
      </main>
    );
  }

  if (meError || !meData?.tier?.id) {
    return (
      <main className={accountingStyle.membershipFigmaPage}>
        <div className="container py-24 text-center text-third space-y-4">
          <p>Unable to load membership tier. Please try again.</p>
          <button type="button" className={accountingStyle.saveBtn} onClick={() => refetchMe()}>
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={accountingStyle.membershipFigmaPage}>
      <div className="container">
        <header className={accountingStyle.pageHeader}>
          <Link href="/user/my-membership" className={accountingStyle.upgradeBackLink}>
            <FiChevronLeft aria-hidden />
            Back to membership
          </Link>
          <h1>Upgrade your plan</h1>
          <p>Choose how you want to unlock the next tier</p>
        </header>

        <div className={accountingStyle.contentLayout}>
          <AccountingSideMenu activeKey="my-membership" />

          <div className={accountingStyle.mainStack}>
            <section
              className={`${accountingStyle.cardBase} ${accountingStyle.sectionCard} ${accountingStyle.membershipsSection}`}
            >
              <div
                className={`${accountingStyle.sectionHead} ${accountingStyle.membershipsHead}`}
              >
                <span className={accountingStyle.sectionHeadIcon}>
                  <LuCrown aria-hidden />
                </span>
                <div>
                  <h2 className={accountingStyle.sectionTitle}>
                    Membership plans
                  </h2>
                  <p className={accountingStyle.sectionSubtitle}>
                    Select a higher membership tier to upgrade
                  </p>
                </div>
              </div>

              {tiersLoading ? (
                <div className="flex justify-center py-10">
                  <LoaderS1 />
                </div>
              ) : higherTiers.length === 0 ? (
                <p className="text-third text-sm text-center py-6">
                  No higher memberships available above your current plan.
                </p>
              ) : (
                <Row gutter={[16, 16]} align="stretch">
                  {higherTiers.map((tier) => {
                      const isSelected = tier.id === effectiveSelectedTierId;
                      const cardPlan = tierToCardPlan(tier);
                      return (
                        <Col key={tier.id} xs={24} md={12} xl={8}>
                          <div
                            role="button"
                            tabIndex={0}
                            className={`${accountingStyle.membershipCardHost} ${isSelected ? accountingStyle.membershipCardCurrent : ""}`}
                            onClick={() => handleSelectTier(tier.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleSelectTier(tier.id);
                              }
                            }}
                          >
                            <MembershipCard
                              plan={{
                                ...cardPlan,
                                title: cleanUpgradeText(cardPlan.title),
                                badgeText: cardPlan.badgeText,
                                onJoin: () => handleSelectTier(tier.id),
                                joinLabel:
                                  isSelected ? "Selected" : "Select plan",
                                buttonType: isSelected ? "primary" : "default",
                              }}
                            />
                          </div>
                        </Col>
                      );
                    })}
                </Row>
              )}
            </section>

            <section
              className={`${accountingStyle.cardBase} ${accountingStyle.sectionCard} ${accountingStyle.upgradeOptionsSection}`}
            >
              <div className={`${accountingStyle.sectionHead} ${accountingStyle.upgradeSectionHead}`}>
                <span className={accountingStyle.sectionHeadIcon}>
                  <LuCrown aria-hidden />
                </span>
                <div>
                  <h2 className={accountingStyle.sectionTitle}>Upgrade options</h2>
                  <p className={accountingStyle.sectionSubtitle}>
                    Choose the method that suits you to upgrade to the next plan
                  </p>
                </div>
              </div>

              {quoteBody}
              {quote && selectedTargetTierId ? (
                <div className={accountingStyle.upgradeFooterActions}>
                  <Button
                    type="primary"
                    className={accountingStyle.saveBtn}
                    onClick={() => void handleInitiateUpgrade()}
                    disabled={!effectiveSelectedTierId || isInitiatingUpgrade}
                  >
                    {isInitiatingUpgrade ? "Processing..." : "Continue to Payment"}
                  </Button>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

function UpgradeOptionColumn(props: {
  variant: UpgradeChoice;
  choice: UpgradeChoice;
  option: {
    title: string;
    description: string;
    rows: UpgradeQuoteLine[];
    total?: { label: string; value: string };
  };
  icon: ReactNode;
  onSelect: () => void;
  badge?: boolean;
}) {
  const {
    variant,
    choice,
    option,
    icon,
    onSelect,
    badge,
  } = props;
  const selected = choice === variant;
  const safeTitle = cleanUpgradeText(option.title);
  const safeDescription = cleanUpgradeText(option.description);

  return (
    <div className={accountingStyle.upgradeOptionShell}>
      {badge ? (
        <div className={accountingStyle.bestValueBadge}>
          <LuCrown size={14} aria-hidden />
          Best Value
        </div>
      ) : null}
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        onClick={onSelect}
        className={`${accountingStyle.upgradeOptionCard} ${selected ? accountingStyle.upgradeOptionSelected : accountingStyle.upgradeOptionIdle}`}
      >
        <div className={accountingStyle.upgradeOptionHeader}>
          <span className={accountingStyle.upgradeOptionIconSq}>{icon}</span>
          <h3 className={accountingStyle.upgradeOptionTitle}>{safeTitle}</h3>
          <span
            className={`${accountingStyle.radioOuter} ${selected ? accountingStyle.radioOn : ""}`}
            aria-hidden
          />
        </div>
        <p className={accountingStyle.upgradeOptionDesc}>{safeDescription}</p>
        <dl className={accountingStyle.upgradeDl}>
          {option.rows.map((row, idx) => (
            <div key={`${row.label}-${idx}`} className={accountingStyle.upgradeDlRow}>
              <dt>{cleanUpgradeText(row.label)}</dt>
              <dd className={rowDdClass(row.highlight)}>
                {cleanUpgradeText(row.value)}
              </dd>
            </div>
          ))}
        </dl>
        {option.total ? (
          <div className={accountingStyle.upgradeTotalBar}>
            <span>{cleanUpgradeText(option.total.label)}</span>
            <span className={accountingStyle.upgradeTotalAmount}>
              {cleanUpgradeText(option.total.value)}
            </span>
          </div>
        ) : null}
      </button>
    </div>
  );
}
