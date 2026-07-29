import { FailedPaymentComponent } from "@/components/faild-payment/FailedPaymentComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "فشل إتمام الطلب  ",
};

const SucssesPaymentPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <FailedPaymentComponent />
    </Suspense>
  );
};

export default SucssesPaymentPage;
