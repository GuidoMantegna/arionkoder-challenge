"use client";
import { BookingForm } from "./booking-form";
import type { Service, Booking } from "@/lib/types";

interface BookingModalProps {
  service: Service;
  centerId: string;
  onClose: () => void;
}

export function BookingModal({
  service,
  centerId,
  onClose,
}: BookingModalProps) {
  const onSuccess = (booking: Booking) => {
    // Save booking and redirect
    const BOOKING_ID = Date.now();
    localStorage.setItem(`booking_${BOOKING_ID}`, JSON.stringify(booking));
    window.location.href = `/[center]/confirmation?center=${centerId}&bookingId=${BOOKING_ID}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">
            <p className="text-sm text-primary">Selected Service</p>
            Book {service.name}
          </h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="bg-primary rounded-lg p-4 mb-6">
            <p className="text-muted">
              Duration
              <span className="font-semibold ml-2">{service.duration} min</span>
            </p>
            <p className="text-muted">
              Price <span className="font-semibold ml-2">${service.price}</span>
            </p>
          </div>

          <BookingForm
            service={service}
            centerId={centerId}
            onCancel={onClose}
            onSuccess={onSuccess}
          />
        </div>
      </div>
    </div>
  );
}
