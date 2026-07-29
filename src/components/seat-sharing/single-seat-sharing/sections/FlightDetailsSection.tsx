import { Col, Row } from "antd";
import { GoPeople } from "react-icons/go";
import { IoFlashOutline } from "react-icons/io5";

type TripDetail = {
  label: string;
  value: string;
};

export type FlightDetailsData = {
  departure: string;
  arrival: string;
  duration: string;
  flightNumber: string;
  totalSeats: number;
  availableSeats: number;
  /** All non-available seats (booked only; no separate “held” in UI). */
  bookedSeats: number;
};

export type AmenityDisplay = {
  key: string;
  title: string;
  description: string;
};

function normalizeAmenities(raw: unknown[] | undefined): AmenityDisplay[] {
  if (!raw?.length) return [];
  const out: AmenityDisplay[] = [];
  raw.forEach((item, index) => {
    if (typeof item === "string" && item.trim()) {
      out.push({
        key: `amenity-${index}-${item}`,
        title: item.trim(),
        description: "",
      });
      return;
    }
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      const title = String(o.title ?? o.name ?? o.label ?? "Amenity").trim();
      if (!title) return;
      const description = String(o.description ?? o.details ?? "").trim();
      out.push({
        key: String(o.id ?? `amenity-${index}-${title}`),
        title,
        description,
      });
    }
  });
  return out;
}

type FlightDetailsProps = {
  data: FlightDetailsData;
  amenities?: unknown[];
};

export const FlightDetailsSection = ({
  data,
  amenities: amenitiesRaw,
}: FlightDetailsProps) => {
  const {
    departure,
    arrival,
    duration,
    flightNumber,
    totalSeats,
    availableSeats,
    bookedSeats,
  } = data;

  const amenities = normalizeAmenities(
    Array.isArray(amenitiesRaw) ? amenitiesRaw : undefined
  );

  const tripDetails: TripDetail[] = [
    { label: "Departure", value: departure },
    { label: "Arrival", value: arrival },
    { label: "Duration", value: duration },
    { label: "Flight Number", value: flightNumber },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-[#111620] border border-[#1c232e] rounded-2xl p-8 ">
        <h3 className="text-white font-bold text-xl mb-5">Trip Details</h3>
        <Row gutter={[16, 16]}>
          {tripDetails.map((detail) => (
            <Col key={detail.label} xs={12} md={6}>
              <p className="text-third text-sm mb-1">{detail.label}</p>
              <p className="text-white font-bold text-base">{detail.value}</p>
            </Col>
          ))}
        </Row>
      </div>

      <div className="bg-[#111620] border border-[#1c232e] rounded-2xl p-8 ">
        <h3 className="text-white font-bold text-xl mb-5">Seats</h3>
        <div className="flex flex-wrap items-center gap-8 mb-5">
          <div className="flex items-center gap-2">
            <GoPeople size={28} className="text-primary" />
            <div>
              <p className="text-third text-sm">Total Seats</p>
              <p className="text-white font-bold text-base">{totalSeats}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GoPeople size={28} className="text-primary" />
            <div>
              <p className="text-third text-sm">Available</p>
              <p className="text-primary font-bold text-base">
                {availableSeats}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GoPeople size={28} className="text-primary" />
            <div>
              <p className="text-third text-sm">Booked</p>
              <p className="text-white font-bold text-base">{bookedSeats}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          {Array.from({ length: totalSeats }).map((_, i) => {
            const segment =
              i < bookedSeats ? "bg-primary" : "bg-[#2e3447]";
            return (
              <div key={i} className={`h-3 flex-1 rounded-full ${segment}`} />
            );
          })}
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <span className="text-third text-xs">Booked</span>
          <span className="text-third text-xs">Available</span>
        </div>
      </div>

      {amenities.length > 0 ? (
        <div className="bg-[#111620] border border-[#1c232e] rounded-2xl p-8 ">
          <h3 className="text-white font-bold text-xl mb-5">Amenities</h3>
          <Row gutter={[12, 12]}>
            {amenities.map((amenity) => (
              <Col key={amenity.key} xs={24} sm={8}>
                <div className="bg-[#1e232f] rounded-xl p-4 h-full flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary text-secondary flex items-center justify-center">
                    <IoFlashOutline size={22} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">
                      {amenity.title}
                    </h4>
                    {/* {amenity.description ? (
                      <p className="text-third text-xs leading-relaxed">
                        {amenity.description}
                      </p>
                    ) : null} */}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ) : null}
    </div>
  );
};
