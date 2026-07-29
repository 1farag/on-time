import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { MyBookingComponent } from "@/components/user/my-booking/MyBookingComponent";
import { Metadata } from "next";
import { Suspense } from "react";

/** Bookings list is fetched client-side only (React Query inside MyBookingComponent). */

export const metadata: Metadata = {
  title: "My Booking",
};

const MyBookingPage: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<LoaderS1 />}>
      <MyBookingComponent />
    </Suspense>
  );
};

export default MyBookingPage;
