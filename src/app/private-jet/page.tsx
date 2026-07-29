import { PrivateJetComingSoonComponent } from "@/components/private-jet/PrivateJetComingSoonComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Private Jet",
  description:
    "Private jet charter by On Time  — contact our team via Contact us for tailored charter requests, or explore seat sharing.",
};

const PrivateJetPage = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <PrivateJetComingSoonComponent />
    </Suspense>
  );
};

export default PrivateJetPage;
