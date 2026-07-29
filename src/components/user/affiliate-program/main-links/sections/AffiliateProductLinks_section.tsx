"use client";

import React, { useState } from "react";
import { Button, Col, message, Row } from "antd";
import { FiLink2, FiCopy, FiLink } from "react-icons/fi";
import toast from "react-hot-toast";

interface AffiliateProduct {
  id: string;
  name: string;
  url: string;
  revenue: number;
  conversionRate: number;
  conversions: number;
  views: number;
}

export function AffiliateProductLinks_section() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const products: AffiliateProduct[] = [
    {
      id: "1",
      name: "طقم نادي الطالب الرسمي",
      url: "https://altaie-shop.com/product/family-set/ref/UFSR123",
      revenue: 1215,
      conversionRate: 7.3,
      conversions: 18,
      views: 245,
    },
    {
      id: "2",
      name: "تيشيرت نادي الطالب",
      url: "https://altaie-shop.com/product/tshirt/ref/UFSR123",
      revenue: 668,
      conversionRate: 6.3,
      conversions: 12,
      views: 189,
    },
    {
      id: "3",
      name: "بطاقة عضوية ذهبية",
      url: "https://altaie-shop.com/membership/gold/ref/UFSR123",
      revenue: 1800,
      conversionRate: 9.6,
      conversions: 15,
      views: 156,
    },
    {
      id: "4",
      name: "كتاب نادي الطالب",
      url: "https://altaie-shop.com/product/book/ref/UFSR123",
      revenue: 405,
      conversionRate: 6.8,
      conversions: 9,
      views: 132,
    },
  ];

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("تم نسخ الرابط");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="cardS1 my-10">
      {/* Header */}
      <h2 className="flex items-center gap-3 mb-8 text-2xl font-bold text-gray-900">
        <FiLink size={20} className="text-[#111113]" />
        روابط المنتجات
      </h2>

      {/* Product Links List */}
      <div className="space-y-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-xl p-6"
          >
            {/* Product Name */}
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-right">
              {product.name}
            </h3>

            {/* URL Section */}
            <div className="md:w-full w-[50%] bg-[#F1F1F1] rounded-lg p-3 mb-6 flex gap-2 items-center sm:flex-col">
              <input
                type="text"
                value={product.url}
                readOnly
                name=""
                className="flex-1 bg-transparent border-0 text-gray-600 text-sm outline-none"
              />
              <Button
                type="primary"
                size="small"
                icon={<FiCopy size={14} />}
                onClick={() => handleCopyLink(product.url, product.id)}
                className={`!px-2 !py-1 ${
                  copiedId === product.id ? "!bg-green-600" : ""
                }`}
              >
                {copiedId === product.id ? "تم" : "نسخ"}
              </Button>
            </div>

            {/* Stats Grid */}
            {/* <Row gutter={[24, 24]}>
              <Col span={24} md={12} lg={6}>
                <div className="bg-[#F1F1F1] rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-xs md:text-sm mb-2">
                    المشاهدات
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-[#111113]">
                    {product.views}
                  </p>
                </div>
              </Col>
              <Col span={24} md={12} lg={6}>
                <div className="bg-[#F1F1F1] rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-xs md:text-sm mb-2">
                    التحويلات
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-[#111113]">
                    {product.conversions}
                  </p>
                </div>
              </Col>
              <Col span={24} md={12} lg={6}>
                <div className="bg-[#F1F1F1] rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-xs md:text-sm mb-2">
                    معدل التحويل
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-[#4BA246]">
                    {product.conversionRate}%
                  </p>
                </div>
              </Col>

              <Col span={24} md={12} lg={6}>
                <div className="bg-[#F1F1F1] rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-xs md:text-sm mb-2">
                    الأرباح
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-[#4BA246]">
                    {product.revenue} ر.س
                  </p>
                </div>
              </Col>
            </Row> */}
          </div>
        ))}
      </div>
    </div>
  );
}
