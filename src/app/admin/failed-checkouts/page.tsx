import { FailedCheckoutsComponent } from "@/components/admin/failed-checkouts/FailedCheckoutsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "محاولات الدفع الفاشلة",
};

const FailedCheckoutsPage = () => {
    return <FailedCheckoutsComponent />;
};

export default FailedCheckoutsPage;
