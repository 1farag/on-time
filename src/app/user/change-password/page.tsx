import { ChangePasswordComponent } from "@/components/user/change-password/ChangePasswordComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Change Password",
};

const HomePage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <ChangePasswordComponent />
    </Suspense>
  );
};

export default HomePage;
