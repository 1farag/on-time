import { EmptyLegsComingSoonComponent } from "@/components/empty-legs/EmptyLegsComingSoonComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Empty Legs",
  description:
    "Empty legs and positioning flights on Rich Style  — contact our team via Contact us for availability, or explore seat sharing.",
};

const EmptyLegsPage = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <EmptyLegsComingSoonComponent />
    </Suspense>
  );
};

export default EmptyLegsPage;
