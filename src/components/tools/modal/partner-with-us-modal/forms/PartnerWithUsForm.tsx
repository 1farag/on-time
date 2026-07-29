"use client";

import { handleFormErrors } from "@/utils/handleFormError";
import { Col, Form, Row, Input, Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useBecomePartner } from "../hooks/useBecomePartner";

export const PartnerWithUsForm = ({ handleCancel }: { handleCancel: () => void }) => {
  const [form] = Form.useForm();
  const { becomePartnerMutation, becomePartnerLoading } = useBecomePartner();

  const options = [
    { value: "Invest in Sanad or a Sanad startup", label: "Invest in Sanad or a Sanad startup" },
    { value: "Co-build startups with Sanad", label: "Co-build startups with Sanad" },
    { value: "Work with Sanad or a Sanad startup", label: "Work with Sanad or a Sanad startup" },
    { value: "Make a press inquiry", label: "Make a press inquiry" },
    { value: "other", label: "Other" },
  ];

  const handleBecomePartner = () => {
    form.validateFields().then((values) => {
      becomePartnerMutation(values)
        .then(() => {
          form.resetFields();
          handleCancel();
        })
        .catch((errors) => {
          handleFormErrors(form, errors);
        });
    });
  };

  return (
    <Form
      name="partner_form"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      form={form}
      onFinish={handleBecomePartner}
      autoComplete="off"
    >
      <div className="formS1 !border-none !p-0">
        <Row gutter={[11, 11]}>
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label="Full name"
                name="full_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name!",
                  },
                ]}
              >
                <Input placeholder="Type your full name" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label="Company email"
                name="company_email"
                rules={[
                  {
                    required: true,
                    message: "Please input your company email!",
                  },
                ]}
              >
                <Input placeholder="you@example.com" />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label="Phone number"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input placeholder="Type your phone number" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <div className="selectS1">
              <Form.Item
                label="I'm looking to:"
                name="looking_to"
                rules={[
                  {
                    required: true,
                    message: "Please select an option",
                  },
                ]}
              >
                <Select
                  placeholder="I'm looking to:"
                  options={options}
                />
              </Form.Item>
            </div>
          </Col>

          <Col xs={24}>
            <div className="inputS1">
              <Form.Item
                label="Message"
                name="message"
                rules={[
                  {
                    required: true,
                    message: "Please enter a message",
                  },
                ]}
              >
                <TextArea
                  cols={20}
                  rows={4.5}
                  placeholder="Type your message"
                />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={becomePartnerLoading}
              loading={becomePartnerLoading}
              className="submit-btn w-full"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
