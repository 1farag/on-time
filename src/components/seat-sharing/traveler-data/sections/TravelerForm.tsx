"use client";

import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import PhoneInput from "react-phone-input-2";
import countryList from "country-list";
import { useMemo } from "react";
import type { BookingPassengerType } from "@/types/bookingConfirm";

import "../traveler-data.scss";

const { Option } = Select;
const { TextArea } = Input;

const TITLE_OPTIONS = [
  { value: "Mr.", label: "Mr." },
  { value: "Ms.", label: "Ms." },
  { value: "Mrs.", label: "Mrs." },
] as const;

type TravelerFormProps = {
  passengerIndex: number;
  passengerType: BookingPassengerType;
  noTitle?: boolean;
};

export const TravelerForm = ({
  passengerIndex,
  passengerType,
  noTitle,
}: TravelerFormProps) => {
  const p = ["passengers", passengerIndex] as const;

  const nationalityOptions = useMemo(() => {
    return countryList
      .getData()
      .map((c) => ({ label: c.name, value: c.name }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const typeLabel =
    passengerType === "ADULT"
      ? "Adult"
      : passengerType === "CHILD"
        ? "Child"
        : "Infant";

  return (
    <div
      className={`traveler-form-container ${noTitle ? "traveler-form-no-card" : "cardS1 mb-6"}`}
    >
      {!noTitle && (
        <h2 className="text-white text-xl font-bold mb-8">
          Traveler ({typeLabel})
        </h2>
      )}

      <div className="formS1">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={4}>
            <Form.Item
              label="Title"
              name={[...p, "title"]}
              className="selectS1"
              rules={[{ required: true, message: "Select title" }]}
              initialValue="Mr."
            >
              <Select placeholder="Title" className="w-full">
                {TITLE_OPTIONS.map((t) => (
                  <Option key={t.value} value={t.value}>
                    {t.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item
              label="First Name"
              name={[...p, "firstName"]}
              className="inputS1"
              rules={[{ required: true, message: "First name is required" }]}
            >
              <Input placeholder="First name" autoComplete="given-name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item
              label="Last Name"
              name={[...p, "lastName"]}
              className="inputS1"
              rules={[{ required: true, message: "Last name is required" }]}
            >
              <Input placeholder="Last name" autoComplete="family-name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-4">
          <Col xs={24} md={12}>
            <Form.Item
              label="Passport number"
              name={[...p, "passportNumber"]}
              className="inputS1"
              rules={[
                { required: true, message: "Passport number is required" },
              ]}
            >
              <Input placeholder="Passport number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nationality"
              name={[...p, "nationality"]}
              className="selectS1"
              rules={[{ required: true, message: "Nationality is required" }]}
              initialValue="Saudi Arabia"
            >
              <Select
                placeholder="Nationality"
                showSearch
                optionFilterProp="label"
                options={nationalityOptions}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-4">
          <Col xs={24} md={12}>
            <Form.Item
              label="Date of birth"
              name={[...p, "dob"]}
              className="inputS1"
              rules={[{ required: true, message: "Date of birth is required" }]}
            >
              <DatePicker className="w-full" format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Passport expiry"
              name={[...p, "passportExpiry"]}
              className="inputS1"
              rules={[
                { required: true, message: "Passport expiry is required" },
              ]}
            >
              <DatePicker className="w-full" format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-4">
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name={[...p, "email"]}
              className="inputS1"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="email@example.com" autoComplete="email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Phone"
              name={[...p, "phone"]}
              className="inputS1"
              rules={[{ required: true, message: "Phone is required" }]}
              getValueFromEvent={(v) => v}
            >
              <PhoneInput
                country="sa"
                containerClass="phone-input-container"
                inputClass="phone-input-field"
                buttonClass="phone-input-button"
                placeholder="501234567"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-4">
          <Col span={24}>
            <Form.Item
              label="Notes (optional)"
              name={[...p, "notes"]}
              className="inputS1"
            >
              <TextArea rows={3} placeholder="Any special requests" />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </div>
  );
};
