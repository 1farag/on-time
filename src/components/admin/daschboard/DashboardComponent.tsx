"use client";

import { Button, Col, Dropdown, MenuProps, Row } from "antd";
import React from "react";
import StatCard from "./cards/StatCard";
import {
  useGetAdminDashboard,
  useGetTopProducts,
} from "./hooks/useGetAdminDashboard";
import { GoPeople } from "react-icons/go";
import { CiCreditCard1 } from "react-icons/ci";
import { PiShoppingBagBold, PiTrendUp } from "react-icons/pi";
import { LuCrown } from "react-icons/lu";
import { FiGift } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { IoChevronDownOutline } from "react-icons/io5";
import SalesDashboard_section from "./sections/SalesDashboard_section";
import DashboardActions_section from "./sections/DashboardActions_section";

export const DashboardComponent = () => {
  const { data: summary, isLoading } = useGetAdminDashboard();

  // const items: MenuProps["items"] = [
  //   {
  //     key: "1",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="https://www.antgroup.com"
  //       >
  //         1st menu item
  //       </a>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         2nd menu item
  //       </a>
  //     ),
  //   },
  //   {
  //     key: "3",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         3rd menu item
  //       </a>
  //     ),
  //   },
  // ];

  console.log(summary?.data);

  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-secondary">
            مرحباً بك 👋
          </h1>
          <p className="text-lg text-primary">
            إليك نظرة سريعة على أداء مشروعك اليوم{" "}
          </p>
        </div>
        {/* <Dropdown
          menu={{ items }}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
        >
          <Button className="!bg-[#1D283A] !border-[#1D283A] !text-white !rounded-xl">
            آخر 7 أيام
            <IoChevronDownOutline className="text-xl" />
          </Button>
        </Dropdown> */}
      </div>
      <div className="mb-12">
        <Row gutter={[25, 25]}>
          <Col xs={24} md={12} lg={8}>
            <StatCard
              title="إجمالي المستخدمين"
              value={summary?.data.totalUsers}
              icon={<GoPeople />}
            />
          </Col>

          <Col xs={24} md={12} lg={8}>
            <StatCard
              title="المنتجات النشطة"
              value={summary?.data.activeProducts}
              icon={<PiShoppingBagBold />}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <StatCard
              title="نقاط الولاء"
              value={summary?.data.totalLoyaltyPoints}
              icon={<FiGift />}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <StatCard
              title="الأعضاء المميزين"
              value={summary?.data.totalMembershipSubscribers}
              icon={<LuCrown />}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <StatCard
              title="المسوقين"
              value={summary?.data.totalMarketers}
              icon={<PiTrendUp />}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <StatCard
              title="إجمالي العمولات"
              value={summary?.data.totalCommissions}
              icon={<CiCreditCard1 />}
            />
          </Col>
        </Row>
      </div>

      <SalesDashboard_section />
      {/* <DashboardActions_section /> */}
    </main>
  );
};
