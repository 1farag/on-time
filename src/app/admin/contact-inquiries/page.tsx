import { InquiriesListComponent } from "@/components/admin/contact-inquiries/InquiriesListComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Contact Inquiries | Admin",
};

const ContactInquiriesPage = () => {
    return (
        <Suspense fallback={<LoaderS1 />}>
            <InquiriesListComponent />
        </Suspense>
    );
};

export default ContactInquiriesPage;
