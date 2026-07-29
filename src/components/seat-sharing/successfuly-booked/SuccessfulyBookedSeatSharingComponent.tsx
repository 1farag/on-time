"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FlightHeroSection } from "../sections/FlightHeroSection";
import {
  IoIosInformationCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { LuPlane } from "react-icons/lu";
import { GoArrowRight, GoClock, GoPeople } from "react-icons/go";
import { Button, Col, Row } from "antd";
import { IoPrintOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { useBookingById } from "../hooks/useBookingById";
import {
  aircraftLabel,
  amountPaidLabel,
  formatBookingDate,
  formatBookingTime,
  pnrOrReference,
  primaryFlightInstance,
  seatCountLabel,
  statusLabel,
} from "./bookingDetailMappers";
import { GradientText } from "@/components/tools/GradientText";

const TextToQRCode = dynamic(() => import("@/components/tools/TextToQRCode"), {
  ssr: false,
  loading: () => (
    <div className="h-[100px] w-[100px] animate-pulse rounded-lg bg-[#1A1D26]" />
  ),
});

interface InfoItem {
  icon: ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}

/** Used as `Suspense` fallback for pages that read `useSearchParams`. */
export function SuccessfulyBookedSearchParamsFallback() {
  return (
    <main className="mb-24 flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"
        role="status"
        aria-label="Loading"
      />
      <p className="text-third">Loading…</p>
    </main>
  );
}

function BookingLoader() {
  return (
    <main className="mb-24 flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"
        role="status"
        aria-label="Loading booking"
      />
      <p className="text-third">Loading your booking…</p>
    </main>
  );
}

export const SuccessfulyBookedSeatSharingComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId =
    searchParams.get("bookingId") ||
    searchParams.get("booking_id") ||
    searchParams.get("id") ||
    searchParams.get("Id");

  const { booking, isLoading, isError } = useBookingById(bookingId);

  if (!bookingId?.trim()) {
    return (
      <main className="container mx-auto mb-24 max-w-2xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">
          Missing booking reference
        </h1>
        <p className="text-third mb-8">
          Open this page from your payment confirmation link, or add{" "}
          <code className="text-primary">?bookingId=…</code> to the URL.
        </p>
        <Button type="primary" onClick={() => router.push("/seat-sharing")}>
          Back to seat sharing
        </Button>
      </main>
    );
  }

  if (isLoading) {
    return <BookingLoader />;
  }

  if (isError || !booking) {
    return (
      <main className="container mx-auto mb-24 max-w-2xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">
          We couldn&apos;t load this booking
        </h1>
        <p className="text-third mb-8">
          Check that you&apos;re signed in and the link is still valid. If the
          problem continues, contact support with your payment reference.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button type="primary" onClick={() => router.push("/seat-sharing")}>
            Seat sharing
          </Button>
          <Button onClick={() => router.push("/")}>Home</Button>
        </div>
      </main>
    );
  }

  const fi = primaryFlightInstance(booking);
  const originIata = fi?.route?.origin?.iata || fi?.route?.origin?.name || "—";
  const destIata =
    fi?.route?.destination?.iata || fi?.route?.destination?.name || "—";
  const aircraft = aircraftLabel(fi);
  const dateStr = formatBookingDate(fi?.departureAt);
  const timeStr = formatBookingTime(fi?.departureAt);
  const seatsStr = seatCountLabel(booking);
  const statusStr = statusLabel(booking);
  const amountStr = amountPaidLabel(booking);
  const refStr = pnrOrReference(booking);

  const qrText =
    typeof window !== "undefined"
      ? `${window.location.origin}/seat-sharing/successfully-booked?bookingId=${encodeURIComponent(booking.id)}`
      : `https://www.richstyle.com/seat-sharing/successfully-booked?bookingId=${encodeURIComponent(booking.id)}`;

  const data: InfoItem[] = [
    {
      icon: <MdOutlineCalendarToday className="text-primary text-xl" />,
      label: "Date",
      value: dateStr,
    },
    {
      icon: <GoClock className="text-primary text-xl" />,
      label: "Departure",
      value: timeStr,
    },
    {
      icon: <GoPeople className="text-primary text-xl" />,
      label: "Seats",
      value: seatsStr,
    },
    {
      icon: <FiDownload className="text-primary text-xl" />,
      label: "Status",
      value: statusStr,
      valueColor: "text-primary",
    },
  ];

  return (
    <main className="mb-24">
      <FlightHeroSection
        aircraftName={aircraft}
        from={originIata}
        to={destIata}
        backgroundImage="/images/bannerbg.png"
      />
      <div className="container mx-auto md:w-[80%] lg:w-[60%]">
        <div className="mb-24 flex flex-col items-center text-center">
          <div
            className={`mb-10 flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-primary text-secondary`}
          >
            <IoMdCheckmarkCircleOutline size={40} />
          </div>
          <h1 className="mb-3 text-4xl font-bold">
            <GradientText>Your seat has been successfully booked.</GradientText>
          </h1>
          <p className="text-third text-lg">
            Thank you for choosing On Time . Have a pleasant flight!
          </p>
        </div>

        <div className="cardS1 mb-6">
          <div className="flex items-center justify-between">
            <TextToQRCode text={qrText} size={100} />
            <button
              type="button"
              className="text-primary flex items-center gap-2 text-lg md:text-2xl"
            >
              <FiDownload />
              Download a ticket
            </button>
          </div>
          <div className="mb-6 flex items-center justify-between border-b border-[#252B37] py-6">
            <span className="text-third">Booking reference</span>
            <span className="text-primary flex items-center gap-2 text-xl break-all text-end">
              {refStr}
            </span>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-2xl text-secondary">
              <LuPlane />
            </div>
            <div>
              <p className="mb-2 flex items-center gap-2 text-lg text-white">
                <span>{originIata}</span>
                <GoArrowRight className="text-xl text-primary" />
                <span>{destIata}</span>
              </p>
              <p className="text-third text-sm">{aircraft}</p>
            </div>
          </div>

          <Row gutter={[16, 16]}>
            {data.map((item, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <div className="flex flex-col justify-between rounded-2xl bg-[#161a24] p-6">
                  <div className="mb-4">{item.icon}</div>
                  <div>
                    <p className="mb-1 text-sm text-gray-500">{item.label}</p>
                    <h4
                      className={`font-bold text-base ${item.valueColor || "text-white"}`}
                    >
                      {item.value}
                    </h4>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <div className="mt-6 flex items-center justify-between border-t border-[#252B37] pt-6">
            <span className="text-third text-lg">Amount paid</span>
            <span className="text-primary flex items-center gap-2 text-2xl font-bold">
              {amountStr}
            </span>
          </div>
        </div>
        <div className="cardS1 mb-10 flex items-center gap-6">
          <IoIosInformationCircleOutline size={70} className="text-primary" />
          <p className="text-third text-lg">
            Your flight will be confirmed once the minimum number of reserved
            seats is reached. We will notify you as soon as your flight is
            confirmed.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-4">
          <Link href="/user/my-booking" className="w-full md:w-fit md:flex-1">
            <Button type="primary" className="!py-4 w-full md:w-fit">
              View Trips
            </Button>
          </Link>
          <Button
            type="default"
            className="!py-4 w-full md:flex-1 md:w-fit"
            onClick={() => router.push("/")}
          >
            Return to homepage
          </Button>
          <button
            type="button"
            className="text-primary flex flex-1 items-center justify-center gap-2 text-center text-2xl w-full md:w-fit"
            onClick={() => window.print()}
          >
            <IoPrintOutline />
            Print ticket
          </button>
        </div>
      </div>
    </main>
  );
};
