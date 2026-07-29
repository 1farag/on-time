"use client";

import { Button, Pagination, Select, Spin, Tag } from "antd";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { LuPlane } from "react-icons/lu";
import { AccountingSideMenu } from "../accounting/AccountingSideMenu";
import { useMyBookings } from "./hooks/useMyBookings";
import { useAuth } from "@/hooks/auth/useAuth";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import type { MyBookingItem } from "@/types/myBookings";
import { BookingDetailModal } from "./BookingDetailModal";
import { buildBookingDisplayModel } from "./utils/bookingDisplayModel";
import style from "./styles/myBooking.module.scss";
import { GradientText } from "@/components/tools/GradientText";

const PAGE_LIMIT = 12;

export const MyBookingComponent = () => {
  const getLink = useLocalizedLink();
  const [page, setPage] = useState(1);
  const [detailBooking, setDetailBooking] = useState<MyBookingItem | null>(
    null
  );
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const canLoad = !authLoading && isAuthenticated;

  const { items, pagination, isLoading, isError } = useMyBookings(
    page,
    PAGE_LIMIT,
    {
      enabled: canLoad,
    }
  );

  const statusOptions = useMemo(() => {
    const labels = [...new Set(items.map((i) => i.status).filter(Boolean))];
    return [
      { value: "__all__", label: "All statuses" },
      ...labels.sort().map((s) => ({ value: s, label: s })),
    ];
  }, [items]);

  const [statusFilter, setStatusFilter] = useState<string>("__all__");

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const visibleItems =
    statusFilter === "__all__"
      ? items
      : items.filter((i) => i.status === statusFilter);

  const showPagination =
    pagination.totalPages > 1 || pagination.total > pagination.limit;

  return (
    <main className={style.myBooking}>
      <BookingDetailModal
        open={detailBooking !== null}
        booking={detailBooking}
        onClose={() => setDetailBooking(null)}
      />
      <div className="container">
        <div className={style.header}>
          <div>
            <h1>
              <GradientText>My Bookings</GradientText>
            </h1>
            <p>All your trips in one place</p>
          </div>
          <div className="flex items-center gap-2">
            <FiFilter className="text-primary text-2xl" />
            <Select
              className={style.statusSelect}
              value={statusFilter}
              onChange={(v) => setStatusFilter(v)}
              disabled={statusOptions.length <= 1}
              options={statusOptions}
            />
          </div>
        </div>

        <div className={style.contentLayout}>
          <AccountingSideMenu activeKey="my-booking" />

          <div className={style.listArea}>
            {!canLoad && !authLoading ? (
              <p className="text-third py-8">Sign in to see your bookings.</p>
            ) : null}

            {canLoad && isLoading ? (
              <div className="flex justify-center py-16">
                <Spin size="large" />
              </div>
            ) : null}

            {canLoad && !isLoading && isError ? (
              <p className="text-third py-8">
                Could not load bookings. Try again later.
              </p>
            ) : null}

            {canLoad &&
            !isLoading &&
            !isError &&
            items.length === 0 &&
            statusFilter === "__all__" ? (
              <div className={style.emptyState} role="status">
                <div className={style.emptyStateIcon} aria-hidden>
                  <LuPlane size={32} strokeWidth={1.75} />
                </div>
                <h2 className={style.emptyStateTitle}>No bookings yet</h2>
                <p className={style.emptyStateText}>
                  When you book a shared flight or private seat, your trips will
                  show up here. Browse available journeys and book your next
                  trip.
                </p>
                <Link
                  href={getLink("/seat-sharing")}
                  className={style.emptyStateCta}
                >
                  <Button
                    type="primary"
                    size="large"
                    className={style.emptyStateBtn}
                  >
                    Explore seat sharing
                  </Button>
                </Link>
              </div>
            ) : null}

            {canLoad &&
            !isLoading &&
            !isError &&
            items.length > 0 &&
            visibleItems.length === 0 ? (
              <div className={style.emptyState} role="status">
                <div className={style.emptyStateIcon} aria-hidden>
                  <FiFilter size={28} />
                </div>
                <h2 className={style.emptyStateTitle}>No matching bookings</h2>
                <p className={style.emptyStateText}>
                  Try choosing a different status or clear the filter to see all
                  bookings on this page.
                </p>
                <Button
                  type="default"
                  size="large"
                  className={style.emptyStateBtn}
                  onClick={() => setStatusFilter("__all__")}
                >
                  Show all statuses
                </Button>
              </div>
            ) : null}

            {visibleItems.map((booking) => {
              const m = buildBookingDisplayModel(booking);

              return (
                <div key={booking.id} className={style.bookingCard}>
                  <div className={style.bookingInfo}>
                    <div className={style.iconBox}>
                      <LuPlane />
                    </div>
                    <div>
                      <div className={style.routeRow}>
                        <h3>
                          {m.from}
                          <span>&rarr;</span>
                          {m.to}
                        </h3>
                        <Tag className={style.statusTag}>{m.status}</Tag>
                      </div>
                      <p>{m.subtitle}</p>
                    </div>
                  </div>

                  <div className={style.bookingActions}>
                    <strong>{m.price}</strong>
                    <Button
                      type="default"
                      className={style.viewBtn}
                      onClick={() => setDetailBooking(booking)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}

            {canLoad && !isLoading && showPagination ? (
              <div className="pagination-wrapper flex justify-center mt-8">
                <Pagination
                  current={pagination.page}
                  pageSize={pagination.limit}
                  total={pagination.total}
                  hideOnSinglePage
                  showSizeChanger={false}
                  onChange={(p) => setPage(p)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};
