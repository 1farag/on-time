"use client";

import { useMemo, useState } from "react";
import { EmptyFlightSection } from "@/components/tools/sections/EmptyFlightSection";
import { Button, Col, Form, Row } from "antd";
import { FlightHeroSection } from "../sections/FlightHeroSection";
import { FlightStepsSection } from "../sections/FlightStepsSection";
import { LuPlane } from "react-icons/lu";
import { GoArrowRight } from "react-icons/go";
import {
  SeatSelectorSection,
  type SeatCounts,
} from "./sections/SeatSelectorSection";
import { TravelerDataSection } from "./sections/TravelerDataSection";
import type { SeatSharingFlightDetail } from "@/types/seatSharingFlight";
import { formatDepartureSummaryLine } from "../utils/seatSharingFlightMappers";
import { buildPassengerSlots } from "./utils/passengerSlots";
import { ComingSoonModal } from "@/components/tools/modal/coming-soon-modal/ComingSoon_modal";

function initialSeatCounts(available: number): SeatCounts {
  if (available <= 0) {
    return { adult: 0, child: 0, infant: 0 };
  }
  return { adult: 1, child: 0, infant: 0 };
}

type TravelelDataSeatSharingComponentProps = {
  flight: SeatSharingFlightDetail;
};

type SeatSharingTravelerFormValues = {
  passengers?: Record<string, unknown>[];
};

export const TravelelDataSeatSharingComponent = ({
  flight,
}: TravelelDataSeatSharingComponentProps) => {
  const availableSeats = Math.max(0, flight.inventory?.availableSeats ?? 0);
  const pricePerSeat = flight.inventory?.fareClass?.displayPrice ?? 0;
  const currency = flight.inventory?.fareClass?.currency ?? "SAR";

  const [counts, setCounts] = useState<SeatCounts>(() =>
    initialSeatCounts(availableSeats)
  );
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);

  const updateCount = (type: keyof SeatCounts, value: number) => {
    setCounts((prev) => ({ ...prev, [type]: value }));
  };

  const slots = useMemo(() => buildPassengerSlots(counts), [counts]);
  const formKey = `${counts.adult}-${counts.child}-${counts.infant}`;

  const totalTravelers = counts.adult + counts.child + counts.infant;
  const departureLine = formatDepartureSummaryLine(flight);
  const totalPrice = pricePerSeat * totalTravelers;

  const handleFinish = () => {
    setIsComingSoonModalOpen(true);
  };

  return (
    <main>
      <FlightHeroSection
        aircraftName={flight.aircraftModel}
        from={flight.origin.iata}
        to={flight.destination.iata}
        backgroundImage="/images/bannerbg.png"
      />
      <div className="container">
        <FlightStepsSection currentStep={1} />

        <Form<SeatSharingTravelerFormValues>
          key={formKey}
          layout="vertical"
          className="seat-sharing-traveler-form"
          onFinish={handleFinish}
          scrollToFirstError
        >
          <Row gutter={[32, 32]}>
            <Col xs={24} md={16}>
              <SeatSelectorSection
                counts={counts}
                onUpdateCount={updateCount}
                maxSeats={availableSeats}
              />
              <TravelerDataSection passengerSlots={slots} />
            </Col>
            <Col xs={24} md={8}>
              <div className="cardS1">
                <p className="text-white font-bold text-lg mb-6">
                  Booking Summary
                </p>{" "}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-primary text-secondary flex items-center justify-center text-2xl">
                    <LuPlane />
                  </div>
                  <div>
                    <p className="text-white flex items-center gap-2">
                      <span>{flight.origin.iata}</span>
                      <GoArrowRight className="text-xl" />
                      <span>{flight.destination.iata}</span>
                    </p>
                    <p className="text-third text-sm">{departureLine}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between  mb-6">
                  <span className="text-base text-third">
                    {totalTravelers}x Seat
                  </span>
                  <span className="text-third text-base">
                    {totalPrice.toLocaleString()} {currency}
                  </span>
                </div>
                <div className="flex items-center justify-between  border-t border-[#252B37] pt-4">
                  <span className="text-white text-lg">Total</span>
                  <p className="flex items-center gap-1">
                    <span className="text-primary font-bold text-2xl">
                      {totalPrice.toLocaleString()}
                    </span>
                    <span className="text-third text-sm">{currency}</span>
                  </p>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="my-4 w-full !py-4"
                  disabled={
                    totalTravelers < 1 || totalTravelers > availableSeats
                  }
                >
                  Confirm booking
                </Button>
                {/* <ul>
                  {payments.map((payment, index) => (
                    <li key={payment} className="inline-block mr-2 last:mr-0">
                      <Image
                        src={payment}
                        width={60}
                        height={38}
                        alt={`Payment ${index + 1}`}
                        className="h-8 object-contain"
                      />
                    </li>
                  ))}
                </ul> */}
              </div>
            </Col>
          </Row>
        </Form>
        <ComingSoonModal
          open={isComingSoonModalOpen}
          onClose={() => setIsComingSoonModalOpen(false)}
          message={
            <>
              Online booking will be available shortly.{" "}
              <span>Thank you for your patience.</span>
            </>
          }
        />
        <EmptyFlightSection />
      </div>
    </main>
  );
};
