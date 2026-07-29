import { RegisterAsAgentComponent } from "@/components/register-as-agent/RegisterAsAgentComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register Now As a Agent ",
};

const RegisterAsAgentPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <RegisterAsAgentComponent />
    </Suspense>
  );
};

export default RegisterAsAgentPage;
