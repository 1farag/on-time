"use client";

import React, { useState } from "react";
import { Form, Button, Select, Space, Input } from "antd";
import { FiInfo } from "react-icons/fi";
import { GoSquareFill } from "react-icons/go";
import { useAskWithdrawal } from "../hooks/useAskWithdrawal";
import { useRouter } from "next/navigation";

export const AffiliateWithdrawingRequest_section = () => {
  const [form] = Form.useForm();
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [currentBalance] = useState(5000);
  const { askWithdrawalMutation, askWithdrawalLoading } = useAskWithdrawal();
  const router = useRouter();

  // const quickAmounts = [
  //   { label: "500 رس", value: 500 },
  //   { label: "1,000 رس", value: 1000 },
  //   { label: "كامل الرصيد", value: currentBalance },
  // ];

  // const handleQuickAmount = (amount: number) => {
  //   setSelectedAmount(amount.toString());
  //   form.setFieldValue("amount", amount);
  // };

  const handleAskWithdrawal = () => {
    form.validateFields().then((values) => {
      askWithdrawalMutation({ ...values, amount: Number(values.amount) }).then(
        () => {
          form.resetFields();
          router.back();
        }
      );
    });
  };

  return (
    <div className="cardS1 my-10">
      <h2 className="text-right text-2xl font-bold mb-8 text-gray-900">
        تفاصيل طلب السحب{" "}
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleAskWithdrawal}
        className="space-y-6"
      >
        {/* <div className="selectS1">
          <Form.Item
            name="method"
            rules={[{ required: true, message: "يرجى اختيار طريقة السحب" }]}
          >
            <Select
              placeholder="طريقة سحب الرباح"
              options={withdrawalMethods}
              className="rounded-lg"
              size="large"
            />
          </Form.Item>
        </div> */}

        {/* Bank Selection */}
        {/* <div className="selectS1">
          <Form.Item
            name="bank"
            rules={[{ required: true, message: "يرجى اختيار البنك" }]}
          >
            <Select
              placeholder="البنك المطلوب سحبه"
              options={banks}
              className="rounded-lg"
              size="large"
            />
          </Form.Item>
        </div> */}
        {/* Quick Amount Selection */}
        {/* <div className="text-right mb-4">
          <p className="text-gray-700 font-semibold mb-3">اختر مبلغاً سريعاً</p>
          <div className="flex gap-3 sm:flex-col justify-end">
            {quickAmounts.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => handleQuickAmount(item.value)}
                className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all duration-300 font-medium ${
                  selectedAmount === item.value.toString()
                    ? "border-primary bg-primary/30 text-primary"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div> */}

        {/* Amount Input */}
        <div className="inputS1">
          <Form.Item
            name="amount"
            label="المبلغ المراد سحبه"
            rules={[
              { required: true, message: "يرجى إدخال المبلغ" },
              {
                pattern: /^\d+$/,
                message: "يرجى إدخال مبلغ صحيح",
              },
            ]}
          >
            <Input
              type="number"
              placeholder="المبلغ"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              min="500"
              max={currentBalance}
            />
          </Form.Item>
        </div>

        {/* Info Box */}
        <div className="notes">
          <div className="flex gap-3">
            <FiInfo className="text-green-600 flex-shrink-0 mt-1" size={20} />
            <ul className="text-right space-y-2 text-sm text-gray-700">
              <li className="flex gap-1 items-center text-[#B0B0B3]">
                <GoSquareFill className="text-xs" />
                <span>سيتم معالجة طلب السحب خلال 3-5 أيام عمل</span>
              </li>
              <li className="flex gap-1 items-center text-[#B0B0B3]">
                <GoSquareFill className="text-xs" />

                <span>الحد الأدنى للسحب هو 500 ريال سعودي</span>
              </li>
              <li className="flex gap-1 items-center text-[#B0B0B3]">
                <GoSquareFill className="text-xs" />
                <span> يمكنك طلب سحب واحد كل 7 أيام</span>
              </li>
              <li className="flex gap-1 items-center text-[#B0B0B3]">
                <GoSquareFill className="text-xs" />
                <span>
                  سيتم إرسال إشعار عبر البريد الإلكتروني عند تأكيد التحويل
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={askWithdrawalLoading}
          disabled={askWithdrawalLoading}
        >
          تأكيد طلب السحب
        </Button>
      </Form>
    </div>
  );
};
