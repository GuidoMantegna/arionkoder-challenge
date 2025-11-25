"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Booking } from "@/lib/types";
import Link from "next/link";
import { BookingCard } from "./booking-card";

export function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookingId = searchParams.get("bookingId");
    if (bookingId) {
      const savedBooking = localStorage.getItem(`booking_${bookingId}`);
      if (savedBooking) {
        setBooking(JSON.parse(savedBooking));
      }
    }

    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Booking Not Found
          </h1>
          <Link
            href="/"
            className="text-primary hover:text-primary/80 font-medium"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-secondary min-h-screen bg-gradient-to-b from-secondary/5 to-background py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white border border-border rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100/20 border-2 border-green-500/30 rounded-full mb-4">
              <span className="text-3xl font-bold text-green-600">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Booking Confirmed
            </h1>
            <p className="text-muted-foreground">Your appointment is all set</p>
          </div>

          {/* Booking Details */}
          <BookingCard service={booking} />

          {/* Confirmation Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              A confirmation email has been sent to{" "}
              <strong>{booking.email}</strong>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link
              href={`/${booking.centerId}`}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-all text-center"
            >
              Book Another Service
            </Link>
            <Link
              href="/"
              className="w-full bg-muted text-foreground hover:bg-muted/80 font-semibold py-3 px-4 rounded-lg transition-colors text-center"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
