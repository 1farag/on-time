"use client";

import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { FiPlus, FiCopy } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";

interface CustomLinkFormData {
  customText?: string;
}

export function CreateCustomLink_section({
  trackingCode,
}: {
  trackingCode: string;
}) {
  const [formData, setFormData] = useState<CustomLinkFormData>({
    customText: "",
  });

  const [generatedLink, setGeneratedLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateLink = () => {
    if (!formData.customText) {
      message.error("يرجى إدخال رابط المنتج");
      return;
    }

    setLoading(true);

    try {
      const url = new URL(formData.customText);

      url.searchParams.set("ref", trackingCode);

      const finalLink = url.toString();

      setGeneratedLink(finalLink);

      // reset input
      setFormData({ customText: "" });

      toast.success("تم إنشاء الرابط بنجاح");
    } catch (error) {
      message.error("الرابط غير صالح");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("تم نسخ الرابط");
  };

  return (
    <div className="cardS1 my-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaPlus className="text-xl text-primary" />
          <h2 className="text-2xl font-bold text-gray-900">إنشاء رابط مخصص</h2>
        </div>
      </div>

      <p className="text-[#B0B0B3] text-sm mb-6">
        أنشئ رابط تسويق مخصص لأي منتج في المتجر واحصل على عمولات على كل عملية
        بيع
      </p>

      {/* Input */}
      <div className="flex items-center gap-4 flex-col sm:flex-row">
        <div className="inputS1 flex-1 !pb-0 !mb-0 w-full sm:w-fit">
          <Input
            value={formData.customText}
            placeholder="أدخل رابط المنتج..."
            className="bg-[#F1F1F1] !mb-0"
            onChange={(e) =>
              setFormData({ ...formData, customText: e.target.value })
            }
          />
        </div>

        <Button
          type="primary"
          size="large"
          icon={<FiPlus size={18} />}
          onClick={handleCreateLink}
          loading={loading}
          className="border sm:w-fit w-full"
        >
          إنشاء الرابط
        </Button>
      </div>

      {/* Generated Link */}
      {generatedLink && (
        <div className="mt-6 flex gap-3 flex-col sm:flex-row">
          <Input value={generatedLink} readOnly />

          <Button icon={<FiCopy />} onClick={handleCopy}>
            نسخ
          </Button>
        </div>
      )}
    </div>
  );
}
