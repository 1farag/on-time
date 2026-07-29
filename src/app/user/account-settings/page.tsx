import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { AccountSettingsComponent } from "@/components/user/account-settings/AccountSettingsComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Account Settings",
};

const AccountSettingsPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <AccountSettingsComponent />
    </Suspense>
  );
};

export default AccountSettingsPage;
