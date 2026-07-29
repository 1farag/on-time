"use client";

import React from "react";
import { QRCode, Space, Typography } from "antd";

const { Text } = Typography;

interface TextToQRCodeProps {
  text: string;
  size?: number;
  icon?: string;
  status?: "active" | "expired" | "loading";
}

const TextToQRCode: React.FC<TextToQRCodeProps> = ({
  text,
  size = 160,
  icon,
  status = "active",
}) => {
  return (
    <QRCode
      value={text || ""} // قيمة افتراضية لو النص فاضي
      size={size}
      icon={icon}
      status={status}
      bordered={false}
      color="#000"
      bgColor="#fff"
      errorLevel="H"
    />
  );
};

export default TextToQRCode;
