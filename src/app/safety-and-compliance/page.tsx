import { SafetyAndComplianceComponent } from "@/components/terms-and-conditions/SafetyAndComplianceComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety and Compliance",
};

const SafetyAndCompliancePage: React.FC = (): JSX.Element => {
  return <SafetyAndComplianceComponent />;
};

export default SafetyAndCompliancePage;
