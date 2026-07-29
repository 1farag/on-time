import dayjs from "dayjs";
import { displayFilledSeats } from "@/lib/seatCounts";
import type { SeatSharingFlightDetail } from "@/types/seatSharingFlight";
import type { FlightDetailsData } from "../single-seat-sharing/sections/FlightDetailsSection";

function formatIsoDateTime(iso: string): string {
  const d = dayjs(iso);
  return d.isValid() ? d.format("MMM D, YYYY · h:mm A") : "—";
}

export function formatDurationBetween(depIso: string, arrIso: string): string {
  const dep = dayjs(depIso);
  const arr = dayjs(arrIso);
  if (!dep.isValid() || !arr.isValid()) return "—";
  const totalMinutes = arr.diff(dep, "minute");
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h} hour${h === 1 ? "" : "s"}`);
  if (m) parts.push(`${m} min`);
  return parts.length ? parts.join(" ") : "0 min";
}

export function toFlightDetailsData(f: SeatSharingFlightDetail): FlightDetailsData {
  const inv = f.inventory;
  const total = inv?.totalSeats ?? 0;
  const available = inv?.availableSeats ?? 0;
  const bookedSeats = displayFilledSeats(
    total,
    available,
    Number(f.bookedSeats),
  );

  return {
    departure: formatIsoDateTime(f.departureAt),
    arrival: formatIsoDateTime(f.arrivalAt),
    duration: formatDurationBetween(f.departureAt, f.arrivalAt),
    flightNumber: f.flightNumber,
    totalSeats: total,
    availableSeats: available,
    bookedSeats,
  };
}

export function formatDepartureSummaryLine(
  flight: SeatSharingFlightDetail,
): string {
  return formatIsoDateTime(flight.departureAt);
}
