import type {
  FeaturedBookingItem,
  FeaturedBookingsPagination,
} from "@/types/featuredBookings";
import { FlightCardsSection } from "./sections/FlightCardsSection";
import { EmptyFlightSection } from "../tools/sections/EmptyFlightSection";
import { GradientText } from "../tools/GradientText";

type SeatSharingComponentProps = {
  items: FeaturedBookingItem[];
  pagination: FeaturedBookingsPagination;
};

export const SeatSharingComponent = ({
  items,
  pagination,
}: SeatSharingComponentProps) => {
  return (
    <main className="pt-24 mt-14">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-3">
            <GradientText>Private aviation.. Pay for a seat.</GradientText>
          </h1>
          <p className="text-third text-lg">
            Share a private jet with other travelers and enjoy the experience of
            private flying for a fraction of the cost.
          </p>
        </div>

        {items.length > 0 ? (
          <FlightCardsSection items={items} pagination={pagination} />
        ) : (
          <p className="text-center text-third py-8">
            No featured seat-sharing flights right now. Check back soon.
          </p>
        )}

        <EmptyFlightSection />
      </div>
    </main>
  );
};
