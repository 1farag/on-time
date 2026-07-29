/** GET /bookings/:id — seat sharing success / booking detail */

export type BookingDetailRouteAirport = {
  id?: string;
  iata?: string;
  name?: string;
  city?: unknown;
  country?: unknown;
};

export type BookingDetailAircraft = {
  id?: unknown;
  tailNumber?: unknown;
  manufacturer?: unknown;
  model?: unknown;
  capacity?: unknown;
};

export type BookingDetailFlightInstance = {
  id?: unknown;
  flightNumber?: unknown;
  departureAt?: unknown;
  arrivalAt?: unknown;
  durationMinutes?: number;
  status?: unknown;
  route?: {
    origin?: BookingDetailRouteAirport;
    destination?: BookingDetailRouteAirport;
  };
  aircraft?: BookingDetailAircraft;
};

export type BookingDetailSegment = {
  id?: string;
  sequenceNum?: number;
  baseFare?: unknown;
  fareClassId?: unknown;
  flightInstance?: BookingDetailFlightInstance;
};

export type BookingDetailPassenger = {
  id?: string;
  firstName?: string;
  lastName?: string;
  passengerType?: string;
  email?: unknown;
  phone?: unknown;
};

export type BookingDetailSeatAssignment = {
  id?: string;
  passengerId?: string;
  flightInstanceId?: string;
  seatId?: string;
  seatNumber?: unknown;
  assignedAt?: unknown;
};

export type SeatSharingBookingDetail = {
  id: string;
  status?: string;
  pnrCode?: unknown;
  totalAmount?: unknown;
  currency?: unknown;
  journeyType?: string;
  specialRequests?: unknown;
  segments?: BookingDetailSegment[];
  passengers?: BookingDetailPassenger[];
  seatAssignments?: BookingDetailSeatAssignment[];
  ancillaries?: unknown[];
};
