import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { AffiliateProgramJoinNowComponent } from "@/components/user/affiliate-program/join-now/AffiliateProgramJoinNowComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "انضم إلى برنامج الشركاء",
};

const AffiliateProgramJoinNowPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <AffiliateProgramJoinNowComponent />
    </Suspense>
  );
};

export default AffiliateProgramJoinNowPage;
