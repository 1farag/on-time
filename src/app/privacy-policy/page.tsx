import { PrivacyPolicyComponent } from "@/components/privacy-policy/PrivacyPolicyComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PrivacyPolicyPage: React.FC = (): JSX.Element => {
  return <PrivacyPolicyComponent />;
};

export default PrivacyPolicyPage;
