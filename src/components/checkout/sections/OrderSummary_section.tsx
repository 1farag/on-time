"use client";

import { Button, Skeleton, Input } from "antd";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useGetCheckoutDetails } from "../hooks/useGetCheckoutDetails";
import { useApplyCoupon, useRemoveCoupon } from "../hooks/useApplyCoupon";
import { FiTrash2 } from "react-icons/fi";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";

interface OrderSummaryProps {
  checkoutLoading: boolean;
}

export const OrderSummary_section = ({
  checkoutLoading,
}: OrderSummaryProps) => {
  const { data, isLoading } = useGetCheckoutDetails();
  const { applyCouponMutation, applyCouponLoading } = useApplyCoupon();
  const { removeCouponMutation, removeCouponLoading } = useRemoveCoupon();

  const [couponCode, setCouponCode] = useState("");

  const subtotal = data?.subtotal || 0;
  const membershipDiscount = data?.membershipDiscount || 0;
  // Assume API returns couponDiscount if a coupon is applied
  const couponDiscount = data?.couponDiscount || 0;

  // We infer the coupon is applied if couponDiscount is > 0
  const isCouponApplied = couponDiscount > 0;
  const appliedCouponCode = data?.couponCode || "القسيمة المطبقة";

  const total = data?.total || 0;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    await applyCouponMutation({ code: couponCode });
    setCouponCode("");
  };

  const handleRemoveCoupon = async () => {
    await removeCouponMutation();
  };

  if (isLoading) {
    return (
      <div className="card">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  return (
    <div className="card">
      <h5 className="text-primary text-2xl font-bold mb-6">ملخص الطلب</h5>

      {/* Coupon Application / Active Coupon */}
      <div className="mb-6">
        {!isCouponApplied ? (
          <div className="flex items-center gap-2">
            <Input
              placeholder="أدخل كود الخصم"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              onPressEnter={handleApplyCoupon}
              disabled={applyCouponLoading || checkoutLoading}
              className="flex-1 rounded-md"
              size="large"
            />
            <Button
              type="primary"
              onClick={handleApplyCoupon}
              loading={applyCouponLoading}
              disabled={!couponCode.trim() || checkoutLoading}
              className="bg-primary text-white rounded-md"
              size="large"
            >
              تطبيق
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-md">
            <div>
              <p className="text-green-700 font-bold mb-1">كود الخصم مفعل</p>
              <p className="text-sm text-green-600">{appliedCouponCode}</p>
            </div>
            <Button
              type="primary"
              danger
              icon={<FiTrash2 />}
              onClick={handleRemoveCoupon}
              loading={removeCouponLoading}
              disabled={checkoutLoading}
            >
              إزالة
            </Button>
          </div>
        )}
      </div>

      {/* Subtotal */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#64748B] text-lg">المجموع الفرعي</span>
        <span className="text-secondary text-lg">
          <CurrencyFormatter
            amount={subtotal}
            currency={data?.currency}
            amountClassName="text-lg"
          />
        </span>
      </div>

      {/* Membership Discount */}
      {membershipDiscount > 0 && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#64748B] text-lg">خصم العضوية</span>
          <span className="text-green-600 text-lg flex items-center gap-1">
            -{" "}
            <CurrencyFormatter
              amount={membershipDiscount}
              currency={data?.currency}
              amountClassName="text-lg"
            />
          </span>
        </div>
      )}

      {/* Coupon Discount */}
      {isCouponApplied && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#64748B] text-lg">قسيمة الخصم</span>
          <span className="text-green-600 text-lg flex items-center gap-1">
            -{" "}
            <CurrencyFormatter
              amount={couponDiscount}
              currency={data?.currency}
              amountClassName="text-lg"
            />
          </span>
        </div>
      )}

      {/* Shipping */}
      {/* <div className="flex items-center justify-between mb-4">
        <span className="text-[#64748B] text-lg">الشحن</span>
        <span className="text-secondary text-lg">مجاني</span>
      </div> */}

      <hr className="border-[1px] border-[#E0E0E1] my-4" />

      {/* Total */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-secondary text-xl font-bold">الإجمالي</span>
        <span className="text-secondary text-xl font-bold">
          <CurrencyFormatter
            amount={total}
            currency={data?.currency}
            amountClassName="text-xl font-bold"
            iconSize={24}
          />
        </span>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className="w-full"
        loading={checkoutLoading}
        disabled={checkoutLoading || applyCouponLoading || removeCouponLoading}
      >
        إتمام الشراء
      </Button>

      <hr className="border-[1px] border-[#E0E0E1] my-6" />

      {/* Static Info */}
      <ul className="flex gap-2 flex-col">
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>دفع آمن ومشفر</span>
        </li>
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>شحن سريع خلال 2-3 أيام</span>
        </li>
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>إرجاع مجاني خلال 14 يوم</span>
        </li>
      </ul>
    </div>
  );
};
