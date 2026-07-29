import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { ParticipateAndWinComponent } from "@/components/user/participate-and-win/ParticipateAndWinComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Referral Program",
};

const ParticipateAndWinPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <ParticipateAndWinComponent />
    </Suspense>
  );
};

export default ParticipateAndWinPage;
