import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { AffiliateProgramWithdrawingProfitsComponent } from "@/components/user/affiliate-program/withdrawing-profits/AffiliateProgramWithdrawingProfitsComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "طلب سحب الارباح",
};

const AffiliateProgramMainLinksPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <AffiliateProgramWithdrawingProfitsComponent />
    </Suspense>
  );
};

export default AffiliateProgramMainLinksPage;
