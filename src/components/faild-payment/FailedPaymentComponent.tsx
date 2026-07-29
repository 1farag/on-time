import Image from "next/image";
import Link from "next/link";
import React from "react";

export const FailedPaymentComponent = () => {
  return (
    <main>
      <div className="container  py-20">
        <section className="flex flex-col items-center justify-center mb-10 text-center">
          <Image
            src={"/icons/failed.svg"}
            width={100}
            height={100}
            alt="failed icon"
          />

          <h3 className="mt-8 mb-6 text-3xl font-bold text-secondary">
            فشل إتمام الطلب
          </h3>

          <p className="text-primary text-lg mb-6">
            للأسف لم تكتمل عملية الدفع. يرجى المحاولة مرة أخرى أو اختيار طريقة
            دفع أخرى.
          </p>

          <div className="flex gap-4">
            <Link
              href="/"
              className="border border-gray-300   hover:text-primary px-6 py-3 rounded-lg"
            >
              العودة للرئيسية
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};
