import { RegisterAsCompanyComponent } from "@/components/register-as-company/RegisterAsCompanyComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register Now As a Company ",
};

const RegisterAsCompanyPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <RegisterAsCompanyComponent />
    </Suspense>
  );
};

export default RegisterAsCompanyPage;
