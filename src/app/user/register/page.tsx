import { RegisterComponent } from "@/components/user/signup/SignupComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an account",
};

const RegisterPage: React.FC = (): JSX.Element => {
  return (
    <main>
      <RegisterComponent />
    </main>
  );
};

export default RegisterPage;
