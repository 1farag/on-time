"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import toast from "react-hot-toast";
import {
  FiCalendar,
  FiCreditCard,
  FiRefreshCw,
  FiSettings,
  FiStar,
  FiTrendingUp,
  FiXCircle,
} from "react-icons/fi";
import { LuCrown } from "react-icons/lu";
import { AccountingSideMenu } from "../accounting/AccountingSideMenu";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import type { MembershipTier } from "@/components/membership/hooks/useMembershipTiers";
import type { MembershipMeSubscription } from "./hooks/useGetMyMembership";
import { useGetMyMembership } from "./hooks/useGetMyMembership";
import { useMembershipCancel } from "./hooks/useMembershipCancel";
import style from "./styles/myMembershipAccounting.module.scss";
import { FaCheck } from "react-icons/fa6";
import { GradientText } from "@/components/tools/GradientText";

function splitBenefitLine(text: string): { title: string; desc: string } {
  const idx = text.indexOf(": ");
  if (idx === -1) return { title: text, desc: "" };
  return { title: text.slice(0, idx).trim(), desc: text.slice(idx + 2).trim() };
}

function isFreeTier(tier: MembershipTier): boolean {
  const m = parseFloat(tier.monthlyPrice || "0");
  const y = parseFloat(tier.annualPrice || "0");
  return tier.isDefault === true || (m === 0 && y === 0);
}

function formatEnDate(iso: string | undefined | null): string {
  if (!iso) return "—";
  const d = dayjs(iso);
  return d.isValid() ? d.format("MMMM D, YYYY") : "—";
}

