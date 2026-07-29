import { SeatSharingComponent } from "@/components/seat-sharing/SeatSharingComponent";
import { getFeaturedBookings } from "@/apiCalls/bookings/getFeaturedBookings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seat Sharing",
};

const PAGE_SIZE = 12;

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

const SeatSharingPage = async ({ searchParams }: PageProps) => {
  const sp = await searchParams;
  const rawPage = parseInt(String(sp.page ?? "1"), 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const { items, pagination } = await getFeaturedBookings({
    page,
    limit: PAGE_SIZE,
  });

  return <SeatSharingComponent items={items} pagination={pagination} />;
};

export default SeatSharingPage;
