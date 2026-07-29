/** GET /bookings — My bookings list */

export type MyBookingAirport = {
  id: string;
  iata?: string;
  name?: string;
  city?: unknown;
  country?: unknown;
};

export type MyBookingRoute = {
  origin?: MyBookingAirport;
  destination?: MyBookingAirport;
};

export type MyBookingAircraft = {
  id?: unknown;
  tailNumber?: unknown;
  manufacturer?: unknown;
  model?: unknown;
  capacity?: unknown;
};

export type MyBookingFlightInstance = {
  id?: unknown;
  flightNumber?: unknown;
  departureAt?: string;
  arrivalAt?: string;
  status?: unknown;
  route?: MyBookingRoute;
  aircraft?: MyBookingAircraft;
};

export type MyBookingItem = {
  id: string;
  status: string;
  pnrCode?: unknown;
  totalAmount?: unknown;
  currency?: unknown;
  journeyType?: string;
  holdExpiresAt?: unknown;
  confirmedAt?: unknown;
  createdAt?: unknown;
  flightInstance?: MyBookingFlightInstance;
};

export type MyBookingsPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type MyBookingsResponse = {
  items: MyBookingItem[];
  pagination: MyBookingsPagination;
};
