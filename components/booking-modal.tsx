"use client"
import { BookingForm } from "./booking-form"
import type { Service, Booking } from "@/lib/types"

interface BookingModalProps {
  service: Service
  centerId: string
  onClose: () => void
  onBookingComplete: (booking: Booking) => void
}

export function BookingModal({ service, centerId, onClose, onBookingComplete }: BookingModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Book {service.name}</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground text-2xl font-bold">
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="bg-primary/5 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted mb-2">Selected Service</p>
            <p className="font-semibold text-foreground">{service.name}</p>
            <p className="text-sm text-muted mt-2">
              {service.duration} min • ${service.price}
            </p>
          </div>

          <BookingForm service={service} centerId={centerId} onSuccess={onBookingComplete} onCancel={onClose} />
        </div>
      </div>
    </div>
  )
}
