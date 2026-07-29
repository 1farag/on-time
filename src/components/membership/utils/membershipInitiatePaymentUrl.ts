/** Extract checkout URL from POST /privileges/membership/initiate response */
export function membershipInitiatePaymentUrl(body: unknown): string {
  const o =
    body != null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : null;
  if (!o) return "";

  const direct =
    typeof o.paymentUrl === "string" ? o.paymentUrl.trim() : "";
  if (direct) return direct;

  const data = o.data;
  if (data != null && typeof data === "object") {
    const inner = data as Record<string, unknown>;
    const nested =
      typeof inner.paymentUrl === "string"
        ? inner.paymentUrl.trim()
        : "";
    if (nested) return nested;
  }

  return "";
}
