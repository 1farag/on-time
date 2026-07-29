"use client";
import { Login_form } from "./forms/Login_form";
import { Suspense } from "react";
import style from "./styles/login.module.scss";

export const LoginComponent = () => {
  return (
    <main className={`${style.login} min-h-screen w-full py-24`}>
      <div className="login-card relative">
        <h1 className={style.title}>Sign In</h1>
        <p className={style.subtitle}>Welcome to Rich Style </p>

        <Suspense>
          <Login_form />
        </Suspense>
      </div>
      <p className={style.footer}>All rights reserved.Rich Style . © 2026</p>
    </main>
  );
};
