"use client";
import { Service } from "@/lib/types";
import { useState } from "react";
import { ServiceCard } from "./service-card";
import { BookingModal } from "./booking-modal";

interface CenterActionProps {
  services: Service[];
  centerId: string;
}

export function CenterAction({ services, centerId }: CenterActionProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
      <p className="text-muted-foreground mb-10">
        Discover our range of premium beauty and wellness treatments
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onBook={() => {
              setSelectedService(service);
            }}
          />
        ))}
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <BookingModal
          service={selectedService}
          centerId={centerId}
          onClose={() => {
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
}
