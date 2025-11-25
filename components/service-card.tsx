"use client";

import type { Service } from "@/lib/types";
import { TRANSITIONS_STYLES } from "@/lib/constants";

interface ServiceCardProps {
  service: Service;
  onBook: () => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <div
      className={`border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 h-full flex flex-col hover:scale-102 hover:bg-secondary/10 ${TRANSITIONS_STYLES}`}
    >
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {service.name}
      </h3>
      <p className="text-muted-foreground text-sm mb-6 flex-grow">
        {service.description}
      </p>

      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Duration</span>
          <span className="font-medium text-foreground">
            {service.duration} min
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="font-bold text-lg text-primary">
            ${service.price}
          </span>
        </div>
      </div>

      <button
        onClick={onBook}
        className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-all duration-200 active:scale-95"
      >
        Book Now
      </button>
    </div>
  );
}
