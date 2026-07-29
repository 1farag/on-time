import { TermsAndConditionsComponent } from "@/components/terms-and-conditions/TermsAndConditionsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

const TermsAndConditionsPage: React.FC = (): JSX.Element => {
  return <TermsAndConditionsComponent />;
};

export default TermsAndConditionsPage;
