export type SeatSharingAmenity = {
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  icon?: string | null;
};

/** GET /bookings/search/:flightId — flight detail for seat sharing. */
export type SeatSharingFlightDetail = {
  flightId: string;
  departureAt: string;
  arrivalAt: string;
  flightNumber: string;
  aircraftId: string;
  aircraftModel: string;
  operatorName: string;
  bookedSeats: number;
  origin: { iata: string; name: string };
  destination: { iata: string; name: string };
  inventory: {
    id: string;
    totalSeats: number;
    availableSeats: number;
    /** Optional from API; seat-sharing UI treats non-available seats as booked only. */
    heldSeats?: number;
    fareClass: {
      id: string;
      name: string;
      code: string;
      displayPrice: number;
      currency: string;
    };
  };
  amenities?: SeatSharingAmenity[] | string[] | unknown[];
};
