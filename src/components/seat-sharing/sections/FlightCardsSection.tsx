"use client";

import dayjs from "dayjs";
import { Pagination } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { displayFilledSeats } from "@/lib/seatCounts";
import type {
  FeaturedBookingItem,
  FeaturedBookingsPagination,
} from "@/types/featuredBookings";
import { FlightCard } from "../cards/FlightCard";

type FlightCardsSectionProps = {
  items: FeaturedBookingItem[];
  pagination: FeaturedBookingsPagination;
};

function flightCardPropsFromItem(item: FeaturedBookingItem) {
  const inv = item.inventory;
  const depart = dayjs(item.departureAt);
  const total = inv?.totalSeats ?? 0;
  const available = inv?.availableSeats ?? 0;
  const booked = displayFilledSeats(total, available, item.bookedSeats);
  return {
    flightId: item.flightId,
    from: item.origin?.iata ?? "",
    to: item.destination?.iata ?? "",
    aircraft: item.aircraftModel ?? "",
    time: depart.isValid() ? depart.format("h:mm A") : "",
    date: depart.isValid() ? depart.format("MMM D, YYYY") : "",
    operator: item.operatorName ?? "",
    totalSeats: total,
    bookedSeats: booked,
    price: inv?.fareClass?.displayPrice ?? 0,
    currency: inv?.fareClass?.currency ?? "SAR",
  };
}

export const FlightCardsSection = ({
  items,
  pagination,
}: FlightCardsSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-10">
      {items.map((item) => {
        const p = flightCardPropsFromItem(item);
        return (
          <FlightCard
            key={item.flightId}
            flightId={p.flightId}
            from={p.from}
            to={p.to}
            aircraft={p.aircraft}
            time={p.time}
            date={p.date}
            operator={p.operator}
            totalSeats={p.totalSeats}
            bookedSeats={p.bookedSeats}
            price={p.price}
            currency={p.currency}
          />
        );
      })}

      {pagination.totalPages > 1 || pagination.total > pagination.limit ? (
        <div className="pagination-wrapper flex justify-center mt-4">
          <Pagination
            current={pagination.page}
            pageSize={pagination.limit}
            total={pagination.total}
            hideOnSinglePage
            showSizeChanger={false}
            onChange={(page) => {
              router.push(`${pathname}?page=${page}`);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
