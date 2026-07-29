"use client";

import { FlightHeroSection } from "../sections/FlightHeroSection";
import { Button, Col, Row } from "antd";
import { FlightDetailsSection } from "./sections/FlightDetailsSection";
import { FaRegClock } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import type { SeatSharingFlightDetail } from "@/types/seatSharingFlight";
import { toFlightDetailsData } from "../utils/seatSharingFlightMappers";

type SingleSeatSharingComponentProps = {
  flight: SeatSharingFlightDetail;
};

export const SingleSeatSharingComponent = ({
  flight,
}: SingleSeatSharingComponentProps) => {
  const router = useRouter();
  const details = toFlightDetailsData(flight);
  const price = flight.inventory?.fareClass?.displayPrice ?? 0;
  const currency = flight.inventory?.fareClass?.currency ?? "SAR";
  const travelerHref = `/seat-sharing/${flight.flightId}/traveler-data`;

  return (
    <main>
      <FlightHeroSection
        aircraftName={flight.aircraftModel}
        from={flight.origin.iata}
        to={flight.destination.iata}
        backgroundImage="/images/bannerbg.png"
      />
      <div className="container mb-24">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={16}>
            <FlightDetailsSection data={details} amenities={flight.amenities} />
          </Col>
          <Col xs={24} md={8}>
            <div className="bg-[#111620] border border-[#1c232e] rounded-2xl p-8 ">
              <p className="text-third text-sm mb-1">Price Per Seat</p>
              <p className="flex items-center gap-2">
                <span className="text-3xl text-primary font-bold">
                  {price.toLocaleString()}
                </span>
                <span className="text-third text-base">{currency}</span>
              </p>
              <p className="text-third flex items-center gap-2 mt-6 text-sm">
                <FaRegClock />
                {details.duration}
              </p>

              <Button
                type="primary"
                size="large"
                className="mt-4 w-full !py-4"
                onClick={() => router.push(travelerHref)}
              >
                Trip Selection
              </Button>
              {/* <p className="text-third text-center gap-2 mt-3 text-xs">
                No amount will be deducted now.
              </p> */}
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
};
