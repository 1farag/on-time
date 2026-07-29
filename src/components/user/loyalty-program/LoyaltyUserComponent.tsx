"use client";

import Link from "next/link";
import { Button, Pagination, Spin } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiGift,
  FiShare2,
  FiTag,
} from "react-icons/fi";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { GiCrown } from "react-icons/gi";
import { AccountingSideMenu } from "../accounting/AccountingSideMenu";
import { useGetLoyaltyHistory } from "./hooks/useGetLoyaltyHistory";
import { useGetLoyaltyMe } from "./hooks/useGetLoyaltyMe";
import style from "./styles/loyaltyUser.module.scss";
import { useRouter } from "next/navigation";
import { GradientText } from "@/components/tools/GradientText";

const EARN_TILES = [
  {
    icon: <MdOutlineFlightTakeoff />,
    title: "Flight bookings",
    desc: "Earn points on every sharing or charter flight",
  },
  {
    icon: <GiCrown />,
    title: "Membership Renewal",
    desc: "Double points when you renew your annual subscription",
  },
  {
    icon: <FiGift />,
    title: "Extras and Services",
    desc: "Points on gourmet meals and additional services",
  },
  {
    icon: <FiShare2 />,
    title: "Promotional campaigns",
    desc: "Exclusive points from seasonal offers",
  },
] as const;

const WHERE_TILES = [
  {
    title: "Discount on flights",
    desc: "Redeem your points directly on the payment page",
  },
  {
    title: "Sharing Reservations",
    desc: "Pay part of the seat price with your points",
  },
  {
    title: "Charter deposit",
    desc: "Use your points to confirm your private jet",
  },
  {
    title: "Extras and services",
    desc: "Points for meals, luggage, and priority",
  },
  {
    title: "Membership Subscriptions",
    desc: "Deduct from your monthly subscription renewal fee",
  },
  {
    title: "Additional perks",
    desc: "Access to lounges and priority boarding",
  },
] as const;

