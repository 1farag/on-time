/**
 * Count of non-available seats shown as “booked” (seat sharing: no separate held).
 * Uses max(implied from total−available, API booked) so bar stays consistent.
 */
export function displayFilledSeats(
  totalSeats: number,
  availableSeats: number,
  apiBookedSeats?: number,
): number {
  if (totalSeats <= 0) return 0;
  const implied = Math.max(
    0,
    Math.min(totalSeats, totalSeats - availableSeats),
  );
  const raw =
    typeof apiBookedSeats === "number" && Number.isFinite(apiBookedSeats)
      ? Math.max(0, Math.min(totalSeats, Math.trunc(apiBookedSeats)))
      : 0;
  return Math.min(totalSeats, Math.max(implied, raw));
}
