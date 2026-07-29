"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { useAdminLogin } from "../hooks/useAdminLogin";
import { useEffect } from "react";
import { handleFormErrors } from "@/utils/handleFormError";

type FieldType = {
  username: string;
  password: string;
};

export const Login_form = () => {
  const [form] = Form.useForm();

  const { loginMutation, loginLoading, error } = useAdminLogin();

  const handleLogin = () => {
    form.validateFields().then((values) => {
      loginMutation({ ...values, platform: "dashboard" })
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
    >
      <div className="formS1 sectionS1 max-w-[365px] !border-none !p-0">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="email"
                rules={[
                  {
                    required: true,
                    message: "ادخل البريد الالكتروني  من فضلك!",
                  },
                  {
                    type: "email",
                    message: "من فضلك أدخل بريد إلكتروني صحيح",
                  },
                ]}
              >
                <Input
                  placeholder="البريد الالكتروني "
                  // prefix={<UserOutlined className="text-primary" />} // Add icon
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <Form.Item<FieldType>
              label=""
              name="password"
              rules={[
                {
                  required: true,
                  message: "ادخل كلمة السر من فضلك!",
                },
              ]}
            >
              <div className="inputS1">
                <Input.Password
                  placeholder="كلمة السر"
                  // prefix={<LockOutlined className="text-primary" />} // Add icon
                />
              </div>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={loginLoading}
              loading={loginLoading}
              className={`w-full`}
            >
              تسجيل الدخول
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
