import { AffiliateProgramComponent } from "@/components/affiliate-program/AffiliateProgramComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "انضم الي برنامج الافيلييت",
};

const AffiliateProgramPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <AffiliateProgramComponent />
    </Suspense>
  );
};

export default AffiliateProgramPage;
