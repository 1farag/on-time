"use client";
import { Collapse } from "antd";
import type { PassengerSlot } from "@/types/bookingConfirm";
import { TravelerForm } from "./TravelerForm";

const { Panel } = Collapse;

function slotHeading(slot: PassengerSlot, index: number, total: number): string {
  const type =
    slot.passengerType === "ADULT"
      ? "Adult"
      : slot.passengerType === "CHILD"
        ? "Child"
        : "Infant";
  if (total <= 1) return "Traveler data";
  return `${type} ${index + 1}`;
}

type TravelerDataSectionProps = {
  passengerSlots: PassengerSlot[];
};

export const TravelerDataSection = ({
  passengerSlots,
}: TravelerDataSectionProps) => {
  if (passengerSlots.length < 1) {
    return (
      <p className="text-third text-sm py-4">
        Select the number of seats above to enter traveler details.
      </p>
    );
  }

  const total = passengerSlots.length;

  return (
    <div className="traveler-data-section">
      <Collapse
        defaultActiveKey={["0"]}
        expandIconPosition="end"
        className="traveler-collapse"
        ghost
        accordion
      >
        {passengerSlots.map((slot, index) => (
          <Panel
            header={
              <span className="text-white text-lg font-bold">
                {slotHeading(slot, index, total)}
              </span>
            }
            key={`${slot.passengerType}-${index}`}
            className="mb-4 traveler-panel"
          >
            <TravelerForm
              passengerIndex={index}
              passengerType={slot.passengerType}
              noTitle
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
