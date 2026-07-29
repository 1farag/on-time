import type { FinancePaymentIntentPayload } from "@/types/financePaymentIntent";

function record(v: unknown): Record<string, unknown> | null {
  return v != null && typeof v === "object"
    ? (v as Record<string, unknown>)
    : null;
}

function strId(v: unknown): string {
  return typeof v === "string" && v.trim() ? v.trim() : "";
}

/**
 * Maps POST /bookings/hold-auto response → payment-intents payload.
 * Supports wrapped `{ data: ... }` and common `booking` / `quote` shapes.
 */
export function paymentIntentFromConfirmResponse(
  data: unknown,
  fallback: { amount: number; currency: string },
): FinancePaymentIntentPayload | null {
  const root = record(data);
  if (!root) return null;

  const inner = record(root.data) ?? root;

  const booking = record(inner.booking);
  let bookingId =
    strId(inner.bookingId) ||
    strId(root.bookingId) ||
    strId(booking?.id) ||
    strId(inner.id);

  // Some APIs return booking id at top level only
  if (!bookingId && strId(root.id)) bookingId = strId(root.id);

  const quote = record(inner.quote) ?? record(root.quote);
  let amount = fallback.amount;
  let currency = fallback.currency.trim();

  if (quote) {
    const rawAmt =
      quote.finalAmount ?? quote.amount ?? quote.totalAmount ?? quote.value;
    const parsed =
      typeof rawAmt === "number"
        ? rawAmt
        : parseFloat(String(rawAmt ?? ""));
    if (Number.isFinite(parsed)) amount = parsed;
    const cur = quote.currency;
    if (typeof cur === "string" && cur.trim()) currency = cur.trim();
  }

  const ta = booking?.totalAmount;
  if (typeof ta === "number" && Number.isFinite(ta)) amount = ta;
  else if (typeof ta === "string" && ta.trim()) {
    const p = parseFloat(ta);
    if (Number.isFinite(p)) amount = p;
  }

  const bc = booking?.currency;
  if (typeof bc === "string" && bc.trim()) currency = bc.trim();

  if (!bookingId || !currency) return null;
  if (!Number.isFinite(amount)) return null;

  return { bookingId, amount, currency };
}
