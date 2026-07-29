import dayjs from "dayjs";
import type {
  BookingDetailFlightInstance,
  SeatSharingBookingDetail,
} from "@/types/bookingDetail";

function str(v: unknown): string {
  if (v == null) return "";
  if (
    typeof v === "string" ||
    typeof v === "number" ||
    typeof v === "boolean"
  ) {
    return String(v);
  }
  return "";
}

export function primaryFlightInstance(
  booking: SeatSharingBookingDetail | undefined,
): BookingDetailFlightInstance | undefined {
  const segments = booking?.segments;
  if (!Array.isArray(segments) || segments.length === 0) return undefined;
  const sorted = [...segments].sort(
    (a, b) => (a.sequenceNum ?? 0) - (b.sequenceNum ?? 0),
  );
  return sorted[0]?.flightInstance;
}

export function formatBookingDate(departureAt: unknown): string {
  const s = str(departureAt);
  const d = dayjs(s);
  return d.isValid() ? d.format("MMMM D, YYYY") : "—";
}

export function formatBookingTime(departureAt: unknown): string {
  const s = str(departureAt);
  const d = dayjs(s);
  return d.isValid() ? d.format("h:mm A") : "—";
}

export function aircraftLabel(fi?: BookingDetailFlightInstance): string {
  if (!fi?.aircraft) return "—";
  const manufacturer = str(fi.aircraft.manufacturer);
  const model = str(fi.aircraft.model);
  const joined = `${manufacturer} ${model}`.trim();
  if (joined) return joined;
  return str(fi.aircraft.tailNumber) || "—";
}

export function amountPaidLabel(booking?: SeatSharingBookingDetail): string {
  if (!booking) return "—";
  const amt = booking.totalAmount;
  let num: number | null = null;
  if (typeof amt === "number" && !Number.isNaN(amt)) num = amt;
  else if (amt && typeof amt === "object") {
    const raw = (amt as Record<string, unknown>).amount;
    if (typeof raw === "number") num = raw;
    else if (typeof raw === "string") num = parseFloat(raw);
  }
  const cur = str(booking.currency) || "SAR";
  if (num == null || Number.isNaN(num)) {
    const fallback = amt != null && typeof amt === "object" ? str((amt as Record<string, unknown>).value ?? amt) : str(amt);
    return fallback || "—";
  }
  const formatted = Number.isInteger(num)
    ? num.toLocaleString()
    : num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return `${formatted} ${cur}`.trim();
}

export function pnrOrReference(booking?: SeatSharingBookingDetail): string {
  if (!booking) return "—";
  const pnr = booking.pnrCode;
  const pnrStr = str(pnr);
  if (pnrStr) return pnrStr;
  if (pnr && typeof pnr === "object") {
    try {
      const o = pnr as Record<string, unknown>;
      const code = o.code ?? o.pnr ?? o.value;
      const s = str(code);
      if (s) return s;
    } catch {
      /* ignore */
    }
  }
  return booking.id || "—";
}

export function seatCountLabel(booking?: SeatSharingBookingDetail): string {
  if (!booking) return "—";
  const seats = booking.seatAssignments?.length;
  const pax = booking.passengers?.length;
  const n = seats && seats > 0 ? seats : pax && pax > 0 ? pax : 0;
  if (n <= 0) return "—";
  return `${n} Seat${n === 1 ? "" : "s"}`;
}

export function statusLabel(booking?: SeatSharingBookingDetail): string {
  return booking?.status?.trim() || "Confirmed";
}
