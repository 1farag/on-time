"use client";

import { SingleSeatSharingComponent } from "@/components/seat-sharing/single-seat-sharing/SingleSeatSharingComponent";
import { useBookingSearchFlight } from "@/components/seat-sharing/hooks/useBookingSearchFlight";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SingleSeatSharingPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const { flight, isLoading } = useBookingSearchFlight(id, {
    enabled: !!id,
  });

  if (!id) {
    return (
      <main className="container py-16 text-center">
        <p className="text-third mb-4">Flight not found.</p>
        <Link
          href="/seat-sharing"
          className="text-primary underline"
        >
          Back to seat sharing
        </Link>
      </main>
    );
  }

  if (isLoading) {
    return <LoaderS1 />;
  }

  if (!flight) {
    return (
      <main className="container py-16 text-center">
        <p className="text-third mb-4">Flight not found.</p>
        <Link
          href="/seat-sharing"
          className="text-primary underline"
        >
          Back to seat sharing
        </Link>
      </main>
    );
  }

  return <SingleSeatSharingComponent flight={flight} />;
}
