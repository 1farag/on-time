import { AboutUsComponent } from "@/components/about-us/AboutUsComponent";
import { HowItWorksComponent } from "@/components/how-it-works/HowItWorksComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "How it works",
};

const HowItWorksPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <HowItWorksComponent />
    </Suspense>
  );
};

export default HowItWorksPage;
