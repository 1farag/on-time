"use client";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { MembershipPlan } from "@/types/types";
import { TbX } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";

type FeatureValue = boolean | string | number;

interface CompareFeatureRow {
  key: string;
  feature: string;
  [tierId: string]: FeatureValue;
}

const renderCell = (value: FeatureValue) => {
  if (value === true) {
    return (
      <span className="text-secondary">
        <FaCheck />
      </span>
    );
  }

  if (value === false || value === undefined) {
    return (
      <span className="text-primary">
        <TbX />
      </span>
    );
  }

  return <span className="text-primary font-medium">{String(value)}</span>;
};

export const CompareFeatures_section = ({
  membershipPlans = [],
  featureTranslations = {},
}: {
  membershipPlans?: MembershipPlan[];
  featureTranslations?: Record<string, string>;
}) => {
  // 1. Construct Columns dynamically based on available tiers
  const columns: ColumnsType<CompareFeatureRow> = [
    {
      title: "الميزة",
      dataIndex: "feature",
      key: "feature",
      align: "right",
      className: "font-semibold min-w-[150px]",
    },
    ...membershipPlans.map((tier) => ({
      title: tier.displayNameAr || tier.displayName || tier.name,
      dataIndex: tier._id.toString(),
      key: tier._id.toString(),
      align: "center" as const,
      render: (value: FeatureValue) => renderCell(value),
    })),
  ];

  // 2. Extract static properties like discountRate, pointsMultiplier
  const staticFeatures = ["discountRate", "pointsMultiplier"];

  // 3. Extract unique benefit keys from all tiers
  const uniqueBenefitKeys = Array.from(
    new Set(
      membershipPlans.flatMap((tier) => [
        ...(tier.benefits || []).map((b) => b.key),
        // ...(tier.extraBenefits || []).map((eb) => eb.key),
      ])
    )
  );

  // 4. Construct Data Rows
  const dataSource: CompareFeatureRow[] = [];

  // Add dynamic benefits
  uniqueBenefitKeys.forEach((benefitKey) => {
    const row: CompareFeatureRow = {
      key: benefitKey,
      feature: featureTranslations[benefitKey] || benefitKey,
    };

    membershipPlans.forEach((tier) => {
      const benefit = tier.benefits?.find((b) => b.key === benefitKey);
      const extraBenefit = tier.extraBenefits?.find(
        (eb) => eb.key === benefitKey
      );

      const value = benefit?.value ?? false;
      row[tier._id.toString()] = value;
    });

    dataSource.push(row);
  });

  return (
    <section className="compare-features mb-24 overflow-x-auto">
      <div className="container min-w-[600px]">
        <h3 className="text-center text-secondary text-2xl font-bold mb-8">
          مقارنة المزايا
        </h3>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered={false}
          className="points-table"
        />
      </div>
    </section>
  );
};
