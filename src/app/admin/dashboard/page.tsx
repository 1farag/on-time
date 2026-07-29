import { DashboardComponent } from "@/components/admin/daschboard/DashboardComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage: React.FC = (): JSX.Element => {
  return <DashboardComponent />;
};

export default DashboardPage;
