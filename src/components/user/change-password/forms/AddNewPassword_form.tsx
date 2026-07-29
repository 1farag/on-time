"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { useChangePassword } from "../hooks/useChangePassword";
import { handleFormErrors } from "@/utils/handleFormError";

type FieldType = {
  password: string;
  confirmPassword: string;
};

interface addNewPasswordFormProps {
  email: string;
  confirmationCode: string;
  onSuccess: () => void;
}

export const AddNewPassword_form = ({
  email,
  confirmationCode,
  onSuccess,
}: addNewPasswordFormProps) => {
  const [form] = Form.useForm();
  const { resetPasswordMutation, resetPasswordLoading } = useChangePassword();

  const handleResetPassword = () => {
    form.validateFields().then((values) => {
      resetPasswordMutation({
        email,
        code: confirmationCode,
        newPassword: values.password,
      })
        .then(() => {
          form.resetFields();
          onSuccess();
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  return (
    <Form
      name="addNewPasswordForm"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}
      onFinish={handleResetPassword}
      autoComplete="off"
    >
      <div className="formS1 sectionS1 max-w-[365px] !border-none !p-0">
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item<FieldType>
                label="New Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Enter your new password",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters",
                  },
                ]}
              >
                <Input.Password placeholder="******" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item<FieldType>
                label="Confirm New Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Confirm your new password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
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

          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={resetPasswordLoading}
              loading={resetPasswordLoading}
              className={`w-full`}
            >
              Confirm
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
