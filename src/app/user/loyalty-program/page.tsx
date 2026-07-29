import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { LoyaltyUserComponent } from "@/components/user/loyalty-program/LoyaltyUserComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Loyalty",
};

const LoyaltyProgramPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <LoyaltyUserComponent />
    </Suspense>
  );
};

export default LoyaltyProgramPage;
