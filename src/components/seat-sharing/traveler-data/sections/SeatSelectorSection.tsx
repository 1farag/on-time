"use client";

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

export type SeatType = "adult" | "child" | "infant";

export type SeatCounts = Record<SeatType, number>;

type SeatSelectorSectionProps = {
  counts: SeatCounts;
  onUpdateCount: (type: SeatType, value: number) => void;
  /** Max seats bookable on this flight (from inventory). Defaults to 10 for legacy pages. */
  maxSeats?: number;
};

type RowProps = {
  label: string;
  subLabel: string;
  type: SeatType;
  counts: SeatCounts;
  totalSeats: number;
  maxSeats: number;
  onDelta: (type: SeatType, delta: number) => void;
};

const Row = ({
  label,
  subLabel,
  type,
  counts,
  totalSeats,
  maxSeats,
  onDelta,
}: RowProps) => (
  <div className="flex items-center justify-between py-6">
    <div>
      <h3 className="text-white font-bold text-lg">{label}</h3>
      <p className="text-gray-500 text-sm">{subLabel}</p>
    </div>
    <div className="flex items-center gap-6">
      <button
        type="button"
        onClick={() => onDelta(type, -1)}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-700 bg-[#1A1D26] text-third hover:border-gray-500 transition-colors"
      >
        <MinusOutlined />
      </button>

      <span
        className={`text-2xl font-bold w-4 text-center ${counts[type] > 0 ? "text-primary" : "text-third"}`}
      >
        {counts[type]}
      </span>

      <button
        type="button"
        onClick={() => onDelta(type, 1)}
        disabled={totalSeats >= maxSeats}
        className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-700 bg-[#1A1D26] text-third hover:border-gray-500 transition-colors ${totalSeats >= maxSeats ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <PlusOutlined />
      </button>
    </div>
  </div>
);

export const SeatSelectorSection = ({
  counts,
  onUpdateCount,
  maxSeats: maxSeatsProp,
}: SeatSelectorSectionProps) => {
  const maxSeats = maxSeatsProp ?? 10;
  const totalSeats = counts.adult + counts.child + counts.infant;

  const updateCount = (type: SeatType, delta: number) => {
    const newValue = counts[type] + delta;

    if (newValue >= 0 && (delta < 0 || totalSeats < maxSeats)) {
      onUpdateCount(type, newValue);
    }
  };

  return (
    <div className="cardS1 mb-8">
      <div className="mb-8">
        <h2 className="text-white text-xl mb-1">Number of seats</h2>
        <p className="text-gray-500 text-sm">
          Select the number of seats (maximum {maxSeats} available)
        </p>
      </div>

      <div className="space-y-2">
        <Row
          label="Adult"
          subLabel="12 years and above"
          type="adult"
          counts={counts}
          totalSeats={totalSeats}
          maxSeats={maxSeats}
          onDelta={updateCount}
        />
        <Row
          label="Child"
          subLabel="Over 2 and under 12 years"
          type="child"
          counts={counts}
          totalSeats={totalSeats}
          maxSeats={maxSeats}
          onDelta={updateCount}
        />
        <Row
          label="Infant"
          subLabel="Over 7 days and under 2 years"
          type="infant"
          counts={counts}
          totalSeats={totalSeats}
          maxSeats={maxSeats}
          onDelta={updateCount}
        />
      </div>
    </div>
  );
};
