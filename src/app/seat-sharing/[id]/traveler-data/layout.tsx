import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Traveler Data - Seat Sharing",
};

export default function TravelerDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
