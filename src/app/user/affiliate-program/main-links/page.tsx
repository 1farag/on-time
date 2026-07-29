import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { AffiliateProgramMainLinksComponent } from "@/components/user/affiliate-program/main-links/AffiliateProgramMainLinksComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "روابط الافيلييت الخاصه بك",
};

const AffiliateProgramMainLinksPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <AffiliateProgramMainLinksComponent />
    </Suspense>
  );
};

export default AffiliateProgramMainLinksPage;
