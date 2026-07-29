import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { WalletComponent } from "@/components/user/wallet/WalletComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Wallet",
};

const WalletPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <WalletComponent />
    </Suspense>
  );
};

export default WalletPage;
