import { getPageData } from "@/apiCalls/getPageData";
import { ReturnPolicyHeading } from "./sections/ReturnPolicyHeading";

export const ReturnPolicyComponent = async () => {
    const pageData = await getPageData("terms-and-conditions");
    const JSONData = JSON.parse(pageData?.page?.data || "{}");

    return (
        <main>
            <ReturnPolicyHeading JSONData={JSONData} pageData={pageData} />
        </main>
    );
};
