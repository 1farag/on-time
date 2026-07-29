import { HomeComponent } from "@/components/admin/home/HomeComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const HomePage: React.FC = (): JSX.Element => {
  return <HomeComponent />;
};

export default HomePage;
