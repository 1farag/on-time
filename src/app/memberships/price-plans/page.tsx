import { PricePlansComponent } from "@/components/membership/price-plans/PricePlansComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "خطط العضوية",
};

const PricePlansPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <PricePlansComponent />
    </Suspense>
  );
};

export default PricePlansPage;
