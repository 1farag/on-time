import { PartnersComponent } from "@/components/admin/partners/PartnersComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Partners",
};

const PartnersPage: React.FC = (): JSX.Element => {
  return (
    <Suspense>
      <PartnersComponent />
    </Suspense>
  );
};

export default PartnersPage;
