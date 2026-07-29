import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { MyMembershipUpgradeView } from "@/components/user/my-membership/MyMembershipUpgradeView";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Upgrade membership",
};

export default function MyMembershipUpgradePage() {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <MyMembershipUpgradeView />
    </Suspense>
  );
}
