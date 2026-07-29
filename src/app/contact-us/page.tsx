import { ContactUsComponent } from "@/components/contact-us/ContactUsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

const ContactUsPage: React.FC = (): JSX.Element => {
  return <ContactUsComponent />;
};

export default ContactUsPage;
