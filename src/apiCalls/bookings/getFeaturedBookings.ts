import axiosInstance from "@/lib/axios";
import type { FeaturedBookingsResponse } from "@/types/featuredBookings";

/**
 * GET /bookings/featured?page=&limit=
 * يتوقع جسم الرد: { items: [...], pagination: { page, limit, total, totalPages } }
 */
export async function getFeaturedBookings(params: {
  page: number;
  limit: number;
}): Promise<FeaturedBookingsResponse> {
  const { page, limit } = params;
  const empty: FeaturedBookingsResponse = {
    items: [],
    pagination: { page, limit, total: 0, totalPages: 0 },
  };

  try {
    const { data } = await axiosInstance.get<FeaturedBookingsResponse>(
      "/bookings/featured",
      { params: { page, limit } },
    );
    return {
      items: data.items ?? [],
      pagination: {
        page: data.pagination?.page ?? page,
        limit: data.pagination?.limit ?? limit,
        total: data.pagination?.total ?? 0,
        totalPages: data.pagination?.totalPages ?? 0,
      },
    };
  } catch {
    return empty;
  }
}
