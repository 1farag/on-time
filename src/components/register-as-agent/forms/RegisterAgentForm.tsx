"use client";

import { useMemo } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import PhoneInput from "react-phone-input-2";
import countryList from "country-list";
import {
  RegisterAgentPayload,
  useRegisterAgent,
} from "../hooks/useRegisterAgent";

const DEFAULT_COUNTRY_NAME = "Saudi Arabia";

/** Intl format without "+" (digits only, country code included). */
function phoneWithoutPlus(raw: unknown): string {
  if (raw == null) return "";
  return String(raw).replace(/\+/g, "").replace(/\D/g, "");
}

export const RegisterAgentForm = () => {
  const [form] = Form.useForm<RegisterAgentPayload>();
  const { registerAgent, isRegistering } = useRegisterAgent();
  const selectedCountryName = Form.useWatch("country", form);

  const countryOptions = useMemo(() => {
    return countryList
      .getData()
      .map((c) => ({
        label: c.name,
        value: c.name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const phoneDialCountry =
    typeof selectedCountryName === "string" && selectedCountryName
      ? (countryList.getCode(selectedCountryName)?.toLowerCase() ?? "sa")
      : "sa";

  const handleFinish = async (values: RegisterAgentPayload) => {
    const payload: RegisterAgentPayload = {
      ...values,
      country: typeof values.country === "string" ? values.country.trim() : "",
      city: typeof values.city === "string" ? values.city.trim() : "",
      phoneNumber: phoneWithoutPlus(values.phoneNumber),
      whatsappNumber: phoneWithoutPlus(values.whatsappNumber),
    };
    try {
      await registerAgent(payload);
      form.resetFields();
    } catch {
      // Errors are surfaced via toast in useRegisterAgent
    }
  };

  return (
    <div className="bg-[#111720] border border-[#1c222e] rounded-2xl p-8">
      <h2 className="text-white font-bold text-2xl mb-8">
        Register as an agent
      </h2>

      <Form
        name="register_agent_form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        form={form}
        onFinish={handleFinish}
        initialValues={{ country: DEFAULT_COUNTRY_NAME }}
        autoComplete="off"
      >
        <div className="formS1 !border-none !p-0">
          <Row gutter={[30, 30]}>
            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="Company / Agent Name"
                  name="companyOrAgentName"
                  rules={[
                    { required: true, message: "Enter company or agent name" },
                  ]}
                >
                  <Input placeholder="Company or agent name" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="Contact Person Name"
                  name="contactPersonName"
                  rules={[
                    {
                      required: true,
                      message: "Enter contact person name",
                    },
                  ]}
                >
                  <Input placeholder="Full name" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="Website"
                  name="website"
                  rules={[{ required: true, message: "Enter website" }]}
                >
                  <Input placeholder="https://example.com" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="Position"
                  name="position"
                  rules={[{ required: true, message: "Enter your position" }]}
                >
                  <Input placeholder="Job title / position" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="selectS1">
                <Form.Item
                  label="Country"
                  name="country"
                  rules={[{ required: true, message: "Select country" }]}
                >
                  <Select
                    placeholder="Select country"
                    showSearch
                    optionFilterProp="label"
                    options={countryOptions}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true, message: "Enter city" }]}
                >
                  <Input placeholder="City name" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Enter email" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[{ required: true, message: "Enter phone number" }]}
                  getValueFromEvent={(v) => v}
                >
                  <PhoneInput
                    country={phoneDialCountry}
                    countryCodeEditable={false}
                    placeholder="50403020"
                    inputProps={{ name: "phoneNumber" }}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="WhatsApp Number"
                  name="whatsappNumber"
                  rules={[{ required: true, message: "Enter WhatsApp number" }]}
                  getValueFromEvent={(v) => v}
                >
                  <PhoneInput
                    country={phoneDialCountry}
                    countryCodeEditable={false}
                    placeholder="50403020"
                    inputProps={{ name: "whatsappNumber" }}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24}>
              <Button
                htmlType="submit"
                type="primary"
                loading={isRegistering}
                className="w-full !mt-4 !py-4"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
