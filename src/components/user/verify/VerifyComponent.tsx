"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useVerifyAccount } from "@/hooks/auth/useVerifyAccount";
import { Spin, Result, Button } from "antd";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";

export const VerifyComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const getLink = useLocalizedLink();
  const { mutate: verify, isPending, isSuccess, isError } = useVerifyAccount();
  const verificationStarted = useRef(false);

  useEffect(() => {
    const type = searchParams.get("type");
    const token = searchParams.get("token");

    if (type && token && !verificationStarted.current) {
      verificationStarted.current = true;
      verify({ type, token });
    }
  }, [searchParams, verify]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spin size="large" />
        <p className="text-lg font-medium text-gray-600">
          جاري التأكد من الحساب...
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Result
          icon={<FiCheckCircle className="text-primary w-20 h-20 mx-auto" />}
          title="تم تأكيد الحساب بنجاح!"
          subTitle="يمكنك الآن تسجيل الدخول والاستمتاع بكافة مميزات متجر نادي الطائي."
          extra={[
            <Button
              type="primary"
              key="login"
              size="large"
              onClick={() => router.push(getLink("/user/login"))}
              className="px-8"
            >
              تسجيل الدخول
            </Button>,
          ]}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Result
          icon={<FiXCircle className="text-primary w-20 h-20 mx-auto" />}
          title="فشل تأكيد الحساب"
          subTitle="عذراً، قد يكون الرابط منتهي الصلاحية أو غير صحيح. يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني."
          extra={[
            <Button
              type="primary"
              key="home"
              size="large"
              onClick={() => router.push(getLink("/"))}
            >
              العودة للرئيسية
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Result
        icon={<FiAlertCircle className="text-primary w-20 h-20 mx-auto" />}
        title="رابط غير صالح"
        subTitle="عذراً، الرابط الذي استخدمته لا يحتوي على بيانات التأكيد المطلوبة."
        extra={[
          <Button
            type="primary"
            key="home"
            size="large"
            onClick={() => router.push(getLink("/"))}
          >
            العودة للرئيسية
          </Button>,
        ]}
      />
    </div>
  );
};
