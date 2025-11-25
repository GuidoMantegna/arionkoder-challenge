import { Booking } from "@/lib/types";
export function BookingCard({ service }: { service: Booking }) {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6 space-y-4">
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
          Service
        </p>
        <p className="font-semibold text-foreground text-lg">
          {service.serviceName}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Date
          </p>
          <p className="font-semibold text-foreground">
            {new Date(service.date).toLocaleDateString("en-US", {
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
          <p className="font-semibold text-foreground">{service.time}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Duration
          </p>
          <p className="font-semibold text-foreground">
            {service.duration} min
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Price
          </p>
          <p className="font-bold text-lg text-primary">${service.price}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-primary/20">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
          Client Name
        </p>
        <p className="font-semibold text-foreground">{service.name}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
          Email
        </p>
        <p className="font-semibold text-foreground break-all">
          {service.email}
        </p>
      </div>
    </div>
  );
}
