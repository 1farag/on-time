import { Button, Col, Row } from "antd";
import { PiUsersBold } from "react-icons/pi";
import Link from "next/link";
import type { FeaturedBookingItem } from "@/types/featuredBookings";

type SeatSharingTripsProps = {
  trips: FeaturedBookingItem[];
};

const SeatTripCard = ({ item }: { item: FeaturedBookingItem }) => {
  const inv = item.inventory;
  const price = inv?.fareClass?.displayPrice ?? 0;
  const currency = inv?.fareClass?.currency ?? "SAR";
  const from = item.origin?.iata ?? "";
  const to = item.destination?.iata ?? "";
  const href = `/seat-sharing/${item.flightId}`;

  return (
    <div className="bg-[#161b27] border border-[#1e2436] rounded-2xl p-6 h-full flex flex-col gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-white font-bold">{from}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 3.99996L6.99995 4.99996L4.99995 2.99996C4.0324 2.0324 2.64499 1.67744 1.99995 1.99996C1.67744 2.645 2.0324 4.0324 2.99995 4.99996L4.99995 6.99996L3.99995 13C3.93545 13.3225 4.74194 13.871 4.99995 14V14C5.32247 14.129 5.80644 14.258 5.99995 14L7.99995 9.99996L9.99996 11V13L11 14L12 12L14 11L13 9.99996H11L9.99996 7.99996L14 5.99996C14.258 5.80645 14.129 5.32248 14 4.99996V4.99996C13.8064 4.74194 13.3225 3.93546 13 3.99996Z"
            stroke="#F0D484"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-white font-bold">{to}</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-third text-sm">{item.aircraftModel}</p>
        <div className="flex items-center gap-1.5 text-third text-sm">
          <PiUsersBold size={16} />
          <span>{inv?.availableSeats ?? 0} seats available</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-baseline gap-2">
          <span className="text-primary text-2xl font-bold">
            {price.toLocaleString()}
          </span>
          <span className="text-third text-sm">{currency} / Seat</span>
        </div>
        <Button type="primary" href={href} className="!px-0 !py-2 ">
          Book
        </Button>
      </div>
    </div>
  );
};

export const SeatSharingTripsSection = ({ trips }: SeatSharingTripsProps) => {
  return (
    <section className="bg-[#0f1219] py-20 px-6">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-white">Seat </span>
            <span className="text-primary">Sharing Trips</span>
          </h2>
          <p className="text-third text-base">
            Share the cost of a private jet
          </p>
        </div>

        <Row gutter={[24, 24]}>
          {trips.map((item) => (
            <Col key={item.flightId} xs={24} md={8}>
              <SeatTripCard item={item} />
            </Col>
          ))}
        </Row>

        <div className="flex justify-center mt-10">
          <Link href="/seat-sharing">
            <Button type="default" className="!py-3 ">
              View all trips
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
