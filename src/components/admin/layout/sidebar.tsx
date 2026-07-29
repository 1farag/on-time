"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MdDashboard, MdPeopleAlt, MdShield, MdSettings } from "react-icons/md";
import {
  FiChevronDown,
  FiBox,
  FiGift,
  FiUsers,
  FiBarChart2,
  FiMenu,
  FiX,
  FiCreditCard,
  FiMail,
} from "react-icons/fi";
import { PiPencilLight } from "react-icons/pi";

import { FaMoneyBillWave, FaRegFolder } from "react-icons/fa6";
import { IoIosLink, IoIosLogOut } from "react-icons/io";
import { handleLogout } from "@/actions/auth";
import { useLogout } from "@/hooks/auth/useLogout";
import { CiCreditCard1, CiDollar, CiStar } from "react-icons/ci";
import { TbExchange } from "react-icons/tb";
import { LuStar } from "react-icons/lu";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { GoPeople } from "react-icons/go";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: MenuItem[];
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useLogout();
  const activeClasses =
    "bg-[rgba(56,91,102,0.10)] border-r-2 border-[#385B66] text-[#385B66]";

  const withLocale = (href?: string) => (href ? `/admin${href}` : "");

  const isActive = (href?: string) => {
    if (!href) return false;

    const path = withLocale(href);

    // exact match
    if (pathname === path) return true;

    // dynamic or nested routes
    return pathname.startsWith(path + "/");
  };

  const menuItems: MenuItem[] = [
    {
      label: "لوحة التحكم",
      icon: <MdDashboard className="text-xl" />,
      href: "/dashboard",
    },
    {
      label: "إدارة الطلبات",
      icon: <FiBox className="text-xl" />,
      subItems: [
        { label: "جميع الطلبات", href: "/orders", icon: <FiBox /> },
        {
          label: "محاولات الدفع الفاشلة",
          href: "/failed-checkouts",
          icon: <FiCreditCard />,
        },
      ],
    },
    {
      label: "إدارة المستخدمين",
      icon: <MdPeopleAlt className="text-xl" />,
      href: "/users",
    },
    {
      label: "إدارة الكوبونات",
      icon: <FiGift className="text-xl" />,
      href: "/coupons",
    },

    {
      label: "إدارة المنتجات",
      icon: <FiBox className="text-xl" />,
      subItems: [
        { label: "جميع المنتجات", href: "/products", icon: <FiBox /> },
        { label: "التصنيفات", href: "/categories", icon: <FaRegFolder /> },
      ],
    },
    // {
    //   label: "",
    //   icon: <FiBox className="text-xl" />,
    //   subItems: [
    //     { label: "إضافة منتج", href: "/products/add", icon: null },
    //   ],
    // },
    {
      label: "برنامج الولاء",
      icon: <FiGift className="text-xl" />,
      subItems: [
        { label: "نظرة عامه ", href: "/loyalty/overview", icon: <FiGift /> },
        {
          label: "قواعد النقاط",
          href: "/loyalty/points",
          icon: <LuStar />,
        },
        {
          label: "المكافئات",
          href: "/loyalty/rewards",
          icon: <CiDollar />,
        },
        // {
        //   label: "طلبات الاستبدال",
        //   href: "/loyalty/exchange",
        //   icon: <FiCreditCard />,
        // },
        {
          label: "سجل النقاط",
          href: "/loyalty/points-history",
          icon: <TbExchange />,
        },
      ],
    },
    {
      label: "إدارة العضويات",
      icon: <FiGift className="text-xl" />,
      subItems: [
        {
          label: "خطط العضويات",
          href: "/memberships/plans",
          icon: <BsFillCreditCard2FrontFill />,
        },
        {
          label: "المشتركين",
          href: "/memberships/subscribers",
          icon: <GoPeople />,
        },
      ],
    },
    {
      label: "برنامج التسويق",
      icon: <FiUsers className="text-xl" />,
      subItems: [
        { label: "المسوّقين", href: "/affiliate/partners", icon: <GoPeople /> },
        // {
        //   label: "روابط الاحالة",
        //   href: "/affiliate/referal-link",
        //   icon: <IoIosLink />,
        // },
        {
          label: "طلبات السحب ",
          href: "/affiliate/withdrawal-requests",
          icon: <FaMoneyBillWave />,
        },
        {
          label: "قواعد العمولات ",
          href: "/affiliate/commission-rules",
          icon: <PiPencilLight />,
        },
      ],
    },
    {
      label: "استفسارات التواصل",
      icon: <FiMail className="text-xl" />,
      href: "/contact-inquiries",
    },
    {
      label: "إدارة البانرات",
      icon: <FiBox className="text-xl" />, // Or another suitable icon
      href: "/sliders",
    },
    {
      label: "النشرة البريدية",
      icon: <FiMail className="text-xl" />,
      href: "/newsletter",
    },
    // {
    //   label: "الإعدادات",
    //   icon: <MdSettings className="text-xl" />,
    //   href: "/settings",
    // },
  ];

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    if (window.innerWidth < 1024) {
      closeMobileMenu();
    }
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const renderMenuItem = (item: MenuItem, index: number) => {
    const hasSubItems = !!item.subItems?.length;

    const subActive = item.subItems?.some((sub) => isActive(sub.href)) ?? false;

    const isExpanded = expandedItems.includes(item.label) || subActive;

    if (hasSubItems) {
      return (
        <div key={index}>
          <button
            onClick={() => toggleExpand(item.label)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors text-right
              ${subActive ? activeClasses : "text-gray-700 hover:text-gray-700 hover:bg-gray-100"}
            `}
          >
            <FiChevronDown
              className={`text-lg transition-transform ${isExpanded ? "rotate-180" : ""
                }`}
            />
            {item.icon}
            <span className="flex-1">{item.label}</span>
          </button>

          {isExpanded && (
            <div className="mt-2 mr-4 border-r-2 border-gray-300">
              {item.subItems!.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={withLocale(subItem.href)}
                  className={`flex items-center gap-3 px-4 py-2 mb-1 rounded-lg text-sm transition-colors text-right
                    ${isActive(subItem.href)
                      ? activeClasses
                      : "text-gray-600 hover:text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {subItem.icon}

                  <span className="flex-1">{subItem.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={index}
        href={withLocale(item.href)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors text-right
          ${isActive(item.href)
            ? activeClasses
            : "text-gray-700 hover:!text-gray-700 hover:bg-gray-100"
          }
        `}
      >
        {item.icon}
        <span className="flex-1">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <FiX className="text-2xl text-gray-700" />
        ) : (
          <FiMenu className="text-2xl text-gray-700" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className="
    fixed top-0 right-0 z-40 h-full w-[288px] bg-white rounded-lg shadow-lg overflow-hidden
    lg:translate-x-0 lg:static lg:h-screen
    transition-transform duration-300 ease-in-out
    translate-x-full
    lg:block
    "
        style={{
          transform: isMobileMenuOpen ? "translateX(0)" : undefined,
        }}
      >
        {/* Header */}
        <div className="flex items-center p-6 gap-4 border-b border-[#E2E7E9]">
          <div className="rounded-lg p-2 bg-secondary text-white">
            <MdDashboard className="text-3xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-right mb-1">الطائي</h2>
            <p className="text-[#67787E] text-sm text-right">لوحة التحكم</p>
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-120px)]">
          {menuItems.map(renderMenuItem)}
          <button
            onClick={() => logout()}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors text-right text-gray-700 hover:text-gray-700 hover:bg-gray-100
          `}
          >
            <IoIosLogOut />
            <span className="flex-1"> تسجيل الخروج</span>
          </button>
        </nav>
      </div>
    </>
  );
}
