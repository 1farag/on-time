"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { LuPlane } from "react-icons/lu";

type FlightCardProps = {
  from: string;
  to: string;
  aircraft: string;
  time: string;
  date: string;
  operator: string;
  totalSeats: number;
  bookedSeats: number;
  price: number;
  currency?: string;
  flightId?: string;
  onJoin?: () => void;
};

export const FlightCard = ({
  from,
  to,
  aircraft,
  time,
  date,
  operator,
  totalSeats,
  bookedSeats,
  price,
  currency = "SAR",
  flightId,
  onJoin,
}: FlightCardProps) => {
  const availableSeats = totalSeats - bookedSeats;
  const router = useRouter();

  return (
    <div className="bg-[#111620] border border-[#1c232e] rounded-2xl px-8 py-6 flex items-center justify-between gap-6 flex-wrap">
      <div className="flex flex-col gap-2 min-w-[200px]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white font-bold text-lg">{from}</span>
          <LuPlane size={18} className="text-primary" />
          <span className="text-white font-bold text-lg">{to}</span>
        </div>
        <p className="text-[#888888] text-sm">
          {aircraft} · {time} · {date} · {operator}
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSeats }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full ${
                i < bookedSeats ? "bg-primary" : "bg-[#2e3447]"
              }`}
            />
          ))}
        </div>
        <span className="text-third text-sm">
          {availableSeats}/{totalSeats} Seats
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-primary text-2xl font-bold whitespace-nowrap">
          {currency} {price.toLocaleString()}
        </span>
        <Button
          type="primary"
          onClick={() => {
            if (flightId) {
              router.push(`/seat-sharing/${flightId}`);
              return;
            }
            if (onJoin) {
              onJoin();
              return;
            }
            router.push("/seat-sharing");
          }}
        >
          Join Flight
        </Button>
      </div>
    </div>
  );
};
