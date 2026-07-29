import { SucssesfulOrderComponent } from "@/components/sucssesful-order/SucssesfulOrderComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: " تم إتمام الطلب بنجاح ",
};

const SucssesOrderPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <SucssesfulOrderComponent />
    </Suspense>
  );
};

export default SucssesOrderPage;
