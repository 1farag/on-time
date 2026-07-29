"use client";

import type { ReactNode } from "react";
import { Button, Modal } from "antd";
import { RiShieldCheckLine } from "react-icons/ri";

type ComingSoonModalProps = {
  open: boolean;
  onClose: () => void;
  /** Optional body under the title; defaults to a generic message */
  message?: ReactNode;
};

const defaultMessage = (
  <>
    This feature will be available shortly.{" "}
    <span>Thank you for your patience.</span>
  </>
);

export const ComingSoonModal = ({
  open,
  onClose,
  message = defaultMessage,
}: ComingSoonModalProps) => {
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

        <h3>Coming soon</h3>
        <p>{message}</p>

        <div className="email-otp-actions">
          <Button type="primary" className="!py-4" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
