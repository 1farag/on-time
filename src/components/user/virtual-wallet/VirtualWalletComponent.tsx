"use client";

import { Button, Form, InputNumber, Modal, Pagination, Spin } from "antd";
import { useState } from "react";
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiGift,
  FiInfo,
  FiRefreshCw,
} from "react-icons/fi";
import { RiVipCrownLine } from "react-icons/ri";
import { AccountingSideMenu } from "../accounting/AccountingSideMenu";
import { ComingSoonModal } from "@/components/tools/modal/coming-soon-modal/ComingSoon_modal";
import style from "./styles/virtualWallet.module.scss";
import { IoDiamondOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { useGetSeatCreditsMe } from "./hooks/useGetSeatCreditsMe";
import { useSeatCreditsHistory } from "./hooks/useSeatCreditsHistory";
import { useSeatCreditsPurchaseQuote } from "./hooks/useSeatCreditsPurchaseQuote";

const usageGuidelines = [
  "Balances can be used for flight bookings, add-ons, and memberships.",
  "You may combine virtual credit with other payment methods at checkout.",
  "Credits may expire based on promotion terms — check each balance log.",
  "Virtual wallet credit is non-transferable and tied to your account.",
];

const LOGS_PAGE_LIMIT = 8;

export const VirtualWalletComponent = () => {
  const [isBuySeatModalOpen, setIsBuySeatModalOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [logsPage, setLogsPage] = useState(1);
  const [buySeatForm] = Form.useForm<{ seatCount: number }>();
  const { data: seatCredits } = useGetSeatCreditsMe();
  const {
    items: historyItems,
    pagination: historyPagination,
    isLoading: historyLoading,
    isFetching: historyFetching,
  } = useSeatCreditsHistory(logsPage, LOGS_PAGE_LIMIT);

  const seatCount = Math.max(
    1,
    Number(Form.useWatch("seatCount", buySeatForm) ?? 1) || 1
  );
  const { data: purchaseQuote, isFetching: isQuoteLoading } =
    useSeatCreditsPurchaseQuote(seatCount, isBuySeatModalOpen);

  const unitPrice = purchaseQuote?.unitPrice ?? 0;
  const totalPrice = purchaseQuote?.total ?? 0;
  const currency = purchaseQuote?.currency ?? "USD";
  const availableSeats = Math.max(0, Number(seatCredits?.availableSeats ?? 0));
  const displayAvailableSeats = String(availableSeats).padStart(2, "0");

  const openBuySeatModal = () => {
    buySeatForm.setFieldsValue({ seatCount: 1 });
    setIsBuySeatModalOpen(true);
  };

  const closeBuySeatModal = () => setIsBuySeatModalOpen(false);

  const handleBuySeatConfirm = async () => {
    try {
      await buySeatForm.validateFields();
      closeBuySeatModal();
      setIsComingSoonOpen(true);
    } catch {
      /* validation errors surfaced on the form */
    }
  };

  return (
    <main className={style.virtualWalletPage}>
      <div className="container">
        <div className={style.header}>
          <h1>Virtual Wallet</h1>
          <p>Manage your personal information and preferences</p>
        </div>

        <div className={style.contentLayout}>
          <AccountingSideMenu activeKey="virtual-wallet" />

          <div className={style.mainArea}>
            <section className={style.card}>
              <div className={style.topBar}>
                <div className={style.titleWrap}>
                  <span className={style.icon}>
                    <IoDiamondOutline />
                  </span>
                  <div>
                    <p className={style.kicker}>Available balance</p>
                    <h3 className="!m-0">Rich Style Credit</h3>
                  </div>
                </div>
                {/* <div className={style.usablePill}>
                  <span className={style.usableDot} />
                  Usable
                </div> */}
              </div>

              <div className={style.balanceBlock}>
                <div>
                  <p>
                    <span className="font-bold text-primary text-5xl mr-2">
                      {displayAvailableSeats}
                    </span>{" "}
                    <span className="text-third text-2xl">Seat</span>
                  </p>
                  <p className={style.balanceSub}>Usable in any booking</p>
                </div>
                <div className={style.actionRow}>
                  <Button
                    type="primary"
                    className="!py-4"
                    onClick={openBuySeatModal}
                  >
                    Paid to buy a seat
                  </Button>
                </div>
              </div>
            </section>

            {/* Sources of funds */}
            <section className={style.card}>
              <div className={style.titleWrap}>
                <span className={style.icon}>
                  <GoGift />
                </span>
                <div>
                  <h3>Sources of funds</h3>
                  <p>Where do your funds come from?</p>
                </div>
              </div>

              <div className={style.sourcesGrid}>
                <div className={style.sourceCard}>
                  <span className={style.sourceIcon}>
                    <FiRefreshCw />
                  </span>
                  <div>
                    <h4>Refunds for bookings</h4>
                    <p>Credits from cancelled or changed trips.</p>
                  </div>
                </div>
                <div className={style.sourceCard}>
                  <span className={style.sourceIcon}>
                    <RiVipCrownLine />
                  </span>
                  <div>
                    <h4>Membership benefits</h4>
                    <p>Rewards from your membership tier.</p>
                  </div>
                </div>
                <div className={style.sourceCard}>
                  <span className={style.sourceIcon}>
                    <FiGift />
                  </span>
                  <div>
                    <h4>Promotional credits</h4>
                    <p>Limited-time offers and campaigns.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Usage guidelines */}
            <section className={style.card}>
              <div className={style.titleWrap}>
                <span className={style.icon}>
                  <FiInfo />
                </span>
                <div>
                  <h3>Usage Guidelines</h3>
                  <p>Important points to know before use.</p>
                </div>
              </div>

              <ul className={style.guidelinesList}>
                {usageGuidelines.map((line) => (
                  <li key={line}>
                    <span className={style.bullet} />
                    {line}
                  </li>
                ))}
              </ul>
            </section>

            {/* Balance logs */}
            <section className={style.card}>
              <div className={style.titleWrap}>
                <span className={style.icon}>
                  <FiInfo />
                </span>
                <div>
                  <h3>Balance Logs</h3>
                  <p>Balances added and used.</p>
                </div>
              </div>

              <div className={style.logsList}>
                {historyLoading ? (
                  <div className="flex justify-center py-8">
                    <Spin />
                  </div>
                ) : null}

                {!historyLoading && historyItems.length === 0 ? (
                  <p className="text-third py-3">No balance logs found.</p>
                ) : null}

                {!historyLoading &&
                  historyItems.map((log) => {
                    const positive = log.seatsDelta >= 0;
                    const amountValue = log.displayAmount ?? "0.00";
                    const amount = `${positive ? "+" : "-"} ${amountValue} ${
                      log.currency ?? "SAR"
                    }`;
                    const createdLabel = formatDate(log.createdAt);
                    const expiryLabel = formatDate(log.expiresAt);
                    const meta = expiryLabel
                      ? `${createdLabel} · Expires ${expiryLabel}`
                      : createdLabel;

                    return (
                      <div key={log.id} className={style.logItem}>
                        <div className={style.logLeft}>
                          <span
                            className={`${style.logIcon} ${positive ? style.logIconIn : style.logIconOut}`}
                          >
                            {positive ? (
                              <FiArrowDownLeft />
                            ) : (
                              <FiArrowUpRight />
                            )}
                          </span>
                          <div>
                            <h5>{log.title || "Seat credit transaction"}</h5>
                            <p>{meta}</p>
                          </div>
                        </div>
                        <strong
                          className={
                            positive
                              ? style.logAmountPositive
                              : style.logAmountNegative
                          }
                        >
                          {amount}
                        </strong>
                      </div>
                    );
                  })}
              </div>

              {!historyLoading &&
              historyPagination.total > historyPagination.limit ? (
                <div className="pagination-wrapper flex justify-center mt-8">
                  <Pagination
                    current={historyPagination.page}
                    pageSize={historyPagination.limit}
                    total={historyPagination.total}
                    hideOnSinglePage
                    showSizeChanger={false}
                    onChange={(p) => setLogsPage(p)}
                    disabled={historyFetching}
                  />
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </div>

      <Modal
        open={isBuySeatModalOpen}
        onCancel={closeBuySeatModal}
        footer={
          <div className={style.detailModalFooter}>
            <Button
              type="default"
              className={style.viewBtn}
              onClick={closeBuySeatModal}
              disabled={isQuoteLoading}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className={style.primaryBtn}
              onClick={() => void handleBuySeatConfirm()}
              disabled={isQuoteLoading}
            >
              Continue to payment
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
          <div className={`${style.bookingCard} ${style.detailModalHero}`}>
            <div className={style.bookingInfo}>
              <div className={style.iconBox}>
                <IoDiamondOutline />
              </div>
              <div>
                <div className={style.routeRow}>
                  <h3>Buy seats</h3>
                </div>
                <p>Choose how many seats you want to buy.</p>
              </div>
            </div>
          </div>

          <div className={style.detailSection}>
            <h4 className={style.detailSectionTitle}>Purchase</h4>

            <dl className={style.detailGrid}>
              <div className={style.detailRow}>
                <div className={style.detailLabel}>Price per seat</div>
                <div className={style.detailValue}>
                  {unitPrice} {currency}
                </div>
              </div>
              <div className={style.detailRow}>
                <div className={style.detailLabel}>Total price</div>
                <div className={style.detailValue}>
                  {totalPrice} {currency}
                </div>
              </div>
            </dl>
            <div className={"w-full"}>
              <Form
                form={buySeatForm}
                layout="vertical"
                initialValues={{ seatCount: 1 }}
                className="formS1 !border-none"
              >
                <div className={"inputS1 my-4"}>
                  <Form.Item
                    name="seatCount"
                    label="Number of seats"
                    rules={[
                      {
                        required: true,
                        message: "Number of seats is required",
                      },
                      { type: "number", min: 1, message: "Minimum is 1 seat" },
                    ]}
                  >
                    <InputNumber
                      className="w-full"
                      min={1}
                      disabled={isQuoteLoading}
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
      <ComingSoonModal
        open={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        message={
          <>
            Seat credit payment will be available shortly.{" "}
            <span>Thank you for your patience.</span>
          </>
        }
      />
    </main>
  );
};

function formatDate(value?: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
