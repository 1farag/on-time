export type FeaturedBookingItem = {
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
    heldSeats: number;
    fareClass: {
      id: string;
      name: string;
      code: string;
      displayPrice: number;
      currency: string;
    };
  };
};

export type FeaturedBookingsPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type FeaturedBookingsResponse = {
  items: FeaturedBookingItem[];
  pagination: FeaturedBookingsPagination;
};
