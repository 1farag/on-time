"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { useUserLogin } from "../hooks/useLogin";
import { useEffect } from "react";
import { handleFormErrors } from "@/utils/handleFormError";
import Link from "next/link";

type FieldType = {
  username: string;
  password: string;
};

export const Login_form = () => {
  const [form] = Form.useForm();

  const { loginMutation, loginLoading, error } = useUserLogin();

  const handleLogin = () => {
    form.validateFields().then((values) => {
      loginMutation(values)
        .then(() => {
          form.resetFields();
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  useEffect(() => {
    if (error) {
      form.setFields([
        {
          name: "email",
          errors: error?.response?.data?.message
            ? [error?.response?.data?.message]
            : [],
        },
      ]);
    }
  }, [error, form]);

  return (
    <Form
      name="login_form"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}
      onFinish={handleLogin}
      autoComplete="off"
      className="relative "
    >
      <div className="formS1 sectionS1 max-w-[460px] !border-none !p-0">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Enter your email address",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input placeholder="email@example.com" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Enter your password",
                },
              ]}
            >
              <div className="inputS1">
                <Input.Password placeholder="******" />
              </div>
            </Form.Item>
          </Col>

          <Link
            className="text-primary hover:text-primary text-end font-semibold block w-full"
            href="/user/change-password"
          >
            Forget Password!
          </Link>

          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={loginLoading}
              loading={loginLoading}
              className={`w-full !py-4`}
            >
              Login
            </Button>
          </Col>
        </Row>
        <p className="text-third mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link
            className="text-primary hover:text-primary font-bold"
            href="/user/register"
          >
            Sign up
          </Link>
        </p>
      </div>
    </Form>
  );
};
