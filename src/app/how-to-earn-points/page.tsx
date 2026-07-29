import { HowToEarnPointsComponent } from "@/components/how-to-earn-points/HowToEarnPointsComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "طرق كسب النقاط الرئيسية",
};

const HowToEarnPointsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <HowToEarnPointsComponent />
    </Suspense>
  );
};

export default HowToEarnPointsPage;
