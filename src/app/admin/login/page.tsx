import { AdminLoginComponent } from "@/components/admin/login/LoginComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Now",
};

const LoginPage: React.FC = (): JSX.Element => {
  return <AdminLoginComponent />;
};

export default LoginPage;
