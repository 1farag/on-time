"use client";

import { Button, Modal } from "antd";
import ReactCodeInput from "react-code-input";
import { RiShieldCheckLine } from "react-icons/ri";

type OtpVerificationModalProps = {
  open: boolean;
  title: string;
  valueLabel: string;
  otpCode: string;
  isResending: boolean;
  isConfirming: boolean;
  onClose: () => void;
  onOtpChange: (value: string) => void;
  onResend: () => void;
  onConfirm: () => void;
};

export const OtpVerificationModal = ({
  open,
  title,
  valueLabel,
  otpCode,
  isResending,
  isConfirming,
  onClose,
  onOtpChange,
  onResend,
  onConfirm,
}: OtpVerificationModalProps) => {
  return (
    <Modal
      className="email-otp-modal"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={668}
    >
      <div className="email-otp-modal-content">
        <div className="email-otp-icon-wrap">
          <RiShieldCheckLine />
        </div>

        <h3>{title}</h3>
        <p>
          Enter the 6-digit code we sent to{" "}
          <span>( {valueLabel || "example@example.com"} )</span>
        </p>

        <div className="email-otp-input-wrap" dir="ltr">
          <ReactCodeInput
            type="text"
            fields={6}
            value={otpCode}
            onChange={onOtpChange}
            name="email-otp"
            inputMode="numeric"
          />
        </div>

        <button
          type="button"
          className="email-otp-resend-btn"
          onClick={onResend}
          disabled={isResending}
        >
          Resend code
        </button>

        <div className="email-otp-actions">
          <Button type="default" className="!py-4" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            className="!py-4"
            loading={isConfirming}
            disabled={otpCode.trim().length !== 6}
            onClick={onConfirm}
          >
            Save changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};
