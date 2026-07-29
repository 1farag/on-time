"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, InputNumber, Modal, Pagination } from "antd";
import toast from "react-hot-toast";
import {
  FiAward,
  FiCheck,
  FiCopy,
  FiGift,
  FiLink,
  FiShare2,
  FiStar,
  FiTrendingUp,
  FiUserPlus,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { AccountingSideMenu } from "../accounting/AccountingSideMenu";
import { useAmbassadorCode } from "./hooks/useAmbassadorCode";
import { useAmbassadorReferrals } from "./hooks/useAmbassadorReferrals";
import { useAmbassadorStats } from "./hooks/useAmbassadorStats";
import { useRedeemPointsToWallet } from "./hooks/useRedeemPointsToWallet";
import { buildReferralRegisterUrl } from "@/lib/referralLink";
import style from "./styles/participateWin.module.scss";

const POINTS_PER_SAR = 10;
const MIN_REDEEM_SAR = 10;

const milestones = [
  {
    id: 1,
    title: "Bonus points",
    subtitle: "+500 Points",
    variant: "unlocked" as const,
  },
  {
    id: 2,
    title: "Membership Discount",
    subtitle: "15% Off",
    variant: "unlocked" as const,
  },
  {
    id: 3,
    title: "VIP Reward",
    subtitle: "VIP Upgrade",
    variant: "locked" as const,
    lockNumber: "10",
  },
];

const staticStats: Array<{
  label: string;
  value: string;
  labelBold: boolean;
  icon: React.ReactNode;
}> = [
  {
    label: "Total points",
    value: "4,250",
    labelBold: true,
    icon: <FiAward className={style.statIcon} aria-hidden />,
  },
  {
    label: "Successful invitations",
    value: "6",
    labelBold: false,
    icon: <FiUserPlus className={style.statIcon} aria-hidden />,
  },
  {
    label: "Rewards received",
    value: "3",
    labelBold: false,
    icon: <FiGift className={style.statIcon} aria-hidden />,
  },
];

const upcomingRewards: Array<{
  id: number;
  title: string;
  desc: string;
  pill: string;
  tileIcon: React.ReactNode;
}> = [
  {
    id: 1,
    title: "Free lounge access",
    desc: "Four invitations to the Lounge feature",
    pill: "4 invetation",
    tileIcon: <FiGift className={style.rewardIconInner} aria-hidden />,
  },
  {
    id: 2,
    title: "Gold Bonus",
    desc: "Two invitations to unlock the Gold bonus",
    pill: "2 invetation",
    tileIcon: <FiStar className={style.rewardIconInner} aria-hidden />,
  },
  {
    id: 3,
    title: "1,000 bonus points",
    desc: "Only one invitation separates you",
    pill: "1 invetation",
    tileIcon: <FiZap className={style.rewardIconInner} aria-hidden />,
  },
];

export const ParticipateAndWinComponent = () => {
  const [referralsPage, setReferralsPage] = useState(1);
  const [referralLink, setReferralLink] = useState("");
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [redeemForm] = Form.useForm<{
    points: any;
    redeemAmount: number;
  }>();
  const { redeemPointsMutation, isPending: isRedeeming } =
    useRedeemPointsToWallet();
  const REFERRALS_PAGE_LIMIT = 20;
  const { ambassadorCode, isLoading: codeLoading } = useAmbassadorCode();
  const {
    referrals,
    pagination: referralsPagination,
    isLoading: referralsLoading,
    isFetching: referralsFetching,
  } = useAmbassadorReferrals(referralsPage, REFERRALS_PAGE_LIMIT);
  const { stats: ambassadorStats, isLoading: statsLoading } =
    useAmbassadorStats();
  const referralCode = ambassadorCode?.code || "—";
  const totalPoints = ambassadorStats.totalPoints;
  const maxRedeemSar = Math.floor(totalPoints / POINTS_PER_SAR);
  const redeemAmount = Math.max(
    0,
    Number(Form.useWatch("redeemAmount", redeemForm) ?? 0) || 0
  );
  const pointsRequired = useMemo(
    () => redeemAmount * POINTS_PER_SAR,
    [redeemAmount]
  );

  const openRedeemModal = () => {
    redeemForm.setFieldsValue({
      redeemAmount: maxRedeemSar >= MIN_REDEEM_SAR ? MIN_REDEEM_SAR : undefined,
    });
    setIsRedeemModalOpen(true);
  };

  const closeRedeemModal = () => setIsRedeemModalOpen(false);

  const handleRedeemConfirm = async () => {
    try {
      const values = await redeemForm.validateFields();
      const points = values.points;
      await redeemPointsMutation({ points });
      redeemForm.resetFields();
      closeRedeemModal();
    } catch {
      /* validation or API errors surfaced on the form / toast */
    }
  };

  useEffect(() => {
    if (ambassadorCode?.code?.trim()) {
      setReferralLink(buildReferralRegisterUrl(ambassadorCode.code));
    } else {
      setReferralLink("");
    }
  }, [ambassadorCode?.code]);

  const copyCode = () => {
    if (!referralCode || referralCode === "—") return;
    void navigator.clipboard?.writeText(referralCode);
    toast.success("Copied");
  };

  const copyLink = () => {
    if (!referralLink) return;
    void navigator.clipboard?.writeText(referralLink);
    toast.success("Link copied");
  };

  const shareCode = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "On Time",
          url: referralLink,
        });
      } catch {
        /* dismissed */
      }
    } else {
      copyLink();
    }
  };

  const stats = staticStats.map((item) => {
    if (item.label === "Total points") {
      return {
        ...item,
        value: statsLoading
          ? "..."
          : ambassadorStats.totalPoints.toLocaleString("en-US"),
      };
    }
    if (item.label === "Successful invitations") {
      return {
        ...item,
        value: statsLoading
          ? "..."
          : String(ambassadorStats.successfulInvitations),
      };
    }
    if (item.label === "Rewards received") {
      return {
        ...item,
        value: statsLoading ? "..." : String(ambassadorStats.rewardsReceived),
      };
    }
    return item;
  });

  return (
    <main className={style.participatePage}>
      <div className="container">
        <div className={style.header}>
          <h1>Referral Program</h1>
          <p>Invite your friends and get amazing rewards</p>
        </div>

        <div className={style.contentLayout}>
          <AccountingSideMenu activeKey="participate-and-win" />

          <div className={style.mainArea}>
            <section className={style.card}>
              <div className={style.topBar}>
                <div className={style.titleWrap}>
                  <span className={style.icon}>
                    <FiUsers />
                  </span>
                  <div>
                    <p className={style.kicker}>Your personal code</p>
                    <h3>Share and earn</h3>
                  </div>
                </div>
                <div className={style.levelPill}>
                  <span className={style.levelDot} />
                  Gold Level
                </div>
              </div>

              <div className={style.codeActionsRow}>
                <div className={style.codeBox}>
                  <span className={style.codeText}>
                    {codeLoading ? "Loading..." : referralCode}
                  </span>
                  <button
                    type="button"
                    className={style.codeCopyBtn}
                    aria-label="Copy referral code"
                    onClick={copyCode}
                    disabled={codeLoading || referralCode === "—"}
                  >
                    <FiCopy className={style.codeCopyIcon} />
                  </button>
                </div>
                <div className={style.primaryActions}>
                  <button
                    type="button"
                    className={style.btnShare}
                    onClick={shareCode}
                    disabled={codeLoading || !referralLink}
                  >
                    <FiShare2 className={style.btnIcon} aria-hidden />
                    Share Code
                  </button>
                  <button
                    type="button"
                    className={style.btnOutline}
                    onClick={copyLink}
                    disabled={codeLoading || !referralLink}
                  >
                    <FiLink className={style.btnIcon} aria-hidden />
                    Copy link
                  </button>
                </div>
              </div>

              <p className={style.hint}>
                Share your code with your friends and earn rewards when they
                complete their first booking.
              </p>
              <p className={`${style.hint} mt-4`}>
                You earn 100 points when you invite a friend. Every 100 points
                can be redeemed for 10 SAR to use within our platform.
              </p>
            </section>

            {/* <section className={style.card}>
              <div className={style.titleWrap}>
                <span className={style.icon}>
                  <FiTrendingUp />
                </span>
                <div>
                  <h3>Level progress</h3>
                  <p>6 out of 10 successful invitations</p>
                </div>
              </div>

              <div className={style.progressBlock}>
                <div className={style.progressLabels}>
                  <span className={style.progressPct}>
                    {COMPLETION_PERCENT}%
                  </span>
                  <span className={style.progressRateLabel}>
                    Completion rate
                  </span>
                </div>
                <div className={style.progressTrack}>
                  <div
                    className={style.progressFill}
                    style={{ width: `${COMPLETION_PERCENT}%` }}
                  />
                </div>
              </div>

              <div className={style.milestones}>
                {milestones.map((m) =>
                  m.variant === "locked" ? (
                    <div key={m.id} className={style.milestoneLocked}>
                      <div className={style.milestoneLockIcon}>
                        <span>{m.lockNumber}</span>
                      </div>
                      <p className={style.milestoneTitle}>{m.title}</p>
                      <p className={style.milestoneSub}>{m.subtitle}</p>
                    </div>
                  ) : (
                    <div key={m.id} className={style.milestoneOpen}>
                      <div className={style.milestoneCheckWrap}>
                        <FiCheck className={style.milestoneCheck} aria-hidden />
                      </div>
                      <p className={style.milestoneTitle}>{m.title}</p>
                      <p className={style.milestoneSub}>{m.subtitle}</p>
                    </div>
                  )
                )}
              </div>
            </section> */}

            <div className={style.statsRow}>
              {stats.map((s) => (
                <div key={s.label} className={style.statCard}>
                  <div className={style.statIconWrap}>{s.icon}</div>
                  <p
                    className={`${style.statLabel} ${s.labelBold ? style.statLabelBold : ""}`}
                  >
                    {s.label}
                  </p>
                  <p className={style.statValue}>{s.value}</p>
                  {s.label === "Total points" ? (
                    <button
                      type="button"
                      className={style.redeemBtn}
                      onClick={openRedeemModal}
                      disabled={statsLoading || maxRedeemSar < MIN_REDEEM_SAR}
                    >
                      Redeem points
                    </button>
                  ) : null}
                </div>
              ))}
            </div>

            {/* <section className={style.card}>
              <div className={style.titleWrap}>
                <span className={style.icon}>
                  <FiGift />
                </span>
                <div>
                  <h3>Upcoming rewards</h3>
                  <p>Unlock new features with additional invitations</p>
                </div>
              </div>

              <div className={style.rewardGrid}>
                {upcomingRewards.map((r) => (
                  <div key={r.id} className={style.rewardTile}>
                    <div className={style.rewardIconWrap}>{r.tileIcon}</div>
                    <p className={style.rewardTileTitle}>{r.title}</p>
                    <p className={style.rewardTileDesc}>{r.desc}</p>
                    <div className={style.rewardPill}>
                      <FiUsers className={style.rewardPillIcon} aria-hidden />
                      <span>{r.pill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section> */}

            <section className={style.card}>
              <div className={style.logHeader}>
                <div className={style.titleWrap}>
                  <span className={style.icon}>
                    <FiUsers />
                  </span>
                  <div className={style.logHeaderText}>
                    <h3 className={style.logTitle}>Invitation log</h3>
                    <p className={style.logSubtitle}>
                      Your latest referral activity
                    </p>
                  </div>
                </div>
              </div>

              <div className={style.logList}>
                {referralsLoading ? (
                  <p className={style.logDate}>Loading invitations...</p>
                ) : null}

                {!referralsLoading && referrals.length === 0 ? (
                  <p className={style.logDate}>No invitation activity yet.</p>
                ) : null}

                {!referralsLoading &&
                  referrals.map((row) => {
                    const statusLabel = formatReferralStatus(row.status);
                    const pointsLabel = formatReferralReward(row.status);
                    const refereeName =
                      [row.referee?.firstName, row.referee?.lastName]
                        .filter(Boolean)
                        .join(" ")
                        .trim() ||
                      `Referral user #${row.referredUserId.slice(0, 8)}`;
                    return (
                      <div key={row.id} className={style.logItem}>
                        <div className={style.logLeft}>
                          <div className={style.logAvatar}>
                            <FiUsers
                              className={style.logAvatarIcon}
                              aria-hidden
                            />
                          </div>
                          <div className={style.logNameBlock}>
                            <p className={style.logName}>{refereeName}</p>
                            <p className={style.logDate}>
                              {row.referee?.email || "—"} ·{" "}
                              {formatLogDate(
                                row.rewardedAt ??
                                  row.successfulAt ??
                                  row.qualifiedAt ??
                                  row.createdAt
                              )}
                            </p>
                          </div>
                        </div>
                        <div className={style.logRight}>
                          <div
                            className={
                              row.status.toUpperCase() === "SKIPPED"
                                ? style.statusPending
                                : style.statusGold
                            }
                          >
                            {statusLabel}
                          </div>
                          {/* <p className={style.logPoints}>{pointsLabel}</p> */}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {!referralsLoading && referralsPagination.totalPages > 1 ? (
                <div className="pagination-wrapper flex justify-center mt-8">
                  <Pagination
                    current={referralsPagination.page}
                    pageSize={referralsPagination.limit}
                    total={referralsPagination.total}
                    hideOnSinglePage
                    showSizeChanger={false}
                    disabled={referralsFetching}
                    onChange={(p) => setReferralsPage(p)}
                  />
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </div>

      <Modal
        open={isRedeemModalOpen}
        onCancel={closeRedeemModal}
        footer={
          <div className={style.detailModalFooter}>
            <Button
              type="default"
              className={style.viewBtn}
              onClick={closeRedeemModal}
              disabled={isRedeeming}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className={style.primaryBtn}
              onClick={() => void handleRedeemConfirm()}
              disabled={
                statsLoading || maxRedeemSar < MIN_REDEEM_SAR || isRedeeming
              }
              loading={isRedeeming}
            >
              Redeem
            </Button>
          </div>
        }
        title={null}
        closable
        centered
        width={640}
        destroyOnClose
        wrapClassName={style.detailModalRoot}
        styles={{
          content: {
            background: "rgba(21, 28, 40, 0.98)",
            borderRadius: 16,
            border: "1px solid rgba(45, 52, 67, 0.4)",
            padding: 0,
            boxShadow: "0 16px 48px rgba(0, 0, 0, 0.45)",
          },
          body: { padding: 0 },
          header: { display: "none" },
          footer: {
            margin: 0,
            padding: "20px 28px 28px",
            borderTop: "1px solid #252b37",
            background: "transparent",
          },
          mask: { backdropFilter: "blur(4px)" },
        }}
      >
        <div className={style.detailModalBody}>
          <div className={style.redeemModalHero}>
            <div className={style.redeemModalHeroInner}>
              <div className={style.redeemIconBox}>
                <FiAward />
              </div>
              <div>
                <h3 className={style.redeemHeroTitle}>Redeem points</h3>
                <p className={style.redeemHeroSub}>
                  Convert your referral points into platform credit.
                </p>
              </div>
            </div>
          </div>

          <div className={style.detailSection}>
            <h4 className={style.detailSectionTitle}>Redemption</h4>

            <dl className={style.detailGrid}>
              <div className={style.detailRow}>
                <div className={style.detailLabel}>Total points</div>
                <div className={style.detailValue}>
                  {statsLoading ? "..." : totalPoints.toLocaleString("en-US")}
                </div>
              </div>
              <div className={style.detailRow}>
                <div className={style.detailLabel}>Min Points</div>
                <div className={style.detailValue}>100</div>
              </div>
            </dl>

            <div className="w-full">
              <Form
                form={redeemForm}
                layout="vertical"
                className="formS1 !border-none"
              >
                <div className="inputS1 my-4">
                  <Form.Item
                    name="points"
                    label="Points to redeem "
                    rules={[
                      {
                        required: true,
                        message: "Enter the points you want to redeem",
                      },
                    ]}
                  >
                    <InputNumber
                      className="w-full"
                      step={10}
                      disabled={statsLoading || isRedeeming}
                      placeholder="Enter points to redeem"
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>

            <p className={style.redeemHint}>
              You earn 100 points when you invite a friend. Every 100 points can
              be redeemed for 10 SAR to use within our platform.
            </p>
          </div>
        </div>
      </Modal>
    </main>
  );
};

function formatLogDate(value: string): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

function formatReferralStatus(status: string): string {
  const normalized = status.toUpperCase();
  if (normalized === "REWARDED") return "Reward awarded";
  if (normalized === "QUALIFIED") return "Complete";
  if (normalized === "VOIDED") return "Pending";
  return normalized
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatReferralReward(status: string): string {
  const normalized = status.toUpperCase();
  if (normalized === "REWARDED") return "+500 Points";
  if (normalized === "QUALIFIED") return "In progress";
  if (normalized === "VOIDED") return "No reward";
  return "—";
}
