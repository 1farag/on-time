"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import { ChangePassword_form } from "./forms/ChangePassword_form";
import { AddNewPassword_form } from "./forms/AddNewPassword_form";

import style from "./styles/changePassword.module.scss";
import { Congratulations } from "./sections/Congratulations_section";

export const ChangePasswordComponent = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const confirmationCode = searchParams.get("confirmation_code");

  const [passwordChanged, setPasswordChanged] = useState(false);

  const shouldRenderNewPasswordForm =
    Boolean(email) && Boolean(confirmationCode);

  return (
    <main className={`${style.login} min-h-screen w-full py-24`}>
      {passwordChanged ? (
        <Congratulations />
      ) : (
        <div className="login-card">
          <h1 className={style.title}>Forget Password</h1>
          <p className={style.subtitle}>
            {shouldRenderNewPasswordForm
              ? "Enter your new password"
              : "Enter your email address to reset your password"}
          </p>

          <Suspense>
            {shouldRenderNewPasswordForm ? (
              <AddNewPassword_form
                email={email!}
                confirmationCode={confirmationCode!}
                onSuccess={() => setPasswordChanged(true)}
              />
            ) : (
              <ChangePassword_form />
            )}
          </Suspense>
        </div>
      )}
      <p className={style.footer}>All rights reserved.On Time . © 2026</p>
    </main>
  );
};
