"use client";
import { usePathname } from "next/navigation";
import React from "react";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const loginPaths = ["/user/login", "/user/register", "/user/change-password"];

  const isAuthLayout = loginPaths.some((path) => pathname.startsWith(path));

  return <div className={!isAuthLayout ? "py-24" : ""}>{children}</div>;
};

export default layout;
