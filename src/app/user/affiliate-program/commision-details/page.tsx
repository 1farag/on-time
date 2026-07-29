import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { AffiliateProgramCommisionDetailsComponent } from "@/components/user/affiliate-program/commision-details/AffiliateProgramCommisionDetailsComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "تفاصيل العمولات",
};

const AffiliateProgramCommisionDetailsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <AffiliateProgramCommisionDetailsComponent />
    </Suspense>
  );
};

export default AffiliateProgramCommisionDetailsPage;
