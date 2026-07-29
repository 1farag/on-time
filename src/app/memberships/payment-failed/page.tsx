import { MembershipPaymentFailedComponent } from "@/components/membership/payment-failed/MembershipPaymentFailedComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership payment failed",
  description:
    "Your membership payment did not complete. You can browse plans or try again later.",
};

export default function MembershipPaymentFailedPage() {
  return <MembershipPaymentFailedComponent />;
}
