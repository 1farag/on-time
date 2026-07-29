import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

export const Congratulations = () => {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#f2de95]/10 ring-1 ring-[#f2de95]/30">
        <FiCheckCircle className="h-12 w-12 text-primary" />
      </div>

      <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
        Password Updated
      </h2>
      <p className="mx-auto max-w-[320px] text-base text-[#B0B0B3] md:text-lg">
        Your password has been changed successfully. You can now log in with your
        new password.
      </p>

      <Link
        href="/user/login"
        className="mt-8 inline-flex min-w-[190px] items-center justify-center rounded-[10px] bg-primary px-7 py-3 font-bold text-secondary transition hover:opacity-95"
      >
        Login Now
      </Link>
    </div>
  );
};
