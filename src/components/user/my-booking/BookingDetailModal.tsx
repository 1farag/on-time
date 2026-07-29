"use client";

import { Button, Modal, Tag } from "antd";
import { LuPlane } from "react-icons/lu";
import type { MyBookingItem } from "@/types/myBookings";
import { buildBookingDisplayModel } from "./utils/bookingDisplayModel";
import style from "./styles/myBooking.module.scss";

type BookingDetailModalProps = {
  open: boolean;
  booking: MyBookingItem | null;
  onClose: () => void;
};

export function BookingDetailModal({
  open,
  booking,
  onClose,
}: BookingDetailModalProps) {
  const m = booking ? buildBookingDisplayModel(booking) : null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={
        <div className={style.detailModalFooter}>
          <Button type="default" className={style.viewBtn} onClick={onClose}>
            Close
          </Button>
        </div>
      }
      title={null}
      closable
      centered
      width={640}
      destroyOnClose
      wrapClassName={style.detailModalRoot}
      styles={{
        content: {
          background: "rgba(21, 28, 40, 0.98)",
          borderRadius: 16,
          border: "1px solid rgba(45, 52, 67, 0.4)",
          padding: 0,
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.45)",
        },
        body: { padding: 0 },
        header: { display: "none" },
        footer: {
          margin: 0,
          padding: "20px 28px 28px",
          borderTop: "1px solid #252b37",
          background: "transparent",
        },
        mask: { backdropFilter: "blur(4px)" },
      }}
    >
      {m ? (
        <div className={style.detailModalBody}>
          <div className={`${style.bookingCard} ${style.detailModalHero}`}>
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
            <div
              className={`${style.bookingActions} ${style.detailModalPrice}`}
            >
              <strong>{m.price}</strong>
            </div>
          </div>

          <div className={style.detailSection}>
            <h4 className={style.detailSectionTitle}>Flight</h4>
            <dl className={style.detailGrid}>
              <div className={style.detailRow}>
                <dt>Flight number</dt>
                <dd>{m.flightNo}</dd>
              </div>
              <div className={style.detailRow}>
                <dt>Aircraft</dt>
                <dd>{m.aircraft}</dd>
              </div>
              <div className={style.detailRow}>
                <dt>Departure</dt>
                <dd>{m.departureAt}</dd>
              </div>
              <div className={style.detailRow}>
                <dt>Arrival</dt>
                <dd>{m.arrivalAt}</dd>
              </div>
              <div className={style.detailRow}>
                <dt>From</dt>
                <dd>{m.originDetail}</dd>
              </div>
              <div className={style.detailRow}>
                <dt>To</dt>
                <dd>{m.destinationDetail}</dd>
              </div>
            </dl>
          </div>

          <div className={style.detailSection}>
            <h4 className={style.detailSectionTitle}>Booking</h4>
            <dl className={style.detailGrid}>
              <div className={style.detailRow}>
                <dt>PNR / Ref</dt>
                <dd>{m.pnr}</dd>
              </div>
              <div className={style.detailRow}>
                <dt>Booking ID</dt>
                <dd className={style.detailMono}>{m.bookingId}</dd>
              </div>
              <div className={style.detailRow}>
                <dt>Journey type</dt>
                <dd>{m.journeyType}</dd>
              </div>
              <div className={style.detailRow}>
                <dt>Created</dt>
                <dd>{m.createdAt}</dd>
              </div>
              <div className={style.detailRow}>
                <dt>Confirmed</dt>
                <dd>{m.confirmedAt}</dd>
              </div>
              <div className={style.detailRow}>
                <dt>Hold expires</dt>
                <dd>{m.holdExpiresAt}</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
