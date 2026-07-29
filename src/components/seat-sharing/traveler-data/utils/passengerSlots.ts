import type { PassengerSlot } from "@/types/bookingConfirm";
import type { SeatCounts } from "../sections/SeatSelectorSection";

export function buildPassengerSlots(counts: SeatCounts): PassengerSlot[] {
  const slots: PassengerSlot[] = [];
  for (let i = 0; i < counts.adult; i++) {
    slots.push({ passengerType: "ADULT" });
  }
  for (let i = 0; i < counts.child; i++) {
    slots.push({ passengerType: "CHILD" });
  }
  for (let i = 0; i < counts.infant; i++) {
    slots.push({ passengerType: "INFANT" });
  }
  return slots;
}
