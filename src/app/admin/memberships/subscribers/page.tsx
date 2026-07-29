import { AdminMembershipSubscribersComponent } from "@/components/admin/memberships/subscribers/AdminMembershipSubscribersComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة المشتركين",
};

export default function AdminMembershipSubscribersPage() {
  return <AdminMembershipSubscribersComponent />;
}
