"use client";

import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { IoClose } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";

type Props = {
  open: boolean;
  onClose: () => void;
};

const { TextArea } = Input;

export const ContactModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();

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
        <h2 className="text-3xl font-semibold text-white mb-10">Contact US</h2>

        <Form layout="vertical" form={form} className="contact-form">
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <div className="inputS1">
                <Form.Item
                  label={<span className="text-[#9CA3AF]">Name</span>}
                  name="name"
                >
                  <Input placeholder="Full name" />
                </Form.Item>
              </div>
            </Col>
            <Col span={24}>
              <div className="inputS1">
                <Form.Item
                  label={<span className="text-[#9CA3AF]">Email</span>}
                  name="email"
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </div>
            </Col>
            <Col span={24}>
              <div className="inputS1">
                <Form.Item
                  label="Phone number"
                  name="mobile"
                  rules={[
                    { required: true, message: "Enter your phone number" },
                  ]}
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
            <Col span={24}>
              <div className="inputS1">
                <Form.Item
                  label={
                    <span className="text-[#9CA3AF]">Notes ( Optional )</span>
                  }
                  name="notes"
                >
                  <TextArea rows={5} placeholder="Any special requests" />
                </Form.Item>
              </div>
            </Col>
            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full !h-14 !rounded-full"
              >
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};
