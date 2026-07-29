"use client";
import { Signup_form } from "./forms/Signup_form";
import { Suspense } from "react";
import style from "./styles/login.module.scss";

export const RegisterComponent = () => {
  return (
    <main className={`${style.login} min-h-screen w-full  py-24`}>
      <div className="login-card">
        <h1 className={style.title}>Create an account</h1>
        <p className={style.subtitle}>Welcome to On Time</p>

        <Suspense>
          <Signup_form />
        </Suspense>
      </div>
      <p className={style.footer}>All rights reserved.On Time. © 2026</p>
    </main>
  );
};
