import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";
import { Button, Tag } from "antd";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

interface OrderSummaryProps {
  cart: {
    subtotal: number;
    shippingFee: number;
    total: number;
    currency: string;
    membershipDiscount?: number;
    couponDiscount?: number;
    couponCode?: string;
  };
}

export const OrderSummary = ({ cart }: OrderSummaryProps) => {
  const membershipDiscount = cart?.membershipDiscount || 0;
  const couponDiscount = cart?.couponDiscount || 0;
  const isCouponApplied = couponDiscount > 0;

  return (
    <div className="order-summary">
      <h5 className="text-primary text-2xl font-bold mb-6">ملخص الطلب</h5>

      {/* Subtotal */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#64748B] text-lg">المجموع الفرعي</span>
        <span className="text-secondary text-lg">
          <CurrencyFormatter
            amount={cart.subtotal}
            currency={cart.currency}
            amountClassName="text-md font-bold text-gray-700"
            iconSize={18}
          />
        </span>
      </div>

      {/* Membership Discount */}
      {membershipDiscount > 0 && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#64748B] text-lg">خصم العضوية</span>
          <span className="text-green-600 text-lg">
            <CurrencyFormatter
              amount={membershipDiscount}
              currency={cart.currency}
              amountClassName="text-md font-bold text-gray-700"
              iconSize={18}
            />
          </span>
        </div>
      )}

      {/* Coupon Discount */}
      {isCouponApplied && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#64748B] text-lg">
            قسيمة الخصم
            {cart.couponCode && (
              <Tag className="mr-2 px-2 py-0 border-0 bg-green-50 text-green-700">
                {cart.couponCode}
              </Tag>
            )}
          </span>
          <span className="!text-green-600 text-lg">
            <CurrencyFormatter
              amount={couponDiscount}
              currency={cart.currency}
              amountClassName="text-md font-bold text-gray-700"
              iconSize={18}
            />
          </span>
        </div>
      )}

      {/* <div className="flex items-center justify-between mb-4">
        <span className="text-[#64748B] text-lg">الشحن</span>
        <span className="text-secondary text-lg">
          {cart.shippingFee === 0
            ? "مجاني"
            : `${cart.shippingFee} ${cart.currency}`}
        </span>
      </div> */}
      <hr className="border-[1px] border-[#E0E0E1] my-4" />
      <div className="flex items-center justify-between mb-6">
        <span className="text-secondary text-xl font-bold">الإجمالي</span>
        <span className="text-secondary text-xl font-bold">
          <CurrencyFormatter
            amount={cart.total}
            currency={cart.currency}
            amountClassName="text-lg font-bold text-gray-700"
            iconSize={18}
          />
        </span>
      </div>
      <Link
        href="/checkout"
        className="flex items-center justify-center w-full bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-2 rounded-lg text-lg font-medium transition-colors text-center"
      >
        إتمام الشراء
      </Link>
      <hr className="border-[1px] border-[#E0E0E1] my-6" />
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
