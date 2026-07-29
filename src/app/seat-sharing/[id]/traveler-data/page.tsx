"use client";

import { TravelelDataSeatSharingComponent } from "@/components/seat-sharing/traveler-data/TravelelDataSeatSharingComponent";
import { useBookingSearchFlight } from "@/components/seat-sharing/hooks/useBookingSearchFlight";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { useAuth } from "@/hooks/auth/useAuth";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function TravelerDataPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const id = typeof params?.id === "string" ? params.id : "";

  const canFetchFlight = isAuthenticated && !authLoading && !!id;

  const { flight, isLoading: flightLoading } = useBookingSearchFlight(id, {
    enabled: canFetchFlight,
  });

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace("/user/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return <LoaderS1 />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!id) {
    return (
      <main className="container py-16 text-center">
        <p className="text-third mb-4">This flight could not be found.</p>
        <Link
          href="/seat-sharing"
          className="text-primary underline"
        >
          Back to seat sharing
        </Link>
      </main>
    );
  }

  if (flightLoading) {
    return <LoaderS1 />;
  }

  if (!flight) {
    return (
      <main className="container py-16 text-center">
        <p className="text-third mb-4">This flight could not be found.</p>
        <Link
          href="/seat-sharing"
          className="text-primary underline"
        >
          Back to seat sharing
        </Link>
      </main>
    );
  }

  return <TravelelDataSeatSharingComponent flight={flight} />;
}
