import { RegisterAsOwnershipComponent } from "@/components/register-as-ownership/RegisterAsOwnershipComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register Now As a Ownership ",
};

const RegisterAsOwnershipPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <RegisterAsOwnershipComponent />
    </Suspense>
  );
};

export default RegisterAsOwnershipPage;
