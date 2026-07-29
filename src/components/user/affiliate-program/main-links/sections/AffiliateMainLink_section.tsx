"use client";

import React, { useState, useEffect } from "react";
import { Button, Col, Input, message, Row } from "antd";
import { FiLink2, FiCopy, FiShare2 } from "react-icons/fi";
import toast from "react-hot-toast";

interface AffiliateMainLinkProps {
  data: {
    trackingCode?: string;
    stats?: {
      totalOrders?: number;
      conversionRate?: number;
    };
  };
}

export function AffiliateMainLink_section({ data }: AffiliateMainLinkProps) {
  const [copied, setCopied] = useState(false);
  const [affiliateUrl, setAffiliateUrl] = useState("");

  useEffect(() => {
    if (data?.trackingCode) {
      // Get current domain
      const domain = window.location.origin;
      setAffiliateUrl(`${domain}?ref=${data.trackingCode}`);
    }
  }, [data]);

  const handleCopyLink = () => {
    if (!affiliateUrl) return;
    navigator.clipboard.writeText(affiliateUrl);
    setCopied(true);
    toast.success("تم نسخ الرابط");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    if (!affiliateUrl) return;
    if (navigator.share) {
      navigator.share({
        title: "رابط التسويق بالعمولة",
        text: "انضم الآن واربح عمولات على كل عملية بيع",
        url: affiliateUrl,
      });
    } else {
      message.info("شارك هذا الرابط: " + affiliateUrl);
    }
  };

  return (
    <div className="main-link mb-10">
      <div className="flex items-center gap-3 text-white mb-4">
        <div className="w-10 h-10 bg-[#60767f] flex items-center justify-center text-xl rounded-xl">
          <FiLink2 />
        </div>
        <h2 className="text-2xl font-bold text-white">رابط الرئيسي</h2>
      </div>

      <p className="text-gray-300 text-sm mb-6">
        استخدم هذا الرابط لتوجيه العملاء الجدد من منصات التسويق الخاصة بك
      </p>

      {/* URL Input Section */}
      <div className="bg-white rounded-lg p-4 mb-6 flex gap-2 items-center flex-col md:flex-row">
        <Input
          value={affiliateUrl}
          readOnly
          className="flex-1 !border-0 !bg-transparent !text-gray-900 !font-medium"
          disabled
        />
        <Button
          type="primary"
          icon={<FiCopy size={16} />}
          onClick={handleCopyLink}
          className={`!px-4 w-full md:w-fit ${copied ? "!bg-green-600" : ""}`}
        >
          {copied ? "تم" : "نسخ"}
        </Button>
        <Button
          icon={<FiShare2 size={16} />}
          onClick={handleShareLink}
          className="w-full md:w-fit !border-gray-400 !text-gray-700"
        >
          شارك
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        <Col span={24} md={12}>
          <div className="bg-white/10 text-white rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm mb-2">عدد الاوردرات</p>
            <p className="text-3xl font-bold">{data?.stats?.totalOrders}</p>
          </div>
        </Col>
        <Col span={24} md={12}>
          <div className="bg-white/10 text-white rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm mb-2">معدل التحويل</p>
            <p className="text-3xl font-bold">{data?.stats?.conversionRate}%</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