export const LoyaltyUserComponent = () => {
  const [historyPage, setHistoryPage] = useState(1);
  const HISTORY_PAGE_LIMIT = 20;
  const { data, isLoading } = useGetLoyaltyMe();
  const {
    items: historyItems,
    pagination: historyPagination,
    isLoading: historyLoading,
    isError: historyError,
    isFetching: historyFetching,
  } = useGetLoyaltyHistory(historyPage, HISTORY_PAGE_LIMIT);
  const router = useRouter();
  const points = data?.cachedAvailablePoints ?? 0;
  const sarApprox = data?.estimatedRedemptionValue?.amount ?? "0.00";
  const estimateCurrency = data?.estimatedRedemptionValue?.currency || "SAR";

  return (
    <main className={style.loyaltyPage}>
      <div className="container">
        <div className={style.header}>
          <h1>
            <GradientText>Loyalty Program</GradientText>
          </h1>
          <p>
            Earn points on every booking and redeem them for exclusive benefits
            and discounts
          </p>
        </div>

        <div className={style.contentLayout}>
          <AccountingSideMenu activeKey="loyalty-program" />

          <div className={style.mainArea}>
            <section className={style.card}>
              {isLoading && !data ? (
                <div className={style.loadingWrap}>
                  <Spin size="large" />
                </div>
              ) : (
                <>
                  <div className={style.topBar}>
                    <div className={style.titleWrap}>
                      <span className={style.icon}>
                        <FiTag />
                      </span>
                      <div>
                        <p className="!mb-1">Current balance</p>
                        <h3>On Time Loyalty</h3>
                      </div>
                    </div>
                  </div>

                  <div className={style.balanceRow}>
                    <div>
                      <strong>{points.toLocaleString("en-US")}</strong>
                      <p className={style.pointsLabel}>Loyalty points</p>
                    </div>
                    <div className={style.balanceActions}>
                      <p
                        className={`text-third text-base text-center sm:text-start`}
                      >
                        This is approximately equivalent to{" "}
                        <span className="text-white font-bold text-lg">
                          {sarApprox} {estimateCurrency}
                        </span>
                      </p>
                      <div
                        className={
                          "flex items-center flex-col sm:flex-row justify-end gap-4"
                        }
                      >
                        <Button
                          type="default"
                          className={"w-full sm:w-fit"}
                          onClick={() => router.push("/seat-sharing")}
                        >
                          Explore trips
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>

            <section className={style.card}>
              <div className={style.sectionIntro}>
                <span className={style.icon}>
                  <FiTag />
                </span>
                <div>
                  <h2 className={style.sectionTitle}>How to earn points</h2>
                  <p className={style.sectionSubtitle}>
                    Every interaction with On Time increases your balance
                  </p>
                </div>
              </div>
              <div className={style.grid2}>
                {EARN_TILES.map((tile) => (
                  <div key={tile.title} className={style.infoTile}>
                    <span className={style.tileIcon}>{tile.icon}</span>
                    <div>
                      <p className={style.tileTitle}>{tile.title}</p>
                      <p className={style.tileDesc}>{tile.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={style.card}>
              <div className={style.sectionIntro}>
                <span className={style.icon}>
                  <FiGift />
                </span>
                <div>
                  <h2 className={style.sectionTitle}>
                    Where to use your points
                  </h2>
                  <p className={style.sectionSubtitle}>
                    Turn your points into luxury experiences
                  </p>
                </div>
              </div>
              <div className={style.whereGrid}>
                <div className={style.whereRow}>
                  {WHERE_TILES.slice(0, 2).map((tile) => (
                    <div key={tile.title} className={style.infoTile}>
                      <div>
                        <p className={style.tileTitle}>{tile.title}</p>
                        <p className={style.tileDesc}>{tile.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={style.whereRow}>
                  {WHERE_TILES.slice(2, 4).map((tile) => (
                    <div key={tile.title} className={style.infoTile}>
                      <div>
                        <p className={style.tileTitle}>{tile.title}</p>
                        <p className={style.tileDesc}>{tile.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={style.whereRow}>
                  {WHERE_TILES.slice(4, 6).map((tile) => (
                    <div key={tile.title} className={style.infoTile}>
                      <div>
                        <p className={style.tileTitle}>{tile.title}</p>
                        <p className={style.tileDesc}>{tile.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className={style.card}>
              <div className={style.sectionIntro}>
                <span className={style.icon}>
                  <FiArrowUpRight />
                </span>
                <div>
                  <h2 className={style.sectionTitle}>Recent Activity</h2>
                  <p className={style.sectionSubtitle}>
                    Record your latest points earned and redeemed
                  </p>
                </div>
              </div>
              <div className={style.activityList}>
                {historyLoading ? (
                  <div className={style.loadingWrap}>
                    <Spin />
                  </div>
                ) : null}

                {!historyLoading && historyError ? (
                  <p className={style.activityDate}>
                    Could not load recent activity. Try again later.
                  </p>
                ) : null}

                {!historyLoading &&
                !historyError &&
                historyItems.length === 0 ? (
                  <p className={style.activityDate}>No activity yet.</p>
                ) : null}

                {!historyLoading &&
                  !historyError &&
                  historyItems.map((row) => {
                    const isEarn =
                      row.equivalentSign?.toLowerCase() === "credit";
                    const amountLabel = `${isEarn ? "+" : "-"} ${Math.abs(
                      row.pointsDisplay
                    ).toLocaleString("en-US")} pts`;
                    return (
                      <div key={row.id} className={style.activityRow}>
                        <div className={style.activityLeft}>
                          <span
                            className={`${style.activityIcon} ${
                              isEarn
                                ? style.activityIconEarn
                                : style.activityIconSpend
                            }`}
                          >
                            {isEarn ? (
                              <FiArrowUpRight aria-hidden />
                            ) : (
                              <FiArrowDownLeft aria-hidden />
                            )}
                          </span>
                          <div>
                            <p className={style.activityTitle}>{row.title}</p>
                            <p className={style.activityDate}>
                              {dayjs(row.createdAt).isValid()
                                ? dayjs(row.createdAt).format("MMMM D, YYYY")
                                : "—"}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`${style.activityAmount} ${
                            isEarn ? style.amountEarn : style.amountSpend
                          }`}
                        >
                          {amountLabel}
                        </span>
                      </div>
                    );
                  })}
              </div>
              {!historyLoading && historyPagination.totalPages > 1 ? (
                <div className="pagination-wrapper flex justify-center mt-8">
                  <Pagination
                    current={historyPagination.page}
                    pageSize={historyPagination.limit}
                    total={historyPagination.total}
                    hideOnSinglePage
                    showSizeChanger={false}
                    disabled={historyFetching}
                    onChange={(p) => setHistoryPage(p)}
                  />
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};
