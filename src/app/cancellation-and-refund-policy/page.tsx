import { CancellationAndRefundPolicyComponent } from "@/components/cancellation-and-refund-policy/CancellationAndRefundPolicyComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
};

const CancellationAndRefundPolicyPage: React.FC = (): JSX.Element => {
  return <CancellationAndRefundPolicyComponent />;
};

export default CancellationAndRefundPolicyPage;
