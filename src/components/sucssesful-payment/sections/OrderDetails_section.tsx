"use client";
import { useSearchParams } from "next/navigation";
import { BsBoxSeam } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";

export const OrderDetails_section = () => {
  const searchParams = useSearchParams();
  const checkoutId = searchParams.get("checkoutId");
  return (
    <div className="order-details mb-10">
      <div className="text-center flex flex-col gap-2">
        <span className="text-[#64748B]">رقم الطلب</span>
        <span className="font-bold text-3xl text-[#1A3A52]">#{checkoutId}</span>
      </div>
      <hr className="border-[1px] border-[#E0E0E1] my-6" />

      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-primary/20  text-primary rounded-full text-xl">
            <MdOutlineMailOutline />
          </div>
          <div className="flex flex-col">
            <span className="text-primary">تأكيد البريد الإلكتروني</span>
            <span className="text-[#64748B]">
              تحقق من بريدك لتفاصيل الطلب الكاملة{" "}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};
