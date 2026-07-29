import { FailedOrderComponent } from "@/components/failed-order/FailedOrderComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "فشل إتمام الطلب  ",
};

const SucssesOrderPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <FailedOrderComponent />
    </Suspense>
  );
};

export default SucssesOrderPage;
