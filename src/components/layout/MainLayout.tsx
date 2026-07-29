"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { Suspense, useEffect } from "react";
import { captureAffiliateRefFromUrlParam } from "@/lib/affiliateRef";
import { useBootstrapUser } from "@/hooks/auth/useBootstrapUser";
// import { useGetUserData } from "@/hooks/useGetUserData";

function AffiliateRefFromSearchParams() {
  const searchParams = useSearchParams();
  const qs = searchParams.toString();

  useEffect(() => {
    const ref = qs ? new URLSearchParams(qs).get("ref") : null;
    captureAffiliateRefFromUrlParam(ref);
  }, [qs]);
  return null;
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const locales = ["en", "ar"];
  const pathnameWithoutLocale = pathname.replace(
    new RegExp(`^/(${locales.join("|")})`),
    ""
  );
  const loginPaths = [
    "/admin",
    // "/user/login",
    // "/user/register",
    // "/user/change-password",
  ];

  const isHomePage =
    pathname === "/" || pathname === "/en" || pathname === "/ar";

  const { isAuthenticated } = useAuth();

  useTokenRefresh(isAuthenticated);
  useBootstrapUser();

  const isAuthLayout = loginPaths.some((path) =>
    pathnameWithoutLocale.startsWith(path)
  );

  return (
    <>
      <Suspense fallback={null}>
        <AffiliateRefFromSearchParams />
      </Suspense>
      {isAuthLayout ? (
        children
      ) : (
        <>
          <Header />
          <div className={`${pathname.includes(`/admin`) ? "" : ""}`}>
            {children}
          </div>

          <Footer />
        </>
      )}
    </>
  );
}
