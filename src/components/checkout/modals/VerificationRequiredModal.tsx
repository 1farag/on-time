"use client";

import { Modal, Button, Result } from "antd";
import { useSendVerification } from "@/hooks/auth/useSendVerification";
import { FiAlertCircle } from "react-icons/fi";

interface VerificationRequiredModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEmailVerified: boolean;
    isMobileVerified: boolean;
}

export const VerificationRequiredModal = ({
    isOpen,
    onClose,
    isEmailVerified,
    isMobileVerified,
}: VerificationRequiredModalProps) => {
    const { mutate: sendVerification, isPending } = useSendVerification();

    const handleResend = (type: "email" | "mobile") => {
        sendVerification(type);
    };

    const getMissingVerificationText = () => {
        if (!isEmailVerified && !isMobileVerified) {
            return "يرجى تأكيد البريد الإلكتروني ورقم الجوال للمتابعة.";
        }
        if (!isEmailVerified) {
            return "يرجى تأكيد البريد الإلكتروني للمتابعة.";
        }
        if (!isMobileVerified) {
            return "يرجى تأكيد رقم الجوال للمتابعة.";
        }
        return "";
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            centered
            width={500}
            className="verification-required-modal"
        >
            <Result
                icon={<FiAlertCircle className="text-primary w-20 h-20 mx-auto" />}
                title="تأكيد الحساب مطلوب"
                subTitle={getMissingVerificationText()}
                extra={[
                    <div key="actions" className="flex flex-col gap-3">
                        {!isEmailVerified && (
                            <Button
                                type="primary"
                                size="large"
                                loading={isPending}
                                onClick={() => handleResend("email")}
                                className="w-full"
                            >
                                إعادة إرسال رابط تأكيد البريد الإلكتروني
                            </Button>
                        )}
                        {!isMobileVerified && (
                            <Button
                                type="primary"
                                size="large"
                                loading={isPending}
                                onClick={() => handleResend("mobile")}
                                className="w-full"
                            >
                                إعادة إرسال كود تأكيد الجوال
                            </Button>
                        )}
                        <Button size="large" onClick={onClose} className="w-full">
                            إغلاق
                        </Button>
                    </div>,
                ]}
            >
                <div className="text-center text-gray-500 text-sm mt-4">
                    ستصلك روابط التأكيد على البريد الإلكتروني والجوال المسجلين لدينا.
                </div>
            </Result>
        </Modal>
    );
};
