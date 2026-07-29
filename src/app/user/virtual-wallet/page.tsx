import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { VirtualWalletComponent } from "@/components/user/virtual-wallet/VirtualWalletComponent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Virtual Wallet",
};

const VirtualWalletPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <VirtualWalletComponent />
    </Suspense>
  );
};

export default VirtualWalletPage;
