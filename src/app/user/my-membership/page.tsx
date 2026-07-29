import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { MyMembershipComponent } from "@/components/user/my-membership/MyMembershipComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Membership",
};

const HomePage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <MyMembershipComponent layout="accounting" />
    </Suspense>
  );
};

export default HomePage;
