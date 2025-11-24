"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Booking } from "@/lib/types";
import Link from "next/link";

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
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6 space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Service
              </p>
              <p className="font-semibold text-foreground text-lg">
                {booking.serviceName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Date
                </p>
                <p className="font-semibold text-foreground">
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Time
                </p>
                <p className="font-semibold text-foreground">{booking.time}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Duration
                </p>
                <p className="font-semibold text-foreground">
                  {booking.duration} min
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Price
                </p>
                <p className="font-bold text-lg text-primary">
                  ${booking.price}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-primary/20">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Client Name
              </p>
              <p className="font-semibold text-foreground">{booking.name}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Email
              </p>
              <p className="font-semibold text-foreground break-all">
                {booking.email}
              </p>
            </div>
          </div>

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
