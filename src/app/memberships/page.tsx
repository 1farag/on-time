import { MembershipComponent } from "@/components/membership/MembershipComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Memberships",
};

const HomePage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <MembershipComponent />
    </Suspense>
  );
};

export default HomePage;
