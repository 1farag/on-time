import { LoginComponent } from "@/components/user/login/LoginComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Login",
};

const LoginPage: React.FC = (): JSX.Element => {
  return (
    <main>
      <LoginComponent />
    </main>
  );
};

export default LoginPage;
