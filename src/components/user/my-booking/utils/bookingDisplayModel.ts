import dayjs from "dayjs";
import type { MyBookingItem } from "@/types/myBookings";

export function numAmount(v: unknown): number {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") {
    const n = parseFloat(v);
    return Number.isNaN(n) ? 0 : n;
  }
  if (v && typeof v === "object" && "amount" in (v as object)) {
    return numAmount((v as { amount: unknown }).amount);
  }
  return 0;
}

export function strCurrency(v: unknown): string {
  if (typeof v === "string" && v.trim()) return v.trim();
  if (v && typeof v === "object" && "code" in (v as object)) {
    return String((v as { code: unknown }).code ?? "SAR");
  }
  return "SAR";
}

export function formatPnr(pnr: unknown, id: string): string {
  if (typeof pnr === "string" && pnr.trim()) return pnr.trim();
  if (pnr && typeof pnr === "object" && "code" in (pnr as object)) {
    const c = (pnr as { code: unknown }).code;
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  return id ? `#${String(id).slice(0, 8)}` : "—";
}

export function cityCountryLabel(airport?: { city?: unknown; country?: unknown }) {
  const city =
    airport?.city != null &&
    typeof airport.city === "object" &&
    "name" in (airport.city as object)
      ? String((airport.city as { name: unknown }).name ?? "")
      : typeof airport?.city === "string"
        ? airport.city
        : "";
  const country =
    airport?.country != null &&
    typeof airport.country === "object" &&
    "name" in (airport.country as object)
      ? String((airport.country as { name: unknown }).name ?? "")
      : typeof airport?.country === "string"
        ? airport.country
        : "";
  const parts = [city, country].filter(Boolean);
  return parts.length ? parts.join(", ") : "";
}

function fmtDateTime(iso?: unknown): string {
  if (typeof iso !== "string" || !iso.trim()) return "—";
  const d = dayjs(iso);
  return d.isValid() ? d.format("MMM D, YYYY · h:mm A") : "—";
}

export type BookingDisplayModel = {
  from: string;
  to: string;
  status: string;
  price: string;
  subtitle: string;
  pnr: string;
  flightNo: string;
  aircraft: string;
  departureAt: string;
  arrivalAt: string;
  originDetail: string;
  destinationDetail: string;
  journeyType: string;
  createdAt: string;
  confirmedAt: string;
  holdExpiresAt: string;
  bookingId: string;
};

export function buildBookingDisplayModel(booking: MyBookingItem): BookingDisplayModel {
  const fi = booking.flightInstance;
  const route = fi?.route;
  const origin = route?.origin;
  const dest = route?.destination;
  const from = origin?.iata ?? origin?.name ?? "—";
  const to = dest?.iata ?? dest?.name ?? "—";
  const dep = dayjs(fi?.departureAt);
  const arr = dayjs(fi?.arrivalAt);
  const aircraftModel =
    fi?.aircraft &&
    typeof fi.aircraft === "object" &&
    "model" in fi.aircraft
      ? String((fi.aircraft as { model: unknown }).model ?? "")
      : "";
  const aircraft =
    aircraftModel ||
    (typeof fi?.aircraft === "object" &&
    fi.aircraft &&
    "tailNumber" in fi.aircraft
      ? String((fi.aircraft as { tailNumber: unknown }).tailNumber ?? "")
      : "");
  const flightNo =
    fi && typeof fi.flightNumber === "string"
      ? fi.flightNumber
      : fi?.flightNumber != null
        ? String(fi.flightNumber)
        : "";
  const time = dep.isValid() ? dep.format("h:mm A") : "—";
  const dateLine = dep.isValid() ? dep.format("MMM D, YYYY") : "";
  const locationLine =
    cityCountryLabel(dest ?? undefined) ||
    [dest?.name, dest?.iata].filter(Boolean).join(" · ") ||
    "—";
  const pnr = formatPnr(booking.pnrCode, booking.id);
  const lineParts = [
    aircraft,
    time !== "—" ? time : "",
    dateLine,
    flightNo,
    pnr,
    locationLine !== "—" ? locationLine : "",
  ].filter((s) => typeof s === "string" && s.trim().length > 0);
  const subtitle = lineParts.join(" · ");
  const currency = strCurrency(booking.currency);
  const amount = numAmount(booking.totalAmount);
  const price =
    amount > 0 ? `${currency} ${amount.toLocaleString()}` : `${currency} —`;

  const originDetail =
    [origin?.name, origin?.iata].filter(Boolean).join(" · ") ||
    cityCountryLabel(origin ?? undefined) ||
    "—";
  const destinationDetail =
    [dest?.name, dest?.iata].filter(Boolean).join(" · ") ||
    cityCountryLabel(dest ?? undefined) ||
    "—";

  return {
    from,
    to,
    status: booking.status || "—",
    price,
    subtitle,
    pnr,
    flightNo: flightNo || "—",
    aircraft: aircraft || "—",
    departureAt: fmtDateTime(fi?.departureAt),
    arrivalAt: fmtDateTime(fi?.arrivalAt),
    originDetail,
    destinationDetail,
    journeyType:
      typeof booking.journeyType === "string" && booking.journeyType.trim()
        ? booking.journeyType
        : "—",
    createdAt: fmtDateTime(booking.createdAt),
    confirmedAt: fmtDateTime(booking.confirmedAt),
    holdExpiresAt: fmtDateTime(booking.holdExpiresAt),
    bookingId: booking.id,
  };
}
