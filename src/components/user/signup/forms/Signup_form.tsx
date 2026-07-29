"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { useSignup } from "../hooks/useSignup";
import { handleFormErrors } from "@/utils/handleFormError";
import { getReferralCodeFromSearchParams } from "@/lib/referralLink";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { z, ZodError } from "zod";

type FieldType = {
  name: string;
  email: string;
  mobile: string;
  password: string;
  referralCode?: string;
};

export const Signup_form = () => {
  const [form] = Form.useForm<FieldType>();
  const searchParams = useSearchParams();
  const { signupMutation, loginLoading } = useSignup();

  const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number");

  const zodPasswordValidator = async (_: unknown, value: string) => {
    try {
      passwordSchema.parse(value);
      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return Promise.reject(new Error(error.issues[0]?.message));
      }

      return Promise.reject(new Error("Invalid password"));
    }
  };

  const handleSignup = () => {
    form.validateFields().then((values) => {
      const [firstName, ...restNames] = values.name.trim().split(/\s+/);
      const lastName = restNames.join(" ") || firstName;

      signupMutation({
        firstName,
        lastName,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
        referralCode:
          typeof values.referralCode === "string"
            ? values.referralCode.trim()
            : undefined,
      })
        .then(() => {
          form.resetFields();
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  useEffect(() => {
    const referralCode = getReferralCodeFromSearchParams(searchParams);
    if (referralCode) {
      form.setFieldsValue({ referralCode });
    }
  }, [form, searchParams]);

  return (
    <Form
      name="signup_form"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      form={form}
      onFinish={handleSignup}
      autoComplete="off"
    >
      <div className="formS1 sectionS1 max-w-[460px] !border-none !p-0">
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Enter your name" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Enter your email address" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="email@example.com" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label="Phone number"
                name="mobile"
                rules={[{ required: true, message: "Enter your phone number" }]}
              >
                <PhoneInput
                  country={"sa"}
                  // enableSearch
                  countryCodeEditable={false}
                  placeholder="50403020"
                  inputProps={{ name: "mobile" }}
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Enter your password" },
                  { validator: zodPasswordValidator },
                ]}
              >
                <Input.Password placeholder="******" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item label="Referral code (optional)" name="referralCode">
                <Input placeholder="Enter referral code" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={loginLoading}
              loading={loginLoading}
              className="w-full"
            >
              Sign Up
            </Button>
          </Col>
        </Row>

        <p className="text-third mt-6 text-center">
          Do you have an account?{" "}
          <Link
            className="text-primary hover:text-primary font-bold"
            href="/user/login"
          >
            Sign in
          </Link>
        </p>
      </div>
    </Form>
  );
};
