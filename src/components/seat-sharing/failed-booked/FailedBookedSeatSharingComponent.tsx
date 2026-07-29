"use client";

import { FlightHeroSection } from "../sections/FlightHeroSection";
import { Button } from "antd";
import Link from "next/link";
import { IoIosInformationCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { LuPlane } from "react-icons/lu";
import { GoArrowRight } from "react-icons/go";

export function FailedBookedSeatSharingComponent() {
  return (
    <main className="mb-24">
      <FlightHeroSection
        aircraftName="Seat Sharing"
        from="Booking"
        to="Status"
        backgroundImage="/images/bannerbg.png"
      />

      <div className="container mx-auto md:w-[80%] lg:w-[60%]">
        <div className="mb-24 flex flex-col items-center text-center">
          <div
            className="mb-10 flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full border-2 border-red-500/80 bg-red-500/10 text-red-400"
            aria-hidden
          >
            <IoMdCloseCircleOutline size={44} />
          </div>
          <h1 className="mb-3 text-4xl font-bold text-white">
            Booking could not be completed
          </h1>
          <p className="text-third text-lg max-w-xl">
            We couldn&apos;t confirm your seat for this flight. If a payment was
            attempted but didn&apos;t go through, you have not been charged.
            You can choose another flight from seat sharing anytime.
          </p>
        </div>

        <div className="cardS1 mb-6">
          <div className="mb-6 flex items-center gap-4 border-b border-[#252B37] pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-2xl text-secondary">
              <LuPlane />
            </div>
            <div className="text-start">
              <p className="mb-2 flex items-center gap-2 text-lg text-white">
                <span>Seat sharing</span>
                <GoArrowRight className="text-xl text-primary" />
                <span>Complete booking</span>
              </p>
              <p className="text-sm text-third">
                Use the buttons below to browse more flights or return home.
              </p>
            </div>
          </div>

          <div className="mb-8 flex items-center gap-6 rounded-xl border border-[#252B37] bg-[#12151c] p-6">
            <IoIosInformationCircleOutline size={52} className="shrink-0 text-primary" />
            <p className="text-start text-lg leading-relaxed text-third">
              If the issue persists, contact support with any reference shown on
              your payment page. Having trouble with your card or wallet? Try
              another payment method on your next booking.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6">
            <Link href="/seat-sharing" className="w-full md:w-fit md:flex-1">
              <Button type="primary" className="!py-4 w-full">
                Browse seat sharing flights
              </Button>
            </Link>
            <Link href="/" className="w-full md:w-fit md:flex-1">
              <Button type="default" className="!py-4 w-full border-white/20">
                Return to homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
