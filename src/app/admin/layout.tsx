"use client";

import { AdminTablePageSuspenseFallback } from "@/components/admin/layout/AdminTablePageSuspenseFallback";
import { AdminSidebar } from "@/components/admin/layout/sidebar";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname.includes("/admin/login")) {
    return children;
  }

  return (
    <main className="flex h-full">
      <AdminSidebar />
      <div className="relative h-full w-full overflow-scroll bg-[#F8FAFC] p-8 lg:w-[calc(100%-288px)]">
        <Suspense fallback={<AdminTablePageSuspenseFallback />}>
          {children}
        </Suspense>
      </div>
    </main>
  );
}
