import { ReturnPolicyComponent } from "@/components/terms-and-conditions/ReturnPolicyComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Return and Exchange Policy",
};

const ReturnPolicyPage: React.FC = (): JSX.Element => {
    return (
        <Suspense fallback={<LoaderS1 />}>
            <ReturnPolicyComponent />
        </Suspense>
    );
};

export default ReturnPolicyPage;
