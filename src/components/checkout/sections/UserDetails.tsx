import { Col, Form, Input, Radio, Row, Select } from "antd";
import Image from "next/image";
import { useState } from "react";
import ReactCodeInput from "react-code-input";
import { useGetZones } from "../hooks/useGetZones";
import { useGetSubzones } from "../hooks/useGetSubzones";
import { useGetShippingOptions } from "../hooks/useGetShippingOptions";
import style from "../style/checkout.module.scss";

export const UserDetails = () => {
  const [code, setCode] = useState("");
  const form = Form.useFormInstance();
  const accurateZoneId = Form.useWatch("accurateZoneId", form);
  const shippingType = Form.useWatch("shippingType", form);

  const { zones, isLoadingZones } = useGetZones();
  const { subzones, isLoadingSubzones } = useGetSubzones(accurateZoneId);
  const { shippingOptions, isLoadingShippingOptions } = useGetShippingOptions();

  const handleChange = (value: string) => {
    setCode(value);
  };

  const isDelivery = shippingType === "delivery";

  return (
    <section className={style.checkout}>
      <div className="card">
        <div className="flex items-center gap-3 mb-8">
          <span className="rounded-full text-white font-bold flex items-center justify-center w-[40px] h-[40px] bg-primary">
            1
          </span>
          <h4 className="font-bold text-xl text-primary">بيانات العميل</h4>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "ادخل الاسم الاول من فضلك!",
                  },
                ]}
              >
                <Input placeholder="الاسم الاول " />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "ادخل الاسم الاخير من فضلك!",
                  },
                ]}
              >
                <Input placeholder="الاسم الاخير " />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24}>
            <div className="inputS1 ">
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "ادخل رقم الجوال من فضلك" },
                  {
                    pattern: /^5\d{8}$/,
                    message:
                      "رقم الجوال السعودي يجب أن يبدأ بـ 5 ويتكون من 9 أرقام",
                  },
                ]}
              >
                <Input
                  placeholder="رقم الجوال"
                  dir="rtl"
                  type="number"
                  addonAfter={
                    <div className="flex items-center justify-center gap-1 px-2">
                      <span className="font-medium" dir="ltr">
                        +966
                      </span>
                      <Image
                        width={40}
                        height={30}
                        src="/flags/sa.svg"
                        alt="Saudi Arabia"
                        className="w-5 h-5"
                      />
                    </div>
                  }
                />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} md={24}>
            <div className="inputS1">
              <Form.Item
                label=""
                name="email"
                rules={[
                  {
                    required: true,
                    message: "ادخل البريد الالكتروني من فضلك!",
                  },
                  {
                    type: "email",
                    message: "ادخل بريد الكتروني صحيح من فضلك!",
                  },
                ]}
              >
                <Input placeholder="البريد الإلكتروني " disabled />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-8">
          <span className="rounded-full text-white font-bold flex items-center justify-center w-[40px] h-[40px] bg-primary">
            2
          </span>
          <h4 className="font-bold text-xl text-primary">طريقة الشحن</h4>
        </div>
        <div className="inputS1">
          <Form.Item
            name="shippingType"
            initialValue="delivery"
            rules={[{ required: true, message: "اختر طريقة الشحن من فضلك!" }]}
          >
            <div className={"flex items-center gap-3 "}>
              {shippingOptions?.map((option) => (
                <button
                  key={option.type}
                  type="button"
                  className={` px-6 py-2 rounded-xl border-primary border-2 transition-all ${shippingType === option.type && `bg-primary text-white`}`}
                  onClick={() =>
                    form.setFieldValue("shippingType", option.type)
                  }
                >
                  <span className="text-lg font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </Form.Item>
        </div>
      </div>

      {isDelivery && (
        <div className="card">
          <div className="flex items-center gap-3 mb-8">
            <span className="rounded-full text-white font-bold flex items-center justify-center w-[40px] h-[40px] bg-primary">
              3
            </span>
            <h4 className="font-bold text-xl text-primary">العنوان الوطني</h4>
          </div>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <div className="inputS1" dir="ltr">
                <Form.Item
                  label=""
                  name="nationalAddress"
                  rules={[
                    {
                      required: isDelivery,
                      message: "ادخل العنوان بالكامل من فضلك!",
                    },
                  ]}
                >
                  <ReactCodeInput
                    type="text"
                    fields={8}
                    onChange={handleChange}
                    name={"nationalAddress"}
                    inputMode="tel"
                    autoFocus={false}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label=""
                  name="accurateZoneId"
                  rules={[
                    { required: isDelivery, message: "اختر المنطقة من فضلك!" },
                  ]}
                >
                  <Select
                    placeholder="اختر المنطقة"
                    size="large"
                    loading={isLoadingZones}
                    options={zones?.map((z) => ({
                      value: z.id,
                      label: z.nameAr,
                    }))}
                    onChange={() => {
                      form.setFieldValue("accurateSubzoneId", undefined);
                    }}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="inputS1">
                <Form.Item
                  label=""
                  name="accurateSubzoneId"
                  rules={[
                    { required: isDelivery, message: "اختر المدينة من فضلك!" },
                  ]}
                >
                  <Select
                    placeholder="اختر المدينة"
                    size="large"
                    loading={isLoadingSubzones}
                    disabled={!accurateZoneId}
                    options={subzones?.map((sz) => ({
                      value: sz.id,
                      label: sz.nameAr,
                    }))}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </section>
  );
};
