// components/header/UserAuthButton.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbCalendarCheck } from "react-icons/tb";
import { GoPeople, GoPerson } from "react-icons/go";
import { LuWallet } from "react-icons/lu";
import { MdOutlineDiscount } from "react-icons/md";
import { useLogout } from "@/hooks/auth/useLogout";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useAuth } from "@/hooks/auth/useAuth";
import { useGetUserProfile } from "@/hooks/auth/useGetProfile";

import { Button, Dropdown, MenuProps } from "antd";

export default function UserAuthButton() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { logout, isLoggingOut } = useLogout();
  const getLink = useLocalizedLink();
  const { isAuthenticated, isLoading } = useAuth();
  const { user } = useGetUserProfile();

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User";
  const userInitial = fullName.charAt(0).toUpperCase();
  const normalizePath = (path: string) => {
    const withoutLocale = path.replace(/^\/(en|ar)(?=\/|$)/, "");
    const normalized = withoutLocale || "/";
    return normalized === "/" ? normalized : normalized.replace(/\/+$/, "");
  };

  const accountMenuLinks: Array<{
    key: string;
    label: string;
    href: string;
    icon: JSX.Element;
  }> = [
    {
      key: "my-booking",
      label: "My Bookings",
      href: getLink("/user/my-booking"),
      icon: <TbCalendarCheck size={18} />,
    },
    {
      key: "account-settings",
      label: "Account Settings",
      href: getLink("/user/account-settings"),
      icon: <GoPerson size={18} />,
    },
    {
      key: "wallet",
      label: "Wallet",
      href: getLink("/user/wallet"),
      icon: <LuWallet size={18} />,
    },
    {
      key: "virtual-wallet",
      label: "Virtual Wallet",
      href: getLink("/user/virtual-wallet"),
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 6.31006H12C11.59 6.31006 11.25 5.97006 11.25 5.56006C11.25 5.15006 11.59 4.81006 12 4.81006H22C22.41 4.81006 22.75 5.15006 22.75 5.56006C22.75 5.98006 22.41 6.31006 22 6.31006Z"
            fill="currentColor"
          />
          <path
            d="M19.7798 11.25H14.2298C12.0398 11.25 11.2598 10.48 11.2598 8.3V4.2C11.2598 2.02 12.0398 1.25 14.2298 1.25H19.7798C21.9698 1.25 22.7498 2.02 22.7498 4.2V8.31C22.7498 10.48 21.9698 11.25 19.7798 11.25ZM14.2198 2.75C12.8598 2.75 12.7498 2.86 12.7498 4.2V8.31C12.7498 9.65 12.8598 9.76 14.2198 9.76H19.7697C21.1297 9.76 21.2397 9.65 21.2397 8.31V4.2C21.2397 2.86 21.1297 2.75 19.7697 2.75H14.2198Z"
            fill="currentColor"
          />
          <path
            d="M12 17.8101H2C1.59 17.8101 1.25 17.4701 1.25 17.0601C1.25 16.6501 1.59 16.3101 2 16.3101H12C12.41 16.3101 12.75 16.6501 12.75 17.0601C12.75 17.4801 12.41 17.8101 12 17.8101Z"
            fill="currentColor"
          />
          <path
            d="M9.77975 22.75H4.22977C2.03977 22.75 1.25977 21.98 1.25977 19.8V15.7C1.25977 13.52 2.03977 12.75 4.22977 12.75H9.77975C11.9698 12.75 12.7498 13.52 12.7498 15.7V19.81C12.7498 21.98 11.9698 22.75 9.77975 22.75ZM4.21976 14.25C2.85976 14.25 2.74976 14.36 2.74976 15.7V19.81C2.74976 21.15 2.85976 21.26 4.21976 21.26H9.76974C11.1297 21.26 11.2397 21.15 11.2397 19.81V15.7C11.2397 14.36 11.1297 14.25 9.76974 14.25H4.21976Z"
            fill="currentColor"
          />
          <path
            d="M15.0002 22.75C14.7302 22.75 14.4802 22.6 14.3502 22.37C14.2202 22.13 14.2202 21.85 14.3602 21.61L15.4102 19.86C15.6202 19.51 16.0802 19.39 16.4402 19.6C16.8002 19.81 16.9102 20.27 16.7002 20.63L16.4302 21.08C19.1902 20.43 21.2602 17.95 21.2602 14.99C21.2602 14.58 21.6002 14.24 22.0102 14.24C22.4202 14.24 22.7602 14.58 22.7602 14.99C22.7502 19.27 19.2702 22.75 15.0002 22.75Z"
            fill="currentColor"
          />
          <path
            d="M2 9.75C1.59 9.75 1.25 9.41 1.25 9C1.25 4.73 4.73 1.25 9 1.25C9.27 1.25 9.51999 1.4 9.64999 1.63C9.77999 1.87 9.78001 2.15 9.64001 2.39L8.59 4.14C8.38 4.49 7.92 4.61 7.56 4.4C7.2 4.19 7.08999 3.73 7.29999 3.37L7.57001 2.92C4.81001 3.57 2.73999 6.05 2.73999 9.01C2.74999 9.41 2.41 9.75 2 9.75Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      key: "participate-and-win",
      label: "Referral Program",
      href: getLink("/user/participate-and-win"),
      icon: <GoPeople size={18} />,
    },
    {
      key: "loyalty-program",
      label: "Loyalty Program",
      href: getLink("/user/loyalty-program"),
      icon: <MdOutlineDiscount size={18} />,
    },
    {
      key: "my-membership",
      label: "Membership",
      href: getLink("/user/my-membership"),
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 16.75C11.6 16.75 11.2 16.72 10.82 16.65C8.7 16.34 6.77 15.12 5.55 13.31C4.7 12.03 4.25 10.54 4.25 9C4.25 4.73 7.73 1.25 12 1.25C16.27 1.25 19.75 4.73 19.75 9C19.75 10.54 19.3 12.03 18.45 13.31C17.22 15.13 15.29 16.34 13.15 16.66C12.8 16.72 12.4 16.75 12 16.75ZM12 2.75C8.55 2.75 5.75 5.55 5.75 9C5.75 10.25 6.11 11.45 6.79 12.47C7.78 13.93 9.33 14.91 11.05 15.16C11.69 15.27 12.32 15.27 12.91 15.16C14.66 14.91 16.21 13.92 17.2 12.46C17.88 11.44 18.24 10.24 18.24 8.98999C18.25 5.54999 15.45 2.75 12 2.75Z"
            fill="currentColor"
          />
          <path
            d="M6.46982 22.59C6.32982 22.59 6.19982 22.57 6.05982 22.54C5.40982 22.39 4.90982 21.89 4.75982 21.24L4.40982 19.77C4.38982 19.68 4.31982 19.61 4.21982 19.58L2.56982 19.19C1.94982 19.04 1.45982 18.58 1.28982 17.97C1.11982 17.36 1.28982 16.7 1.73982 16.25L5.63982 12.35C5.79982 12.19 6.01982 12.11 6.23982 12.13C6.45982 12.15 6.65982 12.27 6.78982 12.46C7.77982 13.92 9.32982 14.91 11.0598 15.16C11.6998 15.27 12.3298 15.27 12.9198 15.16C14.6698 14.91 16.2198 13.92 17.2098 12.46C17.3298 12.27 17.5398 12.15 17.7598 12.13C17.9798 12.11 18.1998 12.19 18.3598 12.35L22.2598 16.25C22.7098 16.7 22.8798 17.36 22.7098 17.97C22.5398 18.58 22.0398 19.05 21.4298 19.19L19.7798 19.58C19.6898 19.6 19.6198 19.67 19.5898 19.77L19.2398 21.24C19.0898 21.89 18.5898 22.39 17.9398 22.54C17.2898 22.7 16.6198 22.47 16.1998 21.96L11.9998 17.13L7.79982 21.97C7.45982 22.37 6.97982 22.59 6.46982 22.59ZM6.08982 14.03L2.79982 17.32C2.70982 17.41 2.71982 17.51 2.73982 17.57C2.74982 17.62 2.79982 17.72 2.91982 17.74L4.56982 18.13C5.21982 18.28 5.71982 18.78 5.86982 19.43L6.21982 20.9C6.24982 21.03 6.34982 21.07 6.40982 21.09C6.46982 21.1 6.56982 21.11 6.65982 21.01L10.4898 16.6C8.78982 16.27 7.22982 15.36 6.08982 14.03ZM13.5098 16.59L17.3398 20.99C17.4298 21.1 17.5398 21.1 17.5998 21.08C17.6598 21.07 17.7498 21.02 17.7898 20.89L18.1398 19.42C18.2898 18.77 18.7898 18.27 19.4398 18.12L21.0898 17.73C21.2098 17.7 21.2598 17.61 21.2698 17.56C21.2898 17.51 21.2998 17.4 21.2098 17.31L17.9198 14.02C16.7698 15.35 15.2198 16.26 13.5098 16.59Z"
            fill="currentColor"
          />
          <path
            d="M13.8901 12.89C13.6301 12.89 13.3201 12.82 12.9501 12.6L12.0001 12.03L11.0501 12.59C10.1801 13.11 9.61014 12.81 9.40014 12.66C9.19014 12.51 8.74014 12.06 8.97014 11.07L9.21014 10.04L8.41014 9.29999C7.97014 8.85999 7.81014 8.33001 7.96014 7.85001C8.11014 7.37001 8.55014 7.02999 9.17014 6.92999L10.2401 6.75L10.7501 5.63C11.0401 5.06 11.4901 4.73999 12.0001 4.73999C12.5101 4.73999 12.9701 5.07001 13.2501 5.64001L13.8401 6.82001L14.8301 6.94C15.4401 7.04 15.8801 7.37999 16.0401 7.85999C16.1901 8.33999 16.0301 8.87 15.5901 9.31L14.7601 10.14L15.0201 11.07C15.2501 12.06 14.8001 12.51 14.5901 12.66C14.4801 12.75 14.2401 12.89 13.8901 12.89ZM9.61014 8.39001L10.3001 9.07999C10.6201 9.39999 10.7801 9.94 10.6801 10.38L10.4901 11.18L11.2901 10.71C11.7201 10.46 12.3001 10.46 12.7201 10.71L13.5201 11.18L13.3401 10.38C13.2401 9.93001 13.3901 9.39999 13.7101 9.07999L14.4001 8.39001L13.5301 8.23999C13.1101 8.16999 12.6901 7.86001 12.5001 7.48001L12.0001 6.5L11.5001 7.5C11.3201 7.87 10.9001 8.19001 10.4801 8.26001L9.61014 8.39001Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  const menuItems: MenuProps["items"] = [
    ...accountMenuLinks.map((item) => {
      const normalizedPathname = normalizePath(pathname);
      const normalizedItemHref = normalizePath(item.href);
      const isActive =
        normalizedPathname === normalizedItemHref ||
        normalizedPathname.startsWith(`${normalizedItemHref}/`);

      return {
        key: item.key,
        label: (
          <Link
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-2 py-1 !text-white transition-all duration-300 hover:!text-white"
          >
            <span className="text-xl !text-white">{item.icon}</span>
            <span className="text-sm font-medium !text-white">
              {item.label}
            </span>
          </Link>
        ),
        className: `!mx-1 !my-0.5 !rounded-xl !text-white hover:!bg-white/10 ${
          isActive ? "!bg-white/10" : ""
        }`,
      };
    }),
    {
      key: "logout",
      label: (
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-2 py-1 !text-white transition-all duration-300 hover:!text-white"
        >
          <span className="text-xl !text-white">
            {isLoggingOut ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <BiLogOut size={18} />
            )}
          </span>
          <span className="text-sm font-medium !text-white">Logout</span>
        </button>
      ),
      onClick: () => logout(),
      className: "!mx-1 !my-0.5 !rounded-xl !text-white hover:!bg-white/10",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-10 h-10">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Dropdown
        menu={{
          items: menuItems,
          className:
            "!rounded-2xl !border !border-primary !bg-secondary !p-2 !shadow-xl",
        }}
        placement="bottomLeft"
        arrow
        trigger={["click"]}
        open={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
        overlayClassName="user-auth-dropdown"
      >
        <button className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-white transition-all duration-300 hover:bg-white/10 active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-2xl font-medium leading-none text-secondary">
            {userInitial}
          </div>
          <span className="hidden text-base font-semibold leading-none text-white xl:block">
            {fullName}
          </span>
          <MdKeyboardArrowDown
            className={`hidden text-[34px] text-white transition-transform duration-200 xl:block ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </Dropdown>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href={getLink("/user/login")}
        // ...
        className="flex items-center justify-center px-0   h-10 text-third  rounded-lg cursor-pointer transition-all duration-300 "
        title="Login"
      >
        Sign In
      </Link>

      <Link
        href={getLink("/user/register")}
        // ...
        className="flex items-center justify-center px-0   h-10 text-third  rounded-lg cursor-pointer transition-all duration-300 "
        title="register"
      >
        Sign Up
      </Link>

      <Button
        type="primary"
        onClick={() => router.push("/memberships")}
        title="Explore Packages"
        className="hidden lg:flex !px-4 "
      >
        Explore Packages
      </Button>
    </div>
  );
}
