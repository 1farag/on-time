export type BookingPassengerType = "ADULT" | "CHILD" | "INFANT";

export type BookingConfirmJourneyType = "ONEWAY" | "ROUNDTRIP";

export type BookingConfirmPassenger = {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  passportNumber: string;
  passportExpiry: string;
  dob: string;
  nationality: string;
  passengerType: BookingPassengerType;
};

/** POST /bookings/hold-auto body — aligns with bookings API expectations. */
export type BookingConfirmPayload = {
  flightInstanceId: string;
  fareClassId: string;
  requestedSeats: number;
  journeyType: BookingConfirmJourneyType;
  currency: string;
  holdMinutes: number;
  passengers: BookingConfirmPassenger[];
};

/** Default seat-hold duration when confirming from traveler data. */
export const BOOKING_CONFIRM_DEFAULT_HOLD_MINUTES = 10;

export type PassengerSlot = {
  passengerType: BookingPassengerType;
};
