import { FAQComponent } from "@/components/faq/FAQComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

const FAQPage: React.FC = (): JSX.Element => {
  return <FAQComponent />;
};

export default FAQPage;
