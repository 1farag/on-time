"use client";
import { Login_form } from "./forms/Login_form";
import { Suspense } from "react";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import style from "./styles/login.module.scss";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export const AdminLoginComponent = () => {
  const getLink = useLocalizedLink();

  return (
    <main
      className={`${style.login} flex min-h-[80vh] w-full items-center justify-center gap-20 px-10 py-3 md:flex-col`}
    >
      <div className="login-card">
        <h1 className="text-[#111113] font-bold mb-6 text-xl text-center">
          الدخول إلى حسابك كأدمن
        </h1>

        <Suspense>
          <Login_form />
        </Suspense>
      </div>
    </main>
  );
};
