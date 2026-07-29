"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useChangePassword } from "@/components/user/change-password/hooks/useChangePassword";
import { OtpVerificationModal } from "@/components/user/account-settings/modals/OtpVerificationModal";

interface ConfirmationCodeModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
}

export const ConfirmationCodeModal = ({
  open,
  onClose,
  email,
}: ConfirmationCodeModalProps) => {
  const [code, setCode] = useState("");
  const { verifyOtpMutation, verifyOtpLoading, forgotPasswordMutation, forgotPasswordLoading } =
    useChangePassword();
  const router = useRouter();

  const handleChange = (value: string) => {
    setCode(value);
  };

  const handleSubmit = () => {
    if (code.length === 6) {
      verifyOtpMutation({ emailOrPhone: email, purpose: "RESET", code })
        .then(() => {
          onClose();
          router.push(
            `/user/change-password?email=${encodeURIComponent(email)}&confirmation_code=${code}`
          );
        })
        .catch(() => {
          // Error is handled in the hook toast
        });
    }
  };

  const handleClose = () => {
    setCode("");
    onClose();
  };

  return (
    <OtpVerificationModal
      open={open}
      title="Check your email to reset password."
      valueLabel={email}
      otpCode={code}
      isResending={forgotPasswordLoading}
      isConfirming={verifyOtpLoading}
      onClose={handleClose}
      onOtpChange={handleChange}
      onResend={() => {
        forgotPasswordMutation({ email }).catch(() => {
          // Error is handled in hook toast
        });
      }}
      onConfirm={handleSubmit}
    />
  );
};
