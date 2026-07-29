import { FailedBookedSeatSharingComponent } from "@/components/seat-sharing/failed-booked/FailedBookedSeatSharingComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Unsuccessful — Seat Sharing",
};

export default function SeatSharingFailedBookedPage() {
  return <FailedBookedSeatSharingComponent />;
}
