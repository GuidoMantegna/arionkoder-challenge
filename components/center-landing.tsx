"use client";

import { useState, useEffect } from "react";
import { ServiceCard } from "./service-card";
import { BookingModal } from "./booking-modal";
import type { Service } from "@/lib/types";

const centerData: Record<
  string,
  {
    name: string;
    description: string;
    logo: string;
  }
> = {
  center1: {
    name: "Glow Beauty Studio",
    description: "Premium beauty and wellness center with expert professionals",
    logo: "✨",
  },
  center2: {
    name: "Radiance Spa & Salon",
    description: "Luxury spa and salon services for ultimate relaxation",
    logo: "💆",
  },
  center3: {
    name: "Zen Beauty Lounge",
    description: "Holistic beauty and relaxation experiences",
    logo: "🧘",
  },
};

export function CenterLanding({
  params,
}: {
  params: Promise<{ center: string }>;
}) {
  const [resolvedParams, setResolvedParams] = useState<{
    center: string;
  } | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingDate, setBookingDate] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const p = await params;
      setResolvedParams(p);
    })();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    const fetchServices = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockServices: Service[] = [
        {
          id: "1",
          name: "Facial Treatment",
          duration: 60,
          price: 80,
          description: "Deep cleansing and rejuvenating facial",
          centerId: resolvedParams.center,
        },
        {
          id: "2",
          name: "Hair Styling",
          duration: 45,
          price: 60,
          description: "Professional haircut and styling",
          centerId: resolvedParams.center,
        },
        {
          id: "3",
          name: "Manicure & Pedicure",
          duration: 90,
          price: 75,
          description: "Complete nail care and polish",
          centerId: resolvedParams.center,
        },
        {
          id: "4",
          name: "Massage Therapy",
          duration: 60,
          price: 100,
          description: "Relaxing full body massage",
          centerId: resolvedParams.center,
        },
      ];

      setServices(mockServices);
      setLoading(false);
    };

    fetchServices();
  }, [resolvedParams]);

  if (!resolvedParams) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const center = centerData[resolvedParams.center] || centerData.center1;

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary via-primary/80 to-secondary text-primary-foreground py-16 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-8 mb-8">
            <div className="text-6xl drop-shadow-lg">{center.logo}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {center.name}
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                {center.description}
              </p>
            </div>
          </div>
          <a
            href="/"
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-medium flex items-center gap-1"
          >
            ← Back to Centers
          </a>
        </div>
      </header>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Our Services
        </h2>
        <p className="text-muted-foreground mb-10">
          Discover our range of premium beauty and wellness treatments
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-muted rounded-xl h-72 animate-pulse"
                />
              ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No services available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={() => {
                  setSelectedService(service);
                  setBookingDate(null);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <BookingModal
          service={selectedService}
          centerId={resolvedParams.center}
          onClose={() => {
            setSelectedService(null);
            setBookingDate(null);
          }}
          onBookingComplete={(bookingData) => {
            // Save booking and redirect
            const BOOKING_ID = Date.now();
            localStorage.setItem(
              `booking_${BOOKING_ID}`,
              JSON.stringify(bookingData)
            );
            setSelectedService(null);
            window.location.href = `/[center]/confirmation?center=${resolvedParams.center}&bookingId=${BOOKING_ID}`;
          }}
        />
      )}
    </main>
  );
}
