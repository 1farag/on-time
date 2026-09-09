"use client";

import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { IoClose } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import { useMutation } from "@tanstack/react-query";

type Props = {
  open: boolean;
  onClose: () => void;
};

type ContactFormValues = {
  name: string;
  email: string;
  mobile: string;
  notes?: string;
};

const { TextArea } = Input;

const sendContactForm = async (values: ContactFormValues) => {
  const response = await fetch("https://formsubmit.co/contact@on-time.group", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      phone: values.mobile,
      message: values.notes || "No notes",
      _subject: `New Contact Request - ${values.name}`,
      _captcha: "false",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  // Don't parse the response as JSON
  return true;
};

export const ContactModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm<ContactFormValues>();

  const { mutate, isPending } = useMutation({
    mutationFn: sendContactForm,

    onSuccess: () => {
      message.success("Your message has been sent successfully!");

      form.resetFields();
      onClose();
    },

    onError: (error) => {
      console.error(error);

      message.error("Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (values: ContactFormValues) => {
    mutate(values);
  };

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onClose}
      centered
      closeIcon={<IoClose className="text-3xl text-white" />}
      width={600}
      styles={{
        content: {
          background: "#161C28",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 20,
          padding: 24,
        },
        body: {
          paddingTop: 10,
        },
      }}
    >
      <div className="formS1">
        <h2 className="text-3xl font-semibold text-white mb-10">Contact Us</h2>

        <Form
          layout="vertical"
          form={form}
          className="contact-form"
          onFinish={handleSubmit}
        >
          <Row gutter={[32, 32]}>
            {/* Name */}
            <Col span={24}>
              <div className="inputS1">
                <Form.Item
                  label={<span className="text-[#9CA3AF]">Name</span>}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name",
                    },
                  ]}
                >
                  <Input placeholder="Full name" />
                </Form.Item>
              </div>
            </Col>

            {/* Email */}
            <Col span={24}>
              <div className="inputS1">
                <Form.Item
                  label={<span className="text-[#9CA3AF]">Email</span>}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </div>
            </Col>

            {/* Phone */}
            <Col span={24}>
              <div className="inputS1">
                <Form.Item
                  label="Phone number"
                  name="mobile"
                  rules={[
                    {
                      required: true,
                      message: "Enter your phone number",
                    },
                  ]}
                  getValueFromEvent={(value) => value}
                >
                  <PhoneInput
                    country="sa"
                    countryCodeEditable={false}
                    placeholder="50403020"
                    inputProps={{
                      name: "mobile",
                    }}
                  />
                </Form.Item>
              </div>
            </Col>

            {/* Notes */}
            <Col span={24}>
              <div className="inputS1">
                <Form.Item
                  label={
                    <span className="text-[#9CA3AF]">Notes ( Optional )</span>
                  }
                  name="notes"
                  rules={[
                    {
                      required: true,
                      message: "Enter your notes",
                    },
                  ]}
                >
                  <TextArea rows={5} placeholder="Any special requests" />
                </Form.Item>
              </div>
            </Col>

            {/* Submit */}
            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isPending}
                disabled={isPending}
                className="w-full !h-14 !rounded-full"
              >
                {isPending ? "Sending..." : "Send"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};
