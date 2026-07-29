"use client";

import { useState } from "react";
import { Button, Form, Input, Pagination, Spin } from "antd";
import toast from "react-hot-toast";
import {
  FiClock,
  FiFolder,
  FiPlus,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";
import { AccountingSideMenu } from "../accounting/AccountingSideMenu";
import { ComingSoonModal } from "@/components/tools/modal/coming-soon-modal/ComingSoon_modal";
import style from "./styles/wallet.module.scss";
import { GoShieldCheck } from "react-icons/go";
import { useWallet } from "./hooks/useWallet";
import { useWalletTransactions } from "./hooks/useWalletTransactions";
import { GradientText } from "@/components/tools/GradientText";

const TRANSACTIONS_PAGE_LIMIT = 12;

export const WalletComponent = () => {
  const {
    wallet,
    isLoading: walletLoading,
    isError: walletError,
  } = useWallet();
  const [txPage, setTxPage] = useState(1);
  const {
    items: txItems,
    pagination: txPagination,
    isLoading: txLoading,
    isError: txError,
    isFetching: txFetching,
  } = useWalletTransactions(txPage, TRANSACTIONS_PAGE_LIMIT);

  const [topUpForm] = Form.useForm();
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("5000");
  const watchedAmount = Form.useWatch("amount", topUpForm) ?? selectedAmount;
  const displayBalance = wallet?.balance ?? "—";
  const displayCurrency = wallet?.currency?.trim() || "SAR";
  const walletStatusLabel =
    wallet?.status?.toUpperCase() === "ACTIVE"
      ? "Active"
      : wallet?.status
        ? wallet.status.replace(/_/g, " ")
        : "";

  const showTxPagination =
    txPagination.totalPages > 1 || txPagination.total > txPagination.limit;

  const handleSelectAmount = (amount: string) => {
    setSelectedAmount(amount);
    topUpForm.setFieldsValue({ amount });
  };

  const handleConfirmTopUp = async () => {
    try {
      const values = await topUpForm.validateFields();
      const amount = parsePositiveAmount(values.amount);
      if (amount === null) {
        toast.error("Enter a valid amount greater than zero.");
        return;
      }
      setIsComingSoonOpen(true);
    } catch (e) {
      if ((e as { errorFields?: unknown })?.errorFields) return;
    }
  };

  return (
    <main className={style.walletPage}>
      <div className="container">
        <div className={style.header}>
          <h1>
            <GradientText>Wallet</GradientText>
          </h1>
          <p>Manage your personal information and preferences</p>
        </div>

        <div className={style.contentLayout}>
          <AccountingSideMenu activeKey="wallet" />

          <div className={style.mainArea}>
            <section className={style.card}>
              <div className={style.topBar}>
                <div className={style.titleWrap}>
                  <span className={style.icon}>
                    <FiFolder />
                  </span>
                  <div>
                    <p className="!mb-1">Current balance</p>
                    <h3>Rich Style Wallet</h3>
                  </div>
                </div>
                <div className={style.statusPill}>
                  <GoShieldCheck className="text-lg" />
                  {walletStatusLabel || "Secured balance"}
                </div>
              </div>

              <div className={style.balanceRow}>
                <div className="">
                  {walletLoading ? (
                    <Spin size="small" />
                  ) : (
                    <>
                      <strong>{displayBalance}</strong>
                      <span className="text-third pl-1">{displayCurrency}</span>
                    </>
                  )}
                  <p>
                    {walletError
                      ? "Could not load balance."
                      : "Usable in any booking"}
                  </p>
                </div>
                {/* <Button type="default" className="">
                  Book now using your balance
                </Button> */}
              </div>
            </section>

            <section className={style.card}>
              <div className={style.titleWrap}>
                <span className={style.icon}>
                  <FiPlus />
                </span>
                <div>
                  <h3>Top up your wallet</h3>
                  <p>Choose a preset amount or enter a custom amount</p>
                </div>
              </div>

              <Form
                form={topUpForm}
                layout="vertical"
                className="formS1 !border-none"
                initialValues={{ amount: selectedAmount }}
              >
                <div className={style.amountGrid}>
                  <button
                    type="button"
                    className={`${style.amountBtn} ${selectedAmount === "2000" ? style.activeAmount : ""}`}
                    onClick={() => handleSelectAmount("2000")}
                  >
                    2000 <small>{displayCurrency}</small>
                  </button>
                  <button
                    type="button"
                    className={`${style.amountBtn} ${selectedAmount === "5000" ? style.activeAmount : ""}`}
                    onClick={() => handleSelectAmount("5000")}
                  >
                    5000 <small>{displayCurrency}</small>
                  </button>
                  <button
                    type="button"
                    className={`${style.amountBtn} ${selectedAmount === "10000" ? style.activeAmount : ""}`}
                    onClick={() => handleSelectAmount("10000")}
                  >
                    10,000 <small>{displayCurrency}</small>
                  </button>
                </div>

                <div className="inputS1">
                  <Form.Item
                    label="or selected amount"
                    name="amount"
                    rules={[
                      { required: true, message: "Amount is required" },
                      {
                        validator: (_, value) => {
                          if (parsePositiveAmount(value) !== null) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Enter a valid number")
                          );
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Enter the amount" inputMode="decimal" />
                  </Form.Item>
                </div>

                {/* <h4 className={style.subheading}>Payment Methods</h4>
                <div className={style.methodsGrid}>
                  <button
                    type="button"
                    className={`${style.methodBtn} ${style.activeMethod}`}
                  >
                    <FiCreditCard />
                    Apple Pay
                  </button>
                  <button type="button" className={style.methodBtn}>
                    <FiCreditCard />
                    Visa / Mastercard
                  </button>
                </div> */}

                <div className={style.confirmRow}>
                  <div>
                    <p className="text-third">Total</p>
                    <p className="text-primary font-bold text-2xl">
                      {watchedAmount}
                      <span className="text-third text-base font-thin">
                        {" "}
                        {displayCurrency}
                      </span>
                    </p>
                  </div>
                  <Button
                    type="primary"
                    className={style.confirmBtn}
                    disabled={walletLoading}
                    onClick={() => void handleConfirmTopUp()}
                  >
                    <FiPlus />
                    Confirm
                  </Button>
                </div>
              </Form>
            </section>

            {/* <section className={style.card}>
              <div className={style.switchRow}>
                <div className={style.titleWrap}>
                  <span className={style.icon}>
                    <FiRefreshCcw />
                  </span>
                  <div>
                    <h3>Use your wallet during checkout.</h3>
                    <p>
                      When you reach the checkout page, activate the "Pay from
                      wallet" option to automatically deduct the balance.
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </section> */}

            <section className={style.card}>
              <div className={style.titleWrap}>
                <span className={style.icon}>
                  <FiClock />
                </span>
                <div>
                  <h3>Transaction History</h3>
                  <p>All shipping, payment, and refund transactions.</p>
                </div>
              </div>

              <div className={style.transactions}>
                {txLoading ? (
                  <div className="flex justify-center py-10">
                    <Spin />
                  </div>
                ) : null}

                {!txLoading && txError ? (
                  <p className="text-third py-6 text-center">
                    Could not load transactions. Try again later.
                  </p>
                ) : null}

                {!txLoading && !txError && txItems.length === 0 ? (
                  <p className="text-third py-6 text-center">
                    No transactions yet.
                  </p>
                ) : null}

                {!txLoading &&
                  !txError &&
                  txItems.map((item) => {
                    const isCredit = item.direction?.toUpperCase() === "CREDIT";
                    const title = formatReferenceLabel(item.referenceType);
                    const meta = `Balance after: ${item.balanceAfter} · ${formatTxnDate(item.createdAt)}`;
                    const amt = `${isCredit ? "+" : "-"} ${item.amount} ${displayCurrency}`;
                    return (
                      <div key={item.id} className={style.transactionItem}>
                        <div className={style.itemLeft}>
                          <span
                            className={`${style.itemIcon} ${isCredit ? style.up : style.down}`}
                          >
                            {isCredit ? <FiTrendingUp /> : <FiTrendingDown />}
                          </span>
                          <div>
                            <h5>{title}</h5>
                            <p>{meta}</p>
                          </div>
                        </div>
                        <strong
                          className={
                            isCredit ? style.amountUp : style.amountDown
                          }
                        >
                          {amt}
                        </strong>
                      </div>
                    );
                  })}
              </div>

              {!txLoading && showTxPagination ? (
                <div className="pagination-wrapper flex justify-center mt-8">
                  <Pagination
                    current={txPagination.page}
                    pageSize={txPagination.limit}
                    total={txPagination.total}
                    hideOnSinglePage
                    showSizeChanger={false}
                    disabled={txFetching}
                    onChange={(p) => setTxPage(p)}
                  />
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </div>
      <ComingSoonModal
        open={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        message={
          <>
            Wallet top-up will be available shortly.{" "}
            <span>Thank you for your patience.</span>
          </>
        }
      />
    </main>
  );
};

function formatReferenceLabel(referenceType: string): string {
  if (!referenceType?.trim()) return "Transaction";
  return referenceType
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function parsePositiveAmount(raw: unknown): number | null {
  if (typeof raw === "number") {
    if (Number.isFinite(raw) && raw > 0) return raw;
    return null;
  }
  if (typeof raw === "string") {
    const cleaned = raw.replace(/,/g, "").replace(/\s/g, "").trim();
    if (!cleaned) return null;
    const n = parseFloat(cleaned);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return null;
}

function formatTxnDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
