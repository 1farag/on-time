"use client";

import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import countryList from "country-list";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  useChangeUserPassword,
  useConfirmUserPhoneChange,
  useConfirmUserEmailChange,
  useGetUserProfile,
  useRequestUserPhoneChange,
  useRequestUserEmailChange,
  useUpdateUserPersonalProfile,
} from "@/hooks/auth/useGetProfile";
import { AccountingSideMenu } from "../accounting/AccountingSideMenu";
import { OtpVerificationModal } from "./modals/OtpVerificationModal";
import style from "./styles/accountSettings.module.scss";
import { GradientText } from "@/components/tools/GradientText";

const SectionHeader = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <div className={style.sectionHeader}>
    <div className={style.iconWrap}>{icon}</div>
    <div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  </div>
);

const SectionActions = ({ isLoading = false }: { isLoading?: boolean }) => (
  <div className={style.actions}>
    {/* <Button type="default" className="!py-4" htmlType="reset">
      Cancel
    </Button> */}
    <Button
      type="primary"
      className="!py-4"
      htmlType="submit"
      loading={isLoading}
    >
      Save changes
    </Button>
  </div>
);

export const AccountSettingsComponent = () => {
  const [personalForm] = Form.useForm();
  const [phoneForm] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [isPhoneOtpModalOpen, setIsPhoneOtpModalOpen] = useState(false);
  const [isEmailOtpModalOpen, setIsEmailOtpModalOpen] = useState(false);
  const [pendingNewPhone, setPendingNewPhone] = useState("");
  const [phoneOtpCode, setPhoneOtpCode] = useState("");
  const [pendingNewEmail, setPendingNewEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const { user } = useGetUserProfile();
  const {
    mutate: updatePersonalProfile,
    isPending: isUpdatingPersonalProfile,
  } = useUpdateUserPersonalProfile();
  const { mutate: requestEmailChange, isPending: isRequestingEmailChange } =
    useRequestUserEmailChange();
  const { mutate: confirmEmailChange, isPending: isConfirmingEmailChange } =
    useConfirmUserEmailChange();
  const { mutate: requestPhoneChange, isPending: isRequestingPhoneChange } =
    useRequestUserPhoneChange();
  const { mutate: confirmPhoneChange, isPending: isConfirmingPhoneChange } =
    useConfirmUserPhoneChange();
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangeUserPassword();
  const nationalityOptions = useMemo(() => {
    return countryList
      .getData()
      .map((c) => ({ label: c.name, value: c.name }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const personalInitialValues = useMemo(() => {
    const fullName =
      [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
      user?.name ||
      "";

    const rawBirthday =
      user?.profile?.birthday ??
      user?.profile?.birthDate ??
      user?.profile?.dob ??
      null;

    return {
      fullName,
      birthday:
        rawBirthday && dayjs(rawBirthday).isValid() ? dayjs(rawBirthday) : null,
      nationality: user?.profile?.nationality || "",
    };
  }, [user]);

  useEffect(() => {
    personalForm.setFieldsValue(personalInitialValues);
  }, [personalForm, personalInitialValues]);

  useEffect(() => {
    const ensurePlusPrefix = (value?: string | number | null) => {
      const raw = String(value ?? "").trim();
      if (!raw) return "";
      return raw.startsWith("+") ? raw : `+${raw}`;
    };

    phoneForm.setFieldsValue({
      phone: ensurePlusPrefix(
        (
          user as
            | { phone?: string | number; mobile?: string | number }
            | undefined
        )?.phone ?? user?.mobile
      ),
    });
    emailForm.setFieldsValue({
      email: user?.email || "",
    });
  }, [emailForm, phoneForm, user]);

  const handlePersonalInfoSubmit = (values: {
    birthday?: dayjs.Dayjs | null;
    nationality: string;
    fullName?: string;
  }) => {
    const { birthday, nationality } = values;

    updatePersonalProfile({
      dob: birthday ? dayjs(birthday).format("YYYY-MM-DD") : null,
      nationality: String(nationality || "").trim(),
    });
  };

  const handleEmailSubmit = (values: { email: string }) => {
    const newEmail = String(values.email || "").trim();
    if (!newEmail || newEmail === user?.email) return;

    requestEmailChange(
      { newEmail },
      {
        onSuccess: () => {
          setPendingNewEmail(newEmail);
          setOtpCode("");
          setIsEmailOtpModalOpen(true);
        },
      }
    );
  };

  const normalizePhoneToCountryCode = (value?: string) => {
    const digits = String(value || "").replace(/\D/g, "");
    if (!digits) return "";
    return digits.startsWith("966")
      ? digits
      : `966${digits.replace(/^0+/, "")}`;
  };

  const handlePhoneSubmit = (values: { phone: string }) => {
    const normalizedPhone = normalizePhoneToCountryCode(values.phone);
    const currentPhone = normalizePhoneToCountryCode(
      String(
        (
          user as
            | { phone?: string | number; mobile?: string | number }
            | undefined
        )?.phone ??
          user?.mobile ??
          ""
      )
    );

    if (!normalizedPhone || normalizedPhone === currentPhone) return;

    requestPhoneChange(
      { newPhone: normalizedPhone },
      {
        onSuccess: () => {
          setPendingNewPhone(normalizedPhone);
          setPhoneOtpCode("");
          setIsPhoneOtpModalOpen(true);
        },
      }
    );
  };

  const handleConfirmEmailOtp = () => {
    const code = otpCode.trim();
    if (!pendingNewEmail || !code) return;

    confirmEmailChange(
      { newEmail: pendingNewEmail, code },
      {
        onSuccess: () => {
          setIsEmailOtpModalOpen(false);
          setPendingNewEmail("");
          setOtpCode("");
        },
      }
    );
  };

  const handleResendCode = () => {
    if (!pendingNewEmail) return;
    requestEmailChange({ newEmail: pendingNewEmail });
  };

  const handleConfirmPhoneOtp = () => {
    const code = phoneOtpCode.trim();
    if (!pendingNewPhone || !code) return;

    confirmPhoneChange(
      { newPhone: `+${pendingNewPhone}`, code },
      {
        onSuccess: () => {
          setIsPhoneOtpModalOpen(false);
          setPendingNewPhone("");
          setPhoneOtpCode("");
        },
      }
    );
  };

  const handleResendPhoneCode = () => {
    if (!pendingNewPhone) return;
    requestPhoneChange({ newPhone: pendingNewPhone });
  };

  const handleSecuritySubmit = (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    changePassword(values, {
      onSuccess: () => {
        securityForm.resetFields();
      },
    });
  };

  return (
    <main className={style.accountSettings}>
      <div className="container">
        <div className={style.header}>
          <h1>
            <GradientText>Account Settings</GradientText>
          </h1>
          <p>Manage your personal information and preferences</p>
        </div>

        <div className={style.contentLayout}>
          <AccountingSideMenu activeKey="account-settings" />

          <div className={style.formsArea}>
            <section className={style.formCard}>
              <SectionHeader
                icon={<LuUser />}
                title="Personal Information"
                subtitle="Your Basic Data"
              />
              <div className={style.separator} />
              <Form
                form={personalForm}
                layout="vertical"
                className="formS1 !border-none"
                onFinish={handlePersonalInfoSubmit}
                initialValues={personalInitialValues}
              >
                <Row gutter={[30, 30]}>
                  <Col xs={24} md={12}>
                    <div className="inputS1">
                      <Form.Item
                        label="Full name"
                        name="fullName"
                        rules={[
                          { required: true, message: "Please enter full name" },
                        ]}
                      >
                        <Input placeholder="Full name" />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="inputS1">
                      <Form.Item
                        label="Birthday"
                        name="birthday"
                        rules={[
                          { required: true, message: "Please select birthday" },
                        ]}
                      >
                        <DatePicker
                          className={style.fullWidth}
                          placeholder="mm/dd/yyyy"
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24}>
                    <div className="selectS1">
                      <Form.Item
                        label="Nationality"
                        name="nationality"
                        rules={[
                          {
                            required: true,
                            message: "Please enter nationality",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select nationality"
                          showSearch
                          optionFilterProp="label"
                          options={nationalityOptions}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <SectionActions isLoading={isUpdatingPersonalProfile} />
              </Form>
            </section>

            <section className={style.formCard}>
              <SectionHeader
                icon={<LuPhone />}
                title="Phone Number"
                subtitle="Enjoy a seamless experience with a verified phone number"
              />
              <div className={style.separator} />
              <Form
                form={phoneForm}
                layout="vertical"
                className="formS1 !border-none"
                onFinish={handlePhoneSubmit}
              >
                <Row gutter={[30, 30]}>
                  <Col xs={24}>
                    <div className="inputS1">
                      <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please enter phone number",
                          },
                        ]}
                      >
                        <PhoneInput
                          country={"sa"}
                          // enableSearch
                          countryCodeEditable={false}
                          placeholder="50403020"
                          inputProps={{ name: "phone" }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <SectionActions isLoading={isRequestingPhoneChange} />
              </Form>
            </section>

            <section className={style.formCard}>
              <SectionHeader
                icon={<LuMail />}
                title="Email"
                subtitle="Enjoy a seamless experience with a verified phone number"
              />
              <div className={style.separator} />
              <Form
                form={emailForm}
                layout="vertical"
                className="formS1 !border-none"
                onFinish={handleEmailSubmit}
              >
                <Row gutter={[30, 30]}>
                  <Col xs={24}>
                    <div className="inputS1">
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Please enter email" },
                          {
                            type: "email",
                            message: "Please enter a valid email",
                          },
                        ]}
                      >
                        <Input placeholder="emi@example.com" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <SectionActions isLoading={isRequestingEmailChange} />
              </Form>
            </section>

            <section className={style.formCard}>
              <SectionHeader
                icon={<RiLockPasswordLine />}
                title="Security"
                subtitle="Protect your account and password"
              />
              <div className={style.separator} />
              <Form
                form={securityForm}
                layout="vertical"
                className="formS1 !border-none"
                onFinish={handleSecuritySubmit}
              >
                <Row gutter={[30, 30]}>
                  <Col xs={24}>
                    <div className="inputS1">
                      <Form.Item
                        label="Current Password"
                        name="currentPassword"
                        rules={[
                          {
                            required: true,
                            message: "Please enter current password",
                          },
                        ]}
                      >
                        <Input.Password placeholder="******" />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24}>
                    <div className="inputS1">
                      <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                          {
                            required: true,
                            message: "Please enter new password",
                          },
                        ]}
                      >
                        <Input.Password placeholder="******" />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24}>
                    <div className="inputS1">
                      <Form.Item
                        label="Confirm New Password"
                        name="confirmPassword"
                        dependencies={["newPassword"]}
                        rules={[
                          {
                            required: true,
                            message: "Please confirm password",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("newPassword") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Passwords do not match")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password placeholder="******" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <SectionActions isLoading={isChangingPassword} />
              </Form>
            </section>
          </div>
        </div>
      </div>
      <OtpVerificationModal
        title="Enter the code sent to your email to confirm phone change."
        valueLabel={`+${pendingNewPhone || ""}`}
        open={isPhoneOtpModalOpen}
        otpCode={phoneOtpCode}
        isResending={isRequestingPhoneChange}
        isConfirming={isConfirmingPhoneChange}
        onClose={() => {
          setIsPhoneOtpModalOpen(false);
          setPhoneOtpCode("");
        }}
        onOtpChange={setPhoneOtpCode}
        onResend={handleResendPhoneCode}
        onConfirm={handleConfirmPhoneOtp}
      />
      <OtpVerificationModal
        title="Enter the code sent to your phone to confirm email change."
        open={isEmailOtpModalOpen}
        valueLabel={pendingNewEmail || user?.email || ""}
        otpCode={otpCode}
        isResending={isRequestingEmailChange}
        isConfirming={isConfirmingEmailChange}
        onClose={() => {
          setIsEmailOtpModalOpen(false);
          setOtpCode("");
        }}
        onOtpChange={setOtpCode}
        onResend={handleResendCode}
        onConfirm={handleConfirmEmailOtp}
      />
    </main>
  );
};
