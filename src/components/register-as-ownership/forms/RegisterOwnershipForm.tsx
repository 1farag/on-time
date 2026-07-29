"use client";

import { useMemo } from "react";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import PhoneInput from "react-phone-input-2";
import countryList from "country-list";
import {
  RegisterOwnershipPayload,
  useRegisterOwnership,
} from "../hooks/useRegisterOwnership";

const { TextArea } = Input;

const DEFAULT_COUNTRY_NAME = "Saudi Arabia";

function phoneWithoutPlus(raw: unknown): string {
  if (raw == null) return "";
  return String(raw).replace(/\+/g, "").replace(/\D/g, "");
}

export const RegisterOwnershipForm = () => {
  const [form] = Form.useForm<RegisterOwnershipPayload>();
  const { registerOwnership, isRegistering } = useRegisterOwnership();
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

  const handleFinish = async (values: RegisterOwnershipPayload) => {
    const payload: RegisterOwnershipPayload = {
      phoneNumber: phoneWithoutPlus(values.phoneNumber),
      // referralCode:
      //   typeof values.referralCode === "string"
      //     ? values.referralCode.trim()
      //     : "",
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      country: typeof values.country === "string" ? values.country.trim() : "",
      state: typeof values.state === "string" ? values.state.trim() : "",
      aircraftType: values.aircraftType.trim(),
      passengerCapacity: Number(values.passengerCapacity),
      zipCode: typeof values.zipCode === "string" ? values.zipCode.trim() : "",
      email: values.email.trim(),
      language:
        typeof values.language === "string" ? values.language.trim() : "",
      currency:
        typeof values.currency === "string" ? values.currency.trim() : "",
      address: typeof values.address === "string" ? values.address.trim() : "",
    };
    try {
      await registerOwnership(payload);
      form.resetFields();
    } catch {
      // Errors surfaced via toast in useRegisterOwnership
    }
  };

  return (
    <div className="bg-[#111720] border border-[#1c222e] rounded-2xl p-8">
      <h2 className="text-white font-bold text-2xl mb-8">
        Private Aviation Ownership
      </h2>

      <Form
        name="register_ownership_form"
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
            {/* <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item label="Referral Code" name="referralCode">
                  <Input placeholder="Referral code (optional)" />
                </Form.Item>
              </div>
            </Col> */}

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: "Enter first name" }]}
                >
                  <Input placeholder="First name" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: "Enter last name" }]}
                >
                  <Input placeholder="Last name" />
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
                  label="State"
                  name="state"
                  rules={[{ required: true, message: "Enter state" }]}
                >
                  <Input placeholder="State / region" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="ZIP Code"
                  name="zipCode"
                  rules={[{ required: true, message: "Enter ZIP code" }]}
                >
                  <Input placeholder="ZIP code" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="vehicle type"
                  name="vehicleType"
                  rules={[{ required: true, message: "Enter vehicle type" }]}
                >
                  <Input placeholder="e.g. Light jet, G650" />
                </Form.Item>
              </div>
            </Col>

            {/* <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="Passenger capacity"
                  name="passengerCapacity"
                  rules={[
                    { required: true, message: "Enter passenger capacity" },
                  ]}
                >
                  <InputNumber
                    className="!w-full"
                    min={0}
                    placeholder="Maximum passengers"
                  />
                </Form.Item>
              </div>
            </Col> */}

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="Language"
                  name="language"
                  rules={[{ required: true, message: "Enter language" }]}
                >
                  <Input placeholder="Arabic, English" />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label="Currency"
                  name="currency"
                  rules={[{ required: true, message: "Enter currency" }]}
                >
                  <Input placeholder=" SAR, USD" />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24}>
              <div className="inputS1">
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Enter address" }]}
                >
                  <TextArea rows={4} placeholder="Address" />
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
