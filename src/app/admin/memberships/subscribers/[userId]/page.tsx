import { AdminMembershipSubscriberDetailsComponent } from "@/components/admin/memberships/subscribers/single-subscriber/AdminMembershipSubscriberDetailsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تفاصيل الاشتراك",
};

const AdminMembershipSubscriberDetailsPage = () => {
  return <AdminMembershipSubscriberDetailsComponent />;
};

export default AdminMembershipSubscriberDetailsPage;