function cleanMembershipText(text: string | undefined): string {
  if (!text) return "";
  const cleaned = text
    .replace(/pinnacle/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return cleaned || "Membership";
}

function heroStatusLabel(
  membership: MembershipMeSubscription | null,
  tier: MembershipTier
): string {
  if (membership) {
    const active =
      membership.status?.toLowerCase() === "active" &&
      membership.isExpired !== true;
    if (active) return "Subscription active";
    if (
      membership.isExpired === true ||
      membership.status?.toLowerCase() === "expired"
    ) {
      return "Expired";
    }
    return "Member";
  }
  if (tier.isDefault) return "Default plan";
  return tier.code || "Membership";
}

export const MyMembershipAccountingView = () => {
  const { data, isLoading, isError, refetch } = useGetMyMembership();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const { mutateAsync: cancelMembership, isPending: isCancellingMembership } =
    useMembershipCancel();

  const tier = data?.tier;
  const membership = data?.membership ?? null;
  const safeTierName = cleanMembershipText(tier?.name);

  const statBlocks = useMemo(() => {
    if (!tier) return [];
    const benefitCount = tier.benefits?.length ?? 0;
    const free = isFreeTier(tier);
    const billingLabel = free
      ? "Free"
      : `${tier.currency} · ${tier.monthlyPrice}/mo`;

    return [
      // {
      //   id: "adv",
      //   label: "Available advantages",
      //   value:
      //     benefitCount === 0
      //       ? "—"
      //       : `${benefitCount} ${benefitCount === 1 ? "feature" : "features"}`,
      //   Icon: FiStar,
      // },
      // {
      //   id: "bill",
      //   label: "Billing type",
      //   value: billingLabel,
      //   Icon: FiCreditCard,
      // },
      // {
      //   id: "renew",
      //   label: "Upcoming renewal",
      //   value: membership
      //     ? formatEnDate(membership.expireDate ?? membership.endDate)
      //     : "—",
      //   Icon: FiRefreshCw,
      // },
      {
        id: "start",
        label: "Start date",
        value: membership
          ? formatEnDate(membership.startsAt ?? membership.startDate)
          : "—",
        Icon: FiCalendar,
      },
      {
        id: "end",
        label: "End date",
        value: membership
          ? formatEnDate(
              membership.endsAt ?? membership.endDate ?? membership.expireDate
            )
          : "—",
        Icon: FiCalendar,
      },
    ];
  }, [tier, membership]);

  const benefitColumns = useMemo(() => {
    if (!tier?.benefits?.length) {
      return {
        left: [] as { title: string; desc: string }[],
        right: [] as { title: string; desc: string }[],
      };
    }
    const parsed = tier.benefits.map((b) => splitBenefitLine(String(b)));
    const left = parsed.filter((_, i) => i % 2 === 0);
    const right = parsed.filter((_, i) => i % 2 === 1);
    return { left, right };
  }, [tier]);

  const handleCancelMembership = async () => {
    try {
      await cancelMembership();
      toast.success("Membership cancelled successfully.");
      setIsCancelModalOpen(false);
      await refetch();
    } catch (e) {
      toast.error(formatAxiosMessage(e));
    }
  };

  if (isLoading) {
    return (
      <main className={style.membershipFigmaPage}>
        <div className="container py-24 flex justify-center">
          <LoaderS1 />
        </div>
      </main>
    );
  }

  if (isError || !tier) {
    return (
      <main className={style.membershipFigmaPage}>
        <div className="container py-24 text-center text-third space-y-4">
          <p>Unable to load membership details. Please try again.</p>
          <button
            type="button"
            className={style.saveBtn}
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (!membership) {
    return (
      <main className={style.membershipFigmaPage}>
        <div className="container">
          <header className={style.pageHeader}>
            <h1>
              <GradientText>My Membership</GradientText>
            </h1>
            <p>Manage your subscription and exclusive benefits</p>
          </header>

          <div className={style.contentLayout}>
            <AccountingSideMenu activeKey="my-membership" />
            <div className={style.mainStack}>
              <section className={`${style.cardBase} ${style.sectionCard}`}>
                <div className="text-center py-10 space-y-4">
                  <h2 className={style.sectionTitle}>No active membership</h2>
                  <p className={style.sectionSubtitle}>
                    You do not have an active membership at the moment.
                  </p>
                  <Link href="/memberships" className="inline-flex">
                    <Button
                      type="primary"
                      size="large"
                      className={style.saveBtn}
                    >
                      Browse membership plans
                    </Button>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={style.membershipFigmaPage}>
      <div className="container">
        <header className={style.pageHeader}>
          <h1>My Membership</h1>
          <p>Manage your subscription and exclusive benefits</p>
        </header>

        <div className={style.contentLayout}>
          <AccountingSideMenu activeKey="my-membership" />

          <div className={style.mainStack}>
            <section className={`${style.cardBase} ${style.heroCard}`}>
              <div className={style.heroInner}>
                <div className={style.heroTop}>
                  <div className={style.heroBrand}>
                    <div className={style.heroIcon}>
                      <LuCrown aria-hidden />
                    </div>
                    <div>
                      <p className={style.heroKicker}>
                        On Time Membership · {tier.code}
                      </p>
                      <h2 className={style.heroTitle}>{safeTierName}</h2>
                    </div>
                  </div>
                  <div className={style.vipPill}>
                    <span className={style.vipDot} aria-hidden />
                    {heroStatusLabel(membership, tier)}
                  </div>
                </div>

                <div className={style.statGrid}>
                  {statBlocks.map(({ id, label, value, Icon }) => (
                    <div key={id} className={style.statBlock}>
                      <div className={style.statLabel}>
                        <Icon size={14} aria-hidden />
                        <span>{label}</span>
                      </div>
                      <p className={style.statValue}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className={`${style.cardBase} ${style.sectionCard}`}>
              <div className={style.sectionHead}>
                <span className={style.sectionHeadIcon}>
                  <FiStar aria-hidden />
                </span>
                <div>
                  <h2 className={style.sectionTitle}>
                    Benefits and privileges
                  </h2>
                  <p className={style.sectionSubtitle}>
                    Enjoy all the benefits of your membership tier
                  </p>
                </div>
              </div>

              {tier.benefits?.length ? (
                <div className={style.benefitsGrid}>
                  <div className={style.benefitsCol}>
                    {benefitColumns.left.map((b, idx) => (
                      <div
                        key={`l-${idx}-${b.title}`}
                        className={style.benefitTile}
                      >
                        <span className={style.benefitIcon}>
                          <FaCheck aria-hidden />
                        </span>
                        <div>
                          <h3 className={style.benefitTitle}>{b.title}</h3>
                          {b.desc ? (
                            <p className={style.benefitDesc}>{b.desc}</p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={style.benefitsCol}>
                    {benefitColumns.right.map((b, idx) => (
                      <div
                        key={`r-${idx}-${b.title}`}
                        className={style.benefitTile}
                      >
                        <span className={style.benefitIcon}>
                          <FaCheck aria-hidden />
                        </span>
                        <div>
                          <h3 className={style.benefitTitle}>{b.title}</h3>
                          {b.desc ? (
                            <p className={style.benefitDesc}>{b.desc}</p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-third px-6 pb-8 text-center text-sm">
                  No tier benefits listed yet.
                </p>
              )}
            </section>

            <section className={`${style.cardBase} ${style.mgmtCard}`}>
              <div className={style.sectionHead}>
                <span className={style.sectionHeadIcon}>
                  <FiSettings aria-hidden />
                </span>
                <div>
                  <h2 className={style.sectionTitle}>Membership Management</h2>
                  <p className={style.sectionSubtitle}>
                    Upgrade, Cancel, or Modify Billing Details
                  </p>
                </div>
              </div>

              <div className={style.mgmtActions}>
                <Link
                  href="/user/my-membership/upgrade"
                  className={`${style.mgmtTile}`}
                  prefetch={false}
                >
                  <span className={style.mgmtTileIcon}>
                    <FiTrendingUp aria-hidden />
                  </span>
                  <span className={style.mgmtTileTitle}>Upgrade your plan</span>
                  <span className={style.mgmtTileDesc}>
                    Compare tiers and subscribe to unlock more privileges
                  </span>
                </Link>
                {/* <Link
                  href="/contact-us"
                  className={style.mgmtTile}
                  prefetch={false}
                >
                  <span className={style.mgmtTileIcon}>
                    <FiCreditCard aria-hidden />
                  </span>
                  <span className={style.mgmtTileTitle}>Billing Management</span>
                  <span className={style.mgmtTileDesc}>
                    Contact support for invoices and payment methods
                  </span>
                </Link> */}
                <button
                  type="button"
                  className={`${style.mgmtTile} ${membership ? style.mgmtTileDanger : ""}`}
                  title={
                    membership
                      ? undefined
                      : "No paid subscription — nothing to cancel"
                  }
                  onClick={() => setIsCancelModalOpen(true)}
                >
                  <span className={style.mgmtTileIcon}>
                    <FiXCircle aria-hidden />
                  </span>
                  <span className={style.mgmtTileTitle}>Cancel membership</span>
                  <span className={style.mgmtTileDesc}>
                    Disable automatic subscription renewal
                  </span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Modal
        open={isCancelModalOpen}
        onCancel={() => setIsCancelModalOpen(false)}
        footer={null}
        title={null}
        closable
        centered
        width={760}
        destroyOnClose
        wrapClassName={style.cancelModalRoot}
        styles={{
          content: {
            background: "#131925",
            borderRadius: 16,
            border: "1px solid rgba(45, 52, 67, 0.4)",
            padding: 32,
          },
          body: { padding: 0 },
          header: { display: "none" },
          mask: { backdropFilter: "blur(4px)" },
        }}
      >
        <div className={style.cancelModalBody}>
          <div className={style.cancelModalCopy}>
            <h3>Cancel your membership?</h3>
            <p>
              Are you sure you want to cancel your current membership? You may
              lose valuable benefits, access to rewards, and exclusive
              privileges.
            </p>
          </div>

          <div className={style.cancelLossCard}>
            <div className={style.cancelMembershipRow}>
              <span className={style.cancelMembershipIcon}>
                <LuCrown />
              </span>
              <div>
                <p className={style.cancelMembershipLabel}>
                  current membership
                </p>
                <h4>{safeTierName || "current membership"}</h4>
              </div>
            </div>

            {/* <p className={style.cancelLossTitle}>
              The advantages you will immediately lose:
            </p>

            <ul className={style.cancelLossList}>
              <li>
                <FiStar />
                <span>Priority booking and premium seats.</span>
              </li>
              <li>
                <LuSparkles />
                <span>Flight discounts and access to exclusive offers.</span>
              </li>
              <li>
                <FiGift />
                <span>Exclusive rewards and member-only privileges.</span>
              </li>
            </ul> */}
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="default"
              onClick={() => setIsCancelModalOpen(false)}
              disabled={isCancellingMembership}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => void handleCancelMembership()}
              loading={isCancellingMembership}
              disabled={isCancellingMembership}
            >
              Continue to cancel
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

function formatAxiosMessage(error: unknown): string {
  const err = error as {
    response?: { data?: { message?: unknown; error?: unknown } };
  };
  const d = err.response?.data;
  if (!d || typeof d !== "object")
    return "Something went wrong. Please try again.";
  const m = d.message;
  if (typeof m === "string" && m.trim()) return m.trim();
  const e = d.error;
  if (typeof e === "string" && e.trim()) return e.trim();
  return "Something went wrong. Please try again.";
}
