import {
  SuccessfulyBookedSearchParamsFallback,
  SuccessfulyBookedSeatSharingComponent,
} from "@/components/seat-sharing/successfuly-booked/SuccessfulyBookedSeatSharingComponent";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Successfully Booked - Seat Sharing",
};

export default function SeatSharingSuccessfullyBookedByFlightPage() {
  return (
    <Suspense fallback={<SuccessfulyBookedSearchParamsFallback />}>
      <SuccessfulyBookedSeatSharingComponent />
    </Suspense>
  );
}
