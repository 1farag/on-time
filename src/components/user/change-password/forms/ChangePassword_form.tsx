"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { useChangePassword } from "../hooks/useChangePassword";
import { useState } from "react";
import { handleFormErrors } from "@/utils/handleFormError";
import { ConfirmationCodeModal } from "../../../tools/modal/confirmation-code-modal/ConfirmationCode_modal";
import Link from "next/link";

type FieldType = {
  email: string;
};

export const ChangePassword_form = () => {
  const [form] = Form.useForm();
  const { forgotPasswordMutation, forgotPasswordLoading } = useChangePassword();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    form.validateFields().then((values: FieldType) => {
      forgotPasswordMutation({
        email: values.email,
      })
        .then(() => {
          setEmail(values.email);
          setIsModalOpen(true);
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  return (
    <Form
      name="changePasswordFrom"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}
      onFinish={handleForgotPassword}
      autoComplete="off"
    >
      <div className="formS1 sectionS1 max-w-[365px] !border-none !p-0">
        <ConfirmationCodeModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          email={email}
        />
        <Row gutter={[16, 16]}>
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
            <Button
              htmlType="submit"
              type="primary"
              disabled={forgotPasswordLoading}
              loading={forgotPasswordLoading}
              className={`w-full`}
            >
              Send confirmation code
            </Button>
          </Col>

          <Col xs={24}>
            <Link href="/user/login">
              <Button type="default" className="w-full">
                Return to login
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
