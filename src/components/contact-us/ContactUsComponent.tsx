"use client";

import { useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

import { formatContactPhone } from "@/apiCalls/appContent/getContactUsContent";
import { GradientText } from "@/components/tools/GradientText";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { useContactUs } from "@/hooks/contact/useContactUs";
import { useContactUsContent } from "@/hooks/useContactUsContent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

const cardClass = "rounded-2xl border border-[#1c232e] bg-[#121820] p-6 sm:p-8";

export function ContactUsComponent() {
  const [form] = Form.useForm();
  const { data: contactContent, isLoading } = useContactUsContent();
  const { contactUsMutation, contactUsLoading } = useContactUs();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = async (values: {
    name: string;
    email: string;
    message: string;
    phone?: string;
  }) => {
    try {
      await contactUsMutation({
        fullName: values.name,
        email: values.email,
        phone: values.phone ?? "",
        address: "",
        message: values.message,
      });
      form.resetFields();
    } catch {
      // Error handled in hook
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: `${user.firstName} ${user.lastName}` || "",
        email: user.email || "",
        phone: user.mobile ? user.mobile.replace("+966", "") : "",
      });
    }
  }, [user, form]);

  if (isLoading) {
    return <LoaderS1 />;
  }

  if (!contactContent?.published) {
    return (
      <main className="bg-black py-24">
        <div className="container text-center">
          <p className="text-base text-third">
            Contact us content is currently unavailable.
          </p>
        </div>
      </main>
    );
  }

  const contactInfo = [
    {
      icon: FiPhone,
      title: "Phone Number",
      subtitle: formatContactPhone(
        contactContent.phoneCountryCode,
        contactContent.phoneNumber
      ),
    },
    {
      icon: FiMail,
      title: "Email",
      subtitle: contactContent.email,
    },
    {
      icon: FiMapPin,
      title: "Address",
      subtitle: contactContent.addressEn,
    },
  ];

  return (
    <main className="mt-14 py-16 sm:py-24">
      <div className="container max-w-4xl">
        <div className="mb-12 text-center sm:mb-16">
          <h1 className="mb-3 text-4xl font-bold sm:text-5xl">
            <GradientText>{contactContent.title}</GradientText>
          </h1>
          <p className="text-base text-third sm:text-lg">
            We&apos;re here to help
          </p>
        </div>

        <div className={`${cardClass} mb-6`}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="formS1 !border-none"
          >
            <Row gutter={[24, 24]} className="mb-8">
              <Col xs={24} sm={24}>
                <Form.Item
                  name="message"
                  label="Message"
                  className="mb-6"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your message",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Message ......"
                    rows={6}
                    className="!rounded-xl"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <div className="inputS1">
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name",
                      },
                    ]}
                  >
                    <Input placeholder="Full name" className="!rounded-xl" />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="inputS1">
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                    ]}
                  >
                    <Input
                      placeholder="email@example.com"
                      className="!rounded-xl"
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              disabled={contactUsLoading}
              loading={contactUsLoading}
              className="!h-14 !rounded-xl !text-base !font-semibold"
            >
              Send
            </Button>
          </Form>
        </div>

        <Row gutter={[16, 16]} className="mb-6">
          {contactInfo.map((info) => {
            const IconComponent = info.icon;
            return (
              <Col key={info.title} xs={24} md={8}>
                <div className={`${cardClass} !p-5 h-full`}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-secondary">
                      <IconComponent size={22} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-sm font-bold text-white">
                        {info.title}
                      </h3>
                      <p className="truncate text-sm text-third">
                        {info.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* <div
          className={`${cardClass} flex min-h-[220px] flex-col items-center justify-center gap-3 text-center sm:min-h-[260px]`}
        >
          <FiMapPin size={36} className="text-third/50" />
          <p className="text-sm text-third sm:text-base">
            {contactContent.addressEn}
          </p>
        </div> */}
      </div>
    </main>
  );
}
