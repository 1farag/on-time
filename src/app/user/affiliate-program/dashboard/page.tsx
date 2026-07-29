import { IndexComponent } from "@/components/homePage/IndexComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { AffiliateProgramDashboardComponent } from "@/components/user/affiliate-program/dashboard/AffiliateProgramDashboardComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "لوحة تحكم الافلييت",
};

const AffiliateProgramDashboardPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <AffiliateProgramDashboardComponent />
    </Suspense>
  );
};

export default AffiliateProgramDashboardPage;
