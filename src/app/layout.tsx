import MainLayout from "@/components/layout/MainLayout";
import { Providers } from "@/providers/providers";

import "@/styles/antd-reset.scss";
import "@/styles/globals.scss";
import "@/styles/sections.scss";
import "@/styles/modals.scss";
import "react-phone-input-2/lib/style.css";
import "swiper/css";
import "swiper/css/navigation";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

export async function generateMetadata() {
  return {
    title: {
      default: "Welcome to Rich Style",
      template: "%s | Rich Style",
    },
    description:
      "Rich Style is a leading provider of innovative solutions, offering a wide range of services to meet your needs. Our team of experts is dedicated to delivering exceptional results and ensuring customer satisfaction.",
    icons: {
      icon: "/images/fav-icon.svg",
    },
    alternates: {},
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={roboto.className}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
